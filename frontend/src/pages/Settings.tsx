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
  AlertCircle 
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
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '32px' }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', 
              backgroundColor: 'var(--color-surface-hover)', border: '2px solid var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <User size={40} color="var(--color-primary)" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '4px' }}>{username}</h2>
              <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
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

          {/* User Area: Change Username & Password */}
          <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
              <ShieldCheck size={24} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
                Security & Account Credentials
              </h3>
            </div>

            {/* Change Username Form */}
            <form onSubmit={handleUsernameSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem' }}>
                <Edit3 size={18} color="var(--color-primary)" />
                <span>Change Username</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input 
                  type="text"
                  placeholder="Enter new username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm, 10px)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-main)',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={!newUsername.trim() || newUsername.trim() === username}
                  style={{ padding: '12px 20px', fontSize: '0.95rem', fontWeight: 700 }}
                >
                  Update Username
                </button>
              </div>
              {usernameMsg && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem',
                  color: usernameMsg.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
                  marginTop: '4px'
                }}>
                  {usernameMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  <span>{usernameMsg.text}</span>
                </div>
              )}
            </form>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '4px 0' }} />

            {/* Change Password Form */}
            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem' }}>
                <Key size={18} color="var(--color-secondary)" />
                <span>Change Password</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="password"
                  placeholder="Current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm, 10px)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-main)',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />

                <input 
                  type="password"
                  placeholder="New password (min 10 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm, 10px)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-main)',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />

                {/* Real-time Password Requirements Checklist */}
                <PasswordRequirements password={newPassword} />

                <input 
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm, 10px)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text-main)',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-secondary"
                disabled={!oldPassword || !newPassword || !confirmPassword}
                style={{ padding: '14px 24px', fontSize: '1rem', fontWeight: 700, alignSelf: 'flex-start' }}
              >
                Update Password
              </button>

              {passwordMsg && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem',
                  color: passwordMsg.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
                  marginTop: '4px'
                }}>
                  {passwordMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  <span>{passwordMsg.text}</span>
                </div>
              )}
            </form>
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
          
        </div>
      </main>
    </div>
  );
};

export default Settings;
