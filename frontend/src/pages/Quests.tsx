import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { questsData } from '../data/questsData';
import { useProgress } from '../auth/ProgressContext';
import { Check, Lock, Terminal, Shield } from 'lucide-react';
import '../index.css';

const Quests = () => {
  const navigate = useNavigate();
  const { completedQuests, isQuestUnlocked } = useProgress();

  const handleQuestStart = (questId: number, unlocked: boolean) => {
    if (unlocked) {
      navigate(`/quests/${questId}`);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
        
        {/* Header */}
        <div style={{ width: '100%', maxWidth: '1000px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={40} color="var(--color-primary)" />
            Cingo Quests
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', fontWeight: 500, marginTop: '8px' }}>
            Prove your mastery. Solve 20 progressive challenges ranging from beginner logic to advanced data structures. 
            Quests automatically unlock as you complete related curriculum lessons.
          </p>
        </div>

        {/* Quest Grid */}
        <div className="quests-grid" style={{ 
          display: 'grid', 
          gap: '24px',
          width: '100%',
          maxWidth: '1000px'
        }}>
          {questsData.map((quest) => {
            const unlocked = isQuestUnlocked(quest.id);
            const completed = completedQuests.includes(quest.id);

            // Determine border and text colors based on state
            let borderColor = 'var(--color-border)';
            let iconBg = 'rgba(0,0,0,0.3)';
            let iconColor = 'var(--color-text-muted)';
            
            if (completed) {
              borderColor = 'var(--color-success)';
              iconBg = 'rgba(34, 197, 94, 0.15)';
              iconColor = 'var(--color-success)';
            } else if (unlocked) {
              borderColor = 'var(--color-secondary)';
              iconBg = 'var(--color-surface-hover)';
              iconColor = 'var(--color-secondary)';
            }

            return (
              <div 
                key={quest.id}
                onClick={() => handleQuestStart(quest.id, unlocked)}
                className="card"
                style={{
                  cursor: unlocked ? 'pointer' : 'default',
                  opacity: unlocked ? 1 : 0.6,
                  border: `2px solid ${borderColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  transform: unlocked ? 'scale(1)' : 'scale(0.98)',
                  boxShadow: unlocked ? 'var(--shadow-md)' : 'none',
                  backgroundColor: completed ? 'rgba(34, 197, 94, 0.05)' : 'var(--color-surface)'
                }}
              >
                {/* Header: ID, Title, Icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ 
                      width: '48px', height: '48px', 
                      borderRadius: '12px', 
                      backgroundColor: iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: iconColor
                    }}>
                      {completed ? <Check size={24} strokeWidth={3} /> : !unlocked ? <Lock size={24} /> : <Terminal size={24} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>
                        QUEST {quest.id}
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                        {quest.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5', flex: 1 }}>
                  {unlocked ? quest.description : 'Locked. Complete more curriculum lessons to reveal this quest.'}
                </p>

                {/* Footer Tags */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: quest.difficulty === 'Beginner' ? '#4ade80' : quest.difficulty === 'Intermediate' ? '#fbbf24' : '#f87171',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}>
                    {quest.difficulty.toUpperCase()}
                  </span>
                  
                  {unlocked && !completed && (
                    <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      START
                    </button>
                  )}
                  {completed && (
                    <span style={{ color: 'var(--color-success)', fontWeight: 700, fontSize: '0.85rem' }}>COMPLETED</span>
                  )}
                </div>

                {/* Subtle complete glow */}
                {completed && (
                   <div style={{
                     position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px',
                     background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
                     pointerEvents: 'none'
                   }} />
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Quests;
