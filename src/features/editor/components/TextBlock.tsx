"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { EditableBlock } from '@/types';
import { Sparkles, GripVertical, Check, X } from 'lucide-react';
import { enhanceTextBlock } from '@/services/geminiService';

interface TextBlockProps {
    block: EditableBlock;
    zoom: number;
    onUpdate: (id: string, text: string, x: number, y: number) => void;
    onDelete: (id: string) => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({ block, zoom, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // React DnD Hook - Attach drag source only to the handle
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'TEXT_BLOCK',
        item: { id: block.id, type: 'TEXT_BLOCK' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    // Sync content from props to DOM, but ONLY when not editing to prevent overwriting user input
    useEffect(() => {
        if (contentRef.current && !isEditing) {
            // Only update if strictly different to avoid cursor jumps or unnecessary paints
            if (contentRef.current.innerText !== block.text) {
                contentRef.current.innerText = block.text;
            }
        }
    }, [block.text, isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        if (contentRef.current) {
            const newText = contentRef.current.innerText;
            // Debounce update or check diff
            if (newText !== block.text) {
                onUpdate(block.id, newText, block.x, block.y);
            }
        }
    };

    const handleGemini = async (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsThinking(true);
        const currentText = contentRef.current?.innerText || block.text;
        const improved = await enhanceTextBlock(currentText, "Fix grammar and make it professional");

        if (contentRef.current) contentRef.current.innerText = improved;
        onUpdate(block.id, improved, block.x, block.y);
        setIsThinking(false);
    };

    const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setIsEditing(true);
        // Delay focus to allow render cycle to apply contentEditable=true
        setTimeout(() => {
            contentRef.current?.focus();
        }, 50);
    };

    return (
        <div
            ref={preview as any}
            style={{
                position: 'absolute',
                left: block.x,
                top: block.y,
                fontSize: `${block.fontSize}px`,
                // Ensure width is sufficient for editing
                minWidth: '20px',
                width: block.width > 20 ? 'auto' : 'auto',
                maxWidth: '600px', // Prevent infinite growth
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
            // Add touch support for entering edit mode
            onTouchEnd={(e) => {
                // If it was a quick tap without drag
                // For simplicity, rely on double tap logic via standard browser events or add a button
            }}
        >
            {/* Drag Handle */}
            <div
                ref={drag as any}
                className={`
                    absolute -left-8 top-0 p-2 cursor-grab active:cursor-grabbing bg-white shadow-md rounded-l border border-gray-200
                    ${isEditing || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    transition-opacity touch-none
                `}
                style={{ touchAction: 'none' }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
            >
                <GripVertical className="w-5 h-5 text-gray-400" />
            </div>

            {/* AI Tools */}
            {isEditing && (
                <div
                    className="absolute -top-12 left-0 flex items-center gap-1 bg-white shadow-lg border border-border rounded-lg p-1.5 animate-in zoom-in-95 z-[60]"
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={handleGemini}
                        disabled={isThinking}
                        className="px-2 py-1 hover:bg-purple-50 text-purple-600 rounded flex items-center gap-1 text-[10px] font-bold uppercase"
                    >
                        {isThinking ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        AI Fix
                    </button>
                    <div className="w-px h-4 bg-gray-200" />
                    <button
                        onClick={() => onDelete(block.id)}
                        className="p-1.5 hover:bg-red-50 text-red-500 rounded"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Content Area - Uncontrolled for editing */}
            <div
                ref={contentRef}
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={handleBlur}
                // Stop propagation to ensure keystrokes don't bubble to canvas listeners
                onKeyDown={(e) => e.stopPropagation()}
                onKeyPress={(e) => e.stopPropagation()}
                onKeyUp={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className={`
                    outline-none whitespace-pre-wrap select-text
                    ${isEditing ? 'cursor-text text-black' : 'cursor-default text-transparent selection:bg-blue-200 selection:text-black'} 
                `}
                style={{
                    fontFamily: block.fontFamily,
                    // Overlay mode: text is transparent to show underlying PDF text, unless dirty/editing
                    color: block.isDirty || isEditing ? 'black' : 'transparent',
                    backgroundColor: block.isDirty && !isEditing ? 'white' : 'transparent',
                    userSelect: 'text',
                    WebkitUserSelect: 'text',
                }}
            />
        </div>
    );
};