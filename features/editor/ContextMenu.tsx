import React, { useEffect, useRef } from 'react';
import { Trash2, Pencil, X } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onEdit?: () => void;
  type: 'text' | 'whiteout' | 'canvas' | 'image';
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onDelete, onEdit, type }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Adjust position to not overflow screen
  const style = {
    top: Math.min(y, window.innerHeight - 150),
    left: Math.min(x, window.innerWidth - 200),
  };

  return (
    <div 
      ref={menuRef}
      className="fixed z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl w-48 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
      style={style}
    >
      <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b border-white/10 bg-black/5 dark:bg-white/5">
        {type === 'text' ? 'Text Option' : type === 'whiteout' ? 'Eraser Option' : type === 'image' ? 'Image Option' : 'Canvas'}
      </div>
      
      {type === 'text' && onEdit && (
        <button 
          onClick={() => { onEdit(); onClose(); }}
          className="w-full text-left px-4 py-2.5 text-sm hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2 transition-colors"
        >
          <Pencil className="w-4 h-4 text-primary" />
          Edit Text
        </button>
      )}

      {(type === 'text' || type === 'whiteout' || type === 'image') && (
        <button 
          onClick={() => { onDelete(); onClose(); }}
          className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-500/10 text-red-600 flex items-center gap-2 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      )}
      
      <button 
        onClick={onClose}
        className="w-full text-left px-4 py-2 text-xs text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 border-t border-white/10 mt-1"
      >
        Close Menu
      </button>
    </div>
  );
};