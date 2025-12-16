"use client";

import React, { useState } from 'react';
import { Tool, ToolCategory } from '@/types';
import {
    MousePointer, Type, Eraser, PenLine, Scissors, Merge,
    Shield, RotateCw, FileImage, Layers, Trash, Stamp,
    Image as ImageIcon, AlignLeft, Info, FileStack,
    Hash, FileOutput, Wand2, FileText, FileMinus
} from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';

interface SidebarProps {
    activeCategory: ToolCategory;
    setActiveCategory: (c: ToolCategory) => void;
    activeToolId: string;
    onToolSelect: (t: Tool) => void;
}

export const toolsList: Tool[] = [
    // ORGANIZE
    { id: 'merge', label: 'Merge', icon: Merge, category: 'organize', description: 'Combine PDFs', shortcut: 'Shift+M' },
    { id: 'split', label: 'Split', icon: Scissors, category: 'organize', description: 'Extract pages', requiresModal: true, shortcut: 'Alt+P' },
    { id: 'remove_empty', label: 'Remove Empty', icon: FileMinus, category: 'organize', description: 'Auto-delete blank', shortcut: 'Shift+Del' },
    { id: 'reorder', label: 'Reorder', icon: FileStack, category: 'organize', description: 'Move pages', requiresModal: true, shortcut: 'O' },
    { id: 'rotate', label: 'Rotate', icon: RotateCw, category: 'organize', description: 'Rotate Page', shortcut: 'Shift+R' },
    { id: 'delete_page', label: 'Delete', icon: Trash, category: 'organize', description: 'Remove Page', requiresModal: true, shortcut: 'Shift+D' },
    { id: 'page_numbers', label: 'Numbers', icon: Hash, category: 'organize', description: 'Add Footer', shortcut: 'Shift+N' },
    { id: 'repair', label: 'Repair', icon: Wand2, category: 'organize', description: 'Fix PDF', shortcut: 'Shift+F' },
    { id: 'compress', label: 'Compress', icon: FileMinus, category: 'organize', description: 'Reduce Size', shortcut: 'Shift+C' },

    // EDIT
    { id: 'cursor', label: 'Select', icon: MousePointer, category: 'edit', description: 'Select', shortcut: 'V/Esc' },
    { id: 'edit_text', label: 'Edit Text', icon: FileText, category: 'edit', description: 'Edit Existing', shortcut: 'Shift+T' },
    { id: 'text', label: 'Add Text', icon: Type, category: 'edit', description: 'Add Text', shortcut: 'T' },
    { id: 'draw', label: 'Draw', icon: PenLine, category: 'edit', description: 'Freehand', shortcut: 'D' },
    { id: 'eraser', label: 'Eraser', icon: Eraser, category: 'edit', description: 'Delete Drawing', shortcut: 'E' },
    { id: 'whiteout', label: 'Whiteout', icon: AlignLeft, category: 'edit', description: 'Cover Text', shortcut: 'W' },
    { id: 'add_image', label: 'Image', icon: ImageIcon, category: 'edit', description: 'Add Image', shortcut: 'I' },
    { id: 'watermark', label: 'Watermark', icon: Stamp, category: 'edit', description: 'Watermark', requiresModal: true, shortcut: 'M' },
    { id: 'stamp_remover', label: 'Clean AI', icon: Wand2, category: 'edit', description: 'Remove Stamp', shortcut: 'C' },
    { id: 'crop', label: 'Crop', icon: Scissors, category: 'edit', description: 'Crop Page', shortcut: 'X' },
    { id: 'redact', label: 'Redact', icon: Eraser, category: 'edit', description: 'Blackout', shortcut: 'R' },
    { id: 'sign', label: 'Sign', icon: PenLine, category: 'edit', description: 'Signature', shortcut: 'S' },

    // SECURITY
    { id: 'encrypt', label: 'Protect', icon: Shield, category: 'security', description: 'Password', requiresModal: true, shortcut: 'Alt+L' },
    { id: 'unlock', label: 'Unlock', icon: Shield, category: 'security', description: 'Remove Password', requiresModal: true, shortcut: 'Alt+U' },
    { id: 'force_unlock', label: 'Force Unlock', icon: Wand2, category: 'security', description: 'Brute Force', shortcut: 'Alt+Shift+U' },
    { id: 'flatten', label: 'Flatten', icon: Layers, category: 'security', description: 'Flatten', shortcut: 'Alt+F' },
    { id: 'metadata', label: 'Meta', icon: Info, category: 'security', description: 'Metadata', requiresModal: true, shortcut: 'Alt+I' },
    { id: 'compare', label: 'Compare', icon: FileStack, category: 'security', description: 'Side by Side', shortcut: 'Alt+C' },

    // CONVERT
    { id: 'pdf_to_word', label: 'Word', icon: FileImage, category: 'convert', description: 'To DOCX', shortcut: 'Alt+W' },
    { id: 'pdf_to_jpg', label: 'JPG', icon: FileOutput, category: 'convert', description: 'To Images', shortcut: 'Alt+J' },
    { id: 'pdf_to_ppt', label: 'PPT', icon: FileOutput, category: 'convert', description: 'To PowerPoint', shortcut: 'Alt+Shift+P' },
    { id: 'pdf_to_excel', label: 'Excel', icon: FileOutput, category: 'convert', description: 'To Excel', shortcut: 'Alt+X' },
    { id: 'ocr_pdf', label: 'OCR', icon: Type, category: 'convert', description: 'Extract Text', shortcut: 'Alt+O' },
    { id: 'html_to_pdf', label: 'HTML', icon: FileText, category: 'convert', description: 'Web to PDF', requiresModal: true, shortcut: 'Alt+H' },
];

