import React from 'react';
import { Home, BookOpen, Settings, Award, Terminal, GraduationCap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        
        {/* 4-Color Theme Logo Treatment */}
        <div style={{ padding: '0 8px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            backgroundColor: 'var(--color-primary-light)', 
            border: '1px solid var(--color-primary)',
            padding: '8px', 
            borderRadius: '8px',
            boxShadow: '0 4px 12px var(--color-primary-shadow)'
          }}>
            <GraduationCap size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h1 style={{ color: 'var(--color-text-main)', fontSize: '1.6rem', fontWeight: 900, letterSpacing: '0.2em', lineHeight: 1, textShadow: '0 0 10px rgba(255,255,255,0.4)', margin: 0 }}>CINGO V2</h1>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Command Center</span>
          </div>
        </div>
        
        {/* Navigation Area */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          <div style={{ padding: '8px 20px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '1px', marginTop: '8px', marginBottom: '4px' }}>
            LEARNING
          </div>
          
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Home className="icon" />
            <span>Courses</span>
          </NavLink>
          <NavLink to="/console" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Terminal className="icon" />
            <span>Playground</span>
          </NavLink>
          <NavLink to="/quests" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <BookOpen className="icon" />
            <span>Quests</span>
          </NavLink>

          <div style={{ padding: '8px 20px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '1px', marginTop: '24px', marginBottom: '4px' }}>
            SYSTEM
          </div>

          <NavLink to="/leaderboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Award className="icon" />
            <span>Leaderboard</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings className="icon" />
            <span>Settings</span>
          </NavLink>
        </nav>

      </div>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-nav">
        <NavLink to="/" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <Home className="icon" />
          <span>Learn</span>
        </NavLink>
        <NavLink to="/quests" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <BookOpen className="icon" />
          <span>Quests</span>
        </NavLink>
        <NavLink to="/console" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <Terminal className="icon" />
          <span>Play</span>
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <Award className="icon" />
          <span>Rank</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <Settings className="icon" />
          <span>Settings</span>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
