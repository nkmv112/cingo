import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Terminal } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (nameInput.trim().length > 2 && passwordInput.trim().length > 2) {
      const name = nameInput.trim();
      const pass = passwordInput.trim();
      
      let success = false;
      if (isLogin) {
         success = login(name, pass);
         if (!success) setErrorMsg('Invalid username or password.');
      } else {
         success = signup(name, pass);
         if (!success) setErrorMsg('Username is already taken.');
      }
      
      if (success) {
         navigate('/'); // Redirect to dashboard
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'var(--color-bg)' 
    }}>
      
      <div className="card slide-up-animation" style={{ 
        maxWidth: '450px', 
        width: '100%', 
        padding: '48px', 
        textAlign: 'center',
        border: '2px solid var(--color-border)'
      }}>
        
        <div style={{ 
          width: '80px', height: '80px', 
          backgroundColor: 'var(--color-primary)', 
          borderRadius: '24px', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          margin: '0 auto 32px auto',
          boxShadow: '0 8px 0 var(--color-primary-shadow)',
          transform: 'rotate(-5deg)'
        }}>
          <Terminal size={40} color="white" />
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px', color: 'var(--color-text-main)' }}>
          Cingo
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px', fontSize: '1.1rem' }}>
          {isLogin 
            ? "Welcome back! Enter your credentials to continue your C programming journey." 
            : "Join us! Create an account to start your C programming journey."}
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <input 
            type="text" 
            placeholder="Username (E.g. CodeMaster99)"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            style={{
               padding: '16px',
               borderRadius: 'var(--radius-md)',
               border: '2px solid var(--color-border)',
               backgroundColor: 'var(--color-bg)',
               color: 'var(--color-text-main)',
               fontSize: '1.2rem',
               fontWeight: 600,
               outline: 'none',
               textAlign: 'center'
            }}
          />
          <input 
            type="password" 
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{
               padding: '16px',
               borderRadius: 'var(--radius-md)',
               border: '2px solid var(--color-border)',
               backgroundColor: 'var(--color-bg)',
               color: 'var(--color-text-main)',
               fontSize: '1.2rem',
               fontWeight: 600,
               outline: 'none',
               textAlign: 'center'
            }}
          />
          
          {errorMsg && (
             <div style={{ color: 'var(--color-danger)', fontWeight: 600, fontSize: '1.1rem' }}>
                {errorMsg}
             </div>
          )}

          <button  
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }}
            disabled={nameInput.trim().length < 3 || passwordInput.trim().length < 3}
          >
            {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div style={{ marginTop: '24px', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--color-primary)', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              fontSize: '1.1rem',
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
