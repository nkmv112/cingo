import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Code2, Loader2 } from 'lucide-react';
import axios from 'axios';

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
      text: "Hello! I'm your Gemini-powered C programming tutor. Ask me anything about syntax, concepts, or share your code for a review!",
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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue('');

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    
    setIsTyping(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await axios.post(`${API_URL}/tutor`, {
        message: userText,
        // Optional: send history for better context
        history: messages.slice(-6).map(m => ({
            role: m.sender === 'ai' ? 'model' : 'user',
            parts: [{ text: m.text }]
        }))
      });

      const aiText = res.data.response || "I'm sorry, I couldn't process that.";
      const isCode = aiText.includes('```') || aiText.includes('#include');

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        isCode: isCode
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ai',
        text: "I'm having trouble connecting to my brain right now. Please check if the API key is configured!"
      }]);
    } finally {
      setIsTyping(false);
    }
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
              maxWidth: '85%',
              wordBreak: 'break-word'
            }}>
              {msg.isCode ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#10b981', fontSize: '0.85rem' }}>
                    <Code2 size={16} /> <span style={{ fontFamily: 'monospace' }}>tutor_example.c</span>
                  </div>
                  <pre style={{ backgroundColor: '#000', padding: '12px', borderRadius: '8px', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.9rem', margin: 0 }}>
                    <code>{msg.text.replace(/```[a-z]*\n?/g, '').replace(/```/g, '')}</code>
                  </pre>
                </div>
              ) : (
                <p style={{ margin: 0, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', opacity: 0, animation: 'fadeIn 0.3s forwards' }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
              backgroundColor: '#10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
            }}>
              <Bot size={18} />
            </div>
            <div style={{ backgroundColor: '#27272a', color: '#10b981', padding: '12px 16px', borderRadius: '12px', borderTopLeftRadius: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Loader2 size={16} className="animate-spin" />
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'monospace' }}>Gemini is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} style={{ backgroundColor: '#18181b', padding: '12px 16px', display: 'flex', gap: '12px' }}>
        <input 
          type="text" 
          disabled={isTyping}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isTyping ? "Waiting for AI..." : "Ask a question about C..."}
          style={{ 
            flex: 1, backgroundColor: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', 
            padding: '10px 16px', color: 'white', outline: 'none', fontFamily: 'monospace',
            opacity: isTyping ? 0.6 : 1
          }}
        />
        <button 
          type="submit" 
          disabled={isTyping || !inputValue.trim()}
          style={{ 
            backgroundColor: isTyping ? '#3f3f46' : '#10b981', color: 'white', border: 'none', borderRadius: '8px', 
            width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isTyping ? 'default' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} style={{ marginLeft: '4px' }} />}
        </button>
      </form>

    </div>
  );
};

export default AITutorConsole;
