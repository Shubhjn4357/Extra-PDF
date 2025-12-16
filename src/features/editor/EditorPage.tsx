"use client";

/**
 * EditorPage Component
 * 
 * The main PDF editing workspace providing:
 * - Multi-mode editing (cursor, text, draw, crop, redact, etc.)
 * - Tool categories: Edit, Organize, Security, Convert
 * - AI-powered features via Gemini (stamp removal, chat)
 * - Page thumbnails, zoom controls, and keyboard shortcuts
 * - Export with compression and password protection
 * 
 * @module features/editor/EditorPage
 */

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from "sonner";

// State Management
import { useFileStore } from '@/store/useFileStore';
import { useSettingsStore } from '@/store/useSettingsStore';

// UI Components
import { EditorSidebar } from './components/EditorSidebar';
import { ThumbnailSidebar } from './components/ThumbnailSidebar';
import { EditorToolbar } from './components/EditorToolbar';
import { ReorderDialog } from './components/ReorderDialog';
import { ThinkingSidebar } from './ThinkingSidebar';
import { ExportDialog } from '@/components/ui/ExportDialog';
import { SettingsDialog } from '@/components/ui/SettingsDialog';

// Types
import { EditorMode, Tool, ToolCategory, ModalState } from '@/types';

// Icons
import { Menu, Settings2, Scissors, Stamp, Lock, Loader2, ChevronLeft } from 'lucide-react';

// Tool Services (PDF manipulation)
import * as Organize from '@/services/tools/organizeTools';
import * as Edit from '@/services/tools/editTools';
import * as Security from '@/services/tools/securityTools';
import * as Convert from '@/services/tools/convertTools';

// Action Hooks
import { useAIActions } from './actions/aiActions';
import { useDocumentActions } from './actions/documentActions';
import { useSecurityActions } from './actions/securityActions';

