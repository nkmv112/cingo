import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface ProgressContextType {
  completedLessons: number[];
  completedQuests: number[];
  completeLesson: (id: number) => void;
  completeQuest: (id: number) => void;
  markHistoryAsCompleted: (lessonIds: number[]) => void;
  isUnlocked: (id: number) => boolean;
  isQuestUnlocked: (questId: number) => boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { username } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);

  // Effect to load progress whenever the user changes
  useEffect(() => {
    if (username) {
      const storageKey = `cingo_progress_${username}`;
      const saved = localStorage.getItem(storageKey);
      setCompletedLessons(saved ? JSON.parse(saved) : []);

      const questsKey = `cingo_quests_${username}`;
      const savedQuests = localStorage.getItem(questsKey);
      setCompletedQuests(savedQuests ? JSON.parse(savedQuests) : []);
    } else {
      // Guest or logged out
      setCompletedLessons([]);
      setCompletedQuests([]);
    }
  }, [username]);

  // Effect to save progress to the correct user-specific key
  useEffect(() => {
    if (username) {
      const storageKey = `cingo_progress_${username}`;
      localStorage.setItem(storageKey, JSON.stringify(completedLessons));

      const questsKey = `cingo_quests_${username}`;
      localStorage.setItem(questsKey, JSON.stringify(completedQuests));
    }
  }, [completedLessons, completedQuests, username]);

  const completeLesson = (id: number) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons((prev) => [...prev, id]);
    }
  };

  const completeQuest = (id: number) => {
    if (!completedQuests.includes(id)) {
      setCompletedQuests((prev) => [...prev, id]);
    }
  };

  const resetProgress = () => {
    setCompletedLessons([]);
    setCompletedQuests([]);
  };

  const markHistoryAsCompleted = (lessonIds: number[]) => {
    setCompletedLessons(prev => {
      const next = Array.from(new Set([...prev, ...lessonIds]));
      return next;
    });
  };

  const isUnlocked = (id: number) => {
      if (id === 101) return true;
      
      let prevId = id - 1;
      if (id % 100 === 1) {
          prevId = (Math.floor(id / 100) - 1) * 100 + 5;
      }
      
      return completedLessons.includes(prevId);
  };

  const isQuestUnlocked = (questId: number): boolean => {
    if (questId === 1) return true;
    return completedQuests.includes(questId - 1);
  };

  return (
    <ProgressContext.Provider value={{ 
      completedLessons,
      completedQuests, 
      completeLesson, 
      completeQuest,
      markHistoryAsCompleted,
      isUnlocked,
      isQuestUnlocked,
      resetProgress 
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
