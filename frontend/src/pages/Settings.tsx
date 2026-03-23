import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../auth/AuthContext';
import { useProgress } from '../auth/ProgressContext';
import { Settings as SettingsIcon, User, Moon, Sun, Bell, Volume2, Trash2, LogOut } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { curriculumData } from '../data/curriculumData';
import { questsData } from '../data/questsData';
import '../index.css';

const Settings = () => {
  const { username, logout } = useAuth();
  const { completedLessons, completedQuests, resetProgress } = useProgress();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showConfirmReset, setShowConfirmReset] = useState(false);


  const handleReset = () => {
    resetProgress();
    setShowConfirmReset(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calculate Overall Progress
  const totalLessons = curriculumData.reduce((acc, unit) => acc + unit.lessons.length, 0);
  const totalQuests = questsData.length;
  const totalItems = totalLessons + totalQuests;
  const completedItems = completedLessons.length + completedQuests.length;
  const overallProgress = Math.round((completedItems / totalItems) * 100);
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '720px' }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '16px' }}>
            <SettingsIcon size={40} color="var(--color-primary)" />
            Account Settings
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', fontWeight: 500, marginTop: '8px' }}>
            Manage your profile, application preferences, and learning data.
          </p>
        </div>

        {/* Profile Card */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '32px' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', 
            backgroundColor: 'var(--color-surface-hover)', border: '2px solid var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <User size={40} color="var(--color-primary)" />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '4px' }}>{username}</h2>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              <span><strong style={{ color: 'var(--color-text-main)' }}>{completedLessons.length}</strong> Lessons</span>
              <span>•</span>
              <span><strong style={{ color: 'var(--color-text-main)' }}>{completedQuests.length}</strong> Quests</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="btn" 
            style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              color: 'var(--color-danger)', 
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Overall Progress */}
        <div className="card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Overall Mastery</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Progress combined across all lessons and programming quests.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)' }}>{overallProgress}%</span>
            </div>
          </div>
          <div className="progress-bar-bg" style={{ height: '12px' }}>
            <div className="progress-bar-fill" style={{ width: `${overallProgress}%` }}></div>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '24px', fontSize: '0.85rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--color-primary)' }}></div>
                <span style={{ color: 'var(--color-text-muted)' }}>{completedLessons.length}/{totalLessons} Lessons</span>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--color-secondary)' }}></div>
                <span style={{ color: 'var(--color-text-muted)' }}>{completedQuests.length}/{totalQuests} Quests</span>
             </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '8px' }}>
            Application Preferences
          </h3>

          {/* Theme Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {theme === 'dark' ? <Moon size={20} color="var(--color-secondary)" /> : <Sun size={20} color="var(--color-warning)" />}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>Application Theme</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Switch between Light and Dark mode.</div>
              </div>
            </div>
            <button onClick={toggleTheme} className="btn btn-outline" style={{ minWidth: '120px' }}>
              {theme === 'dark' ? 'Use Light Mode' : 'Use Dark Mode'}
            </button>
          </div>

          {/* Sound Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Volume2 size={20} color={soundEnabled ? 'var(--color-success)' : 'var(--color-text-muted)'} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>Sound Effects</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Experience UI sounds and completion cheers.</div>
              </div>
            </div>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="btn btn-outline" style={{ minWidth: '120px', borderColor: soundEnabled ? 'var(--color-success)' : 'var(--color-border)', color: soundEnabled ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
              {soundEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Notifications Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={20} color={notifications ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>Push Notifications</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Receive daily reminders to practice coding.</div>
              </div>
            </div>
            <button onClick={() => setNotifications(!notifications)} className="btn btn-outline" style={{ minWidth: '120px', borderColor: notifications ? 'var(--color-primary)' : 'var(--color-border)', color: notifications ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
              {notifications ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card" style={{ padding: '32px', border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.02)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-danger)', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', paddingBottom: '16px', marginBottom: '16px' }}>
            Danger Zone
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>Reset Curriculum Progress</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, maxWidth: '400px', marginTop: '4px' }}>
                This will permanently delete all your completed lessons and quests data. You cannot undo this action.
              </div>
            </div>

            {!showConfirmReset ? (
               <button 
                 onClick={() => setShowConfirmReset(true)} 
                 className="btn" 
                 style={{ backgroundColor: 'transparent', border: '1px solid var(--color-danger)', color: 'var(--color-danger)' }}
               >
                 Flush Data
               </button>
            ) : (
               <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                 <button onClick={handleReset} className="btn" style={{ backgroundColor: 'var(--color-danger)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Trash2 size={16} /> Confirm Reset
                 </button>
                 <button onClick={() => setShowConfirmReset(false)} className="btn btn-outline">
                    Cancel
                 </button>
               </div>
            )}
          </div>
        </div>
        
        </div> {/* end centered wrapper */}
      </main>
    </div>
  );
};

export default Settings;
