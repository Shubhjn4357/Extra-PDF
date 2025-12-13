"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PDFCanvas } from './PDFCanvas';
import { useFileStore } from '@/store/useFileStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { EditorSidebar } from './components/EditorSidebar';
import { ThumbnailSidebar } from './components/ThumbnailSidebar';
import { EditorToolbar } from './components/EditorToolbar';
import { ReorderDialog } from './components/ReorderDialog';
import { ThinkingSidebar } from './ThinkingSidebar';
import { ExportDialog, ExportOptions } from '@/components/ui/ExportDialog';
import { SettingsDialog } from '@/components/ui/SettingsDialog';
import { EditorMode, Tool, ToolCategory, ModalState, ChatMessage } from '@/types';
import { Menu, Settings2, Scissors, Stamp, Lock, Loader2, ChevronLeft } from 'lucide-react';
import { createChatSession, streamResponse } from '@/services/geminiService';
import { buildFinalPrompt, generateMaskBase64 } from '@/services/editorHelpers';

// Import Modular Tools
import * as Organize from '@/services/tools/organizeTools';
import * as Edit from '@/services/tools/editTools';
import * as Security from '@/services/tools/securityTools';
import * as Convert from '@/services/tools/convertTools';
import * as Optimize from '@/services/tools/optimizeTools';
import { detectStamps, removeStampWithMask } from '@/services/geminiService';

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
    const [isAIProcessing, setIsAIProcessing] = useState(false);

    // Selection State
    const [selectedAnnId, setSelectedAnnId] = useState<string | null>(null);
    const selectedAnnotation = annotations.find(a => a.id === selectedAnnId);

    // Chat State
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const chatSessionRef = useRef<any>(null);
    const isFirstMsgRef = useRef(true);

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

        chatSessionRef.current = createChatSession();

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

            switch (e.key.toLowerCase()) {
                case 'v': case 'escape': handleToolSelect({ id: 'cursor' } as any); break;
                case 't': handleToolSelect({ id: 'text' } as any); break;
                case 'd': handleToolSelect({ id: 'draw' } as any); break;
                case 'w': handleToolSelect({ id: 'whiteout' } as any); break;
                case 'x': handleToolSelect({ id: 'crop' } as any); break;
                case 's': handleToolSelect({ id: 'sign' } as any); break;
                case 'r': handleToolSelect({ id: 'replace' } as any); break; 
                case 'e': handleToolSelect({ id: 'eraser' } as any); break;
                case 'i': handleToolSelect({ id: 'add_image' } as any); break;
                case 'm': handleToolSelect({ id: 'watermark' } as any); break;
                case 'c': handleToolSelect({ id: 'stamp_remover' } as any); break;
                case 'o': handleToolSelect({ id: 'reorder' } as any); break;
                case 'p': if (e.altKey) handleToolSelect({ id: 'split' } as any); break;
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

    /* --- Chat & AI Implementation --- */
    const handleChatSendMessage = async (text: string) => {
        if (!chatSessionRef.current) return;
        setIsThinking(true);
        const userMsgId = Date.now().toString();
        setChatMessages(prev => [...prev, { id: userMsgId, role: 'user', text }]);

        const finalPrompt = buildFinalPrompt(pdfText, text, isFirstMsgRef.current, settings);
        isFirstMsgRef.current = false;

        const modelMsgId = (Date.now() + 1).toString();
        setChatMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '' }]);

        await streamResponse(
            chatSessionRef.current,
            finalPrompt,
            (chunk) => {
                setChatMessages(prev => prev.map(m => m.id === modelMsgId ? { ...m, text: m.text + chunk } : m));
            },
            async (toolCall) => await handleAIToolExecution(toolCall)
        );
        setIsThinking(false);
    };

    const handleAIToolExecution = async (toolCall: any) => {
        const { name, args } = toolCall;
        console.log(`[AI Tool] Executing ${name}`, args);
        try {
            switch (name) {
                case 'edit_pdf_add_text':
                    addAnnotation({
                        id: Date.now().toString(), page: args.page, type: 'text', x: args.x || 100, y: args.y || 100, text: args.text, color: args.color || '#000000', size: args.fontSize || 14
                    });
                    return "Text added successfully.";
                case 'clean_page_image':
                    await handleStampRemove(args.page);
                    return "Stamp removal process completed.";
                case 'organize_rotate_page':
                    rotatePage(args.page);
                    return `Page ${args.page} rotated.`;
                case 'organize_delete_page':
                    if (args.pages && args.pages.length > 0) {
                        setIsAIProcessing(true);
                        const newBytes = await Organize.deletePages(file!, args.pages);
                        replaceFile(newBytes);
                        setIsAIProcessing(false);
                        return `Pages ${args.pages.join(', ')} deleted.`;
                    }
                    return "No pages specified.";
                case 'get_page_count':
                    return `The document has ${numPages} pages.`;
                default:
                    return "Tool not implemented.";
            }
        } catch (e) {
            console.error("AI Tool Execution Error", e);
            setIsAIProcessing(false);
            return "Error executing tool.";
        }
    };

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
        executeDirectAction(tool.id);
        if (window.innerWidth < 768) setSidebarOpen(false);
    };

    const executeDirectAction = async (id: string) => {
        try {
            if (!file) return;
            switch (id) {
                case 'rotate': rotatePage(activePage); setStatusMsg(`Page ${activePage} Rotated 🔄`); break;
                case 'merge': mergeInputRef.current?.click(); break;
                case 'add_image': imageInputRef.current?.click(); break;
                case 'word_to_pdf': wordInputRef.current?.click(); break;
                case 'compress':
                    setStatusMsg("Compressing PDF... 🗜️");
                    try {
                        const compressedBytes = await Optimize.compressPdf(file);
                        replaceFile(compressedBytes, file.name.replace('.pdf', '_compressed.pdf'));
                        setStatusMsg("Compressed! 📉");
                        // Also persist this change to history? replaceFile clears history currently.
                        // Ideally compress should add to history, but replaceFile logic implies new doc.
                    } catch (e) { alert("Compression Failed"); }
                    break;
                case 'remove_empty':
                    setStatusMsg("Scanning for blank pages... 🔍");
                    const { pdfBytes, removedCount } = await Organize.removeEmptyPages(file);
                    if (pdfBytes && removedCount > 0) {
                        replaceFile(pdfBytes);
                        setStatusMsg(`Removed ${removedCount} empty pages 🗑️`);
                    } else { setStatusMsg("No empty pages found 🤷"); }
                    break;
                case 'flatten':
                    replaceFile(await Security.flattenPdf(file), 'flattened.pdf'); setStatusMsg("PDF Flattened 📄"); break;
                case 'repair':
                    setStatusMsg("Repairing... 🔧"); replaceFile(await Convert.repairPdf(file), 'repaired.pdf'); setStatusMsg("PDF Repaired ✅"); break;
                case 'page_numbers':
                    replaceFile(await Organize.addPageNumbers(file), 'numbered.pdf'); setStatusMsg("Added Numbers 🔢"); break;
                case 'pdf_to_word': download(await Convert.createDocxFromText(pdfText), 'converted.docx'); break;
                case 'pdf_to_excel': setStatusMsg("Extracting Tables... 📊"); download(await Convert.createXlsxFromPdf(file), 'tables.xlsx'); break;
                case 'pdf_to_ppt': setStatusMsg("Creating Slides... 🎞️"); download(await Convert.createPptxFromPdf(file), 'presentation.pptx'); break;
                case 'ocr_pdf': setStatusMsg("Scanning... 👁️"); download(new Blob([await Convert.ocrPdf(file)], { type: 'text/plain' }), 'extracted_text.txt'); break;
                case 'pdf_to_jpg':
                    setStatusMsg("Converting... 🖼️");
                    const imgs = await Convert.pdfToImages(file);
                    if (imgs.length > 0) {
                        const a = document.createElement('a'); a.href = imgs[0]; a.download = `page_1.jpg`; a.click(); setStatusMsg('Saved JPG ✅');
                    } break;
                case 'unlock':
                    setStatusMsg("Removing Password... 🔓");
                    const unlockedBytes = await file.arrayBuffer();
                    download(new Uint8Array(unlockedBytes), 'unlocked.pdf'); // Assuming file in memory is decrypted
                    break;
            }
        } catch (e) { console.error(e); alert('Action Failed: ' + (e as Error).message); }
    };

    const handleStampRemove = async (pageNum: number, rect?: { x: number, y: number, w: number, h: number }) => {
        if (!file) return;
        setIsAIProcessing(true);
        setStatusMsg(rect ? "AI Inpainting: Removing area..." : "AI Vision: Auto-detecting artifacts...");
        try {
            const imgBase64 = await Convert.getPageImage(file, pageNum);
            let boxes: any[] = [];
            if (rect) {
                const scale = 1.5; 
                boxes = [{ x: Math.floor(rect.x * scale), y: Math.floor(rect.y * scale), w: Math.floor(rect.w * scale), h: Math.floor(rect.h * scale) }];
            } else {
                const autoBoxes = await detectStamps(imgBase64);
                if (autoBoxes.length === 0) { setIsAIProcessing(false); setStatusMsg("AI: No stamps detected."); return; }
                const imgObj = new Image(); imgObj.src = imgBase64; await imgObj.decode();
                boxes = autoBoxes.map(b => ({ x: Math.floor(b.x * imgObj.width), y: Math.floor(b.y * imgObj.height), w: Math.floor(b.width * imgObj.width), h: Math.floor(b.height * imgObj.height) }));
            }
            const maskBase64 = await generateMaskBase64(imgBase64, boxes);
            const cleanedImage = await removeStampWithMask(imgBase64, maskBase64);
            if (!cleanedImage) throw new Error("AI returned no image");
            const newPdfBytes = await Edit.replacePageWithImage(file, pageNum - 1, cleanedImage);
            replaceFile(newPdfBytes, "cleaned.pdf");
            setIsAIProcessing(false); setStatusMsg("Cleaned Page Replaced ✨"); setMode('cursor');
        } catch (e) { console.error("Stamp Removal Error", e); setIsAIProcessing(false); setStatusMsg("AI Error: Removal Failed."); }
    };

    // Handlers needed for children
    const handleCropApply = async (pageNum: number, rect: { x: number, y: number, w: number, h: number }) => {
        try {
            if (!file) return;
            setStatusMsg("Cropping... ✂️");
            const newBytes = await Edit.cropPage(file, pageNum - 1, rect);
            replaceFile(newBytes, 'cropped.pdf');
            setStatusMsg("Cropped! ✅");
            setMode('cursor');
        } catch (e) { console.error(e); alert("Crop failed"); }
    };

    const handleModalSubmit = async () => {
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
                if (updateView) { replaceFile(res); setStatusMsg("Applied! 👍"); } else download(res, 'output.pdf');
            }
            setModal({ type: null, isOpen: false });
        } catch (e) { console.error(e); alert('Error: ' + (e as Error).message); }
    };

    const handleExport = async (fileName: string, options: ExportOptions) => {
        try {
            if (!file) return;
            setIsExportOpen(false); setStatusMsg("Saving... 💾");
            const blockAnnotations: any[] = [];
            editableBlocks.filter(b => b.isDirty).forEach(block => {
                blockAnnotations.push({ id: `wo_${block.id}`, page: block.page, type: 'whiteout', x: block.x, y: block.y, width: block.width, height: block.height });
                blockAnnotations.push({ id: `txt_${block.id}`, page: block.page, type: 'text', x: block.x, y: block.y, text: block.text, size: block.fontSize, fontFamily: block.fontFamily, color: '#000000' });
            });
            const allAnnotations = [...annotations, ...blockAnnotations];
            let finalBytes = await Edit.saveAnnotations(file, allAnnotations, pageRotations);
            if (options.password) {
                const blob = new Blob([Buffer.from(finalBytes)], { type: 'application/pdf' });
                const tempFile = new File([blob], fileName, { type: 'application/pdf' });
                finalBytes = await Security.encryptPdf(tempFile, options.password, settings.permissions);
            }
            download(finalBytes, fileName);
        } catch (e) { console.error(e); alert("Export failed: " + (e as Error).message); }
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>, type: 'merge' | 'image' | 'word') => {
        const f = e.target.files?.[0];
        if (!f || !file) return;
        if (type === 'merge') {
            const res = await Organize.mergePdfs(file, f);
            replaceFile(res, 'merged.pdf'); setStatusMsg("Merged! 🔗");
        } else if (type === 'word') {
            try {
                setStatusMsg("Converting Word... 📄");
                const pdfBytes = await Convert.convertImageOrOfficeToPdf(f);
                replaceFile(pdfBytes, f.name.replace('.docx', '.pdf')); setStatusMsg("Converted! ✅");
            } catch (e) { alert("Conversion Failed"); }
        } else {
            const reader = new FileReader();
            reader.onload = (ev) => { setPendingImage(ev.target?.result as string); setMode('image'); setStatusMsg("Tap to place image 📍"); };
            reader.readAsDataURL(f);
        }
    };

    const handleCompareFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) {
            setCompareFile(f);
            setMode('compare');
            setStatusMsg("Comparison Mode Active 👁️");
        }
    };

    const download = (data: Blob | Uint8Array, name: string) => {
        const blob = data instanceof Blob ? data : new Blob([Buffer.from(data as Uint8Array)]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a'); link.href = url; link.download = name;
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        setStatusMsg(`Saved ${name} 🎉`); setTimeout(() => setStatusMsg(''), 3000);
    };

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
                                    onStampRemove={handleStampRemove}
                                    onAnnotationSelect={handleAnnotationSelect}
                                    onCropApply={handleCropApply}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ThinkingSidebar isOpen={isThinkingOpen} onClose={() => setIsThinkingOpen(false)} messages={chatMessages} isThinking={isThinking} onSendMessage={handleChatSendMessage} />
            <ReorderDialog isOpen={modal.type === 'reorder'} onClose={() => setModal({ type: null, isOpen: false })} pageCount={numPages} onApply={async (order) => { try { setIsAIProcessing(true); const newBytes = await Organize.reorderPages(file!, order); replaceFile(newBytes, 'reordered.pdf'); setStatusMsg("Pages Reordered 📑"); } catch (e) { alert("Reorder Failed"); } finally { setIsAIProcessing(false); setModal({ type: null, isOpen: false }); } }} />
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