export const EditorSidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, activeToolId, onToolSelect }) => {
    const { settings } = useSettingsStore();
    const categories: ToolCategory[] = ['edit', 'organize', 'security', 'convert'];
    const isCompact = settings.density === 'compact';
    const [isHovered, setIsHovered] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);

    return (
        <div
            className={`
                h-full flex flex-col items-center shrink-0 z-20 shadow-xl transition-all duration-300 ease-in-out border-r
                bg-white/80 dark:bg-black/80 backdrop-blur-xl border-white/20
                ${isCompact ? 'py-2' : 'py-4'}
                ${isHovered ? 'w-64 items-start px-4' : 'w-20 items-center'}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Categories */}
            <div className={`flex ${isHovered ? 'flex-row gap-2 w-full justify-between mb-6' : 'flex-col gap-3 w-full px-2'}`}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                            rounded-xl flex items-center justify-center transition-all duration-300
                            ${isCompact ? 'w-10 h-10' : 'w-12 h-12'}
                            ${activeCategory === cat
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                            : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10'
                            }
                            ${isHovered ? 'flex-1' : 'mx-auto'}
                        `}
                        title={cat.toUpperCase()}
                    >
                        {cat === 'edit' && <PenLine className={isCompact ? "w-4 h-4" : "w-5 h-5"} />}
                        {cat === 'organize' && <Layers className={isCompact ? "w-4 h-4" : "w-5 h-5"} />}
                        {cat === 'security' && <Shield className={isCompact ? "w-4 h-4" : "w-5 h-5"} />}
                        {cat === 'convert' && <FileImage className={isCompact ? "w-4 h-4" : "w-5 h-5"} />}
                    </button>
                ))}
            </div>

            <div className={`w-full h-px bg-white/20 my-2 ${isHovered ? 'mb-4' : ''}`} />

            {/* Tools in Category */}
            <div className={`flex-1 w-full flex flex-col px-2 overflow-y-auto pb-4 no-scrollbar ${isCompact ? 'gap-1' : 'gap-2'}`}>
                {isHovered && <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">{activeCategory} Tools</h3>}
                {toolsList.filter(t => t.category === activeCategory).map(tool => (
                    <button
                        key={tool.id}
                        onClick={() => onToolSelect(tool)}
                        className={`
                            group relative w-full rounded-xl flex items-center gap-3 transition-all
                            ${isHovered ? 'px-3 py-3 justify-start' : 'aspect-square justify-center'}
                            ${activeToolId === tool.id
                                ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner'
                                : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground'
                            }
                        `}
                    >
                        <tool.icon className={`${isCompact ? "w-4 h-4" : "w-5 h-5"} ${isHovered ? '' : ''}`} />

                        {isHovered ? (
                            <div className="flex flex-col items-start overflow-hidden w-full">
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-sm font-medium whitespace-nowrap">{tool.label}</span>
                                    {tool.shortcut && <span className="text-[10px] font-mono bg-black/5 dark:bg-white/10 px-1.5 rounded">{tool.shortcut}</span>}
                                </div>
                                <span className="text-[10px] text-muted-foreground truncate w-full opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                                    {tool.description}
                                </span>
                            </div>
                        ) : (
                            <span className="text-[9px] font-medium opacity-0 group-hover:opacity-100 absolute -bottom-7 bg-white/90 dark:bg-black/90 px-2 py-0.5 rounded shadow-sm transition-all pointer-events-none whitespace-nowrap z-50 border border-white/10 flex items-center gap-1">
                                {tool.label} {tool.shortcut && <span className="text-muted-foreground">({tool.shortcut})</span>}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Shortcuts Help Button */}
            <div className="mt-auto pt-2 w-full px-2">
                <button
                    onClick={() => setShowShortcuts(!showShortcuts)}
                    className={`w-full rounded-xl flex items-center justify-center transition-all ${isCompact ? 'h-8' : 'h-10'} hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground`}
                    title="Keyboard Shortcuts"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold border border-current px-1 rounded">?</span>
                        {isHovered && <span className="text-xs">Shortcuts</span>}
                    </div>
                </button>
            </div>

            {/* Shortcuts Modal (Simple Popover) */}
            {showShortcuts && (
                <div className="absolute left-full bottom-4 ml-4 w-64 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-2xl z-50 text-xs">
                    <h3 className="font-bold text-sm mb-3">Global Shortcuts</h3>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                        <div className="flex justify-between"><span>Undo</span> <kbd className="font-mono bg-muted/50 px-1 rounded">Ctrl+Z</kbd></div>
                        <div className="flex justify-between"><span>Redo</span> <kbd className="font-mono bg-muted/50 px-1 rounded">Ctrl+Y</kbd></div>
                        <div className="col-span-2 h-px bg-border my-1" />
                        {toolsList.filter(t => t.shortcut).map(t => (
                            <div key={t.id} className="flex justify-between items-center">
                                <span className="truncate pr-2">{t.label}</span>
                                <kbd className="font-mono bg-muted/50 px-1 rounded whitespace-nowrap">{t.shortcut}</kbd>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};