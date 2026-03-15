import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Code2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isCode?: boolean;
}

const AITutorConsole = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I'm your C programming AI tutor. Ask me anything about syntax, concepts, or drop some code for me to review!",
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Mock AI Response with slight delay
    setTimeout(() => {
      const isCodeQuery = userMsg.text.toLowerCase().includes('how') || userMsg.text.toLowerCase().includes('code');
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: isCodeQuery 
          ? "Here is how you typically structure that in C:\n\n#include <stdio.h>\n\nint main() {\n    printf(\"Hello, Example!\\n\");\n    return 0;\n}"
          : "That's a great question! In C programming, memory is managed manually, which is why concepts like pointers are so powerful.",
        isCode: isCodeQuery
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="card console-card" style={{ display: 'flex', flexDirection: 'column', height: '400px', padding: 0, overflow: 'hidden' }}>
      
      {/* Console Header */}
      <div style={{ backgroundColor: '#1e1e1e', color: '#10b981', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #3f3f46' }}>
        <Bot size={24} />
        <h3 style={{ margin: 0, fontSize: '1.1rem', letterSpacing: '1px', fontFamily: 'monospace' }}>✦ Cingo AI Tutor</h3>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div style={{ flex: 1, backgroundColor: '#09090b', padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', gap: '12px', opacity: 0, animation: 'fadeIn 0.3s forwards' }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
              backgroundColor: msg.sender === 'ai' ? '#10b981' : '#3b82f6',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
            }}>
              {msg.sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
            </div>
            
            <div style={{ 
              backgroundColor: msg.sender === 'ai' ? '#27272a' : '#1e3a8a', 
              color: '#f4f4f5', padding: '12px 16px', borderRadius: '12px', 
              borderTopLeftRadius: msg.sender === 'ai' ? '0' : '12px',
              borderTopRightRadius: msg.sender === 'user' ? '0' : '12px',
              maxWidth: '85%'
            }}>
              {msg.isCode ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#10b981', fontSize: '0.85rem' }}>
                    <Code2 size={16} /> <span style={{ fontFamily: 'monospace' }}>example.c</span>
                  </div>
                  <pre style={{ backgroundColor: '#000', padding: '12px', borderRadius: '8px', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.9rem', margin: 0 }}>
                    <code>{msg.text}</code>
                  </pre>
                </div>
              ) : (
                <p style={{ margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} style={{ backgroundColor: '#18181b', padding: '12px 16px', display: 'flex', gap: '12px' }}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question about C..."
          style={{ 
            flex: 1, backgroundColor: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', 
            padding: '10px 16px', color: 'white', outline: 'none', fontFamily: 'monospace'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', 
            width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          <Send size={20} style={{ marginLeft: '4px' }} />
        </button>
      </form>

    </div>
  );
};

export default AITutorConsole;
