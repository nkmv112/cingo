import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  completedLessons: number[];
  completeLesson: (id: number) => void;
  isUnlocked: (id: number) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const completeLesson = (id: number) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons((prev) => [...prev, id]);
    }
  };

  const isUnlocked = (id: number) => {
      // 101 is always unlocked
      if (id === 101) return true;
      
      // Find previous lesson ID
      // This is a simplified logic: if lesson (id-1) is completed, then id is unlocked.
      // For first lesson of a unit (e.g. 201), it depends on the last lesson of the previous unit (e.g. 105).
      
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
