import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AITutorConsole from '../components/AITutorConsole';
import { curriculumData } from '../data/curriculumData';
import { useProgress } from '../auth/ProgressContext';
import { CircleDot, Lock, Check, BookOpen, Flame, Diamond, Heart, Play } from 'lucide-react';
import '../index.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { completedLessons, isUnlocked } = useProgress();
  const modules = curriculumData;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          
          <div style={{ marginBottom: '16px' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Courses Progress</h1>
              <p style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>Pick up where you left off and master C.</p>
              
              {/* Global Resume Button for better Mobile UX */}
              <div style={{ marginTop: '24px' }}>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    const lastCompletedId = Math.max(...completedLessons, 0);
                    const nextId = lastCompletedId === 0 ? 101 : (lastCompletedId + 1);
                    if (isUnlocked(nextId)) navigate(`/lesson/${nextId}`);
                    else if (lastCompletedId !== 0) navigate(`/lesson/${lastCompletedId}`);
                  }}
                  style={{ width: isMobile ? '100%' : 'auto', gap: '12px', padding: '16px 32px' }}
                >
                  <Play size={20} fill="currentColor" /> Continue Learning
                </button>
              </div>
          </div>

          {modules.map((mod) => {
            const moduleCompletedLessons = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
            const progressPercent = Math.round((moduleCompletedLessons / mod.lessons.length) * 100);

            return (
              <div key={mod.id} style={{ width: '100%' }}>
                
                {/* Inspired Hero Card for Module Header */}
                <div className="card" style={{ 
                  marginBottom: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  padding: '32px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  
                  {/* Decorative faint glow */}
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '300px',
                    height: '300px',
                    background: `radial-gradient(circle, ${mod.color}30 0%, transparent 70%)`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 0
                  }} />

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: '16px', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                       {/* Icon Container */}
                       <div style={{ 
                         width: '70px', height: '70px', 
                         backgroundColor: `${mod.color}20`, 
                         border: `1px solid ${mod.color}50`,
                         borderRadius: '16px', 
                         display: 'flex', alignItems: 'center', justifyContent: 'center',
                         boxShadow: 'var(--shadow-md)',
                         backdropFilter: 'blur(10px)'
                       }}>
                         <BookOpen size={30} color={mod.color} />
                       </div>
                       <div>
                         <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{mod.title}</h2>
                         <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 400, letterSpacing: '0.05em' }}>{mod.description}</p>
                       </div>
                    </div>
                    
                    <button className="btn" onClick={() => {
                        const nextLesson = mod.lessons.find(l => isUnlocked(l.id) && !completedLessons.includes(l.id))
                          ?? mod.lessons.find(l => isUnlocked(l.id));
                        if (nextLesson) navigate(`/lesson/${nextLesson.id}`);
                      }} style={{ 
                      backgroundColor: `${mod.color}20`, 
                      border: `1px solid ${mod.color}`,
                      color: mod.color,
                      boxShadow: 'var(--shadow-sm)', 
                      gap: '8px' 
                    }}>
                      Resume <Play size={16} fill="currentColor" />
                    </button>
                  </div>

                  <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-main)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px' }}>
                        <span>{moduleCompletedLessons}/{mod.lessons.length}</span> ENROLLED
                     </div>
                     <div style={{ flex: 1, minWidth: '150px' }}>
                        <div className="progress-bar-bg" style={{ height: '8px', backgroundColor: 'var(--color-border)' }}>
                          <div className="progress-bar-fill" style={{ width: `${progressPercent}%`, backgroundColor: mod.color }} />
                        </div>
                     </div>
                     <span style={{ fontWeight: 800, color: 'var(--color-text-muted)' }}>{progressPercent}%</span>
                  </div>

                </div>

                {/* Vertical Path */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', position: 'relative', marginBottom: '48px' }}>
                  
                  {/* Subtle connecting line */}
                  <div style={{ position: 'absolute', top: 0, bottom: 0, width: '4px', backgroundColor: 'var(--color-border)', zIndex: 0, borderRadius: '4px' }} />

                  {mod.lessons.map((lesson, index) => {
                    const offsetX = index % 2 === 0 ? '-40px' : '40px';
                    const completed = completedLessons.includes(lesson.id);
                    const unlocked = isUnlocked(lesson.id);
                    
                    return (
                      <div 
                        key={lesson.id} 
                        style={{ 
                          transform: `translateX(${isMobile ? '0' : offsetX})`, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center',
                          position: 'relative',
                          zIndex: 1
                        }}
                      >
                        <div className={unlocked && !completed ? 'bounce-animation' : ''}>
                          <button 
                            onClick={() => handleLessonStart(lesson.id)}
                            className="lesson-node"
                            style={{
                              borderColor: completed ? 'var(--color-warning)' : !unlocked ? 'var(--color-border)' : mod.color,
                              borderWidth: unlocked ? '2px' : '1px',
                              cursor: unlocked ? 'pointer' : 'default',
                              opacity: unlocked ? 1 : 0.6,
                              backgroundColor: completed ? 'rgba(251, 191, 36, 0.15)' : !unlocked ? 'rgba(0,0,0,0.4)' : `${mod.color}25`,
                              boxShadow: unlocked ? 'var(--shadow-md)' : 'none',
                            }}
                          >
                            <div style={{ 
                               color: completed ? 'var(--color-warning)' : !unlocked ? 'var(--color-text-muted)' : mod.color,
                               filter: unlocked ? `drop-shadow(0 0 8px ${completed ? 'var(--color-warning)' : mod.color})` : 'none'
                            }}>
                              {completed ? (
                                <Check size={32} strokeWidth={3} />
                              ) : !unlocked ? (
                                <Lock size={26} />
                              ) : (
                                <CircleDot size={32} strokeWidth={2.5} />
                              )}
                            </div>
                          </button>
                        </div>

                        {/* Lesson Label floating card */}
                        <div style={{ 
                          marginTop: '16px', 
                          fontWeight: 700, 
                          fontSize: '0.85rem', 
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          textAlign: 'center',
                          color: unlocked ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                          backgroundColor: unlocked ? 'var(--color-surface-hover)' : 'rgba(0,0,0,0.6)',
                          padding: '8px 16px',
                          borderRadius: '12px',
                          border: `2px solid ${unlocked ? 'var(--color-border)' : 'rgba(255,255,255,0.05)'}`,
                          boxShadow: unlocked ? 'var(--shadow-md)' : 'none',
                          backdropFilter: 'blur(10px)'
                        }}>
                          {lesson.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Panel - Stats & AI Tutor */}
        <div className="right-panel">
          
          {/* Top Stats Bar - Elegant Styling */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="stat-item" style={{ color: 'var(--color-warning)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
              <Flame size={20} fill="currentColor" /> <span style={{fontWeight: 700}}>12</span>
            </div>
            <div className="stat-item" style={{ color: 'var(--color-primary)', border: '1px solid var(--color-primary-shadow)' }}>
              <Diamond size={20} fill="currentColor" /> <span style={{fontWeight: 700}}>450</span>
            </div>
            <div className="stat-item" style={{ color: 'var(--color-danger)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <Heart size={20} fill="currentColor" /> <span style={{fontWeight: 700}}>5</span>
            </div>
          </div>
          
          {/* AI Tutor Console Integration */}
          <div className="slide-up-animation ai-console-module" style={{ animationDelay: '0.1s' }}>
             <AITutorConsole />
          </div>

          {/* League Promo Card */}
          <div className="card slide-up-animation" style={{ 
            animationDelay: '0.2s', 
            backgroundColor: 'var(--color-surface)',
            backgroundImage: 'radial-gradient(circle at top right, var(--color-primary-light), transparent 70%)' 
          }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Reach Bronze League</h3>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div className="pulse-slow" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(251, 191, 36, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0, border: '1px solid rgba(251, 191, 36, 0.5)', boxShadow: 'var(--shadow-md)' }}>
                🏆
              </div>
              <div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.5', letterSpacing: '0.05em', marginBottom: '12px' }}>
                  Complete {10 - completedLessons.length % 10} more missions to unlock your first rank.
                </p>
                <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '6px 12px' }}>Engage</button>
              </div>
            </div>
          </div>

          {/* New Quests Shortcut Card for better Visibility */}
          <div className="card slide-up-animation" style={{ 
            animationDelay: '0.3s', 
            backgroundColor: 'var(--color-surface)',
            borderLeft: '4px solid var(--color-secondary)'
          }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Available Quests</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>Master challenges and earn special badges.</p>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/quests')}
              style={{ width: '100%', fontSize: '0.75rem' }}
            >
              Explore Quests
            </button>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;
