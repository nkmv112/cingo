import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, validatePassword } from '../auth/AuthContext';
import { Terminal, AlertCircle } from 'lucide-react';
import PasswordRequirements from '../components/PasswordRequirements';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const name = nameInput.trim();
    const pass = passwordInput;

    if (name.length < 3) {
      setErrorMsg('Username must be at least 3 characters.');
      return;
    }

    if (isLogin) {
      const success = login(name, pass);
      if (!success) {
        setErrorMsg('Invalid username or password.');
      } else {
        navigate('/');
      }
    } else {
      const val = validatePassword(pass);
      if (!val.valid) {
        setErrorMsg('Password does not meet the 5 security requirements.');
        return;
      }

      const res = signup(name, pass);
      if (!res.success) {
        setErrorMsg(res.message || 'Failed to create account.');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'var(--color-bg)',
      padding: '24px'
    }}>
      
      <div className="card slide-up-animation" style={{ 
        maxWidth: isLogin ? '450px' : '520px', 
        width: '100%', 
        padding: '40px', 
        textAlign: 'center',
        border: '2px solid var(--color-border)',
        transition: 'max-width 0.3s'
      }}>
        
        <div style={{ 
          width: '72px', height: '72px', 
          backgroundColor: 'var(--color-primary)', 
          borderRadius: '20px', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          margin: '0 auto 24px auto',
          boxShadow: '0 8px 0 var(--color-primary-shadow)',
          transform: 'rotate(-5deg)'
        }}>
          <Terminal size={36} color="white" />
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '8px', color: 'var(--color-text-main)' }}>
          Cingo
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '28px', fontSize: '1rem', lineHeight: 1.5 }}>
          {isLogin 
            ? "Welcome back! Enter your credentials to continue your C programming journey." 
            : "Create your student account with secure password protection."}
        </p>

        <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-muted)' }}>
              USERNAME
            </label>
            <input 
              type="text" 
              placeholder="E.g. Student_2026"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              style={{
                 width: '100%',
                 padding: '14px 16px',
                 borderRadius: 'var(--radius-sm, 10px)',
                 border: '2px solid var(--color-border)',
                 backgroundColor: 'var(--color-bg)',
                 color: 'var(--color-text-main)',
                 fontSize: '1.05rem',
                 fontWeight: 600,
                 outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-muted)' }}>
              PASSWORD
            </label>
            <input 
              type="password" 
              placeholder={isLogin ? "Enter your password" : "Min 10 chars, uppercase, symbol, number"}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{
                 width: '100%',
                 padding: '14px 16px',
                 borderRadius: 'var(--radius-sm, 10px)',
                 border: '2px solid var(--color-border)',
                 backgroundColor: 'var(--color-bg)',
                 color: 'var(--color-text-main)',
                 fontSize: '1.05rem',
                 fontWeight: 600,
                 outline: 'none'
              }}
            />
          </div>

          {/* Real-time criteria checklist when creating an account */}
          {!isLogin && (
            <div style={{ marginTop: '4px' }}>
              <PasswordRequirements password={passwordInput} />
            </div>
          )}
          
          {errorMsg && (
             <div style={{ 
               display: 'flex', 
               alignItems: 'center', 
               gap: '8px', 
               color: 'var(--color-danger)', 
               fontWeight: 600, 
               fontSize: '0.95rem',
               backgroundColor: 'rgba(239, 68, 68, 0.1)',
               padding: '10px 14px',
               borderRadius: '8px',
               border: '1px solid rgba(239, 68, 68, 0.2)'
             }}>
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
             </div>
          )}

          <button  
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginTop: '8px' }}
            disabled={nameInput.trim().length < 3 || passwordInput.length < 1}
          >
            {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div style={{ marginTop: '24px', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
              setPasswordInput('');
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--color-primary)', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              fontSize: '0.95rem',
              padding: 0
            }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>

      </div>

    </div>
  );
};

export default Login;