// Dynamic import for PDFCanvas to avoid SSR issues with pdf.js
const PDFCanvas = dynamic(() => import('./PDFCanvas').then(m => m.PDFCanvas), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin" /></div>
});
export const EditorPage: React.FC = () => {
    const router = useRouter();
    const { file, replaceFile, addAnnotation, annotations, updateAnnotation, rotatePage, pdfText, numPages, pageRotations, removeAnnotation, editableBlocks, isRestoring, undo, redo } = useFileStore();
    const { settings } = useSettingsStore();

    // View State
    const [zoom, setZoom] = useState(1);
    const [mode, setMode] = useState<EditorMode>('cursor');
    const [activeCategory, setActiveCategory] = useState<ToolCategory>('edit');
    const [statusMsg, setStatusMsg] = useState('');
    const [activePage, setActivePage] = useState(1);

    // Compare State
    const [compareFile, setCompareFile] = useState<File | null>(null);

    // UI State
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isThumbnailsOpen, setThumbnailsOpen] = useState(true);
    const [isThinkingOpen, setIsThinkingOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Selection State
    const [selectedAnnId, setSelectedAnnId] = useState<string | null>(null);
    const selectedAnnotation = annotations.find(a => a.id === selectedAnnId);

    // Draw/Text State
    const [drawColor, setDrawColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(2);
    const [textStyle, setTextStyle] = useState<{
        fontFamily: 'Helvetica' | 'Times' | 'Courier';
        isBold: boolean;
        isItalic: boolean;
        isUnderline: boolean;
        align: 'left' | 'center' | 'right';
        size: number;
    }>({
        fontFamily: 'Helvetica',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        align: 'left',
        size: 14
    });

    // Modal State
    const [modal, setModal] = useState<ModalState>({ type: null, isOpen: false });
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [mInput1, setMInput1] = useState('');
    const [mInput2, setMInput2] = useState('');
    const [htmlInput, setHtmlInput] = useState('');

    // Refs
    const mergeInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const wordInputRef = useRef<HTMLInputElement>(null);
    const compareInputRef = useRef<HTMLInputElement>(null);

    // Local processing state for non-AI actions
    const [isBusy, setIsBusy] = useState(false);

    const [pendingImage, setPendingImage] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Initialization
    useEffect(() => {
        if (!isRestoring && !file) {
            router.push('/');
        }
    }, [isRestoring, file, router]);

    useEffect(() => {
        const isDesktop = window.innerWidth >= 768;
        if (isDesktop) setSidebarOpen(true);
        else setThumbnailsOpen(false);
        if (navigator.serviceWorker.controller) {
            console.log("Service Worker Active");
        }
        
        // Restore State
        (async () => {
            if (useFileStore.getState().isRestoring) {
                await useFileStore.getState().restoreState();
            }
        })();

        // Global Shortcuts Listener
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in input/textarea
            if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

            // Undo/Redo Shortcuts (Ctrl+Z, Ctrl+Y)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
                e.preventDefault();
                useFileStore.getState().undo();
                setStatusMsg("Undo ↩️");
                return;
            }
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
                e.preventDefault();
                useFileStore.getState().redo();
                setStatusMsg("Redo ↪️");
                return;
            }

            const k = e.key.toLowerCase();
            
            // Shift + Alt Combos (Triple Keys)
            if (e.altKey && e.shiftKey) {
                if (k === 'u') { handleToolSelect({ id: 'force_unlock' } as any); return; }
                if (k === 'p') { handleToolSelect({ id: 'pdf_to_ppt' } as any); return; }
            }

            // Alt + Key Combos
            if (e.altKey) {
                switch (k) {
                    case 'p': handleToolSelect({ id: 'split' } as any); break;
                    case 'l': handleToolSelect({ id: 'encrypt' } as any); break;
                    case 'u': handleToolSelect({ id: 'unlock' } as any); break;
                    case 'f': handleToolSelect({ id: 'flatten' } as any); break;
                    case 'i': handleToolSelect({ id: 'metadata' } as any); break;
                    case 'c': handleToolSelect({ id: 'compare' } as any); break;
                    case 'w': handleToolSelect({ id: 'pdf_to_word' } as any); break;
                    case 'j': handleToolSelect({ id: 'pdf_to_jpg' } as any); break;
                    case 'x': handleToolSelect({ id: 'pdf_to_excel' } as any); break;
                    case 'o': handleToolSelect({ id: 'ocr_pdf' } as any); break;
                    case 'h': handleToolSelect({ id: 'html_to_pdf' } as any); break;
                }
                return;
            }

            // Shift + Key Combos
            if (e.shiftKey) {
                switch (k) {
                    case 'm': handleToolSelect({ id: 'merge' } as any); break;
                    case 'delete': handleToolSelect({ id: 'remove_empty' } as any); break;
                    case 'r': handleToolSelect({ id: 'rotate' } as any); break;
                    case 'd': handleToolSelect({ id: 'delete_page' } as any); break;
                    case 'n': handleToolSelect({ id: 'page_numbers' } as any); break;
                    case 'f': handleToolSelect({ id: 'repair' } as any); break;
                    case 'c': handleToolSelect({ id: 'compress' } as any); break;
                    case 't': handleToolSelect({ id: 'edit_text' } as any); break;
                }
                return;
            }

            // Single Key Shortcuts
            switch (k) {
                case 'v': case 'escape': handleToolSelect({ id: 'cursor' } as any); break;
                case 't': handleToolSelect({ id: 'text' } as any); break;
                case 'd': handleToolSelect({ id: 'draw' } as any); break;
                case 'w': handleToolSelect({ id: 'whiteout' } as any); break;
                case 'x': handleToolSelect({ id: 'crop' } as any); break;
                case 's': handleToolSelect({ id: 'sign' } as any); break;
                case 'r': handleToolSelect({ id: 'redact' } as any); break; 
                case 'e': handleToolSelect({ id: 'eraser' } as any); break;
                case 'i': handleToolSelect({ id: 'add_image' } as any); break;
                case 'm': handleToolSelect({ id: 'watermark' } as any); break;
                case 'c': handleToolSelect({ id: 'stamp_remover' } as any); break;
                case 'o': handleToolSelect({ id: 'reorder' } as any); break;
            }

        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Persistence
    useEffect(() => {
        const timeout = setTimeout(() => {
            (async () => {
                try { await (await import('../../store/useFileStore')).useFileStore.getState().persistState(); } catch (e) { }
            })();
        }, 700);
        return () => clearTimeout(timeout);
    }, [annotations, editableBlocks, pageRotations, pdfText]);

    useEffect(() => {
        if (modal.type === 'encrypt' && settings.defaultPassword) {
            setMInput1(settings.defaultPassword);
        }
    }, [modal.type, settings.defaultPassword]);

    // AI Hook
    const { 
        chatMessages, isThinking, isAIProcessing, 
        handleChatSendMessage, handleStampRemove, initializeChat 
    } = useAIActions({
        setStatusMsg,
        setMode,
    });
    // Document Actions Hook
    const { handleFile, executeDirectAction } = useDocumentActions({
        setIsBusy,
        setStatusMsg,
        setMode,
        setPendingImage,
        activePage,
        refs: {
            merge: mergeInputRef,
            image: imageInputRef,
            word: wordInputRef,
            modal: setModal
        }
    });

    const { bruteForceUnlock } = useSecurityActions({ setIsBusy, setStatusMsg });

    // Effect to init chat
    useEffect(() => {
        initializeChat();
    }, []);

    /* --- Editor Handlers --- */
    const handleToolSelect = (tool: Tool) => {
        if (tool.id === 'compare') {
            compareInputRef.current?.click();
            return;
        }
        if (['cursor', 'text', 'edit_text', 'draw', 'whiteout', 'eraser', 'stamp_remover', 'crop', 'redact', 'sign'].includes(tool.id)) {
            setMode(tool.id as EditorMode);
            if (tool.id !== 'cursor') setSelectedAnnId(null);
            if (window.innerWidth < 768) setSidebarOpen(false);
            return;
        }
        if (tool.requiresModal) {
            setMInput1(''); setMInput2(''); setHtmlInput('');
            setModal({ type: tool.id as any, isOpen: true });
            if (window.innerWidth < 768) setSidebarOpen(false);
            return;
        }
        if (tool.id === 'force_unlock') {
            bruteForceUnlock();
            return;
        }
        executeDirectAction(tool.id);
        if (window.innerWidth < 768) setSidebarOpen(false);
    };

    /**
     * Applies crop operation to a specific page
     */
    const handleCropApply = async (pageNum: number, rect: { x: number, y: number, w: number, h: number }) => {
        try {
            if (!file) return;
            setStatusMsg("Cropping... ✂️");
            const newBytes = await Edit.cropPage(file, pageNum - 1, rect);
            replaceFile(newBytes, 'cropped.pdf');
            setStatusMsg("Cropped! ✅");
            setMode('cursor');
        } catch (e) { console.error(e); toast.error("Crop failed", { description: (e as Error).message }); }
    };

    const handleModalSubmit = async () => {
        // ... (implementation to be refactored later, keeping for now) ...
        try {
            if (!file) return;
            let res: Uint8Array | null = null;
            let updateView = false;
            if (modal.type === 'split') {
                if (!mInput1 || !mInput2) return alert("Enter pages!");
                res = await Organize.splitPdf(file, Number(mInput1), Number(mInput2));
            } else if (modal.type === 'delete_page') {
                const pagesToDelete = mInput1.split(',').map(n => parseInt(n.trim()));
                res = await Organize.deletePages(file, pagesToDelete); updateView = true;
            } else if (modal.type === 'encrypt') {
                res = await Security.encryptPdf(file, mInput1, settings.permissions);
            } else if (modal.type === 'watermark') {
                res = await Edit.addWatermark(file, mInput1, drawColor); updateView = true;
            } else if (modal.type === 'metadata') {
                res = await Security.updateMetadata(file, { title: mInput1, author: mInput2 }); updateView = true;
            } else if (modal.type === 'html_to_pdf') {
                res = await Convert.htmlToPdf(htmlInput); replaceFile(res, 'web_convert.pdf'); setModal({ type: null, isOpen: false }); return;
            }
            if (res) {
                if (updateView) { replaceFile(res); setStatusMsg("Applied! 👍"); toast.success("Changes applied successfully"); } else {
                   import('@/features/editor/actions/downloadActions').then(m => m.downloadFile(res!, 'output.pdf')); // Dynamic import or just helper
                }
            }
            setModal({ type: null, isOpen: false });
        } catch (e) { console.error(e); toast.error("Action Failed", { description: (e as Error).message }); }
    };

    const handleExport = async (fileName: string, options: { password?: string, compression?: number }) => {
        try {
            setIsExportOpen(false); setStatusMsg("Saving... 💾");
            const { handleExportAction } = await import('@/features/editor/actions/downloadActions');
            await handleExportAction(file, fileName, { 
                fileName, 
                compressionLevel: options.compression || 80, 
                password: options.password 
            }, annotations, editableBlocks, pageRotations, settings.permissions);
            toast.success("Export successful!");
        } catch (e) { console.error(e); toast.error("Export Failed", { description: (e as Error).message }); }
    };



    const handleCompareFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) {
            setCompareFile(f);
            setMode('compare');
            setStatusMsg("Comparison Mode Active 👁️");
        }
    };

    // Helper for Text/Ann Updates
    // ...
    
    // ...
    // Return JSX
    // ...


    // Helper for Text/Ann Updates
    const handleAnnotationSelect = (ann: any) => {
        setSelectedAnnId(ann ? ann.id : null);
        if (ann) {
            if (ann.type === 'text') {
                setTextStyle({ fontFamily: ann.fontFamily || 'Helvetica', isBold: !!ann.isBold, isItalic: !!ann.isItalic, isUnderline: !!ann.isUnderline, align: ann.align || 'left', size: ann.size || 14 });
                setDrawColor(ann.color || '#000000');
            } else if (ann.type === 'drawing') { setDrawColor(ann.color || '#000000'); setBrushSize(ann.thickness || 2); }
        }
    };
    const handleTextStyleChange = (updater: any) => {
        setTextStyle((prev: any) => {
            const newState = typeof updater === 'function' ? updater(prev) : updater;
            if (mode === 'cursor' && selectedAnnId && selectedAnnotation?.type === 'text') updateAnnotation(selectedAnnId, newState);
            return newState;
        });
    };
    const handlePageClick = (pageNum: number) => {
        setActivePage(pageNum);
        const el = document.getElementById(`page-wrapper-${pageNum}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (isRestoring) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-foreground">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <h2 className="text-xl font-bold animate-pulse">Loading Workspace...</h2>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-full bg-background text-foreground">
            {/* Hidden Inputs */}
            <div style={{ display: 'none' }}>
                <input type="file" ref={mergeInputRef} onChange={(e) => handleFile(e, 'merge')} accept="application/pdf" />
                <input type="file" ref={imageInputRef} onChange={(e) => handleFile(e, 'image')} accept="image/*" />
                <input type="file" ref={wordInputRef} onChange={(e) => handleFile(e, 'word')} accept=".docx,.doc,image/*" />
                <input type="file" ref={compareInputRef} onChange={handleCompareFile} accept="application/pdf" />
            </div>

            {/* Header */}
            <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-background/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push('/')} className="hover:bg-muted p-2 rounded-full"><ChevronLeft className="w-5 h-5" /></button>
                    <div className="flex items-center gap-2 font-bold text-lg"><span className="text-primary">ExtraPDF</span> <span>Editor</span></div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"><Menu className="w-5 h-5" /></button>
                    <button onClick={() => setIsSettingsOpen(true)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full"><Settings2 className="w-5 h-5" /></button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* Tools Sidebar */}
                <div className={`absolute md:static inset-y-0 left-0 z-50 bg-background/95 backdrop-blur-xl border-r border-border transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-auto'} h-full flex flex-col shadow-2xl md:shadow-none`}>
                    <EditorSidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} activeToolId={mode} onToolSelect={handleToolSelect} />
                </div>

                {/* Thumbnails */}
                {mode !== 'compare' && (
                    <div className={`hidden md:block transition-all duration-300 overflow-hidden bg-muted/20 border-r border-border ${isThumbnailsOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
                        <ThumbnailSidebar onPageClick={handlePageClick} currentPageView={activePage} />
                    </div>
                )}

                {/* Editor Content */}
                <div className="flex-1 flex flex-col min-w-0 bg-muted/20 relative">
                    <EditorToolbar
                        mode={mode} selectedAnnotationType={selectedAnnotation ? (selectedAnnotation.type as any) : null}
                        zoom={zoom} setZoom={setZoom}
                        onAction={(a) => { if (a === 'merge_add') mergeInputRef.current?.click(); if (a === 'toggle_ai') setIsThinkingOpen(!isThinkingOpen); }}
                        onExport={() => setIsExportOpen(true)} status={statusMsg}
                        drawColor={drawColor} setDrawColor={(c) => { setDrawColor(c); if (mode === 'cursor' && selectedAnnId) updateAnnotation(selectedAnnId, { color: c }); }}
                        brushSize={brushSize} setBrushSize={(s) => { setBrushSize(s); if (mode === 'cursor' && selectedAnnId) updateAnnotation(selectedAnnId, { thickness: s, size: s }); }}
                        textStyle={textStyle} setTextStyle={handleTextStyleChange}
                        onUndo={undo} onRedo={redo}
                    />

                    <div className="flex-1 overflow-auto p-4 md:p-8 relative scroll-smooth bg-zinc-100 dark:bg-zinc-900/50" ref={scrollContainerRef}>
                        <div className="min-h-full flex flex-col items-center justify-start pb-20">
                            {mode === 'image' && pendingImage && (
                                <div className="sticky top-4 z-50 bg-primary text-white text-xs px-4 py-2 rounded-full shadow-lg animate-bounce pointer-events-none mb-4">Tap on document to drop image 📍</div>
                            )}
                            <Suspense fallback={<div className="flex-1 h-[85vh] flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin" /></div>}>

                            {/* Compare Mode Split View */}
                            {mode === 'compare' && compareFile ? (
                                <div className="flex w-full h-[85vh] gap-4">
                                    <div className="flex-1 border rounded-lg overflow-auto bg-white/50 relative shadow-inner custom-scrollbar">
                                        <div className="sticky top-2 left-2 z-10 bg-black/50 text-white px-2 rounded text-sm w-fit">Original</div>
                                        <div className="min-h-full p-4">
                                            <PDFCanvas zoom={zoom} setZoom={setZoom} mode='cursor' activePage={activePage} onPageSelect={setActivePage} pendingImage={null} onImagePlaced={() => { }} drawColor={drawColor} brushSize={brushSize} textStyle={textStyle} onStampRemove={() => { }} onAnnotationSelect={() => { }} onCropApply={() => { }} />
                                        </div>
                                    </div>
                                    <div className="flex-1 border rounded-lg overflow-hidden bg-white/50 relative shadow-inner flex flex-col">
                                        <div className="w-full h-10 bg-background border-b flex items-center justify-between px-4 z-10 shrink-0">
                                            <span className="font-bold text-xs truncate max-w-[200px]">{compareFile.name} (Preview)</span>
                                            <button onClick={() => { setMode('cursor'); setCompareFile(null); }} className="text-destructive text-xs font-bold hover:bg-destructive/10 px-2 py-1 rounded">Close</button>
                                        </div>
                                        <div className="flex-1 w-full bg-white">
                                            <iframe src={URL.createObjectURL(compareFile)} className="w-full h-full border-none" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <PDFCanvas
                                    zoom={zoom} setZoom={setZoom} mode={mode}
                                    activePage={activePage} onPageSelect={setActivePage}
                                    pendingImage={pendingImage} onImagePlaced={() => { setMode('cursor'); setPendingImage(null); }}
                                    drawColor={drawColor} brushSize={brushSize} textStyle={textStyle}
                                    onStampRemove={(p, r) => handleStampRemove(p, r)}
                                    onAnnotationSelect={handleAnnotationSelect}
                                    onCropApply={handleCropApply}
                                    />
                                )}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>

            <ThinkingSidebar isOpen={isThinkingOpen} onClose={() => setIsThinkingOpen(false)} messages={chatMessages} isThinking={isThinking} onSendMessage={handleChatSendMessage} />
            <ReorderDialog isOpen={modal.type === 'reorder'} onClose={() => setModal({ type: null, isOpen: false })} pageCount={numPages} onApply={async (order) => { try { setIsBusy(true); const newBytes = await Organize.reorderPages(file!, order); replaceFile(newBytes, 'reordered.pdf'); setStatusMsg("Pages Reordered 📑"); toast.success("Pages reordered"); } catch (e) { toast.error("Reorder Failed"); } finally { setIsBusy(false); setModal({ type: null, isOpen: false }); } }} />
            <ExportDialog isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} onExport={handleExport} defaultFileName={file?.name.replace('.pdf', '') || 'doc'} />

            <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

            {modal.isOpen && modal.type !== 'reorder' && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-background rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-in zoom-in-95 border border-border">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold capitalize flex items-center gap-2">
                                {modal.type === 'watermark' && <Stamp className="w-5 h-5 text-primary" />}
                                {modal.type === 'encrypt' && <Lock className="w-5 h-5 text-primary" />}
                                {modal.type === 'split' && <Scissors className="w-5 h-5 text-primary" />}
                                {modal.type?.replace('_', ' ')}
                            </h3>
                        </div>
                        {modal.type === 'split' && (
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">Enter the page range to extract (e.g., 1 to 5).</p>
                                <div className="flex gap-2">
                                    <input type="number" placeholder="Start" value={mInput1} onChange={e => setMInput1(e.target.value)} className="w-full bg-muted p-2 rounded-lg border border-input" />
                                    <input type="number" placeholder="End" value={mInput2} onChange={e => setMInput2(e.target.value)} className="w-full bg-muted p-2 rounded-lg border border-input" />
                                </div>
                            </div>
                        )}
                        {modal.type === 'delete_page' && (
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">Enter page numbers to delete, separated by commas (e.g., 1, 3, 5).</p>
                                <input type="text" placeholder="1, 3, 5" value={mInput1} onChange={e => setMInput1(e.target.value)} className="w-full bg-muted p-2 rounded-lg border border-input" />
                            </div>
                        )}
                        {modal.type === 'encrypt' && (
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">Set a password to protect this document.</p>
                                <input type="password" placeholder="Password" value={mInput1} onChange={e => setMInput1(e.target.value)} className="w-full bg-muted p-2 rounded-lg border border-input" />
                            </div>
                        )}
                        {modal.type === 'watermark' && (
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">Enter text for the watermark stamp.</p>
                                <input type="text" placeholder="CONFIDENTIAL" value={mInput1} onChange={e => setMInput1(e.target.value)} className="w-full bg-muted p-2 rounded-lg border border-input" />
                                <div className="flex items-center gap-2"><span className="text-xs font-medium">Color:</span><input type="color" value={drawColor} onChange={e => setDrawColor(e.target.value)} className="h-8 w-16 rounded cursor-pointer" /></div>
                            </div>
                        )}
                        {modal.type === 'metadata' && (
                            <div className="space-y-4">
                                <div className="space-y-2"><label className="text-xs font-bold text-muted-foreground uppercase">Title</label><input type="text" placeholder="Document Title" value={mInput1} onChange={e => setMInput1(e.target.value)} className="w-full bg-muted p-2 rounded-lg border border-input" /></div>
                                <div className="space-y-2"><label className="text-xs font-bold text-muted-foreground uppercase">Author</label><input type="text" placeholder="Author Name" value={mInput2} onChange={e => setMInput2(e.target.value)} className="w-full bg-muted p-2 rounded-lg border border-input" /></div>
                            </div>
                        )}
                        {modal.type === 'html_to_pdf' && (
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">Paste HTML code to convert to PDF.</p>
                                <textarea value={htmlInput} onChange={e => setHtmlInput(e.target.value)} placeholder="<h1>Hello World</h1>" className="w-full h-32 bg-muted p-2 rounded-lg border border-input font-mono text-xs" />
                            </div>
                        )}
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setModal({ type: null, isOpen: false })} className="px-4 py-2 rounded-lg hover:bg-muted font-medium text-sm transition-colors">Cancel</button>
                            <button onClick={handleModalSubmit} className="px-6 py-2 bg-primary text-white rounded-lg shadow-lg shadow-primary/20 text-sm font-bold hover:scale-105 transition-transform">Apply</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};