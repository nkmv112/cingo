import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AITutorConsole from '../components/AITutorConsole';
import { curriculumData } from '../data/curriculumData';
import { useProgress } from '../auth/ProgressContext';
import { Star, Lock, Check, BookOpen } from 'lucide-react';
import '../index.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { completedLessons, isUnlocked } = useProgress();
  const modules = curriculumData;

  const handleLessonStart = (lessonId: number) => {
    if (isUnlocked(lessonId)) {
      navigate(`/lesson/${lessonId}`);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        
        {/* Left Column - Learning Path */}
        <div className="learning-path-column">
          {modules.map((mod) => (
            <div key={mod.id} style={{ width: '100%' }}>
              <div style={{ 
                backgroundColor: mod.color, 
                color: 'white', 
                padding: '24px', 
                borderRadius: 'var(--radius-lg)',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: `0 4px 0 ${mod.shadow}`,
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ minWidth: '200px', flex: 1 }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '1px' }}>{mod.title}</h2>
                  <p style={{ fontSize: '1rem', opacity: 0.9 }}>{mod.description}</p>
                </div>
                <button className="btn btn-outline" style={{ backgroundColor: 'white', color: mod.color, border: 'none', boxShadow: '0 4px 0 rgba(0,0,0,0.1)', fontSize: '0.8rem', padding: '8px 16px' }}>
                  GUIDE
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', position: 'relative' }}>
                {mod.lessons.map((lesson, index) => {
                  const offsetX = index % 2 === 0 ? '-30px' : '30px';
                  const completed = completedLessons.includes(lesson.id);
                  const unlocked = isUnlocked(lesson.id);
                  
                  return (
                    <div 
                      key={lesson.id} 
                      style={{ 
                        transform: `translateX(${window.innerWidth < 768 ? '0' : offsetX})`, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        position: 'relative'
                      }}
                    >
                      <div className={unlocked && !completed ? 'bounce-animation' : ''}>
                        <button 
                          onClick={() => handleLessonStart(lesson.id)}
                          className="lesson-node"
                          style={{
                            backgroundColor: completed ? '#f59e0b' : !unlocked ? 'var(--color-surface-hover)' : mod.color,
                            borderColor: completed ? '#d97706' : !unlocked ? 'var(--color-border)' : mod.shadow,
                            cursor: unlocked ? 'pointer' : 'default',
                            opacity: unlocked ? 1 : 0.6,
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                          }}
                        >
                          <div style={{ color: 'white' }}>
                            {completed ? (
                              <Check size={window.innerWidth < 768 ? 24 : 32} strokeWidth={4} />
                            ) : !unlocked ? (
                              <Lock size={window.innerWidth < 768 ? 20 : 28} />
                            ) : (
                              <Star size={window.innerWidth < 768 ? 24 : 32} fill="white" />
                            )}
                          </div>
                        </button>
                      </div>
                      <span style={{ 
                        marginTop: '12px', 
                        fontWeight: 'bold', 
                        fontSize: '0.8rem', 
                        textAlign: 'center',
                        maxWidth: '120px',
                        color: unlocked ? 'var(--color-text)' : 'var(--color-text-muted)' 
                      }}>
                        {lesson.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="right-panel">
          
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
          <div className="slide-up-animation ai-console-module" style={{ animationDelay: '0.1s' }}>
             <AITutorConsole />
          </div>

          {/* League Card */}
          <div className="card slide-up-animation" style={{ animationDelay: '0.2s' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1rem', fontWeight: 800 }}>Unlock Leaderboards!</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div className="pulse-slow" style={{ width: '50px', height: '50px', backgroundColor: '#ffd900', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0, border: '4px solid #e5b400' }}>
                🏆
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.4', fontWeight: 600 }}>
                Complete {10 - completedLessons.length % 10} more to enter Bronze League.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;
