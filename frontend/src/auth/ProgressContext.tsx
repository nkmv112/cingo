import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface ProgressContextType {
  completedLessons: number[];
  completeLesson: (id: number) => void;
  isUnlocked: (id: number) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { username } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  // Effect to load progress whenever the user changes
  useEffect(() => {
    if (username) {
      const storageKey = `cingo_progress_${username}`;
      const saved = localStorage.getItem(storageKey);
      setCompletedLessons(saved ? JSON.parse(saved) : []);
    } else {
      // Guest or logged out
      setCompletedLessons([]);
    }
  }, [username]);

  // Effect to save progress to the correct user-specific key
  useEffect(() => {
    if (username) {
      const storageKey = `cingo_progress_${username}`;
      localStorage.setItem(storageKey, JSON.stringify(completedLessons));
    }
  }, [completedLessons, username]);

  const completeLesson = (id: number) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons((prev) => [...prev, id]);
    }
  };

  const isUnlocked = (id: number) => {
      if (id === 101) return true;
      
      let prevId = id - 1;
      if (id % 100 === 1) {
          prevId = (Math.floor(id / 100) - 1) * 100 + 5;
      }
      
      return completedLessons.includes(prevId);
  };

  return (
    <ProgressContext.Provider value={{ completedLessons, completeLesson, isUnlocked }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
