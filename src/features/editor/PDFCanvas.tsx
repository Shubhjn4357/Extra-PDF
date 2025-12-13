"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { pdfjs ,Document,Page} from 'react-pdf';
// Dynamic Import for PDF Components to avoid SSR/Worker issues
const PDFDocument = dynamic(async () => {
    if (typeof window !== 'undefined') pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    return Document;
}, { ssr: false });
const PDFPage = dynamic(async () => {
    return Page;
}, { ssr: false });

import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useFileStore } from '@/store/useFileStore';
import { EditorMode } from '@/types';
import { ContextMenu } from './ContextMenu';
import { Maximize2, ZoomIn, ZoomOut, ScanText } from 'lucide-react';
import { TextBlock } from './components/TextBlock';
import SinglePage from './components/SinglePage';

interface PDFCanvasProps {
    zoom: number;
    setZoom: (z: number) => void;
    mode: EditorMode;
    activePage?: number;
    onPageSelect?: (page: number) => void;
    pendingImage: string | null;
    onImagePlaced: () => void;
    drawColor: string;
    brushSize: number;
    textStyle: any;
    onStampRemove: (pageNum: number, rect?: { x: number, y: number, w: number, h: number }) => void;
    onAnnotationSelect?: (ann: any | null) => void;
    onCropApply?: (pageNum: number, rect: { x: number, y: number, w: number, h: number }) => void;
}

// SinglePage is now extracted to components/SinglePage.tsx

