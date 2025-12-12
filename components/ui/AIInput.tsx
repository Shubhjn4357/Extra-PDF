import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AIInputProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
  isThinking?: boolean;
}

export const AIInput: React.FC<AIInputProps> = ({ onSubmit, placeholder = "Describe a PDF to create or edit...", isThinking }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
        
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input 
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isThinking}
            placeholder={isThinking ? "Thinking..." : placeholder}
            className="
              block w-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-white/10
              rounded-[2rem] py-4 pl-8 pr-16 text-lg shadow-xl 
              focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 focus:outline-none 
              transition-all disabled:opacity-50 text-foreground placeholder:text-muted-foreground/70
            "
          />
          <button 
            type="submit"
            disabled={!value.trim() || isThinking}
            className="
              absolute right-2 top-2 bottom-2 aspect-square rounded-full 
              bg-gradient-to-tr from-red-600 to-orange-500 text-white shadow-lg
              hover:shadow-red-500/30 disabled:opacity-50 disabled:shadow-none
              flex items-center justify-center transition-all hover:scale-105 active:scale-95
            "
          >
            {isThinking ? (
                <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
                <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};