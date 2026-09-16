import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth, validatePassword } from '../auth/AuthContext';
import { useProgress } from '../auth/ProgressContext';
import { 
  Settings as SettingsIcon, 
  User, 
  Moon, 
  Sun, 
  Bell, 
  Volume2, 
  Trash2, 
  LogOut, 
  Key, 
  ShieldCheck, 
  Edit3, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Lock
} from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { curriculumData } from '../data/curriculumData';
import { questsData } from '../data/questsData';
import PasswordRequirements from '../components/PasswordRequirements';
import '../index.css';

const Settings = () => {
  const { username, logout, changeUsername, changePassword } = useAuth();
  const { completedLessons, completedQuests, resetProgress } = useProgress();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Username change state
  const [newUsername, setNewUsername] = useState('');
  const [usernameMsg, setUsernameMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleReset = () => {
    resetProgress();
    setShowConfirmReset(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameMsg(null);
    if (!newUsername.trim()) return;

    const res = changeUsername(newUsername.trim());
    if (res.success) {
      setUsernameMsg({ type: 'success', text: res.message || 'Username updated successfully!' });
      setNewUsername('');
    } else {
      setUsernameMsg({ type: 'error', text: res.message || 'Failed to update username.' });
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (!oldPassword) {
      setPasswordMsg({ type: 'error', text: 'Please enter your current password.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New password and confirm password do not match.' });
      return;
    }

    const val = validatePassword(newPassword);
    if (!val.valid) {
      setPasswordMsg({ type: 'error', text: 'Please satisfy all 5 password security criteria.' });
      return;
    }

    const res = changePassword(oldPassword, newPassword);
    if (res.success) {
      setPasswordMsg({ type: 'success', text: res.message || 'Password changed successfully!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMsg({ type: 'error', text: res.message || 'Failed to change password.' });
    }
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '720px', paddingBottom: '60px' }}>
        
          {/* Header */}
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '16px' }}>
              <SettingsIcon size={40} color="var(--color-primary)" />
              Account & Profile
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', fontWeight: 500, marginTop: '8px' }}>
              Manage your credentials, security preferences, and learning achievements.
            </p>
          </div>

          {/* Profile Card */}
          <div className="card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '24px', 
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(22, 26, 88, 0.45) 0%, rgba(10, 14, 46, 0.6) 100%)',
            border: '1.5px solid rgba(158, 159, 212, 0.3)',
            borderRadius: '24px'
          }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', 
              backgroundColor: 'rgba(158, 159, 212, 0.15)', border: '2.5px solid var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              boxShadow: '0 0 20px rgba(158, 159, 212, 0.25)'
            }}>
              <User size={40} color="var(--color-primary)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>{username}</h2>
                <span style={{ 
                  fontSize: '0.72rem', 
                  fontWeight: 700, 
                  backgroundColor: 'rgba(16, 185, 129, 0.15)', 
                  color: '#10b981', 
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '3px 8px', 
                  borderRadius: '999px',
                  letterSpacing: '0.5px'
                }}>
                  ACTIVE
                </span>
              </div>
              <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '6px' }}>
                <span><strong style={{ color: 'var(--color-text-main)' }}>{completedLessons.length}</strong> Lessons Completed</span>
                <span>•</span>
                <span><strong style={{ color: 'var(--color-text-main)' }}>{completedQuests.length}</strong> Quests Solved</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="btn" 
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                color: '#f87171', 
                border: '1px solid rgba(239, 68, 68, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>

          {/* Overall Progress */}
          <div className="card" style={{ padding: '32px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Curriculum Mastery</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Progress combined across all 30 college modules and lab quests.</p>
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

          {/* User Area: Security & Credentials Card */}
          <div className="card" style={{ 
            padding: '36px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '32px',
            background: 'linear-gradient(135deg, rgba(22, 26, 88, 0.4) 0%, rgba(10, 14, 46, 0.75) 100%)',
            borderRadius: '24px',
            border: '1.5px solid rgba(158, 159, 212, 0.25)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(158, 159, 212, 0.2)', paddingBottom: '16px' }}>
              <div style={{ 
                padding: '8px', 
                borderRadius: '10px', 
                backgroundColor: 'rgba(158, 159, 212, 0.15)',
                color: 'var(--color-primary)'
              }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, letterSpacing: '0.5px' }}>
                  Security & Account Credentials
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Update your student handle and password credentials
                </span>
              </div>
            </div>

            {/* Change Username Form */}
            <form onSubmit={handleUsernameSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem', color: '#e2e8f0' }}>
                <Edit3 size={18} color="var(--color-primary)" />
                <span>Change Username</span>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input 
                  type="text"
                  placeholder="Enter new username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="modern-input"
                  style={{ flex: 1, minWidth: '240px' }}
                />
                <button 
                  type="submit" 
                  disabled={!newUsername.trim() || newUsername.trim() === username}
                  style={{ 
                    padding: '14px 24px', 
                    fontSize: '0.92rem', 
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    borderRadius: '12px',
                    border: 'none',
                    background: (!newUsername.trim() || newUsername.trim() === username) 
                      ? 'rgba(255,255,255,0.08)' 
                      : 'linear-gradient(135deg, #9e9fd4 0%, #6366f1 100%)',
                    color: (!newUsername.trim() || newUsername.trim() === username) ? '#64748b' : '#050a24',
                    cursor: (!newUsername.trim() || newUsername.trim() === username) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: (!newUsername.trim() || newUsername.trim() === username) ? 'none' : '0 4px 16px rgba(99, 102, 241, 0.35)'
                  }}
                >
                  UPDATE USERNAME
                </button>
              </div>

              {usernameMsg && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: usernameMsg.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: usernameMsg.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                  color: usernameMsg.type === 'success' ? '#34d399' : '#f87171',
                  marginTop: '4px'
                }}>
                  {usernameMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  <span>{usernameMsg.text}</span>
                </div>
              )}
            </form>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(158, 159, 212, 0.15)', margin: '4px 0' }} />

            {/* Change Password Form */}
            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem', color: '#e2e8f0' }}>
                <Key size={18} color="var(--color-secondary)" />
                <span>Change Password</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Current Password
                  </label>
                  <input 
                    type="password"
                    placeholder="Enter your current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="modern-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    New Password
                  </label>
                  <input 
                    type="password"
                    placeholder="Create a strong password (min 10 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="modern-input"
                  />
                </div>

                {/* Real-time Password Requirements Checklist */}
                <PasswordRequirements password={newPassword} />

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Confirm New Password
                  </label>
                  <input 
                    type="password"
                    placeholder="Re-enter new password to confirm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="modern-input"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!oldPassword || !newPassword || !confirmPassword}
                style={{ 
                  marginTop: '8px',
                  padding: '14px 28px', 
                  fontSize: '0.95rem', 
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  borderRadius: '12px',
                  border: 'none',
                  background: (!oldPassword || !newPassword || !confirmPassword) 
                    ? 'rgba(255,255,255,0.08)' 
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: (!oldPassword || !newPassword || !confirmPassword) ? '#64748b' : '#ffffff',
                  cursor: (!oldPassword || !newPassword || !confirmPassword) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.25s ease',
                  alignSelf: 'flex-start',
                  boxShadow: (!oldPassword || !newPassword || !confirmPassword) ? 'none' : '0 4px 18px rgba(16, 185, 129, 0.35)'
                }}
              >
                UPDATE PASSWORD
              </button>

              {passwordMsg && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: passwordMsg.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: passwordMsg.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                  color: passwordMsg.type === 'success' ? '#34d399' : '#f87171',
                  marginTop: '4px'
                }}>
                  {passwordMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  <span>{passwordMsg.text}</span>
                </div>
              )}
            </form>
          </div>

          {/* Preferences */}
          <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', borderRadius: '24px' }}>
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
          <div className="card" style={{ padding: '32px', border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.02)', borderRadius: '24px' }}>
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
                   style={{ backgroundColor: 'transparent', border: '1px solid var(--color-danger)', color: 'var(--color-danger)', borderRadius: '10px' }}
                 >
                   Flush Data
                 </button>
              ) : (
                 <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                   <button onClick={handleReset} className="btn" style={{ backgroundColor: 'var(--color-danger)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px' }}>
                      <Trash2 size={16} /> Confirm Reset
                   </button>
                   <button onClick={() => setShowConfirmReset(false)} className="btn btn-outline" style={{ borderRadius: '10px' }}>
                      Cancel
                   </button>
                 </div>
              )}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Settings;
