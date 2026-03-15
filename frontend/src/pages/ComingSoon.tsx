import React from 'react';
import Sidebar from '../components/Sidebar';
import { Pickaxe } from 'lucide-react';

interface ComingSoonProps {
  title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card slide-up-animation" style={{ 
          maxWidth: '500px', 
          width: '100%', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '24px',
          padding: '48px',
          border: '2px dashed var(--color-primary)'
        }}>
          <div className="bounce-animation" style={{ 
            width: '80px', height: '80px', 
            backgroundColor: 'var(--color-surface-hover)', 
            borderRadius: '50%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Pickaxe size={40} color="var(--color-primary)" />
          </div>
          
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-text-main)', margin: 0 }}>
            {title}
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
            We're currently mining the code and forging this feature. Check back later!
          </p>
        </div>
      </main>
    </div>
  );
};

export default ComingSoon;
