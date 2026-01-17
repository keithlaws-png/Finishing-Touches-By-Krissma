
import React, { useState, useRef, useEffect } from 'react';
import { getAssistantResponse } from '../services/geminiService';
import { Sparkles, Send, User, Bot, Loader2 } from 'lucide-react';

const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: "Hello! I'm your beauty assistant. Are you looking for a specific treatment or need advice on what would suit you best?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const response = await getAssistantResponse(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 flex flex-col h-[500px] overflow-hidden">
      {/* Header */}
      <div className="bg-stone-900 p-4 text-white flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-white">
          <Sparkles size={18} />
        </div>
        <div>
          <h3 className="text-sm font-serif font-bold tracking-tight">Krissma AI Assistant</h3>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Active Consultation</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow p-4 overflow-y-auto space-y-4 bg-stone-50/30 scroll-smooth"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-stone-200 text-stone-600' : 'bg-gold/20 text-gold'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-stone-900 text-white rounded-tr-none' 
                  : 'bg-white text-stone-700 border border-stone-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2 items-center bg-white p-3 rounded-2xl border border-stone-100 shadow-sm">
              <Loader2 className="animate-spin text-gold" size={14} />
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-stone-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about our services..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-4 pr-12 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 text-stone-400 hover:text-gold transition active:scale-95 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;
