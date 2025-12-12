import React from 'react';
import { EditorMode } from '../../../types';
import { 
    Download, ZoomIn, ZoomOut, CheckCircle2, Eraser, 
    Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
    Type, Wand2
} from 'lucide-react';

interface ToolbarProps {
    mode: EditorMode | string;
    zoom: number;
    setZoom: (z: number) => void;
    onAction: (action: string) => void;
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
    mode, zoom, setZoom, onAction, onExport, status,
    drawColor, setDrawColor, brushSize, setBrushSize,
    textStyle, setTextStyle
}) => {
    
    const colors = ['#000000', '#FF0000', '#0000FF', '#008000', '#FFA500', '#800080'];

    const updateTextStyle = (key: string, val: any) => {
        setTextStyle((prev: any) => ({ ...prev, [key]: val }));
    };

    const renderToolSpecifics = () => {
        switch(mode) {
            case 'text':
                return (
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 animate-in slide-in-from-top-2 shadow-sm">
                        
                        {/* Font Family */}
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

                        {/* Styles */}
                        <button onClick={() => updateTextStyle('isBold', !textStyle.isBold)} className={`p-1 rounded hover:bg-black/10 ${textStyle.isBold ? 'bg-white/50 text-primary' : ''}`}><Bold className="w-3.5 h-3.5" /></button>
                        <button onClick={() => updateTextStyle('isItalic', !textStyle.isItalic)} className={`p-1 rounded hover:bg-black/10 ${textStyle.isItalic ? 'bg-white/50 text-primary' : ''}`}><Italic className="w-3.5 h-3.5" /></button>
                        <button onClick={() => updateTextStyle('isUnderline', !textStyle.isUnderline)} className={`p-1 rounded hover:bg-black/10 ${textStyle.isUnderline ? 'bg-white/50 text-primary' : ''}`}><Underline className="w-3.5 h-3.5" /></button>

                        <div className="h-4 w-px bg-white/20" />

                        {/* Alignment */}
                        <button onClick={() => updateTextStyle('align', 'left')} className={`p-1 rounded hover:bg-black/10 ${textStyle.align === 'left' ? 'bg-white/50 text-primary' : ''}`}><AlignLeft className="w-3.5 h-3.5" /></button>
                        <button onClick={() => updateTextStyle('align', 'center')} className={`p-1 rounded hover:bg-black/10 ${textStyle.align === 'center' ? 'bg-white/50 text-primary' : ''}`}><AlignCenter className="w-3.5 h-3.5" /></button>
                        <button onClick={() => updateTextStyle('align', 'right')} className={`p-1 rounded hover:bg-black/10 ${textStyle.align === 'right' ? 'bg-white/50 text-primary' : ''}`}><AlignRight className="w-3.5 h-3.5" /></button>

                        <div className="h-4 w-px bg-white/20" />

                        {/* Color */}
                         <div className="relative group flex items-center">
                            <input 
                                type="color" 
                                value={drawColor} 
                                onChange={(e) => setDrawColor(e.target.value)}
                                className="w-5 h-5 rounded border-none cursor-pointer" 
                            />
                        </div>
                    </div>
                );
            case 'draw':
                return (
                    <div className="flex items-center gap-4 px-4 py-1 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 animate-in slide-in-from-top-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase">Drawing</span>
                        <div className="h-4 w-px bg-white/20" />
                        
                        <div className="flex items-center gap-1">
                            {colors.map(c => (
                                <button 
                                    key={c}
                                    onClick={() => setDrawColor(c)}
                                    className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${drawColor === c ? 'border-foreground shadow-sm' : 'border-transparent'}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                            <input 
                                type="color" 
                                value={drawColor} 
                                onChange={(e) => setDrawColor(e.target.value)}
                                className="w-6 h-6 rounded-full border-0 p-0 overflow-hidden cursor-pointer" 
                            />
                        </div>

                        <div className="h-4 w-px bg-white/20" />
                        
                        <input 
                            type="range" min="1" max="10" step="1"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                            className="w-20 accent-primary h-1.5 bg-muted rounded-lg"
                        />
                    </div>
                );
            case 'stamp_remover':
                return (
                    <div className="flex items-center gap-2 px-4 py-1 bg-purple-500/10 text-purple-600 rounded-full border border-purple-200/50 backdrop-blur-sm animate-in slide-in-from-top-2">
                        <Wand2 className="w-4 h-4" />
                        <span className="text-xs font-bold">AI Stamp Remover: Click page to clean</span>
                    </div>
                );
            case 'eraser':
                return (
                    <div className="flex items-center gap-2 px-4 py-1 bg-red-500/10 text-red-600 rounded-full border border-red-200/50 backdrop-blur-sm animate-in slide-in-from-top-2">
                        <Eraser className="w-4 h-4" />
                        <span className="text-xs font-bold">Click drawn lines to delete</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-16 border-b border-white/20 bg-white/60 dark:bg-black/60 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 z-30 relative">
            
            {/* Left: Status / Tool Info */}
            <div className="flex items-center gap-4 flex-1">
                {renderToolSpecifics()}
                {status && (
                    <div className="flex items-center gap-2 text-xs text-green-600 font-medium px-3 py-1 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> {status}
                    </div>
                )}
            </div>

            {/* Center: Zoom */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-sm">
                <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all text-muted-foreground hover:text-foreground">
                    <ZoomOut className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-xs font-mono font-medium">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(Math.min(2.5, zoom + 0.1))} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all text-muted-foreground hover:text-foreground">
                    <ZoomIn className="w-4 h-4" />
                </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 flex-1 justify-end">
                <button 
                    onClick={onExport}
                    className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                </button>
            </div>
        </div>
    );
};