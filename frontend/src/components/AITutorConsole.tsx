import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Code2, Loader2, Sparkles, MessageSquare, Trash2, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isCode?: boolean;
}

const SUGGESTIONS = [
  "What is a pointer?",
  "Explain while loop",
  "How to use scanf",
  "Memory management"
];

const AITutorConsole = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "👋 Hello! I'm your premium C Tutor. I can help you debug code, explain concepts, or prep for KTU exams. What's on your mind today?",
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userText = text.trim();
    if (!inputValue && text === inputValue) setInputValue('');

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await axios.post(`${API_URL}/tutor`, {
        message: userText,
        history: messages
          .filter(m => m.id !== '1') 
          .slice(-10)
          .map(m => ({
            role: m.sender === 'ai' ? 'model' : 'user',
            parts: [{ text: m.text }]
          }))
      });

      const aiText = res.data.response || "I'm sorry, I couldn't process that.";
      const isCode = aiText.includes('```') || aiText.includes('#include');

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        isCode: isCode
      }]);
    } catch (error: any) {
      let errorMsg = "Connectivity Issue.";
      if (error.response) {
        errorMsg += ` (${error.response.data?.details || error.response.status})`;
      }
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ai',
        text: `⚠️ ${errorMsg} Please check your connection or API key.`
      }]);
    } finally {
      setIsTyping(false);
      setInputValue('');
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      sender: 'ai',
      text: "Chat cleared! How else can I help you with C programming?",
    }]);
  };

  return (
    <div className="ai-tutor-container" style={{ 
      display: 'flex', flexDirection: 'column', 
      height: window.innerWidth < 900 ? '400px' : '500px', 
      background: 'rgba(24, 24, 27, 0.8)', backdropFilter: 'blur(12px)',
      borderRadius: '20px', border: '1px solid rgba(63, 63, 70, 0.4)',
      overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      position: 'relative'
    }}>
      
      {/* Header */}
      <div style={{ 
        padding: '16px 20px', background: 'rgba(39, 39, 42, 0.5)', 
        borderBottom: '1px solid rgba(63, 63, 70, 0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #10b981, #059669)',
            padding: '8px', borderRadius: '12px', color: 'white'
          }}>
            <Bot size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold', color: 'white' }}>Cingo AI Assistant</h3>
            <span style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
               <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></span>
               Online • Powered by Gemini
            </span>
          </div>
        </div>
        <button 
          onClick={clearChat}
          style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'all 0.2s' }}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} style={{ 
            display: 'flex', 
            flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
            gap: '12px',
            animation: 'slideUp 0.3s ease-out forwards'
          }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
              background: msg.sender === 'ai' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
              marginTop: '4px'
            }}>
              {msg.sender === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
            </div>
            
            <div style={{ 
              maxWidth: '80%', padding: '12px 16px', borderRadius: '16px',
              background: msg.sender === 'ai' ? 'rgba(39, 39, 42, 0.6)' : 'rgba(59, 130, 246, 0.1)',
              border: msg.sender === 'ai' ? '1px solid rgba(63, 63, 70, 0.4)' : '1px solid rgba(59, 130, 246, 0.3)',
              color: '#e4e4e7',
              borderTopLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
              borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
              fontSize: '0.92rem', lineHeight: '1.6'
            }}>
              {msg.isCode ? (
                <div style={{ marginTop: '4px' }}>
                  <pre style={{ 
                    background: '#09090b', padding: '12px', borderRadius: '10px', 
                    overflowX: 'auto', border: '1px solid rgba(63, 63, 70, 0.8)',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    <code style={{ fontSize: '0.85rem', color: '#10b981' }}>
                      {msg.text.replace(/```[a-z]*\n?/g, '').replace(/```/g, '')}
                    </code>
                  </pre>
                </div>
              ) : (
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#27272a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Loader2 size={16} className="animate-spin" color="#10b981" />
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '16px', background: 'rgba(39, 39, 42, 0.3)', border: '1px solid rgba(63, 63, 70, 0.4)' }}>
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length < 3 && !isTyping && (
        <div style={{ padding: '0 20px 10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {SUGGESTIONS.map((s, i) => (
            <button key={i} onClick={() => handleSend(s)} style={{
              padding: '6px 12px', borderRadius: '20px', background: 'rgba(39, 39, 42, 0.5)',
              border: '1px solid rgba(63, 63, 70, 0.5)', color: '#a1a1aa', fontSize: '0.75rem',
              cursor: 'pointer', transition: 'all 0.2s'
            }} className="suggestion-chip">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Footer / Input */}
      <div style={{ padding: '16px 20px', background: 'rgba(24, 24, 27, 0.9)', borderTop: '1px solid rgba(63, 63, 70, 0.4)' }}>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} style={{ position: 'relative' }}>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            placeholder="Type your question..."
            style={{ 
              width: '100%', padding: '12px 48px 12px 16px', borderRadius: '12px',
              background: '#18181b', border: '1px solid rgba(63, 63, 70, 0.6)',
              color: 'white', outline: 'none', transition: 'all 0.2s',
              fontSize: '0.9rem'
            }}
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            style={{ 
              position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
              background: '#10b981', border: 'none', color: 'white', padding: '6px',
              borderRadius: '8px', cursor: 'pointer', opacity: (!inputValue.trim() || isTyping) ? 0.5 : 1
            }}
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; borderRadius: 10px; }
        .suggestion-chip:hover { border-color: #10b981; color: #10b981; background: rgba(16, 185, 129, 0.1); }
        .typing-dots { display: flex; gap: 4px; }
        .typing-dots span { width: 4px; height: 4px; background: #10b981; border-radius: 50%; animation: blink 1.4s infinite both; }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default AITutorConsole;
