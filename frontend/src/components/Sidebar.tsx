import React from 'react';
import { Home, BookOpen, User, Settings, Award, Sun, Moon, LogOut, Terminal } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../auth/AuthContext';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div style={{ padding: '0 16px', marginBottom: '32px' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '24px', letterSpacing: '1px' }}>
          Cingo
        </h1>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Home className="icon" />
          <span>Learn</span>
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Award className="icon" />
          <span>Leaderboard</span>
        </NavLink>
        <NavLink to="/quests" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BookOpen className="icon" />
          <span>Quests</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <User className="icon" />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings className="icon" />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/console" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Terminal className="icon" />
          <span>Playground</span>
        </NavLink>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '2px solid var(--color-border)' }}>
        <button 
          onClick={toggleTheme}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', 
            width: '100%', backgroundColor: 'transparent', border: 'none', 
            color: 'var(--color-text-muted)', cursor: 'pointer', borderRadius: 'var(--radius-md)',
            fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.8px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          {theme === 'dark' ? <Sun className="icon" /> : <Moon className="icon" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button 
          onClick={handleLogout}
          style={{ 
            marginTop: '8px',
            display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', 
            width: '100%', backgroundColor: 'transparent', border: 'none', 
            color: 'var(--color-danger)', cursor: 'pointer', borderRadius: 'var(--radius-md)',
            fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.8px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut className="icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
