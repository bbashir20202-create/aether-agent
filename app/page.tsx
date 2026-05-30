'use client';

import { useState, useEffect, useRef } from 'react';

export default function Aether() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello Boss. I'm Aether — your personal cloud agent.\n\nI have memory. I can research, analyze, plan, code, and execute tasks.\n\nWhat would you like to do today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry boss, I'm having trouble connecting to my brain right now." 
      }]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center text-xl">🌌</div>
            <div>
              <h1 className="text-2xl font-bold">Aether</h1>
              <p className="text-xs text-zinc-500">Your Personal Cloud Agent • Memory Enabled</p>
            </div>
          </div>
          <div className="text-xs px-3 py-1 bg-zinc-900 rounded-full text-emerald-400 border border-emerald-500/30">
            ONLINE • MEMORY ACTIVE
          </div>
        </div>

        <div ref={chatRef} className="h-[calc(100vh-180px)] overflow-y-auto p-6 space-y-6 bg-zinc-950">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-zinc-900 border border-zinc-800'
              }`}>
                <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed">
                  {msg.content}
                </pre>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                Thinking deeply...
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-zinc-800 bg-zinc-900">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your command... (e.g. Research scrap metal market in Pakistan)"
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-violet-500 text-white placeholder-zinc-500"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-violet-600 hover:bg-violet-700 px-10 rounded-2xl font-medium transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
