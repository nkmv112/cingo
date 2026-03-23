import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { questsData } from '../data/questsData';
import { useProgress } from '../auth/ProgressContext';
import { ArrowLeft, Play, Terminal, CheckCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import '../index.css';

const QuestSolver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isQuestUnlocked, completeQuest, completedQuests } = useProgress();
  
  const questId = Number(id);
  const quest = questsData.find(q => q.id === questId);

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Run only once on mount to initialize code and check prior completion
  useEffect(() => {
    if (quest) {
      setCode(quest.starterCode);
      if (completedQuests.includes(quest.id)) {
        setIsSuccess(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally mount-only

  if (!quest) {
    return <div className="app-container"><Sidebar /><main className="main-content"><h2>Quest Not Found</h2></main></div>;
  }

  if (!isQuestUnlocked(questId)) {
    return <div className="app-container"><Sidebar /><main className="main-content"><h2>Quest Locked</h2></main></div>;
  }

  const handleRunCode = async () => {
    setIsCompiling(true);
    setOutput('Compiling and running on local server...');
    setIsSuccess(false);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await axios.post(`${API_URL}/execute`, {
        files: [{ name: 'main.c', content: code }]
      });

      if (response.data.compile && response.data.compile.stderr) {
        setOutput(`Compilation Error:\n${response.data.compile.stderr}`);
      } else if (response.data.run && response.data.run.stderr) {
        setOutput(`Execution Error:\n${response.data.run.stderr}`);
      } else if (response.data.run) {
        const stdout = response.data.run.stdout || '';
        setOutput(stdout);

        // Verify Output
        if (stdout.trim() === quest.expectedOutput.trim()) {
           setIsSuccess(true);
           completeQuest(quest.id);
        } else {
           setOutput(`Output didn't match.\nExpected: "${quest.expectedOutput}"\nGot: "${stdout}"`);
        }
      } else {
        setOutput('Program executed successfully but verification failed due to missing output.');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
         setOutput(`API Error:\n${err.response.data.error}`);
      } else {
         setOutput(`Request Failed: ${err.message}\nEnsure your local C compiler backend is running.`);
      }
    } finally {
      setIsCompiling(false);
    }
  };

  const hasNext = questId < questsData.length;

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="flex-column-mobile" style={{ gap: '32px', alignItems: 'stretch', width: '100%', maxWidth: '1200px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <button onClick={() => navigate('/quests')} className="btn" style={{ alignSelf: 'flex-start', padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}>
            <ArrowLeft size={16} /> Back to Quests
          </button>

          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '4px solid var(--color-secondary)' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', fontWeight: 800, letterSpacing: '0.15em', marginBottom: '8px' }}>
                QUEST {quest.id} - {quest.difficulty.toUpperCase()}
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '24px' }}>{quest.title}</h1>
            </div>
            
            <div style={{ padding: '24px', backgroundColor: 'var(--color-bg)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
               <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-text-main)' }}>Objective</h3>
               <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                 {quest.description}
               </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px dotted var(--color-border)', marginTop: 'auto' }}>
               <h3 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Expected Output Exact Match:</h3>
               <pre style={{ color: 'var(--color-warning)', margin: 0, fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
                 {quest.expectedOutput}
               </pre>
            </div>
          </div>
        </div>

        {/* Right Column - Editor & Console */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '24px' }}>
             
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', position: 'relative' }}>
            {/* Action Bar */}
            <div style={{ padding: '12px 24px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <Terminal size={18} color="var(--color-text-muted)" /> main.c
              </div>
              
              <button 
                onClick={handleRunCode} 
                className="btn slide-up-animation"
                disabled={isCompiling}
                style={{
                  backgroundColor: isCompiling ? 'var(--color-border)' : isSuccess ? 'var(--color-success)' : 'var(--color-primary)',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 24px',
                  fontWeight: 800,
                  fontSize: '1rem'
                }}
              >
                {isCompiling ? 'EVALUATING...' : isSuccess ? 'VERIFIED' : 'SUBMIT CODE'} <Play size={16} fill="currentColor" />
              </button>
            </div>
            
            {/* Editor */}
            <div style={{ flex: 1, backgroundColor: '#1e1e1e', minHeight: isMobile ? '300px' : '400px' }}>
              <Editor
                height={isMobile ? "300px" : "100%"}
                defaultLanguage="c"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  padding: { top: 24, bottom: 24 }
                }}
              />
            </div>

            {/* Verification Output */}
            <div style={{
              height: '200px',
              backgroundColor: isSuccess ? 'rgba(34, 197, 94, 0.1)' : 'var(--color-bg)',
              borderTop: `2px solid ${isSuccess ? 'var(--color-success)' : 'var(--color-border)'}`,
              padding: '24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
               <h4 style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Console Output</h4>
               <pre style={{ 
                 fontFamily: 'monospace', 
                 color: isSuccess ? 'var(--color-success)' : '#e5e7eb',
                 fontSize: '1.1rem',
                 margin: 0,
                 whiteSpace: 'pre-wrap'
               }}>
                 {output || 'Awaiting execution...'}
               </pre>
            </div>

            {/* Success Modal Overlay */}
            {isSuccess && (
              <div className="slide-up-animation" style={{
                position: 'absolute', inset: 0, 
                backgroundColor: 'rgba(5, 10, 36, 0.85)', 
                backdropFilter: 'blur(8px)',
                zIndex: 10, 
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px',
                padding: '40px'
              }}>
                <div style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', 
                  backgroundColor: 'var(--color-surface)', padding: '40px', 
                  borderRadius: '16px', border: '2px solid var(--color-success)', 
                  boxShadow: '0 0 40px rgba(34, 197, 94, 0.15)',
                  textAlign: 'center',
                  maxWidth: '400px',
                  width: '100%'
                }}>
                  <CheckCircle size={64} color="#4ade80" />
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>Quest Completed!</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '8px' }}>
                    Excellent work. Your solution is spot on and the output completely matches.
                  </p>
                  
                  {hasNext ? (
                    <div style={{ display: 'flex', gap: '16px', width: '100%', marginTop: '16px' }}>
                      <button onClick={() => setIsSuccess(false)} className="btn btn-outline" style={{ flex: 1, padding: '12px' }}>Review Code</button>
                      <button onClick={() => navigate(`/quests/${questId + 1}`)} className="btn" style={{ flex: 1, backgroundColor: 'var(--color-success)', color: '#111827', border: 'none', padding: '12px' }}>
                        Next Quest <Play size={16} fill="currentColor" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => navigate('/quests')} className="btn" style={{ width: '100%', marginTop: '16px', backgroundColor: 'var(--color-success)', color: '#111827', border: 'none', padding: '12px' }}>
                      Return to Quests
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
        </div> {/* End two-column wrapper */}
      </main>
    </div>
  );
};

export default QuestSolver;
