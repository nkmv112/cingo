import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../auth/AuthContext';
import { Trophy, Medal, Star, Flame, Zap } from 'lucide-react';
import '../index.css';

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  isCurrentUser?: boolean;
  avatar?: string;
  trend: 'up' | 'down' | 'neutral';
}

const mockData: LeaderboardEntry[] = [
  { rank: 1, name: "C-Sharp King", xp: 12450, avatar: "🤴", trend: 'up' },
  { rank: 2, name: "Pointer Master", xp: 11200, avatar: "🧙", trend: 'neutral' },
  { rank: 3, name: "Syntax Wizard", xp: 9800, avatar: "🧙", trend: 'up' },
  { rank: 4, name: "Memory Leak", xp: 8500, avatar: "💧", trend: 'down' },
  { rank: 5, name: "Array Runner", xp: 7200, avatar: "🏃", trend: 'up' },
  { rank: 6, name: "Struct Life", xp: 6800, avatar: "🏠", trend: 'neutral' },
  { rank: 7, name: "Compiler Queen", xp: 6100, avatar: "👸", trend: 'up' },
  { rank: 8, name: "The Linker", xp: 5400, avatar: "🔗", trend: 'down' },
  { rank: 9, name: "Bit Shifter", xp: 4200, avatar: "⚙️", trend: 'neutral' },
  { rank: 10, name: "Malloc Fun", xp: 3800, avatar: "🍔", trend: 'up' },
];

const Leaderboard = () => {
  const { username } = useAuth();
  const [activeLeague, setActiveLeague] = useState('bronze');

  // Insert current user into the list if not there
  const currentUserEntry: LeaderboardEntry = {
    rank: 12,
    name: username || "You",
    xp: 2450,
    isCurrentUser: true,
    avatar: "👤",
    trend: 'up'
  };

  const leagues = [
    { id: 'bronze', name: 'Bronze', icon: "🥉", color: '#cd7f32' },
    { id: 'silver', name: 'Silver', icon: "🥈", color: '#c0c0c0' },
    { id: 'gold', name: 'Gold', icon: "🥇", color: '#ffd700' },
  ];

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Header Section */}
          <div className="card slide-up-animation" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            background: 'var(--color-surface)',
            backdropFilter: 'blur(10px)',
            border: '2px solid var(--color-border)',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div className="pulse-slow" style={{ 
                width: '100px', 
                height: '100px', 
                background: leagues.find(l => l.id === activeLeague)?.color || '#cd7f32',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                border: '4px solid rgba(255,255,255,0.2)'
              }}>
                {leagues.find(l => l.id === activeLeague)?.icon}
              </div>
              <div>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '4px' }}>
                  {activeLeague.toUpperCase()} LEAGUE
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  Ends in 3 days • Top 10 promote to Silver
                </p>
              </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-warning)', justifyContent: 'flex-end', marginBottom: '8px' }}>
                <Flame size={20} fill="currentColor" />
                <span style={{ fontWeight: 900, fontSize: '1.2rem' }}>1,245 PARTICIPANTS</span>
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Compete to earn more XP!
              </div>
            </div>
          </div>

          {/* League Tabs */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {leagues.map((league) => (
              <button
                key={league.id}
                onClick={() => setActiveLeague(league.id)}
                className="btn"
                style={{
                  flex: 1,
                  backgroundColor: activeLeague === league.id ? 'var(--color-surface)' : 'transparent',
                  borderColor: activeLeague === league.id ? league.color : 'var(--color-border)',
                  color: activeLeague === league.id ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                  boxShadow: activeLeague === league.id ? `0 4px 0 ${league.color}` : 'none',
                  textTransform: 'uppercase',
                  fontSize: '0.9rem'
                }}
              >
                {league.icon} {league.name}
              </button>
            ))}
          </div>

          {/* Rankings Table */}
          <div className="card slide-up-animation" style={{ 
            animationDelay: '0.1s',
            padding: '8px',
            background: 'var(--color-surface)',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {mockData.map((entry) => (
                <div 
                  key={entry.rank}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderRadius: 'var(--radius-md)',
                    transition: 'background-color 0.2s',
                    cursor: 'default',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ width: '40px', fontWeight: 900, fontSize: '1.1rem', color: entry.rank <= 3 ? '#f59e0b' : 'var(--color-text-muted)' }}>
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                  </div>
                  
                  <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '16px' }}>
                    {entry.avatar}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{entry.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      {entry.trend === 'up' ? '📈 Rising' : entry.trend === 'down' ? '📉 Falling' : '➖ Steady'}
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--color-primary)' }}>{entry.xp.toLocaleString()} XP</div>
                  </div>
                </div>
              ))}

              {/* Spacer */}
              <div style={{ padding: '8px', textAlign: 'center', color: 'var(--color-text-muted)' }}>•••</div>

              {/* Current User Row */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'rgba(138, 43, 226, 0.1)',
                  border: '2px solid var(--color-primary)',
                  marginTop: '4px'
                }}
              >
                <div style={{ width: '40px', fontWeight: 900, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                  {currentUserEntry.rank}
                </div>
                
                <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '16px' }}>
                  {currentUserEntry.avatar}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '1.2rem' }}>{currentUserEntry.name} (YOU)</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                    Promote at rank 10 or above!
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--color-primary)' }}>{currentUserEntry.xp.toLocaleString()} XP</div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Info */}
          <div style={{ textAlign: 'center', padding: '16px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            XP is updated every time you complete a lesson or challenge.
          </div>

        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
