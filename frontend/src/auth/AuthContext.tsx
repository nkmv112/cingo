import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, isMock } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  username: string | null;
  loading: boolean;
  login: (name: string, pass: string) => boolean;
  signup: (name: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  username: null,
  loading: true,
  login: () => false,
  signup: () => false,
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(localStorage.getItem('cingo_username'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMock) {
      // Handle mock state without actual Firebase calls
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (name: string, pass: string): boolean => {
    // Mock user registry
    const users = JSON.parse(localStorage.getItem('cingo_mock_users') || '{}');
    if (users[name]) {
       // user already exists
       return false;
    }
    
    users[name] = pass;
    localStorage.setItem('cingo_mock_users', JSON.stringify(users));
    localStorage.setItem('cingo_username', name);
    setUsername(name);
    return true;
  };

  const login = (name: string, pass: string): boolean => {
    // In a full Firebase app, you would signInWithEmailAndPassword() or Create User here
    // And verify the pass. For this UI, we mock the session explicitly
    const users = JSON.parse(localStorage.getItem('cingo_mock_users') || '{}');
    
    if (users[name] && users[name] === pass) {
       localStorage.setItem('cingo_username', name);
       setUsername(name);
       return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('cingo_username');
    setUsername(null);
    if (!isMock) {
      auth.signOut();
    }
  };

  return (
    <AuthContext.Provider value={{ user, username, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
