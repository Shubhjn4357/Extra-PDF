"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EditorMode } from '@/types';
import {
    Download, CheckCircle2, Eraser,
    Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
    Wand2, Sparkles, ScanText, Undo, Redo, ZoomIn, ZoomOut, Minus, Plus
} from 'lucide-react';

interface ToolbarProps {
    mode: EditorMode | string;
    // New prop to know what kind of item is selected
    selectedAnnotationType: 'text' | 'drawing' | 'image' | 'whiteout' | null;

    zoom: number;
    setZoom: (z: number) => void;
    onAction: (action: string) => void;
    onUndo?: () => void;
    onRedo?: () => void;
    onExport: () => void;
    status?: string;

    // Drawing Props
    drawColor: string;
    setDrawColor: (c: string) => void;
    brushSize: number;
    setBrushSize: (s: number) => void;

    // Text Props
    textStyle: {
        fontFamily: 'Helvetica' | 'Times' | 'Courier';
        isBold: boolean;
        isItalic: boolean;
        isUnderline: boolean;
        align: 'left' | 'center' | 'right';
        size: number;
    };
    setTextStyle: (style: any) => void;
}

export const EditorToolbar: React.FC<ToolbarProps> = ({
    mode, selectedAnnotationType, zoom, setZoom, onAction, onExport, status,
    drawColor, setDrawColor, brushSize, setBrushSize,
    textStyle, setTextStyle, onUndo, onRedo
}) => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const colors = ['#000000', '#FF0000', '#0000FF', '#008000', '#FFA500', '#800080'];

    const updateTextStyle = (key: string, val: any) => {
        setTextStyle((prev: any) => ({ ...prev, [key]: val }));
    };

    const renderToolSpecifics = () => {
        // ... (Keep existing conditionals)
        // Edit Text Mode
        if (mode === 'edit_text') {
            return (
                <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-600 rounded-full border border-blue-200/50 backdrop-blur-sm animate-in slide-in-from-top-2">
                    <ScanText className="w-4 h-4" />
                    <span className="text-xs font-bold">Edit Mode: Text is extracted. Drag or double-click to edit.</span>
                </div>
            );
        }

        if (mode === 'text' || (mode === 'cursor' && selectedAnnotationType === 'text')) {
            return (
                <div className="flex items-center gap-3 px-4 py-1.5 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 animate-in slide-in-from-top-2 shadow-sm">
                     {mode === 'cursor' && <span className="text-[10px] font-bold text-primary uppercase mr-2">Edit Text</span>}
                    <select
                        value={textStyle.fontFamily}
                        onChange={(e) => updateTextStyle('fontFamily', e.target.value)}
                        className="bg-transparent text-xs font-medium border-none outline-none cursor-pointer w-20"
                    >
                        <option value="Helvetica">Sans</option>
                        <option value="Times">Serif</option>
                        <option value="Courier">Mono</option>
                     </select>
                     <div className="h-4 w-px bg-white/20" />
                    <button onClick={() => updateTextStyle('isBold', !textStyle.isBold)} className={`p-1 rounded hover:bg-black/10 ${textStyle.isBold ? 'bg-white/50 text-primary' : ''}`}><Bold className="w-3.5 h-3.5" /></button>
                    <button onClick={() => updateTextStyle('isItalic', !textStyle.isItalic)} className={`p-1 rounded hover:bg-black/10 ${textStyle.isItalic ? 'bg-white/50 text-primary' : ''}`}><Italic className="w-3.5 h-3.5" /></button>
                     <button onClick={() => updateTextStyle('isUnderline', !textStyle.isUnderline)} className={`p-1 rounded hover:bg-black/10 ${textStyle.isUnderline ? 'bg-white/50 text-primary' : ''}`}><Underline className="w-3.5 h-3.5" /></button>
                     <div className="h-4 w-px bg-white/20" />
                    <input
                        type="number"
                        value={textStyle.size}
                        onChange={(e) => updateTextStyle('size', Number(e.target.value))}
                        className="w-12 bg-transparent text-xs text-center border-b border-white/20 focus:border-primary outline-none"
                     />
                     <div className="h-4 w-px bg-white/20" />
                    <div className="relative group flex items-center">
                         <input type="color" value={drawColor} onChange={(e) => setDrawColor(e.target.value)} className="w-5 h-5 rounded border-none cursor-pointer" />
                    </div>
                </div>
            );
        }

        if (mode === 'draw' || (mode === 'cursor' && selectedAnnotationType === 'drawing')) {
            return (
                <div className="flex items-center gap-4 px-4 py-1 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 animate-in slide-in-from-top-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase">{mode === 'cursor' ? 'Edit Drawing' : 'Drawing'}</span>
                     <div className="h-4 w-px bg-white/20" />
                    <div className="flex items-center gap-1">
                        {colors.map(c => (
                            <button key={c} onClick={() => setDrawColor(c)} className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${drawColor === c ? 'border-foreground shadow-sm' : 'border-transparent'}`} style={{ backgroundColor: c }} />
                        ))}
                         <input type="color" value={drawColor} onChange={(e) => setDrawColor(e.target.value)} className="w-6 h-6 rounded-full border-0 p-0 overflow-hidden cursor-pointer" />
                     </div>
                    <div className="h-4 w-px bg-white/20" />
                     <input type="range" min="1" max="10" step="1" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-20 accent-primary h-1.5 bg-muted rounded-lg" />
                </div>
            );
        }

        switch (mode) {
            case 'stamp_remover': return <div className="flex items-center gap-2 px-4 py-1 bg-purple-500/10 text-purple-600 rounded-full border border-purple-200/50 backdrop-blur-sm animate-in slide-in-from-top-2"><Wand2 className="w-4 h-4" /><span className="text-xs font-bold">AI Stamp Remover: Click page to clean</span></div>;
            case 'eraser': return <div className="flex items-center gap-2 px-4 py-1 bg-red-500/10 text-red-600 rounded-full border border-red-200/50 backdrop-blur-sm animate-in slide-in-from-top-2"><Eraser className="w-4 h-4" /><span className="text-xs font-bold">Click items to delete</span></div>;
            default: return null;
        }
    };

    return (
        <div className="h-16 border-b border-white/20 bg-white/60 dark:bg-black/60 backdrop-blur-xl px-4 flex items-center justify-between shrink-0 z-30 relative gap-4">

            {/* Left: Status / Tool Info */}
            <div className="flex items-center gap-4 flex-1 overflow-x-auto no-scrollbar min-w-0">
                {renderToolSpecifics()}
                {status && (
                    <div className="flex items-center gap-2 text-xs text-green-600 font-medium px-3 py-1 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-full whitespace-nowrap animate-in fade-in slide-in-from-left-2">
                        <CheckCircle2 className="w-3 h-3" /> {status}
                    </div>
                )}
            </div>

            {/* Center-Right: Common Controls (Undo/Zoom) */}
            {mounted && createPortal(
                <div className="flex fixed right-4 bottom-4 items-center gap-2 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-sm z-50">
                    <button onClick={onUndo} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-muted-foreground hover:text-foreground transition-colors" title="Undo (Ctrl+Z)">
                        <Undo className="w-4 h-4" />
                    </button>
                    <button onClick={onRedo} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-muted-foreground hover:text-foreground transition-colors" title="Redo (Ctrl+Y)">
                        <Redo className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full"><Minus className="w-3 h-3" /></button>
                    <span className="text-xs font-bold w-8 text-center">{Math.round(zoom * 100)}%</span>
                    <button onClick={() => setZoom(Math.min(3, zoom + 0.1))} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full"><Plus className="w-3 h-3" /></button>
                </div>,
                document.body
            )}

            {/* Right: Actions */}
            <div className="flex items-center gap-2 flex-none justify-end">
                <button onClick={() => onAction('toggle_ai')} className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold hover:bg-primary/20 transition-all border border-primary/20">
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden xl:inline">AI</span>
                </button>
                <button onClick={onExport} className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    <Download className="w-4 h-4" />
                    <span className="hidden lg:inline">Export</span>
                </button>
            </div>
        </div>
    );
};