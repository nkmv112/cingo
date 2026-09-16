import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, isMock } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export interface PasswordCriteria {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export const validatePassword = (pass: string) => {
  const criteria: PasswordCriteria = {
    length: pass.length >= 10,
    uppercase: /[A-Z]/.test(pass),
    lowercase: /[a-z]/.test(pass),
    number: /[0-9]/.test(pass),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass),
  };
  const valid = Object.values(criteria).every(Boolean);
  const errors: string[] = [];
  if (!criteria.length) errors.push("Minimum 10 characters");
  if (!criteria.uppercase) errors.push("At least one uppercase letter (A-Z)");
  if (!criteria.lowercase) errors.push("At least one lowercase letter (a-z)");
  if (!criteria.number) errors.push("At least one number (0-9)");
  if (!criteria.special) errors.push("At least one special character (!@#$%^&*)");
  return { valid, criteria, errors };
};

interface AuthContextType {
  user: User | null;
  username: string | null;
  loading: boolean;
  login: (name: string, pass: string) => boolean;
  signup: (name: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;
  changeUsername: (newUsername: string) => { success: boolean; message?: string };
  changePassword: (oldPassword: string, newPassword: string) => { success: boolean; message?: string };
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  username: null,
  loading: true,
  login: () => false,
  signup: () => ({ success: false }),
  logout: () => {},
  changeUsername: () => ({ success: false }),
  changePassword: () => ({ success: false })
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(localStorage.getItem('cingo_username'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMock) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (name: string, pass: string): { success: boolean; message?: string } => {
    const trimmedName = name.trim();
    if (trimmedName.length < 3) {
      return { success: false, message: "Username must be at least 3 characters." };
    }

    const val = validatePassword(pass);
    if (!val.valid) {
      return { success: false, message: "Password does not meet security requirements: " + val.errors.join(", ") };
    }

    const users = JSON.parse(localStorage.getItem('cingo_mock_users') || '{}');
    if (users[trimmedName]) {
       return { success: false, message: "Username is already taken." };
    }
    
    users[trimmedName] = pass;
    localStorage.setItem('cingo_mock_users', JSON.stringify(users));
    localStorage.setItem('cingo_username', trimmedName);
    setUsername(trimmedName);
    return { success: true };
  };

  const login = (name: string, pass: string): boolean => {
    const trimmedName = name.trim();
    const users = JSON.parse(localStorage.getItem('cingo_mock_users') || '{}');
    
    if (users[trimmedName] && users[trimmedName] === pass) {
       localStorage.setItem('cingo_username', trimmedName);
       setUsername(trimmedName);
       return true;
    }
    
    return false;
  };

  const changeUsername = (newUsername: string): { success: boolean; message?: string } => {
    const trimmed = newUsername.trim();
    if (!username) return { success: false, message: "Not logged in." };
    if (trimmed.length < 3) return { success: false, message: "Username must be at least 3 characters." };
    if (trimmed === username) return { success: false, message: "New username is identical to current username." };

    const users = JSON.parse(localStorage.getItem('cingo_mock_users') || '{}');
    if (users[trimmed]) {
      return { success: false, message: "Username '" + trimmed + "' is already taken." };
    }

    const userPass = users[username];
    delete users[username];
    users[trimmed] = userPass;
    localStorage.setItem('cingo_mock_users', JSON.stringify(users));

    // Migrate progress
    const oldProg = localStorage.getItem(`cingo_progress_${username}`);
    if (oldProg) {
      localStorage.setItem(`cingo_progress_${trimmed}`, oldProg);
      localStorage.removeItem(`cingo_progress_${username}`);
    }

    const oldQuests = localStorage.getItem(`cingo_quests_${username}`);
    if (oldQuests) {
      localStorage.setItem(`cingo_quests_${trimmed}`, oldQuests);
      localStorage.removeItem(`cingo_quests_${username}`);
    }

    localStorage.setItem('cingo_username', trimmed);
    setUsername(trimmed);
    return { success: true, message: "Username updated successfully!" };
  };

  const changePassword = (oldPassword: string, newPassword: string): { success: boolean; message?: string } => {
    if (!username) return { success: false, message: "Not logged in." };
    
    const users = JSON.parse(localStorage.getItem('cingo_mock_users') || '{}');
    if (users[username] !== oldPassword) {
      return { success: false, message: "Incorrect current password." };
    }

    const val = validatePassword(newPassword);
    if (!val.valid) {
      return { success: false, message: "New password does not meet security criteria: " + val.errors.join(", ") };
    }

    users[username] = newPassword;
    localStorage.setItem('cingo_mock_users', JSON.stringify(users));
    return { success: true, message: "Password updated successfully!" };
  };

  const logout = () => {
    localStorage.removeItem('cingo_username');
    setUsername(null);
    if (!isMock) {
      auth.signOut();
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      username, 
      loading, 
      login, 
      signup, 
      logout,
      changeUsername,
      changePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
