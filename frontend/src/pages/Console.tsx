import React from 'react';
import Sidebar from '../components/Sidebar';
import CodePlayground from '../components/CodePlayground';

const Console = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'stretch' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
          <div style={{ marginBottom: '16px' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '4px' }}>
              ⚡ C Playground
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', fontWeight: 600 }}>
              Experiment freely — write, compile, and run your C programs instantly.
            </p>
          </div>

          <CodePlayground fullHeight />
        </div>
      </main>
    </div>
  );
};

export default Console;
