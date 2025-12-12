import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { useFileStore } from '../../../store/useFileStore';
import { EditorMode } from '../../../types';
import { ContextMenu } from './ContextMenu';
import { Maximize2, Wand2, ZoomIn, ZoomOut, Crop as CropIcon } from 'lucide-react';

interface PDFCanvasProps {
  zoom: number;
  setZoom: (z: number) => void;
  mode: EditorMode;
  pendingImage: string | null;
  onImagePlaced: () => void;
  drawColor: string;
  brushSize: number;
  textStyle: any;
  onStampRemove: (pageNum: number) => void;
  onAnnotationSelect?: (ann: any | null) => void;
  onCropApply?: (pageNum: number, rect: { x: number, y: number, w: number, h: number }) => void;
}

export const PDFCanvas: React.FC<PDFCanvasProps> = ({ 
    zoom, setZoom, mode, pendingImage, onImagePlaced, 
    drawColor, brushSize, textStyle, onStampRemove, onAnnotationSelect, onCropApply
}) => {
  const { 
      file, annotations, addAnnotation, updateAnnotation, removeAnnotation, 
      extractAllText, setNumPages, numPages, pageRotations 
  } = useFileStore();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Interaction State
  const [interactionState, setInteractionState] = useState<'none' | 'drawing' | 'dragging' | 'resizing'>('none');
  const [dragStart, setDragStart] = useState<{x: number, y: number, page: number} | null>(null);
  const [initialAnnState, setInitialAnnState] = useState<any>(null);
  const [currentRect, setCurrentRect] = useState<{x: number, y: number, w: number, h: number, page: number} | null>(null);
  const [currentPath, setCurrentPath] = useState<{x: number, y: number}[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, id: string | null, type: any } | null>(null);

  // Pinch Zoom
  const initialTouchDist = useRef<number>(0);
  const initialZoom = useRef<number>(1);

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

  // --- Global Event Listeners for Smooth Dragging ---
  useEffect(() => {
      const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
          if (interactionState === 'none') return;
          
          const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
          const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

          if (dragStart) {
              const pageEl = document.getElementById(`page-${dragStart.page}-overlay`);
              if (!pageEl) return;
              const coords = getRelativeCoords(clientX, clientY, pageEl);

              if (interactionState === 'drawing') {
                  if (mode === 'draw' || mode === 'sign') {
                      setCurrentPath(prev => [...prev, { ...coords }]);
                  } else if (mode === 'whiteout' || mode === 'replace' || mode === 'redact' || mode === 'crop') {
                      const w = coords.x - dragStart.x;
                      const h = coords.y - dragStart.y;
                      setCurrentRect({
                          x: w > 0 ? dragStart.x : coords.x,
                          y: h > 0 ? dragStart.y : coords.y,
                          w: Math.abs(w),
                          h: Math.abs(h),
                          page: dragStart.page
                      });
                  }
              }

              if ((interactionState === 'dragging' || interactionState === 'resizing') && selectedId && initialAnnState) {
                  const dx = coords.x - dragStart.x;
                  const dy = coords.y - dragStart.y;

                  if (interactionState === 'dragging') {
                      updateAnnotation(selectedId, {
                          x: initialAnnState.x + dx,
                          y: initialAnnState.y + dy
                      });
                  } else if (interactionState === 'resizing') {
                       const startW = initialAnnState.width || 200;
                       const startH = initialAnnState.height || 50;
                       updateAnnotation(selectedId, {
                          width: Math.max(20, startW + dx),
                          height: Math.max(20, startH + dy)
                      });
                  }
              }
          }
      };

      const handleGlobalUp = () => {
          if (interactionState === 'drawing' && dragStart) {
            // FINISH DRAWING/SIGNING
            if ((mode === 'draw' || mode === 'sign') && currentPath.length > 2) {
                addAnnotation({
                    id: Date.now().toString(), page: dragStart.page, type: mode === 'sign' ? 'signature' : 'drawing',
                    points: currentPath, color: mode === 'sign' ? '#000000' : drawColor, thickness: mode === 'sign' ? 2 : brushSize
                });
            } 
            // FINISH RECT TOOLS
            else if ((mode === 'whiteout' || mode === 'replace' || mode === 'redact') && currentRect && currentRect.w > 5) {
                addAnnotation({
                    id: Date.now().toString() + '_bg', page: dragStart.page, type: mode === 'redact' ? 'redact' : 'whiteout',
                    x: currentRect.x, y: currentRect.y, width: currentRect.w, height: currentRect.h
                });
                if (mode === 'replace') {
                    const textId = Date.now().toString() + '_txt';
                    addAnnotation({
                        id: textId, page: dragStart.page, type: 'text',
                        x: currentRect.x, y: currentRect.y + (currentRect.h / 2) - 10,
                        text: 'Replacement Text', color: drawColor, size: 14, fontFamily: textStyle.fontFamily,
                        width: Math.max(100, currentRect.w), height: 30
                    });
                    setEditingId(textId); setSelectedId(textId);
                }
            }
            // FINISH CROP
            else if (mode === 'crop' && currentRect && currentRect.w > 20 && onCropApply) {
                const conf = window.confirm("Apply crop to this page?");
                if (conf) {
                    onCropApply(dragStart.page, { x: currentRect.x, y: currentRect.y, w: currentRect.w, h: currentRect.h });
                }
            }
          }
          setInteractionState('none');
          setDragStart(null);
          setCurrentRect(null);
          setCurrentPath([]);
          setInitialAnnState(null);
      };

      if (interactionState !== 'none') {
          window.addEventListener('mousemove', handleGlobalMove);
          window.addEventListener('mouseup', handleGlobalUp);
          window.addEventListener('touchmove', handleGlobalMove, { passive: false });
          window.addEventListener('touchend', handleGlobalUp);
      }

      return () => {
          window.removeEventListener('mousemove', handleGlobalMove);
          window.removeEventListener('mouseup', handleGlobalUp);
          window.removeEventListener('touchmove', handleGlobalMove);
          window.removeEventListener('touchend', handleGlobalUp);
      };
  }, [interactionState, dragStart, selectedId, initialAnnState, currentPath, currentRect, mode, drawColor, brushSize]);

  const handleMouseDown = (e: React.MouseEvent, pageNum: number) => {
    if (e.button === 2) return; 
    const pageEl = document.getElementById(`page-${pageNum}-overlay`);
    if(!pageEl) return;
    const coords = getRelativeCoords(e.clientX, e.clientY, pageEl);

    if (mode === 'image' && pendingImage) {
        e.stopPropagation();
        const id = Date.now().toString();
        addAnnotation({
            id, page: pageNum, type: 'image',
            x: coords.x - 50, y: coords.y - 50, width: 100, height: 100, dataUrl: pendingImage
        });
        onImagePlaced(); setSelectedId(id);
        if(onAnnotationSelect) onAnnotationSelect({ id, type: 'image' });
        return;
    }

    if (mode === 'text') {
        e.stopPropagation();
        const id = Date.now().toString();
        addAnnotation({ 
            id, page: pageNum, type: 'text', 
            x: coords.x, y: coords.y, text: '', 
            color: drawColor, size: textStyle.size || 14, fontFamily: textStyle.fontFamily,
            isBold: textStyle.isBold, isItalic: textStyle.isItalic, isUnderline: textStyle.isUnderline, align: textStyle.align,
            width: 250, height: 60
        });
        setEditingId(id); setSelectedId(id);
        return;
    }

    if (['draw', 'whiteout', 'replace', 'redact', 'sign', 'crop'].includes(mode)) {
        e.stopPropagation();
        setInteractionState('drawing');
        setDragStart({ ...coords, page: pageNum });
        if (mode === 'draw' || mode === 'sign') setCurrentPath([{ ...coords }]);
        else setCurrentRect({ ...coords, w: 0, h: 0, page: pageNum });
        return;
    }
    
    if (mode === 'stamp_remover') {
        e.stopPropagation();
        onStampRemove(pageNum);
        return;
    }

    if (mode === 'cursor') {
        setSelectedId(null);
        setEditingId(null);
        if(onAnnotationSelect) onAnnotationSelect(null);
    }
  };

  const handleAnnotationMouseDown = (e: React.MouseEvent, ann: any, action: 'drag' | 'resize') => {
      e.stopPropagation();
      if (mode === 'eraser') { removeAnnotation(ann.id); return; }
      if (mode !== 'cursor' && mode !== 'text') return;
      
      if (ann.type === 'text') {
        if (mode === 'text' || (mode === 'cursor' && selectedId === ann.id && editingId !== ann.id)) {
            setEditingId(ann.id); setSelectedId(ann.id);
            if(onAnnotationSelect) onAnnotationSelect(ann);
            return; 
        }
      }
      
      if (editingId !== ann.id) e.preventDefault(); 

      setSelectedId(ann.id);
      if(onAnnotationSelect) onAnnotationSelect(ann);

      setInteractionState(action === 'drag' ? 'dragging' : 'resizing');
      setInitialAnnState({ ...ann });
      
      const pageEl = document.getElementById(`page-${ann.page}-overlay`);
      if(pageEl) {
         const coords = getRelativeCoords(e.clientX, e.clientY, pageEl);
         setDragStart({ ...coords, page: ann.page });
      }
  };

  const getFontFamily = (f: string) => {
      switch(f) {
          case 'Times': return 'Times New Roman, serif';
          case 'Courier': return 'Courier New, monospace';
          default: return 'Inter, Helvetica, Arial, sans-serif';
      }
  };

  if (!file) return <div className="p-10 text-center text-muted-foreground animate-pulse">Loading Document...</div>;

  return (
    <div 
        className="w-full h-full relative" 
        onClick={() => setContextMenu(null)}
        onTouchStart={(e) => {
            if (e.touches.length === 2) {
                initialTouchDist.current = Math.hypot(
                  e.touches[0].clientX - e.touches[1].clientX,
                  e.touches[0].clientY - e.touches[1].clientY
                );
                initialZoom.current = zoom;
            }
        }}
        onTouchMove={(e) => {
            if (e.touches.length === 2 && initialTouchDist.current > 0) {
                const dist = Math.hypot(
                  e.touches[0].clientX - e.touches[1].clientX,
                  e.touches[0].clientY - e.touches[1].clientY
                );
                setZoom(Math.min(Math.max(initialZoom.current * (dist / initialTouchDist.current), 0.5), 3.0));
                e.preventDefault(); 
            }
        }}
    >
        <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)} className="flex flex-col gap-6 items-center">
           {Array.from(new Array(numPages), (_, index) => {
               const pageNum = index + 1;
               const rotation = pageRotations[pageNum] || 0;

               return (
                <div 
                    key={`page-${pageNum}`} id={`page-${pageNum}`} 
                    className="relative shadow-xl rounded-sm overflow-hidden group/page bg-white transition-shadow hover:shadow-2xl" 
                    onContextMenu={(e) => {
                        e.preventDefault(); e.stopPropagation();
                        setContextMenu({ x: e.clientX, y: e.clientY, id: null, type: 'canvas' });
                    }}
                >
                    <div style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, transformOrigin: 'top center', transition: 'transform 0.1s ease-out' }}>
                        <Page pageNumber={pageNum} width={595} renderTextLayer={true} renderAnnotationLayer={false} className="bg-white" />
                        
                        {/* Interactive Overlay */}
                        <div 
                            id={`page-${pageNum}-overlay`}
                            className="absolute inset-0 z-10"
                            style={{ 
                                cursor: mode === 'draw' || mode === 'sign' ? 'crosshair' : mode === 'crop' ? 'cell' : mode === 'text' ? 'text' : mode === 'cursor' ? 'default' : 'pointer'
                            }}
                            onMouseDown={(e) => handleMouseDown(e, pageNum)}
                            onContextMenu={(e) => e.stopPropagation()} 
                        >
                            {/* SVG Layer for Drawings */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                                {annotations.filter(a => a.page === pageNum && (a.type === 'drawing' || a.type === 'signature')).map(a => (
                                    <polyline 
                                        key={a.id}
                                        points={(a as any).points.map((p: any) => `${p.x},${p.y}`).join(' ')}
                                        fill="none" stroke={(a as any).color} strokeWidth={(a as any).thickness} strokeLinecap="round" strokeLinejoin="round"
                                        style={{ pointerEvents: (mode === 'cursor' || mode === 'eraser') ? 'auto' : 'none', cursor: mode === 'eraser' ? 'crosshair' : 'pointer' }}
                                        onClick={(e) => handleAnnotationMouseDown(e as any, a, 'drag')}
                                        onMouseEnter={() => mode === 'eraser' && removeAnnotation(a.id)}
                                    />
                                ))}
                                {(mode === 'draw' || mode === 'sign') && currentPath.length > 0 && dragStart?.page === pageNum && (
                                    <polyline 
                                        points={currentPath.map(p => `${p.x},${p.y}`).join(' ')}
                                        fill="none" stroke={mode === 'sign' ? '#000000' : drawColor} strokeWidth={mode === 'sign' ? 2 : brushSize} strokeLinecap="round"
                                    />
                                )}
                            </svg>

                            {/* HTML Layer for Elements */}
                            {annotations.filter(a => a.page === pageNum && a.type !== 'drawing' && a.type !== 'signature').map((ann) => {
                                const isSelected = selectedId === ann.id;
                                return (
                                    <div
                                        key={ann.id}
                                        className={`absolute group transition-shadow ${isSelected ? 'ring-1 ring-primary ring-offset-1' : ''}`}
                                        style={{ 
                                            left: ann.x, top: ann.y, 
                                            width: (ann as any).width || 200, height: (ann as any).height || 50,
                                            pointerEvents: 'auto',
                                            zIndex: 20
                                        }}
                                        onMouseDown={(e) => handleAnnotationMouseDown(e, ann, 'drag')}
                                        onMouseEnter={() => mode === 'eraser' && removeAnnotation(ann.id)}
                                        onContextMenu={(e) => { 
                                            e.preventDefault(); e.stopPropagation();
                                            setContextMenu({ x: e.clientX, y: e.clientY, id: ann.id, type: ann.type }); 
                                        }}
                                    >
                                        {/* Resize Handle */}
                                        {isSelected && mode === 'cursor' && (
                                            <div 
                                                className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary rounded-full cursor-se-resize shadow-md z-50 flex items-center justify-center hover:scale-125 transition-transform"
                                                onMouseDown={(e) => handleAnnotationMouseDown(e, ann, 'resize')}
                                            >
                                                <Maximize2 className="w-2 h-2 text-white" />
                                            </div>
                                        )}

                                        {ann.type === 'whiteout' && <div className="w-full h-full bg-white border border-gray-100/50" />}
                                        {ann.type === 'redact' && <div className="w-full h-full bg-black" />}
                                        
                                        {ann.type === 'image' && (
                                            <img src={(ann as any).dataUrl} className="w-full h-full object-contain select-none" draggable={false} alt="inserted" />
                                        )}

                                        {ann.type === 'text' && (
                                            editingId === ann.id ? (
                                                <textarea
                                                    autoFocus
                                                    value={ann.text}
                                                    onChange={(e) => updateAnnotation(ann.id, { text: e.target.value })}
                                                    onBlur={() => { if (!ann.text.trim()) removeAnnotation(ann.id); setEditingId(null); }}
                                                    placeholder="Type text..."
                                                    style={{ 
                                                        color: (ann as any).color, fontSize: (ann as any).size + 'px', fontFamily: getFontFamily((ann as any).fontFamily),
                                                        fontWeight: (ann as any).isBold ? 'bold' : 'normal', fontStyle: (ann as any).isItalic ? 'italic' : 'normal',
                                                        textDecoration: (ann as any).isUnderline ? 'underline' : 'none', textAlign: (ann as any).align || 'left',
                                                    }}
                                                    className="w-full h-full bg-white/90 p-2 border border-primary rounded resize-none outline-none shadow-lg"
                                                    onMouseDown={(e) => e.stopPropagation()} 
                                                />
                                            ) : (
                                                <div 
                                                    className="w-full h-full p-2 whitespace-pre-wrap overflow-hidden"
                                                    style={{ 
                                                        color: (ann as any).color, fontSize: (ann as any).size + 'px', fontFamily: getFontFamily((ann as any).fontFamily),
                                                        fontWeight: (ann as any).isBold ? 'bold' : 'normal', fontStyle: (ann as any).isItalic ? 'italic' : 'normal',
                                                        textDecoration: (ann as any).isUnderline ? 'underline' : 'none', textAlign: (ann as any).align || 'left',
                                                    }}
                                                >
                                                    {ann.text || <span className="text-gray-400 italic">Empty text...</span>}
                                                </div>
                                            )
                                        )}
                                    </div>
                                );
                            })}
                            
                            {/* Selection Rect */}
                            {currentRect && currentRect.page === pageNum && (
                                <div className={`
                                    absolute border-2
                                    ${mode === 'redact' ? 'bg-black/50 border-black' : mode === 'crop' ? 'bg-black/10 border-dashed border-primary' : 'bg-primary/20 border-primary'}
                                `} style={{ left: currentRect.x, top: currentRect.y, width: currentRect.w, height: currentRect.h }}>
                                    {mode === 'crop' && (
                                        <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded shadow">
                                            Crop Area
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
               );
           })}
        </Document>

        {/* Floating Controls */}
        <div className="fixed bottom-6 right-6 md:right-12 z-[60] flex items-center gap-1 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full p-1.5 border border-border shadow-2xl">
            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.2))} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all active:scale-95"><ZoomOut className="w-4 h-4" /></button>
            <span className="w-12 text-center text-xs font-bold font-mono">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(Math.min(3.0, zoom + 0.2))} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all active:scale-95"><ZoomIn className="w-4 h-4" /></button>
        </div>

        {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} type={contextMenu.type} onClose={() => setContextMenu(null)} onDelete={() => contextMenu.id && removeAnnotation(contextMenu.id)} />}
    </div>
  );
};