export const PDFCanvas: React.FC<PDFCanvasProps> = ({
    zoom, setZoom, mode, activePage = 1, onPageSelect, pendingImage, onImagePlaced,
    drawColor, brushSize, textStyle, onStampRemove, onAnnotationSelect, onCropApply
}) => {
    const {
        file, annotations, addAnnotation, updateAnnotation, removeAnnotation,
        extractAllText, setNumPages, numPages, pageRotations,
        editableBlocks, updateBlock, deleteBlock, scanPageForBlocks
    } = useFileStore();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Interaction State
    const [interactionState, setInteractionState] = useState<'none' | 'drawing' | 'dragging' | 'resizing' | 'zooming'>('none');
    const [dragStart, setDragStart] = useState<{ x: number, y: number, page: number } | null>(null);
    const [initialAnnState, setInitialAnnState] = useState<any>(null);
    const [currentRect, setCurrentRect] = useState<{ x: number, y: number, w: number, h: number, page: number } | null>(null);
    const [currentPath, setCurrentPath] = useState<{ x: number, y: number }[]>([]);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, id: string | null, type: any } | null>(null);

    const placingImageRef = useRef(false);

    // Pinch Zoom Refs
    const initialTouchDist = useRef<number>(0);
    const initialZoom = useRef<number>(1);

    // Determine Backend based on device capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const Backend = isTouchDevice ? TouchBackend : HTML5Backend;
    const backendOptions = { enableMouseEvents: true };

    useEffect(() => {
        if (file) extractAllText(file);
    }, [file]);

    const getRelativeCoords = (clientX: number, clientY: number, pageElement: HTMLElement) => {
        const rect = pageElement.getBoundingClientRect();
        return {
            x: (clientX - rect.left) / zoom,
            y: (clientY - rect.top) / zoom
        };
    };

    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
            if (interactionState === 'none') return;

            // Pinch Zoom Logic
            if (interactionState === 'zooming' && 'touches' in e && e.touches.length === 2) {
                e.preventDefault();
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                if (initialTouchDist.current > 0) {
                    const scale = dist / initialTouchDist.current;
                    setZoom(Math.min(Math.max(initialZoom.current * scale, 0.5), 3));
                }
                return;
            }

            const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

            if (dragStart) {
                const pageEl = document.getElementById(`page-${dragStart.page}-overlay`);
                if (!pageEl) return;
                const coords = getRelativeCoords(clientX, clientY, pageEl);

                if (interactionState === 'drawing') {
                    e.preventDefault(); // Prevent scrolling while drawing/selecting
                    if (mode === 'draw' || mode === 'sign') {
                        setCurrentPath(prev => [...prev, { ...coords }]);
                    } else if (mode === 'whiteout' || mode === 'replace' || mode === 'redact' || mode === 'crop' || mode === 'stamp_remover') {
                        const w = coords.x - dragStart.x;
                        const h = coords.y - dragStart.y;
                        setCurrentRect({
                            x: w > 0 ? dragStart.x : coords.x,
                            y: h > 0 ? dragStart.y : coords.y,
                            w: Math.abs(w), h: Math.abs(h), page: dragStart.page
                        });
                    }
                }
                // ... existing dragging logic ...
                if ((interactionState === 'dragging' || interactionState === 'resizing') && selectedId && initialAnnState) {
                    e.preventDefault(); // Prevent scroll while moving items
                    const dx = coords.x - dragStart.x;
                    const dy = coords.y - dragStart.y;
                    if (interactionState === 'dragging') {
                        updateAnnotation(selectedId, { x: initialAnnState.x + dx, y: initialAnnState.y + dy });
                    } else if (interactionState === 'resizing') {
                        updateAnnotation(selectedId, {
                            width: Math.max(20, (initialAnnState.width || 200) + dx),
                            height: Math.max(20, (initialAnnState.height || 50) + dy)
                        });
                    }
                }
            }
        };

        const handleGlobalUp = (e: MouseEvent | TouchEvent) => {
            if (interactionState === 'drawing' && dragStart) {
                if ((mode === 'draw' || mode === 'sign') && currentPath.length > 2) {
                    addAnnotation({
                        id: Date.now().toString(), page: dragStart.page, type: mode === 'sign' ? 'signature' : 'drawing',
                        points: currentPath, color: mode === 'sign' ? '#000000' : drawColor, thickness: mode === 'sign' ? 2 : brushSize
                    });
                } else if ((mode === 'whiteout' || mode === 'replace' || mode === 'redact') && currentRect && currentRect.w > 5) {
                    addAnnotation({
                        id: Date.now().toString() + '_bg', page: dragStart.page, type: mode === 'redact' ? 'redact' : 'whiteout',
                        x: currentRect.x, y: currentRect.y, width: currentRect.w, height: currentRect.h
                    });
                } else if (mode === 'crop' && currentRect && currentRect.w > 20 && onCropApply) {
                    if (window.confirm("Apply crop to this page?")) {
                        onCropApply(dragStart.page, { x: currentRect.x, y: currentRect.y, w: currentRect.w, h: currentRect.h });
                    }
                } else if (mode === 'stamp_remover' && currentRect && currentRect.w > 10) {
                    if (window.confirm("Use AI to clean this area?")) {
                        onStampRemove(dragStart.page, currentRect);
                    }
                }
            }
            setInteractionState('none'); setDragStart(null); setCurrentRect(null); setCurrentPath([]); setInitialAnnState(null);
        };

        if (interactionState !== 'none') {
            window.addEventListener('mousemove', handleGlobalMove); window.addEventListener('mouseup', handleGlobalUp);
            window.addEventListener('touchmove', handleGlobalMove, { passive: false }); window.addEventListener('touchend', handleGlobalUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleGlobalMove); window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchmove', handleGlobalMove); window.removeEventListener('touchend', handleGlobalUp);
        };
    }, [interactionState, dragStart, selectedId, initialAnnState, currentPath, currentRect, mode, drawColor, brushSize]);

    // Unified Handler for Mouse and Touch
    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, pageNum: number) => {
        // Detect Pinch Zoom
        if ('touches' in e && e.touches.length === 2) {
            setInteractionState('zooming');
            initialTouchDist.current = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            initialZoom.current = zoom;
            return;
        }

        if (onPageSelect) onPageSelect(pageNum);
        if (mode === 'edit_text') return;

        // Check tool compatibility for interaction
        const isInteractiveTool = ['text', 'cursor', 'draw', 'whiteout', 'sign', 'crop', 'image', 'stamp_remover'].includes(mode);
        if (!isInteractiveTool) return;

        const pageEl = document.getElementById(`page-${pageNum}-overlay`);
        if (!pageEl) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        const coords = getRelativeCoords(clientX, clientY, pageEl);

        if (['draw', 'whiteout', 'replace', 'redact', 'sign', 'crop', 'stamp_remover'].includes(mode)) {
            e.stopPropagation();
            setInteractionState('drawing');
            setDragStart({ ...coords, page: pageNum });
            if (mode === 'draw' || mode === 'sign') setCurrentPath([{ ...coords }]);
            else setCurrentRect({ ...coords, w: 0, h: 0, page: pageNum });
        } else if (mode === 'text') {
            // Place Text
            addAnnotation({
                id: Date.now().toString(),
                page: pageNum,
                type: 'text',
                x: coords.x,
                y: coords.y,
                text: '',
                color: drawColor,
                size: textStyle.size,
                ...textStyle
            });
            setEditingId(Date.now().toString());
        } else if (mode === 'image' && pendingImage && onImagePlaced) {
            // Place Image
            if (placingImageRef.current) return;
            placingImageRef.current = true;

            const img = new Image();
            img.onload = () => {
                addAnnotation({
                    id: Date.now().toString(), page: pageNum, type: 'image',
                    x: coords.x - 50, y: coords.y - 50, width: 100, height: 100 * (img.height / img.width),
                    dataUrl: pendingImage
                });
                onImagePlaced();
                // Reset after a short delay to be safe, though mode switch usually handles it
                setTimeout(() => { placingImageRef.current = false; }, 500);
            };
            img.src = pendingImage;
        }
    };

    const handleAnnotationMouseDown = (e: React.MouseEvent | React.TouchEvent, ann: any, action: 'drag' | 'resize') => {
        if (mode === 'edit_text') return;
        e.stopPropagation(); // prevent background interaction

        setSelectedId(ann.id); if (onAnnotationSelect) onAnnotationSelect(ann);
        setInteractionState(action === 'drag' ? 'dragging' : 'resizing');
        setInitialAnnState({ ...ann });

        const pageEl = document.getElementById(`page-${ann.page}-overlay`);
        if (pageEl) {
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
            const coords = getRelativeCoords(clientX, clientY, pageEl);
            setDragStart({ ...coords, page: ann.page });
        }
    };

    const getFontFamily = (f: string) => {
        switch (f) {
            case 'Times': return 'Times New Roman, serif';
            case 'Courier': return 'Courier New, monospace';
            default: return 'Inter, Helvetica, Arial, sans-serif';
        }
    };

    if (!file) return <div className="p-10 text-center text-muted-foreground animate-pulse">Loading Document...</div>;

    return (
        <DndProvider backend={Backend} options={backendOptions}>
            <div
                className={`w-full h-full relative ${mode === 'text' ? 'mode-edit' : ''}`}
                onClick={() => setContextMenu(null)}
            >
                <PDFDocument file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)} className="flex flex-col gap-6 items-center">
                    {Array.from(new Array(numPages), (_, index) => {
                        const pageNum = index + 1;
                        const rotation = pageRotations[pageNum] || 0;
                        return (
                            <SinglePage
                                key={`page-${pageNum}`}
                                pageNum={pageNum}
                                zoom={zoom}
                                rotation={rotation}
                                mode={mode}
                                file={file}
                                annotations={annotations}
                                editableBlocks={editableBlocks}
                                onMouseDown={handleMouseDown}
                                onAnnotationMouseDown={handleAnnotationMouseDown}
                                onContextMenu={(e: any, id: string | null, type: any) => setContextMenu({ x: e.clientX, y: e.clientY, id, type })}
                                onPageSelect={onPageSelect || (() => { })}
                                isActive={pageNum === activePage}
                                selectedId={selectedId}
                                editingId={editingId}
                                currentRect={currentRect}
                                currentPath={currentPath}
                                dragStart={dragStart}
                                drawColor={drawColor}
                                brushSize={brushSize}
                                textStyle={textStyle}
                                removeAnnotation={removeAnnotation}
                                updateAnnotation={updateAnnotation}
                                getFontFamily={getFontFamily}
                                // DND
                                onBlockUpdate={(id: string, text: string, x: number, y: number) => updateBlock(id, { text, x, y })}
                                onBlockDelete={(id: string) => deleteBlock(id)}
                                scanPage={scanPageForBlocks}
                            />
                        );
                    })}
                </PDFDocument>
                {/* ... controls ... */}
            </div>
        </DndProvider>
    );
};