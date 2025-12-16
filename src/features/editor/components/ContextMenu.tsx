import React from 'react';
import { Trash2, Edit2, X } from 'lucide-react';

interface ContextMenuProps {
    x: number;
    y: number;
    type: 'annotation' | 'canvas' | 'text' | string;
    onClose: () => void;
    onAction: (action: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, type, onClose, onAction }) => {
    // Prevent menu from going off-screen
    const style: React.CSSProperties = {
        position: 'fixed',
        top: y,
        left: x,
        zIndex: 1000,
    };

    // Adjust position if close to edge (simple safeguard)
    if (x > window.innerWidth - 150) style.left = x - 150;
    if (y > window.innerHeight - 100) style.top = y - 100;

    return (
        <div 
            className="bg-background border border-border rounded-lg shadow-xl p-1 min-w-[150px] animate-in fade-in zoom-in-95"
            style={style}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex flex-col gap-1">
                {(type === 'text' || type === 'drawing' || type === 'image' || type === 'whiteout' || type === 'redact' || type === 'signature') ? (
                    <>
                        <button onClick={() => onAction('delete')} className="flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded transition-colors text-left w-full">
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                        </button>
                        {type === 'text' && (
                             <button onClick={() => onAction('edit')} className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors text-left w-full">
                                <Edit2 className="w-4 h-4" />
                                <span>Edit Text</span>
                            </button>
                        )}
                    </>
                ) : (
                    <div className="px-3 py-2 text-xs text-muted-foreground text-center">No actions</div>
                )}
                 <div className="h-px bg-border my-0.5" />
                 <button onClick={onClose} className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors text-left w-full justify-center">
                    <span>Close Menu</span>
                </button>
            </div>
        </div>
    );
};
