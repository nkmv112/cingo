import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AITutorConsole from '../components/AITutorConsole';
import { curriculumData } from '../data/curriculumData';
import '../index.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Load robust lesson data
  const modules = curriculumData;

  const handleLessonStart = (lessonId: number, status: string) => {
    if (status !== 'locked') {
      navigate(`/lesson/${lessonId}`);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content" style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        
        {/* Left Column - Learning Path */}
        <div style={{ flex: '1', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '100px' }}>
          {modules.map((mod) => (
            <div key={mod.id}>
              <div style={{ 
                backgroundColor: mod.color, 
                color: 'white', 
                padding: '24px', 
                borderRadius: 'var(--radius-lg)',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: `0 4px 0 ${mod.shadow}`
              }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '1px' }}>{mod.title}</h2>
                  <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{mod.description}</p>
                </div>
                <button className="btn btn-outline" style={{ backgroundColor: 'white', color: mod.color, border: 'none', boxShadow: '0 4px 0 rgba(0,0,0,0.1)' }}>
                  GUIDEBOOK
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', position: 'relative' }}>
                {mod.lessons.map((lesson, index) => {
                  // Create a zigzag pattern
                  const offsetX = index % 2 === 0 ? '-30px' : '30px';
                  const isLocked = lesson.status === 'locked';
                  
                  return (
                    <div 
                      key={lesson.id} 
                      style={{ 
                        transform: `translateX(${offsetX})`, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        opacity: isLocked ? 0.6 : 1,
                        position: 'relative'
                      }}
                    >
                      {/* Bouncing animation wrapper for active lesson */}
                      <div className={lesson.status === 'unlocked' ? 'bounce-animation' : ''}>
                        <button 
                          onClick={() => handleLessonStart(lesson.id, lesson.status)}
                          className="lesson-node"
                          style={{
                            backgroundColor: lesson.status === 'completed' ? '#f59e0b' : isLocked ? 'var(--color-surface-hover)' : mod.color,
                            borderColor: lesson.status === 'completed' ? '#d97706' : isLocked ? 'var(--color-border)' : mod.shadow,
                          }}
                        >
                          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '28px' }}>
                            {lesson.status === 'completed' ? '⭐' : isLocked ? '🔒' : '⭐'}
                          </span>
                        </button>
                      </div>
                      
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="right-panel flex-col gap-6" style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px', flexShrink: 0 }}>
          
          {/* Top Stats Bar */}
          <div className="card stats-bar" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface)' }}>
            <div className="stat-item" style={{ color: 'var(--color-warning)' }}>
              <span>🔥</span> <span style={{fontWeight: 900}}>12</span>
            </div>
            <div className="stat-item" style={{ color: 'var(--color-secondary)' }}>
              <span>💎</span> <span style={{fontWeight: 900}}>450</span>
            </div>
            <div className="stat-item" style={{ color: 'var(--color-danger)' }}>
              <span>❤️</span> <span style={{fontWeight: 900}}>5</span>
            </div>
          </div>
          
          {/* AI Tutor Console Integration */}
          <div className="slide-up-animation" style={{ animationDelay: '0.1s' }}>
             <AITutorConsole />
          </div>

          {/* League Card */}
          <div className="card slide-up-animation" style={{ animationDelay: '0.2s' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', fontWeight: 800 }}>Unlock Leaderboards!</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div className="pulse-slow" style={{ width: '60px', height: '60px', backgroundColor: '#ffd900', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0, border: '4px solid #e5b400' }}>
                🏆
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.5', fontWeight: 600 }}>
                Complete 10 more lessons to enter the Bronze League and compete with others.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;
