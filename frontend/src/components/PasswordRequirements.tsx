import React from 'react';
import { Check, X, Shield, Sparkles } from 'lucide-react';
import { validatePassword } from '../auth/AuthContext';

interface Props {
  password: string;
}

const PasswordRequirements: React.FC<Props> = ({ password }) => {
  const { criteria, valid } = validatePassword(password);

  const items = [
    { label: "10+ Characters", met: criteria.length },
    { label: "Uppercase (A-Z)", met: criteria.uppercase },
    { label: "Lowercase (a-z)", met: criteria.lowercase },
    { label: "Number (0-9)", met: criteria.number },
    { label: "Special Symbol (!@#$)", met: criteria.special },
  ];

  const metCount = items.filter(i => i.met).length;
  const progressPercent = (metCount / items.length) * 100;

  return (
    <div style={{
      padding: '16px 20px',
      borderRadius: '14px',
      backgroundColor: valid ? 'rgba(16, 185, 129, 0.08)' : 'rgba(10, 14, 46, 0.65)',
      border: valid ? '1.5px solid rgba(16, 185, 129, 0.4)' : '1.5px solid rgba(158, 159, 212, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      transition: 'all 0.3s ease',
      boxShadow: valid ? '0 4px 20px rgba(16, 185, 129, 0.15)' : 'none'
    }}>
      {/* Header & Strength Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: valid ? '#10b981' : '#9e9fd4' }}>
          {valid ? <Sparkles size={16} color="#10b981" /> : <Shield size={16} color="#9e9fd4" />}
          <span>PASSWORD SECURITY CRITERIA</span>
        </div>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: valid ? '#10b981' : 'var(--color-text-muted)' }}>
          {metCount}/5 Requirements Met
        </span>
      </div>

      {/* Strength Progress Bar */}
      <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          backgroundColor: valid ? '#10b981' : metCount >= 3 ? '#fbbf24' : '#ef4444',
          transition: 'all 0.3s ease'
        }} />
      </div>

      {/* Requirement Pills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginTop: '2px' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 10px',
            borderRadius: '8px',
            backgroundColor: item.met ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
            border: item.met ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
            color: item.met ? '#34d399' : '#94a3b8',
            fontSize: '0.82rem',
            fontWeight: item.met ? 600 : 500,
            transition: 'all 0.25s ease'
          }}>
            <span style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: item.met ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
              color: item.met ? '#ffffff' : '#64748b',
              flexShrink: 0
            }}>
              {item.met ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={2.5} />}
            </span>
            <span style={{ letterSpacing: '0.2px' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordRequirements;
