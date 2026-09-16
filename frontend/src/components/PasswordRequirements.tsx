import React from 'react';
import { Check, X } from 'lucide-react';
import { validatePassword } from '../auth/AuthContext';

interface Props {
  password: string;
}

const PasswordRequirements: React.FC<Props> = ({ password }) => {
  const { criteria } = validatePassword(password);

  const items = [
    { label: "At least 10 characters", met: criteria.length },
    { label: "At least 1 uppercase letter (A-Z)", met: criteria.uppercase },
    { label: "At least 1 lowercase letter (a-z)", met: criteria.lowercase },
    { label: "At least 1 number (0-9)", met: criteria.number },
    { label: "At least 1 special character (!@#$%^&*)", met: criteria.special },
  ];

  return (
    <div style={{
      padding: '12px 16px',
      borderRadius: 'var(--radius-sm, 10px)',
      backgroundColor: 'rgba(0,0,0,0.25)',
      border: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontSize: '0.85rem'
    }}>
      <div style={{ fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Password Security Criteria
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: item.met ? 'var(--color-success, #10b981)' : 'var(--color-text-muted, #71717a)',
            fontWeight: item.met ? 600 : 400,
            transition: 'all 0.2s'
          }}>
            <span style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: item.met ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
              color: item.met ? 'var(--color-success, #10b981)' : '#71717a'
            }}>
              {item.met ? <Check size={12} /> : <X size={12} />}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordRequirements;
