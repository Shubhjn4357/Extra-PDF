import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles, Bot, User, ArrowRight, Download } from 'lucide-react';
import { ChatMessage } from '../../types';

interface ThinkingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isThinking: boolean;
  onSendMessage: (text: string) => void;
}

export const ThinkingSidebar: React.FC<ThinkingSidebarProps> = ({ isOpen, onClose, messages, isThinking, onSendMessage }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
        onSendMessage(inputVal);
        setInputVal('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 bottom-0 right-0 w-full md:w-[450px] bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="h-16 px-4 border-b border-border flex items-center justify-between bg-background/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2 text-primary font-bold">
          <Sparkles className="w-5 h-5" />
          <h2>Gemini Assistant</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area - Fixed Flex Growth and Overflow */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-muted/10">
        {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center p-8 opacity-70">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">How can I help?</h3>
                <p className="text-sm mb-6">Ask me to edit content, summarize text, or clean up stamps.</p>
                <div className="flex flex-wrap justify-center gap-2">
                    <button onClick={() => onSendMessage("Summarize this document")} className="text-xs border px-3 py-1.5 rounded-full hover:bg-primary/5">Summarize</button>
                    <button onClick={() => onSendMessage("Suggest edits for this page")} className="text-xs border px-3 py-1.5 rounded-full hover:bg-primary/5">Suggest Edits</button>
                </div>
            </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`
                w-8 h-8 rounded-full flex items-center justify-center shrink-0 border
                ${msg.role === 'user' ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-red-50 dark:bg-red-900/20 text-primary border-red-100'}
            `}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div className={`
                max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words
                ${msg.role === 'user' 
                  ? 'bg-white dark:bg-zinc-800 text-foreground rounded-tr-sm border border-border' 
                  : 'bg-white dark:bg-black/40 text-foreground border border-primary/10 rounded-tl-sm'
                }
            `}>
              {msg.text}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-2 w-full pt-2">
              <div className="h-2 bg-muted rounded w-3/4"></div>
              <div className="h-2 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-background shrink-0">
        <form onSubmit={handleSubmit} className="relative">
            <input 
                type="text" 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Gemini to analyze or edit..."
                className="w-full bg-muted/50 border border-input rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button 
                type="submit"
                disabled={!inputVal.trim() || isThinking}
                className="absolute right-2 top-2 p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
                <ArrowRight className="w-4 h-4" />
            </button>
        </form>
      </div>
    </div>
  );
};