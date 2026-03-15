import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Rocket, BookOpen, ChevronRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Hero Section */}
      <div className="card slide-up-animation" style={{ 
        maxWidth: '800px', 
        width: '100%', 
        padding: '64px 32px', 
        textAlign: 'center',
        background: 'var(--color-surface)',
        backdropFilter: 'blur(16px)',
        border: '2px solid var(--color-border)',
        borderRadius: '32px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        
        <div style={{ 
          width: '100px', height: '100px', 
          backgroundColor: 'var(--color-primary)', 
          borderRadius: '28px', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          boxShadow: '0 10px 0 var(--color-primary-shadow)',
          transform: 'rotate(-5deg)',
          marginBottom: '16px'
        }}>
          <Terminal size={50} color="white" />
        </div>

        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
          fontWeight: 900, 
          lineHeight: 1.1,
          background: 'linear-gradient(135deg, #fff 0%, var(--color-primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>
          Master C with Cingo
        </h1>

        <p style={{ 
          fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', 
          color: 'var(--color-text-muted)', 
          maxWidth: '600px',
          fontWeight: 500,
          lineHeight: 1.6
        }}>
          The most effective, gamified way to learn C programming. 
          Ready to start your journey?
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px', 
          width: '100%',
          marginTop: '32px'
        }}>
          {/* Beginner Card */}
          <button 
            onClick={() => navigate('/login')}
            className="card"
            style={{ 
              padding: '32px', 
              cursor: 'pointer', 
              textAlign: 'left',
              transition: 'transform 0.2s',
              border: '2px solid var(--color-border)',
              backgroundColor: 'rgba(255,255,255,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            <div style={{ color: 'var(--color-primary)' }}><BookOpen size={32} /></div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '4px' }}>New to Code?</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Start from the very basics and build your foundation.</p>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'var(--color-primary)' }}>
              START HERE <ChevronRight size={20} />
            </div>
          </button>

          {/* Intermediate Card */}
          <button 
            onClick={() => navigate('/assessment')}
            className="card"
            style={{ 
              padding: '32px', 
              cursor: 'pointer', 
              textAlign: 'left',
              transition: 'transform 0.2s',
              border: '2px solid var(--color-border)',
              backgroundColor: 'rgba(255,255,255,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-secondary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            <div style={{ color: 'var(--color-secondary)' }}><Rocket size={32} /></div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '4px' }}>Know some C?</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Take the baseline assessment to skip early units.</p>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'var(--color-secondary)' }}>
              TAKE ASSESSMENT <ChevronRight size={20} />
            </div>
          </button>
        </div>

      </div>

      {/* Footer Branding */}
      <div style={{ marginTop: '48px', opacity: 0.6, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '2px' }}>
        POWERED BY GEMINI FLASH 2.0
      </div>

    </div>
  );
};

export default Landing;
