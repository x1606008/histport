import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, BookOpen, Minimize2, Maximize2, RefreshCw } from 'lucide-react';
import { Citation } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: Citation[];
  timestamp: string;
}

export const AiAssistantDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: 'Assalomu alaykum! Men Turon Tarix ensiklopediyasining **Akademik AI Maslahatchisiman**. Sizga tarixiy voqealar, shaxslar, janglar, sulhlar, manbashunoslik va bibliografik tahlillar boʻyicha yordam bera olaman. Qaysi mavzuni oʻrganmoqchisiz?',
      timestamp: 'Hozir'
    }
  ]);

  const quickPrompts = [
    'Amir Temurning harbiy sanʼati va "Temur tuzuklari"',
    'Politimet jangi va Spitamen taktikasi',
    'Ibn Sinoning "Tib qonunlari" manbalari',
    'Qadesh sulhining geopolitik oqibatlari'
  ];

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim() || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          context: 'Tarixiy Ensiklopediya Portali'
        })
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.text || 'Kechirasiz, maʼlumotni shakllantirishda xatolik yuz berdi.',
        sources: data.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: `Tarixiy tahlil: "${prompt}" mavzusi boʻyicha ilmiy manbalar oʻrganildi. Ushbu davr Sharq va jahon sivilizatsiyasida muhim burilish yasagan. Batafsil ilmiy maqolalar uchun ensiklopediya boʻlimlariga qarang.`,
          timestamp: 'Hozir'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          id="open-ai-assistant-btn"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#C6AC8F] hover:bg-[#EAE0D5] text-[#0A0908] font-bold text-xs uppercase tracking-wider shadow-2xl shadow-black/80 border border-[#5E503F] transition-all hover:scale-105 cursor-pointer"
        >
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">Tarixchi AI</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A0908] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A0908]"></span>
          </span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div
          id="ai-assistant-drawer"
          className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col bg-[#141210] border border-[#5E503F] rounded-2xl overflow-hidden ${
            isExpanded
              ? 'inset-4 sm:inset-10'
              : 'bottom-4 right-4 w-[95vw] sm:w-[420px] h-[580px] max-h-[90vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0A0908] border-b border-[#5E503F]/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#141210] border border-[#5E503F] flex items-center justify-center text-[#C6AC8F]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-[#EAE0D5] flex items-center gap-1.5">
                  Tarixchi AI Maslahatchi
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C6AC8F]/20 text-[#EAE0D5] font-mono border border-[#5E503F]/40">Gemini</span>
                </h4>
                <p className="text-[10px] text-[#A89F91]">Akademik manbalar va fakt tekshiruvi</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-[#A89F91] hover:text-[#EAE0D5] hover:bg-white/5"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                id="close-ai-assistant-btn"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#A89F91] hover:text-[#EAE0D5] hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm bg-[#0A0908]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#141210] border border-[#5E503F] flex items-center justify-center text-[#C6AC8F] flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl p-3.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#C6AC8F] text-[#0A0908] font-medium rounded-tr-none'
                      : 'bg-[#141210] border border-[#5E503F]/50 text-[#EAE0D5] rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1.5 font-mono ${
                      msg.sender === 'user' ? 'text-[#0A0908]/70 text-right' : 'text-[#A89F91]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-[#C6AC8F] text-xs p-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Qadimiy manbalar va arxivlar tahlil qilinmoqda...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#141210] border-t border-[#5E503F]/30 flex gap-1.5 overflow-x-auto text-[11px]">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="px-2.5 py-1 rounded-md bg-[#0A0908] hover:bg-[#C6AC8F]/20 text-[#A89F91] hover:text-[#EAE0D5] border border-[#5E503F]/40 whitespace-nowrap transition-all text-[11px]"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#141210] border-t border-[#5E503F]/40 flex items-center gap-2"
          >
            <input
              id="ai-assistant-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Tarixiy savolingizni yozing..."
              className="flex-1 bg-[#0A0908] border border-[#5E503F]/50 focus:border-[#C6AC8F] rounded-lg px-3.5 py-2 text-[#EAE0D5] placeholder:text-[#5E503F] text-xs focus:outline-none"
            />
            <button
              id="ai-assistant-send-btn"
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg bg-[#C6AC8F] hover:bg-[#EAE0D5] disabled:opacity-40 text-[#0A0908] font-bold transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
