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
import { ChevronLeft, Menu, Settings2, Scissors, PanelLeftClose, PanelLeftOpen, Stamp, Lock, Sparkles, Loader2, Bot } from 'lucide-react';
import { createChatSession, detectStamps, streamResponse, prepareDocumentPrompt, removeStampWithMask } from '@/services/geminiService';
import { buildFinalPrompt, generateMaskBase64 } from '@/services/editorHelpers';


// Import Modular Tools
import * as Organize from '@/services/tools/organizeTools';
import * as Edit from '@/services/tools/editTools';
import * as Security from '@/services/tools/securityTools';
import * as Convert from '@/services/tools/convertTools';

export const EditorPage: React.FC = () => {
    const router = useRouter();
    const { file, replaceFile, addAnnotation, annotations, updateAnnotation, rotatePage, pdfText, numPages, pageRotations, removeAnnotation, editableBlocks, isRestoring } = useFileStore();

    const { settings } = useSettingsStore();

    // View State
    const [zoom, setZoom] = useState(1);
    const [mode, setMode] = useState<EditorMode>('cursor');
    const [activeCategory, setActiveCategory] = useState<ToolCategory>('edit');
    const [statusMsg, setStatusMsg] = useState('');
    const [activePage, setActivePage] = useState(1);

    // UI State
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isThumbnailsOpen, setThumbnailsOpen] = useState(true);
    const [isThinkingOpen, setIsThinkingOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isAIProcessing, setIsAIProcessing] = useState(false); // NEW: Global AI Loading State

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
    const [pendingImage, setPendingImage] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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

        // Restore
        (async () => {
            // restoreState is now idempotent and handles isRestoring
            if (useFileStore.getState().isRestoring) {
                await useFileStore.getState().restoreState();
            }
        })();
    }, []);

    // Persist file state when annotations/blocks change (debounced)
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

        // Optimistic UI update
        setChatMessages(prev => [...prev, { id: userMsgId, role: 'user', text }]);

        const finalPrompt = buildFinalPrompt(pdfText, text, isFirstMsgRef.current, settings);
        isFirstMsgRef.current = false;

        // Placeholder for model response
        const modelMsgId = (Date.now() + 1).toString();
        setChatMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '' }]);

        await streamResponse(
            chatSessionRef.current,
            finalPrompt,
            (chunk) => {
                setChatMessages(prev => prev.map(m =>
                    m.id === modelMsgId ? { ...m, text: m.text + chunk } : m
                ));
            },
            async (toolCall) => {
                // Intercept tool calls from Gemini
                return await handleAIToolExecution(toolCall);
            }
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
                        id: Date.now().toString(),
                        page: args.page,
                        type: 'text',
                        x: args.x || 100,
                        y: args.y || 100,
                        text: args.text,
                        color: args.color || '#000000',
                        size: args.fontSize || 14
                    });
                    return "Text added successfully.";

                case 'clean_page_image':
                    // Trigger the visual stamp removal process
                    // Default to page center if no interaction? AI auto-detect
                    await handleStampRemove(args.page);
                    return "Stamp removal process completed.";

                case 'organize_rotate_page':
                    rotatePage(args.page);
                    return `Page ${args.page} rotated.`;

                case 'organize_delete_page':
                    if (args.pages && args.pages.length > 0) {
                        // We need to actually replace the file, which is async
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
                case 'rotate':
                    rotatePage(activePage);
                    setStatusMsg(`Page ${activePage} Rotated 🔄`);
                    break;
                case 'merge': mergeInputRef.current?.click(); break;
                case 'add_image': imageInputRef.current?.click(); break;
                case 'word_to_pdf': wordInputRef.current?.click(); break;
                case 'remove_empty':
                    setStatusMsg("Scanning for blank pages... 🔍");
                    const { pdfBytes, removedCount } = await Organize.removeEmptyPages(file);
                    if (pdfBytes && removedCount > 0) {
                        replaceFile(pdfBytes);
                        setStatusMsg(`Removed ${removedCount} empty pages 🗑️`);
                    } else {
                        setStatusMsg("No empty pages found 🤷");
                    }
                    break;
                case 'flatten':
                    replaceFile(await Security.flattenPdf(file), 'flattened.pdf');
                    setStatusMsg("PDF Flattened 📄"); break;
                case 'repair':
                    setStatusMsg("Repairing... 🔧");
                    replaceFile(await Convert.repairPdf(file), 'repaired.pdf');
                    setStatusMsg("PDF Repaired ✅"); break;
                case 'page_numbers':
                    replaceFile(await Organize.addPageNumbers(file), 'numbered.pdf');
                    setStatusMsg("Added Numbers 🔢"); break;
                case 'pdf_to_word':
                    download(await Convert.createDocxFromText(pdfText), 'converted.docx'); break;
                case 'pdf_to_excel':
                    setStatusMsg("Extracting Tables... 📊");
                    download(await Convert.createXlsxFromPdf(file), 'tables.xlsx'); break;
                case 'pdf_to_ppt':
                    setStatusMsg("Creating Slides... 🎞️");
                    download(await Convert.createPptxFromPdf(file), 'presentation.pptx'); break;
                case 'ocr_pdf':
                    setStatusMsg("Scanning... 👁️");
                    const text = await Convert.ocrPdf(file);
                    download(new Blob([text], { type: 'text/plain' }), 'extracted_text.txt'); break;
                case 'pdf_to_jpg':
                    setStatusMsg("Converting... 🖼️");
                    const imgs = await Convert.pdfToImages(file);
                    if (imgs.length > 0) {
                        const a = document.createElement('a');
                        a.href = imgs[0]; a.download = `page_1.jpg`; a.click();
                        setStatusMsg('Saved JPG ✅');
                    } break;
            }
        } catch (e) { console.error(e); alert('Action Failed: ' + (e as Error).message); }
    };

    const handleAnnotationSelect = (ann: any | null) => {
        setSelectedAnnId(ann ? ann.id : null);
        if (ann) {
            if (ann.type === 'text') {
                setTextStyle({
                    fontFamily: ann.fontFamily || 'Helvetica',
                    isBold: !!ann.isBold, isItalic: !!ann.isItalic, isUnderline: !!ann.isUnderline,
                    align: ann.align || 'left', size: ann.size || 14
                });
                setDrawColor(ann.color || '#000000');
            } else if (ann.type === 'drawing') {
                setDrawColor(ann.color || '#000000');
                setBrushSize(ann.thickness || 2);
            }
        }
    };

    const handleTextStyleChange = (updater: any) => {
        setTextStyle((prev: any) => {
            const newState = typeof updater === 'function' ? updater(prev) : updater;
            if (mode === 'cursor' && selectedAnnId && selectedAnnotation?.type === 'text') {
                updateAnnotation(selectedAnnId, newState);
            }
            return newState;
        });
    };

    const handlePageClick = (pageNum: number) => {
        setActivePage(pageNum);
        const el = document.getElementById(`page-wrapper-${pageNum}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // REAL AI STAMP REMOVAL (INPAINTING)
    const handleStampRemove = async (pageNum: number, rect?: { x: number, y: number, w: number, h: number }) => {
        if (!file) return;

        setIsAIProcessing(true);
        setStatusMsg(rect ? "AI Inpainting: Removing area..." : "AI Vision: Auto-detecting artifacts...");

        try {
            // 1. Get Page Image (High Res)
            const imgBase64 = await Convert.getPageImage(file, pageNum);

            let boxes: any[] = [];

            // 2. Logic: If rect provided (manual drag), use it. Else auto-detect.
            if (rect) {
                // Convert PDF point coords (595 width) to 0-1 normalized for mask generation logic later if needed
                // But our helper 'createMask' below needs pixel matching.
                // Convert.getPageImage uses scale 1.5 (~892px width).
                // We need to map 'rect' (PDF points) to Image Pixels.
                const pdfWidth = 595;
                const scale = 1.5; // From Convert.getPageImage logic

                boxes = [{
                    x: Math.floor(rect.x * scale),
                    y: Math.floor(rect.y * scale),
                    w: Math.floor(rect.w * scale),
                    h: Math.floor(rect.h * scale)
                }];
            } else {
                // Auto-detect using Vision (Old Logic)
                const autoBoxes = await detectStamps(imgBase64);
                if (autoBoxes.length === 0) {
                    setIsAIProcessing(false);
                    setStatusMsg("AI: No stamps detected.");
                    return;
                }
                // Map normalized 0-1 to pixels
                const imgObj = new Image();
                imgObj.src = imgBase64;
                await imgObj.decode();
                boxes = autoBoxes.map(b => ({
                    x: Math.floor(b.x * imgObj.width),
                    y: Math.floor(b.y * imgObj.height),
                    w: Math.floor(b.width * imgObj.width),
                    h: Math.floor(b.height * imgObj.height)
                }));
            }

            // 3. Generate Mask (centralized helper supports pixel or normalized boxes)
            const maskBase64 = await generateMaskBase64(imgBase64, boxes);

            // 4. Call Gemini Inpainting
            const cleanedImage = await removeStampWithMask(imgBase64, maskBase64);

            if (!cleanedImage) throw new Error("AI returned no image");

            // 5. Replace PDF Page
            const newPdfBytes = await Edit.replacePageWithImage(file, pageNum - 1, cleanedImage);
            replaceFile(newPdfBytes, "cleaned.pdf");

            setIsAIProcessing(false);
            setStatusMsg("Cleaned Page Replaced ✨");
            setMode('cursor');

        } catch (e) {
            console.error("Stamp Removal Error", e);
            setIsAIProcessing(false);
            setStatusMsg("AI Error: Removal Failed.");
        }
    };

    const handleCropApply = async (pageNum: number, rect: { x: number, y: number, w: number, h: number }) => {
        try {
            if (!file) return;
            setStatusMsg("Cropping... ✂️");
            const newBytes = await Edit.cropPage(file, pageNum - 1, rect);
            replaceFile(newBytes, 'cropped.pdf');
            setStatusMsg("Cropped! ✅");
            setMode('cursor');
        } catch (e) {
            console.error(e);
            alert("Crop failed: " + (e as Error).message);
        }
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
                res = await Organize.deletePages(file, pagesToDelete);
                updateView = true;
            } else if (modal.type === 'encrypt') {
                res = await Security.encryptPdf(file, mInput1, settings.permissions);
            } else if (modal.type === 'watermark') {
                res = await Edit.addWatermark(file, mInput1, drawColor);
                updateView = true;
            } else if (modal.type === 'metadata') {
                res = await Security.updateMetadata(file, { title: mInput1, author: mInput2 });
                updateView = true;
            } else if (modal.type === 'html_to_pdf') {
                res = await Convert.htmlToPdf(htmlInput);
                replaceFile(res, 'web_convert.pdf');
                setModal({ type: null, isOpen: false });
                return;
            }

            if (res) {
                if (updateView) { replaceFile(res); setStatusMsg("Applied! 👍"); }
                else download(res, 'output.pdf');
            }
            setModal({ type: null, isOpen: false });
        } catch (e) { console.error(e); alert('Error: ' + (e as Error).message); }
    };

    const handleExport = async (fileName: string, options: ExportOptions) => {
        try {
            if (!file) return;
            setIsExportOpen(false);
            setStatusMsg("Saving... 💾");

            // 1. Convert dirty blocks to whiteout + text annotations
            const blockAnnotations: any[] = [];
            editableBlocks.filter(b => b.isDirty).forEach(block => {
                // Whiteout the original area
                blockAnnotations.push({
                    id: `wo_${block.id}`,
                    page: block.page,
                    type: 'whiteout',
                    x: block.x,
                    y: block.y,
                    width: block.width,
                    height: block.height
                });
                // Add new text on top
                blockAnnotations.push({
                    id: `txt_${block.id}`,
                    page: block.page,
                    type: 'text',
                    x: block.x,
                    y: block.y,
                    text: block.text,
                    size: block.fontSize,
                    fontFamily: block.fontFamily,
                    color: '#000000'
                });
            });

            // Merge normal annotations + block overrides
            const allAnnotations = [...annotations, ...blockAnnotations];

            let finalBytes = await Edit.saveAnnotations(file, allAnnotations, pageRotations);

            if (options.password) {
                const blob = new Blob([Buffer.from(finalBytes)], { type: 'application/pdf' });
                const tempFile = new File([blob], fileName, { type: 'application/pdf' });
                finalBytes = await Security.encryptPdf(tempFile, options.password, settings.permissions);
            }
            download(finalBytes, fileName);
        } catch (e) {
            console.error(e);
            alert("Export failed: " + (e as Error).message);
        }
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>, type: 'merge' | 'image' | 'word') => {
        const f = e.target.files?.[0];
        if (!f || !file) return;

        if (type === 'merge') {
            const res = await Organize.mergePdfs(file, f);
            replaceFile(res, 'merged.pdf'); replaceFile(res, 'merged.pdf'); setStatusMsg("Merged! 🔗");
        } else if (type === 'word') {
            try {
                setStatusMsg("Converting Word... 📄");
                const pdfBytes = await Convert.convertImageOrOfficeToPdf(f);
                replaceFile(pdfBytes, f.name.replace('.docx', '.pdf')); setStatusMsg("Converted! ✅");
            } catch (e) { alert("Conversion Failed"); }
        } else {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setPendingImage(ev.target?.result as string); setMode('image'); setStatusMsg("Tap to place image 📍");
            };
            reader.readAsDataURL(f);
        }
    };

    const download = (data: Blob | Uint8Array, name: string) => {
        const blob = data instanceof Blob ? data : new Blob([Buffer.from(data as Uint8Array)]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url; link.download = name;
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        setStatusMsg(`Saved ${name} 🎉`);
        setTimeout(() => setStatusMsg(''), 3000);
    };

    if (isRestoring) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-foreground">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <h2 className="text-xl font-bold animate-pulse">Loading Workspace...</h2>
                <p className="text-muted-foreground text-sm mt-2">Restoring your document</p>
            </div>
        );
    }

    if (!file) return null;

    return (
        <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden relative">
            <input type="file" ref={mergeInputRef} className="hidden" accept=".pdf" onChange={e => handleFile(e, 'merge')} />
            <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={e => handleFile(e, 'image')} />
            <input type="file" ref={wordInputRef} className="hidden" accept=".docx,.pptx,.xlsx" onChange={e => handleFile(e, 'word')} />

            {/* AI Processing Overlay */}
            {isAIProcessing && (
                <div className="absolute inset-0 z-[200] bg-background/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <div className="relative">
                        <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                        </div>
                    </div>
                    <h3 className="mt-8 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 animate-pulse">
                        Generative AI Processing
                    </h3>
                    <p className="text-muted-foreground mt-2">Scrubbing document and restructuring pixels...</p>
                </div>
            )}

            {/* 1. HEADER */}
            <div className="h-14 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-white/20 flex items-center px-4 justify-between shrink-0 z-40 shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.push('/')} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold truncate max-w-[150px] md:max-w-xs leading-none">{file.name}</span>
                        <span className="text-[10px] text-muted-foreground">{numPages} Pages</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setThumbnailsOpen(!isThumbnailsOpen)} className="hidden md:block p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10" title="Toggle Page Thumbnails">
                        {isThumbnailsOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
                    </button>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
                        <Menu className="w-5 h-5" />
                    </button>
                    <button onClick={() => setIsSettingsOpen(true)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full"><Settings2 className="w-5 h-5" /></button>
                </div>
            </div>

            {/* 2. MAIN WORKSPACE */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* Tools Sidebar */}
                <div className={`
                absolute md:static inset-y-0 left-0 z-50
                bg-background/95 backdrop-blur-xl border-r border-border
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-auto'}
                h-full flex flex-col shadow-2xl md:shadow-none
            `}>
                    <EditorSidebar
                        activeCategory={activeCategory} setActiveCategory={setActiveCategory}
                        activeToolId={mode} onToolSelect={handleToolSelect}
                    />
                </div>

                {/* Thumbnails Sidebar (Desktop) */}
                <div className={`
                hidden md:block transition-all duration-300 overflow-hidden bg-muted/20 border-r border-border
                ${isThumbnailsOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}
            `}>
                    <ThumbnailSidebar onPageClick={handlePageClick} currentPageView={activePage} />
                </div>

                {/* Editor Content */}
                <div className="flex-1 flex flex-col min-w-0 bg-muted/20 relative">
                    <EditorToolbar
                        mode={mode} selectedAnnotationType={selectedAnnotation ? (selectedAnnotation.type as any) : null}
                        zoom={zoom} setZoom={setZoom}
                        onAction={(a) => { if (a === 'merge_add') mergeInputRef.current?.click(); if (a === 'toggle_ai') setIsThinkingOpen(!isThinkingOpen); }}
                        onExport={() => setIsExportOpen(true)}
                        status={statusMsg}
                        drawColor={drawColor} setDrawColor={(c) => { setDrawColor(c); if (mode === 'cursor' && selectedAnnId) updateAnnotation(selectedAnnId, { color: c }); }}
                        brushSize={brushSize} setBrushSize={(s) => { setBrushSize(s); if (mode === 'cursor' && selectedAnnId) updateAnnotation(selectedAnnId, { thickness: s, size: s }); }}
                        textStyle={textStyle} setTextStyle={handleTextStyleChange}
                    />

                    <div className="flex-1 overflow-auto p-4 md:p-8 relative scroll-smooth bg-zinc-100 dark:bg-zinc-900/50" ref={scrollContainerRef}>
                        <div className="min-h-full flex flex-col items-center justify-start pb-20">
                            {mode === 'image' && pendingImage && (
                                <div className="sticky top-4 z-50 bg-primary text-white text-xs px-4 py-2 rounded-full shadow-lg animate-bounce pointer-events-none mb-4">
                                    Tap on document to drop image 📍
                                </div>
                            )}
                            <PDFCanvas
                                zoom={zoom} setZoom={setZoom} mode={mode}
                                activePage={activePage} onPageSelect={setActivePage}
                                pendingImage={pendingImage} onImagePlaced={() => { setMode('cursor'); setPendingImage(null); }}
                                drawColor={drawColor} brushSize={brushSize} textStyle={textStyle}
                                onStampRemove={handleStampRemove}
                                onAnnotationSelect={handleAnnotationSelect}
                                onCropApply={handleCropApply}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ThinkingSidebar
                isOpen={isThinkingOpen}
                onClose={() => setIsThinkingOpen(false)}
                messages={chatMessages}
                isThinking={isThinking}
                onSendMessage={handleChatSendMessage}
            />

            <ReorderDialog isOpen={modal.type === 'reorder'} onClose={() => setModal({ type: null, isOpen: false })} pageCount={numPages} onApply={async (order) => { /*...*/ }} />
            <ExportDialog isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} onExport={handleExport} defaultFileName={file.name.replace('.pdf', '')} />
            <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

            {/* Modals */}
            {modal.isOpen && modal.type !== 'reorder' && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-background rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-in zoom-in-95 border border-border">
                        {/* Dynamic Modal Content */}
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
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium">Color:</span>
                                    <input type="color" value={drawColor} onChange={e => setDrawColor(e.target.value)} className="h-8 w-16 rounded cursor-pointer" />
                                </div>
                            </div>
                        )}

                        {modal.type === 'metadata' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase">Title</label>
                                    <input type="text" placeholder="Document Title" value={mInput1} onChange={e => setMInput1(e.target.value)} className="w-full bg-muted p-2 rounded-lg border border-input" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase">Author</label>
                                    <input type="text" placeholder="Author Name" value={mInput2} onChange={e => setMInput2(e.target.value)} className="w-full bg-muted p-2 rounded-lg border border-input" />
                                </div>
                            </div>
                        )}

                        {modal.type === 'html_to_pdf' && (
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">Paste HTML code to convert to PDF.</p>
                                <textarea
                                    value={htmlInput}
                                    onChange={e => setHtmlInput(e.target.value)}
                                    placeholder="<h1>Hello World</h1>"
                                    className="w-full h-32 bg-muted p-2 rounded-lg border border-input font-mono text-xs"
                                />
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