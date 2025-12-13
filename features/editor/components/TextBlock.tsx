import React, { useRef, useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { EditableBlock } from '../../../types';
import { Sparkles, GripVertical, Check, X } from 'lucide-react';
import { enhanceTextBlock } from '../../../services/geminiService';

interface TextBlockProps {
    block: EditableBlock;
    zoom: number;
    onUpdate: (id: string, text: string, x: number, y: number) => void;
    onDelete: (id: string) => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({ block, zoom, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(block.text);
    const [isThinking, setIsThinking] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // React DnD Hook
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'TEXT_BLOCK',
        item: { id: block.id, type: 'TEXT_BLOCK' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const handleBlur = () => {
        setIsEditing(false);
        if (contentRef.current) {
            const newText = contentRef.current.innerText;
            setText(newText);
            onUpdate(block.id, newText, block.x, block.y); // Position hasn't changed here
        }
    };

    const handleGemini = async (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsThinking(true);
        const improved = await enhanceTextBlock(text, "Fix grammar and make it professional");
        setText(improved);
        if(contentRef.current) contentRef.current.innerText = improved;
        onUpdate(block.id, improved, block.x, block.y);
        setIsThinking(false);
    };

    const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setIsEditing(true);
        setTimeout(() => contentRef.current?.focus(), 0);
    };

    return (
        <div
            ref={preview as any} // Entire block is preview
            style={{
                position: 'absolute',
                left: block.x,
                top: block.y,
                fontSize: `${block.fontSize}px`,
                width: block.width > 20 ? block.width + 10 : 'auto', // Add padding
                minHeight: block.height,
                opacity: isDragging ? 0 : 1,
                zIndex: isEditing ? 100 : 50,
                transformOrigin: 'top left',
            }}
            className={`
                group transition-all
                ${isEditing 
                    ? 'bg-white shadow-xl ring-2 ring-primary z-50 rounded p-1' 
                    : 'hover:bg-primary/5 hover:ring-1 hover:ring-primary/50'
                }
            `}
            onDoubleClick={handleInteraction}
            // Double tap simulation for touch handled by OS usually, but explicit tap helps
            onTouchEnd={(e) => {
                // If it was a quick tap, could be edit intent.
                // For now, let's rely on standard events, but add touch-action-none to prevent zoom
            }}
        >
            {/* Drag Handle - Larger touch target */}
            <div 
                ref={drag as any}
                className={`
                    absolute -left-8 top-0 p-2 cursor-grab active:cursor-grabbing bg-white shadow-md rounded-l border border-gray-200
                    ${isEditing || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    transition-opacity touch-none
                `}
                style={{ touchAction: 'none' }}
            >
                <GripVertical className="w-5 h-5 text-gray-400" />
            </div>

            {/* AI Tools - Only visible when editing */}
            {isEditing && (
                <div className="absolute -top-12 left-0 flex items-center gap-1 bg-white shadow-lg border border-border rounded-lg p-1.5 animate-in zoom-in-95 z-[60]">
                    <button 
                        onClick={handleGemini}
                        onTouchStart={handleGemini}
                        disabled={isThinking}
                        className="px-2 py-1 hover:bg-purple-50 text-purple-600 rounded flex items-center gap-1 text-[10px] font-bold uppercase"
                    >
                        {isThinking ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        AI Fix
                    </button>
                    <div className="w-px h-4 bg-gray-200" />
                    <button onClick={() => onDelete(block.id)} onTouchStart={() => onDelete(block.id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Content Area */}
            <div
                ref={contentRef}
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={handleBlur}
                className={`
                    outline-none whitespace-pre-wrap
                    ${isEditing ? 'cursor-text text-black' : 'cursor-default text-transparent selection:bg-blue-200 selection:text-black'} 
                    /* Hack: text-transparent when not editing makes it overlay the original PDF text perfectly without double rendering visually */
                `}
                style={{
                    fontFamily: block.fontFamily,
                    // If dirty (changed), show black text. If not, hidden (original PDF shows through)
                    color: block.isDirty || isEditing ? 'black' : 'transparent',
                    backgroundColor: block.isDirty && !isEditing ? 'white' : 'transparent', 
                }}
            >
                {text}
            </div>
        </div>
    );
};