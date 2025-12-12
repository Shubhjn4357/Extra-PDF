import React, { useState } from 'react';
import { X, ArrowRight, GripVertical } from 'lucide-react';

interface ReorderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pageCount: number;
  onApply: (newOrder: number[]) => void;
}

export const ReorderDialog: React.FC<ReorderDialogProps> = ({ isOpen, onClose, pageCount, onApply }) => {
  // Store 0-based indices
  const [pages, setPages] = useState<number[]>(Array.from({ length: pageCount }, (_, i) => i));
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  if (!isOpen) return null;

  const onDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newPages = [...pages];
    const item = newPages.splice(draggedItem, 1)[0];
    newPages.splice(index, 0, item);
    
    setPages(newPages);
    setDraggedItem(index);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-2xl w-full h-[80vh] flex flex-col border border-white/20 overflow-hidden">
        
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/20 dark:bg-black/20">
            <h3 className="font-bold text-lg tracking-tight">Reorder Pages</h3>
            <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-transparent">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {pages.map((originalIndex, i) => (
                    <div 
                        key={originalIndex}
                        draggable
                        onDragStart={(e) => onDragStart(e, i)}
                        onDragOver={(e) => onDragOver(e, i)}
                        className={`
                            aspect-[3/4] bg-white border-2 rounded-xl flex flex-col items-center justify-center cursor-move relative shadow-sm hover:shadow-lg transition-all
                            ${draggedItem === i ? 'border-primary opacity-50 scale-105' : 'border-border/50'}
                        `}
                    >
                        <div className="absolute top-2 right-2 text-muted-foreground/50">
                            <GripVertical className="w-4 h-4" />
                        </div>
                        <span className="text-3xl font-bold text-muted-foreground/30">{originalIndex + 1}</span>
                        <span className="absolute bottom-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Page {originalIndex + 1}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-white/20 dark:bg-black/20 backdrop-blur-md">
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-colors">Cancel</button>
            <button 
                onClick={() => onApply(pages)}
                className="px-8 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
                Apply Reorder
            </button>
        </div>
      </div>
    </div>
  );
};