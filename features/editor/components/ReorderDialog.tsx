import React, { useState, useEffect } from 'react';
import { X, GripVertical } from 'lucide-react';
import { Document, Page } from 'react-pdf';
import { useFileStore } from '../../../store/useFileStore';

interface ReorderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pageCount: number;
  onApply: (newOrder: number[]) => void;
}

export const ReorderDialog: React.FC<ReorderDialogProps> = ({ isOpen, onClose, pageCount, onApply }) => {
  const { file } = useFileStore();
  const [pages, setPages] = useState<number[]>([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  // Initialize/Reset pages when dialog opens
  useEffect(() => {
    if (isOpen) {
        setPages(Array.from({ length: pageCount }, (_, i) => i));
    }
  }, [isOpen, pageCount]);

  if (!isOpen) return null;

  const onDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
    // Optional: Set a custom drag image or styling
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Necessary to allow dropping
    if (draggedItem === null || draggedItem === index) return;

    const newPages = [...pages];
    const item = newPages.splice(draggedItem, 1)[0];
    newPages.splice(index, 0, item);
    
    setPages(newPages);
    setDraggedItem(index);
  };

  const onDragEnd = () => {
      setDraggedItem(null);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-background/95 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col border border-border overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
            <div>
                <h3 className="font-bold text-xl tracking-tight">Reorder Pages</h3>
                <p className="text-sm text-muted-foreground">Drag and drop pages to rearrange the document</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-muted/10">
            {file ? (
                <Document file={file} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pages.map((originalIndex, i) => (
                        <div 
                            key={originalIndex} // Important: Use originalIndex as key to maintain DOM identity during reorder if possible, or i if simple
                            draggable
                            onDragStart={(e) => onDragStart(e, i)}
                            onDragOver={(e) => onDragOver(e, i)}
                            onDragEnd={onDragEnd}
                            className={`
                                group relative flex flex-col gap-2 p-3 rounded-xl cursor-move transition-all duration-200
                                ${draggedItem === i 
                                    ? 'opacity-30 scale-95 bg-primary/20 ring-2 ring-primary border-transparent' 
                                    : 'hover:bg-white/50 dark:hover:bg-black/20 border border-transparent hover:border-border hover:shadow-lg'
                                }
                            `}
                        >
                            <div className="relative rounded-lg overflow-hidden shadow-sm border border-border bg-white pointer-events-none select-none aspect-[1/1.4] flex items-center justify-center">
                                <Page 
                                    pageNumber={originalIndex + 1} 
                                    width={150} 
                                    renderTextLayer={false} 
                                    renderAnnotationLayer={false}
                                    className="max-w-full max-h-full object-contain"
                                />
                                {/* Overlay Number */}
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md z-10">
                                    {originalIndex + 1}
                                </div>
                                <div className="absolute top-2 right-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                     <GripVertical className="w-5 h-5 drop-shadow-md" />
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <span className="text-xs font-medium text-muted-foreground">Page {i + 1}</span>
                            </div>
                        </div>
                    ))}
                </Document>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    Loading preview...
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-end gap-3 bg-muted/20">
            <button 
                onClick={onClose} 
                className="px-6 py-2.5 rounded-xl border border-border hover:bg-muted font-medium transition-colors text-sm"
            >
                Cancel
            </button>
            <button 
                onClick={() => onApply(pages)}
                className="px-8 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
            >
                Apply Changes
            </button>
        </div>
      </div>
    </div>
  );
};