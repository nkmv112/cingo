import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal, Play } from 'lucide-react';
import axios from 'axios';

interface CodePlaygroundProps {
  fullHeight?: boolean;
}

interface RemoteBackend {
  name: string;
  run: (code: string) => Promise<any>;
}

const remoteBackends: RemoteBackend[] = [
  {
    name: 'CodeCompiler (remote)',
    run: async (code: string) => {
      const res = await axios.post(
        'https://codecompiler.forgesparse.com/api/run',
        { language: 'c', version: '*', files: [{ name: 'main.c', content: code }], stdin: '' },
        { timeout: 30000 }
      );
      return {
        run: { stdout: res.data.stdout, stderr: res.data.stderr },
        compile: res.data.error ? { stderr: res.data.stderr || res.data.error } : undefined,
      };
    },
  },
  {
    name: 'Wandbox (remote)',
    run: async (code: string) => {
      const res = await axios.post(
        'https://wandbox.org/api/compile.json',
        { code, compiler: 'gcc-head', stdin: '', options: '' },
        { timeout: 30000 }
      );
      return {
        run: {
          stdout: res.data.program_output,
          stderr: res.data.program_error || res.data.program_message,
        },
        compile: res.data.compiler_error ? { stderr: res.data.compiler_error } : undefined,
      };
    },
  },
];

const formatResult = (data: any) => {
  if (data.run && data.run.stdout) {
    return data.run.stdout;
  }
  if (data.run && data.run.stderr) {
    return `Execution Error:\n${data.run.stderr}`;
  }
  if (data.compile && data.compile.stderr) {
    return `Compilation Error:\n${data.compile.stderr}`;
  }
  return 'Program executed successfully with no output.';
};

const CodePlayground: React.FC<CodePlaygroundProps> = ({ fullHeight = false }) => {
  const [code, setCode] = useState('#include <stdio.h>\n\nint main() {\n    printf("Playground ready!\\n");\n    return 0;\n}');
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [usedRemote, setUsedRemote] = useState(false);

  const handleRunCode = async () => {
    setIsCompiling(true);
    setOutput('Compiling and running...');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    try {
      const response = await axios.post(
        `${API_URL}/execute`,
        { files: [{ name: 'main.c', content: code }] },
        { timeout: 15000 }
      );
      setUsedRemote(false);
      setOutput(formatResult(response.data));
    } catch (err: any) {
      let lastErrorMessage = err.message || 'Unknown error';

      for (const backend of remoteBackends) {
        try {
          setOutput(`Local compiler unreachable — trying ${backend.name}...`);
          const data = await backend.run(code);
          setUsedRemote(true);
          setOutput(formatResult(data));
          return;
        } catch (remoteErr: any) {
          lastErrorMessage = remoteErr.message || lastErrorMessage;
        }
      }

      if (err.response && err.response.data && err.response.data.error) {
        setUsedRemote(false);
        setOutput(`API Error:\n${err.response.data.error}`);
      } else {
        setUsedRemote(false);
        setOutput(`Request Failed: ${lastErrorMessage}\nCould not reach any compiler service.`);
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
          {usedRemote && (
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-warning)',
              background: 'rgba(251, 191, 36, 0.15)', padding: '2px 8px',
              borderRadius: '999px', border: '1px solid rgba(251, 191, 36, 0.4)'
            }}>
              REMOTE COMPILER
            </span>
          )}
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
