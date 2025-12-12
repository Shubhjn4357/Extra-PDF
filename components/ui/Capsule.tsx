import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CapsuleProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
}

export const Capsule: React.FC<CapsuleProps> = ({ icon: Icon, label, isActive, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 px-6 py-4 rounded-full border transition-all duration-300
        hover:shadow-lg hover:scale-[1.02] active:scale-95
        ${isActive 
         ? "bg-primary text-primary-foreground border-primary shadow-red-500/20" 
         : "bg-background text-foreground border-border hover:border-primary/50"
        }
        ${className}
      `}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-red-500'}`} />
      <span className="font-medium text-sm md:text-base">{label}</span>
    </button>
  );
};
