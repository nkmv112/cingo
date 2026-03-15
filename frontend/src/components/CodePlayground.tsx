import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal, Play } from 'lucide-react';
import axios from 'axios';

interface CodePlaygroundProps {
  fullHeight?: boolean;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ fullHeight = false }) => {
  const [code, setCode] = useState('#include <stdio.h>\n\nint main() {\n    printf("Playground ready!\\n");\n    return 0;\n}');
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  const handleRunCode = async () => {
    setIsCompiling(true);
    setOutput('Compiling and running...');
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await axios.post(`${API_URL}/execute`, {
        files: [{ name: 'main.c', content: code }]
      });

      if (response.data.run && response.data.run.stdout) {
        setOutput(response.data.run.stdout);
      } else if (response.data.run && response.data.run.stderr) {
        setOutput(`Execution Error:\n${response.data.run.stderr}`);
      } else if (response.data.compile && response.data.compile.stderr) {
        setOutput(`Compilation Error:\n${response.data.compile.stderr}`);
      } else {
        setOutput('Program executed successfully with no output.');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
         setOutput(`API Error:\n${err.response.data.error}`);
      } else {
         setOutput(`Request Failed: ${err.message}\nMake sure your local compiler backend is running.`);
      }
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="card" style={{ 
      display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden', 
      border: '2px solid var(--color-border)', flex: fullHeight ? 1 : 'none',
      minHeight: fullHeight ? '600px' : 'auto'
    }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-main)', fontWeight: 800 }}>
          <Terminal size={20} color="var(--color-primary)" />
          <span>Quick Console</span>
        </div>
        <button 
          onClick={handleRunCode} 
          disabled={isCompiling}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '6px', 
            padding: '6px 12px', borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-success)', color: 'white', border: 'none',
            fontWeight: 800, fontSize: '0.9rem', cursor: isCompiling ? 'wait' : 'pointer',
            opacity: isCompiling ? 0.7 : 1
          }}
        >
          <Play size={14} fill="white" />
          {isCompiling ? 'RUNNING' : 'RUN'}
        </button>
      </div>

      {/* Editor Space */}
      <div style={{ flex: fullHeight ? 3 : 'none', height: fullHeight ? 'auto' : '250px', backgroundColor: '#1e1e1e', minHeight: '200px' }}>
        <Editor
          height="100%"
          defaultLanguage="c"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            padding: { top: 16 }
          }}
        />
      </div>

      {/* Terminal Output */}
      <div style={{ 
        backgroundColor: '#000000', 
        color: '#00ff00', 
        padding: '16px', 
        flex: fullHeight ? 1 : 'none',
        height: fullHeight ? 'auto' : '120px', 
        minHeight: '100px',
        overflowY: 'auto',
        fontFamily: 'monospace',
        fontSize: '0.9rem',
        borderTop: '2px solid var(--color-border)'
      }}>
        {output || 'Output will appear here...'}
      </div>
    </div>
  );
};

export default CodePlayground;
