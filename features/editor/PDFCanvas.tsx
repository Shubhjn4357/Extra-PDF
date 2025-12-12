import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useFileStore } from '../../contexts/FileContext';
import { EditorMode } from '../../types';
import { ContextMenu } from './ContextMenu';
import { Maximize2, Wand2, ZoomIn, ZoomOut } from 'lucide-react';

// Worker is initialized in FileContext.tsx

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
}

export const PDFCanvas: React.FC<PDFCanvasProps> = ({ 
    zoom, setZoom, mode, pendingImage, onImagePlaced, 
    drawColor, brushSize, textStyle, onStampRemove, onAnnotationSelect
}) => {
  const { 
      file, annotations, addAnnotation, updateAnnotation, removeAnnotation, 
      extractAllText, setNumPages, numPages, pageRotations 
  } = useFileStore();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Interactions
  const [interactionState, setInteractionState] = useState<'none' | 'drawing' | 'dragging' | 'resizing' | 'placing'>('none');
  const [dragStart, setDragStart] = useState<{x: number, y: number, page: number} | null>(null);
  const [initialAnnState, setInitialAnnState] = useState<any>(null);
  
  // Pinch Zoom State
  const initialTouchDist = useRef<number>(0);
  const initialZoom = useRef<number>(1);
  
  // Rect Selection
  const [currentRect, setCurrentRect] = useState<{x: number, y: number, w: number, h: number, page: number} | null>(null);
  const [currentPath, setCurrentPath] = useState<{x: number, y: number}[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, id: string | null, type: any } | null>(null);

  useEffect(() => {
    if (file) extractAllText(file);
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Helper to get coords relative to a page
  const getRelativeCoords = (clientX: number, clientY: number, pageElement: HTMLElement) => {
     const rect = pageElement.getBoundingClientRect();
     return {
        x: (clientX - rect.left) / zoom,
        y: (clientY - rect.top) / zoom
     };
  };

  // --- Global Event Listeners for Dragging ---
  useEffect(() => {
      const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
          if (interactionState === 'none') return;
          
          // Get client coordinates
          const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
          const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

          // For drawing/rect creation (requires page context)
          if (interactionState === 'drawing' && dragStart) {
              const pageEl = document.getElementById(`page-${dragStart.page}-overlay`);
              if (!pageEl) return;
              const coords = getRelativeCoords(clientX, clientY, pageEl);

              if (mode === 'draw') {
                  setCurrentPath(prev => [...prev, { ...coords }]);
              } else if (mode === 'whiteout' || mode === 'replace') {
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

          // For moving/resizing existing annotations
          if ((interactionState === 'dragging' || interactionState === 'resizing') && selectedId && dragStart && initialAnnState) {
              const pageEl = document.getElementById(`page-${dragStart.page}-overlay`);
              if (!pageEl) return;
              const coords = getRelativeCoords(clientX, clientY, pageEl);
              
              const dx = coords.x - dragStart.x;
              const dy = coords.y - dragStart.y;

              if (interactionState === 'dragging') {
                  updateAnnotation(selectedId, {
                      ...initialAnnState,
                      x: initialAnnState.x + dx,
                      y: initialAnnState.y + dy
                  });
              } else if (interactionState === 'resizing') {
                   // Ensure we have a valid starting width/height even if undefined initially (for text)
                   const startW = initialAnnState.width || 200;
                   const startH = initialAnnState.height || 50;
                   updateAnnotation(selectedId, {
                      ...initialAnnState,
                      width: Math.max(20, startW + dx),
                      height: Math.max(20, startH + dy)
                  });
              }
          }
      };

      const handleGlobalUp = () => {
          if (interactionState === 'drawing' && dragStart) {
            if (mode === 'draw' && currentPath.length > 2) {
                addAnnotation({
                    id: Date.now().toString(),
                    page: dragStart.page,
                    type: 'drawing',
                    points: currentPath,
                    color: drawColor,
                    thickness: brushSize
                });
            } else if ((mode === 'whiteout' || mode === 'replace') && currentRect && currentRect.w > 5) {
                // Add whiteout background
                addAnnotation({
                    id: Date.now().toString() + '_bg',
                    page: dragStart.page,
                    type: 'whiteout',
                    x: currentRect.x,
                    y: currentRect.y,
                    width: currentRect.w,
                    height: currentRect.h
                });

                // For replace mode, ALSO add a text box on top and focus it
                if (mode === 'replace') {
                    const textId = Date.now().toString() + '_txt';
                    addAnnotation({
                        id: textId,
                        page: dragStart.page,
                        type: 'text',
                        x: currentRect.x,
                        // Center text vertically relative to the box (approx)
                        y: currentRect.y + (currentRect.h / 2) - 10,
                        text: 'Type replacement...',
                        color: drawColor,
                        size: 14,
                        fontFamily: textStyle.fontFamily
                    });
                    setEditingId(textId);
                    setSelectedId(textId);
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
          window.addEventListener('touchmove', handleGlobalMove);
          window.addEventListener('touchend', handleGlobalUp);
      }

      return () => {
          window.removeEventListener('mousemove', handleGlobalMove);
          window.removeEventListener('mouseup', handleGlobalUp);
          window.removeEventListener('touchmove', handleGlobalMove);
          window.removeEventListener('touchend', handleGlobalUp);
      };
  }, [interactionState, dragStart, selectedId, initialAnnState, currentPath, currentRect, mode, drawColor, brushSize]);


  const handleTouchStart = (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
          const dist = Math.hypot(
              e.touches[0].clientX - e.touches[1].clientX,
              e.touches[0].clientY - e.touches[1].clientY
          );
          initialTouchDist.current = dist;
          initialZoom.current = zoom;
      }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
      if (e.touches.length === 2 && initialTouchDist.current > 0) {
          const dist = Math.hypot(
              e.touches[0].clientX - e.touches[1].clientX,
              e.touches[0].clientY - e.touches[1].clientY
          );
          const ratio = dist / initialTouchDist.current;
          const newZoom = Math.min(Math.max(initialZoom.current * ratio, 0.5), 3.0);
          setZoom(newZoom);
          e.preventDefault(); 
      }
  };

  // Canvas Mouse Down (Creation)
  const handleMouseDown = (e: React.MouseEvent, pageNum: number) => {
    if (e.button === 2) return; 

    const pageEl = document.getElementById(`page-${pageNum}-overlay`);
    if(!pageEl) return;
    
    // Use the element-relative logic
    const clientX = e.clientX;
    const clientY = e.clientY;
    const coords = getRelativeCoords(clientX, clientY, pageEl);

    if (mode === 'image' && pendingImage) {
        e.stopPropagation();
        const id = Date.now().toString();
        addAnnotation({
            id,
            page: pageNum,
            type: 'image',
            x: coords.x - 50,
            y: coords.y - 50,
            width: 100,
            height: 100,
            dataUrl: pendingImage
        });
        onImagePlaced();
        setSelectedId(id);
        if(onAnnotationSelect) onAnnotationSelect({ id, type: 'image' });
        return;
    }

    if (mode === 'text') {
        e.stopPropagation();
        const id = Date.now().toString();
        // Create text with a visible default so user can find it
        addAnnotation({ 
            id, 
            page: pageNum, 
            type: 'text', 
            x: coords.x, 
            y: coords.y, 
            text: '', // Start empty to force usage of placeholder/typing
            color: drawColor,
            size: textStyle.size || 14,
            fontFamily: textStyle.fontFamily,
            isBold: textStyle.isBold,
            isItalic: textStyle.isItalic,
            isUnderline: textStyle.isUnderline,
            align: textStyle.align
        });
        setEditingId(id); 
        setSelectedId(id);
        return;
    }

    if (mode === 'draw' || mode === 'whiteout' || mode === 'replace') {
        e.stopPropagation();
        setInteractionState('drawing');
        setDragStart({ ...coords, page: pageNum });
        if (mode === 'draw') setCurrentPath([{ ...coords }]);
        if (mode === 'whiteout' || mode === 'replace') setCurrentRect({ ...coords, w: 0, h: 0, page: pageNum });
        return;
    }
    
    if (mode === 'stamp_remover') {
        e.stopPropagation();
        onStampRemove(pageNum);
        return;
    }

    if (mode === 'cursor') {
        // If clicking on empty space in cursor mode, deselect
        setSelectedId(null);
        setEditingId(null);
        if(onAnnotationSelect) onAnnotationSelect(null);
    }
  };

  // Annotation Mouse Down (Selection/Drag)
  const handleAnnotationMouseDown = (e: React.MouseEvent, ann: any, action: 'drag' | 'resize') => {
      e.stopPropagation(); 
      
      if (mode === 'eraser') {
          removeAnnotation(ann.id);
          return;
      }

      if (mode !== 'cursor' && mode !== 'text') return;
      
      // In-place text editing logic
      if (ann.type === 'text') {
        // Text Tool: Edit immediately
        if (mode === 'text') {
            setEditingId(ann.id);
            setSelectedId(ann.id);
            if(onAnnotationSelect) onAnnotationSelect(ann);
            return; 
        }
        // Cursor Tool: Select, then Double Click to Edit
        if (mode === 'cursor' && selectedId === ann.id && editingId !== ann.id) {
             setEditingId(ann.id);
             return; 
        }
      }
      
      // Only prevent default if we are dragging, NOT if we are editing
      if (editingId !== ann.id) {
        e.preventDefault(); 
      }

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
          default: return 'Helvetica, Arial, sans-serif';
      }
  };

  if (!file) return <div className="p-10 text-center text-muted-foreground">Loading file...</div>;

  return (
    <div 
        className="flex w-full h-full bg-muted/30 relative overflow-hidden" 
        onClick={() => setContextMenu(null)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
    >
      <div className="hidden md:flex flex-col w-48 border-r border-border bg-background overflow-y-auto p-4 gap-4 shrink-0 h-full">
         <Document file={file}>
            {Array.from(new Array(numPages), (_, index) => (
                <div key={`thumb-${index + 1}`} onClick={() => document.getElementById(`page-${index+1}`)?.scrollIntoView({behavior:'smooth'})} className="relative cursor-pointer group">
                    <div className="border border-border rounded overflow-hidden hover:border-primary/50 transition-colors">
                        <Page pageNumber={index + 1} width={150} renderTextLayer={false} renderAnnotationLayer={false} />
                    </div>
                    <span className="text-xs text-muted-foreground block text-center mt-1">Page {index + 1}</span>
                </div>
            ))}
         </Document>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-8 relative h-full">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className="flex flex-col gap-8 pb-20 w-full">
           {Array.from(new Array(numPages), (_, index) => {
               const pageNum = index + 1;
               const rotation = pageRotations[pageNum] || 0;

               return (
                <div 
                    key={`page-${pageNum}`} 
                    id={`page-${pageNum}`} 
                    className="relative shadow-2xl rounded-lg overflow-hidden group/page bg-white mx-auto" 
                    style={{ width: 'fit-content' }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setContextMenu({ x: e.clientX, y: e.clientY, id: null, type: 'canvas' });
                    }}
                >
                    <div style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, transformOrigin: 'top center', transition: 'transform 0.1s linear' }}>
                        <Page 
                            pageNumber={pageNum} 
                            width={595} // A4 Standard
                            renderTextLayer={true} 
                            renderAnnotationLayer={false} 
                            className="bg-white"
                        />
                        
                        {mode === 'stamp_remover' && (
                            <div className="absolute inset-0 bg-purple-500/10 z-50 flex items-center justify-center opacity-0 group-hover/page:opacity-100 transition-opacity cursor-pointer pointer-events-none">
                                <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                    <Wand2 className="w-4 h-4 text-purple-600" />
                                    <span className="text-xs font-bold text-purple-900">Click to Auto-Clean Page</span>
                                </div>
                            </div>
                        )}

                        <div 
                            id={`page-${pageNum}-overlay`}
                            className="absolute inset-0 z-10 page-overlay"
                            style={{ 
                                width: '100%', height: '100%',
                                pointerEvents: (mode === 'cursor' || mode === 'eraser') ? 'none' : 'auto', 
                                cursor: (mode === 'draw') ? 'crosshair' : (mode === 'text' ? 'text' : (mode === 'stamp_remover' ? 'pointer' : 'default'))
                            }}
                            onMouseDown={(e) => handleMouseDown(e, pageNum)}
                            onContextMenu={(e) => e.stopPropagation()} 
                        >
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                                {annotations.filter(a => a.page === pageNum && a.type === 'drawing').map(a => (
                                    <polyline 
                                        key={a.id}
                                        points={(a as any).points.map((p: any) => `${p.x},${p.y}`).join(' ')}
                                        fill="none"
                                        stroke={(a as any).color}
                                        strokeWidth={(a as any).thickness}
                                        strokeLinecap="round"
                                        style={{ pointerEvents: (mode === 'cursor' || mode === 'eraser') ? 'auto' : 'none', cursor: mode === 'eraser' ? 'not-allowed' : 'pointer' }}
                                        onClick={(e) => handleAnnotationMouseDown(e as any, a, 'drag')}
                                        onMouseEnter={(e) => {
                                            if (mode === 'eraser' && e.buttons === 1) {
                                                removeAnnotation(a.id);
                                            }
                                        }}
                                    />
                                ))}
                                {mode === 'draw' && currentPath.length > 0 && dragStart?.page === pageNum && (
                                    <polyline 
                                        points={currentPath.map(p => `${p.x},${p.y}`).join(' ')}
                                        fill="none"
                                        stroke={drawColor}
                                        strokeWidth={brushSize}
                                        strokeLinecap="round"
                                    />
                                )}
                            </svg>

                            {annotations.filter(a => a.page === pageNum).map((ann) => {
                                if (ann.type === 'drawing') return null;
                                const isSelected = selectedId === ann.id;
                                
                                return (
                                    <div
                                        key={ann.id}
                                        className={`absolute group transition-shadow ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                        style={{ 
                                            left: ann.x, top: ann.y, 
                                            width: (ann as any).width, height: (ann as any).height,
                                            pointerEvents: 'auto',
                                            cursor: (mode === 'eraser') ? 'not-allowed' : (mode === 'cursor' ? 'move' : 'default'),
                                            zIndex: 20
                                        }}
                                        onMouseDown={(e) => handleAnnotationMouseDown(e, ann, 'drag')}
                                        onMouseEnter={(e) => {
                                            if (mode === 'eraser' && e.buttons === 1) {
                                                removeAnnotation(ann.id);
                                            }
                                        }}
                                        onContextMenu={(e) => { 
                                            e.preventDefault(); 
                                            e.stopPropagation();
                                            setContextMenu({ x: e.clientX, y: e.clientY, id: ann.id, type: ann.type }); 
                                        }}
                                    >
                                        {isSelected && mode === 'cursor' && (ann.type === 'image' || ann.type === 'whiteout') && (
                                            <div 
                                                className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary rounded-full cursor-se-resize shadow-md z-50 flex items-center justify-center"
                                                onMouseDown={(e) => handleAnnotationMouseDown(e, ann, 'resize')}
                                            >
                                                <Maximize2 className="w-2 h-2 text-white" />
                                            </div>
                                        )}

                                        {ann.type === 'whiteout' && <div className="w-full h-full bg-white border border-gray-100" />}
                                        
                                        {ann.type === 'image' && (
                                            <img 
                                                src={(ann as any).dataUrl} 
                                                className="w-full h-full object-contain pointer-events-none" 
                                                draggable={false}
                                                alt="placed content"
                                            />
                                        )}

                                        {ann.type === 'text' && (
                                            editingId === ann.id ? (
                                                <textarea
                                                    autoFocus
                                                    value={ann.text}
                                                    onChange={(e) => updateAnnotation(ann.id, { ...ann, text: e.target.value })}
                                                    onBlur={() => {
                                                        if (!ann.text.trim()) removeAnnotation(ann.id);
                                                        setEditingId(null);
                                                    }}
                                                    placeholder="Type here..."
                                                    style={{ 
                                                        color: (ann as any).color, 
                                                        fontSize: (ann as any).size + 'px',
                                                        fontFamily: getFontFamily((ann as any).fontFamily),
                                                        fontWeight: (ann as any).isBold ? 'bold' : 'normal',
                                                        fontStyle: (ann as any).isItalic ? 'italic' : 'normal',
                                                        textDecoration: (ann as any).isUnderline ? 'underline' : 'none',
                                                        textAlign: (ann as any).align || 'left',
                                                        minWidth: '50px',
                                                        maxWidth: '400px',
                                                        minHeight: '1.4em',
                                                        overflow: 'hidden',
                                                        background: 'rgba(255,255,255,0.8)',
                                                        padding: '4px',
                                                        border: '1px solid #000',
                                                        borderRadius: '4px',
                                                        lineHeight: 'inherit',
                                                        outline: 'none',
                                                        resize: 'none',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                                    }}
                                                    className="w-full h-full"
                                                    onMouseDown={(e) => e.stopPropagation()} 
                                                    // IMPORTANT: Stop propagation here to prevent parent drag handler from firing
                                                />
                                            ) : (
                                                <div 
                                                    className={`w-max h-auto whitespace-pre-wrap p-1 border border-transparent ${mode === 'cursor' ? 'hover:border-dashed hover:border-gray-300' : ''}`}
                                                    style={{ 
                                                        color: (ann as any).color, 
                                                        fontSize: (ann as any).size + 'px',
                                                        fontFamily: getFontFamily((ann as any).fontFamily),
                                                        fontWeight: (ann as any).isBold ? 'bold' : 'normal',
                                                        fontStyle: (ann as any).isItalic ? 'italic' : 'normal',
                                                        textDecoration: (ann as any).isUnderline ? 'underline' : 'none',
                                                        textAlign: (ann as any).align || 'left',
                                                    }}
                                                >
                                                    {ann.text || <span className="text-gray-400 italic">Type here...</span>}
                                                </div>
                                            )
                                        )}
                                    </div>
                                );
                            })}
                            
                            {currentRect && currentRect.page === pageNum && (
                                <div 
                                    className="absolute bg-blue-500/20 border border-blue-500"
                                    style={{ left: currentRect.x, top: currentRect.y, width: currentRect.w, height: currentRect.h }}
                                />
                            )}
                        </div>
                    </div>
                </div>
               );
           })}
        </Document>

        {/* Floating Zoom Controls */}
        <div className="fixed bottom-6 right-6 md:right-20 z-[60] flex items-center bg-background/80 backdrop-blur-md rounded-full p-1 border border-border shadow-lg animate-in slide-in-from-bottom-4">
            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 hover:bg-muted rounded-full transition-all active:scale-95">
                <ZoomOut className="w-4 h-4 text-foreground" />
            </button>
            <span className="w-12 text-center text-xs font-bold text-foreground">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(Math.min(2.5, zoom + 0.1))} className="p-2 hover:bg-muted rounded-full transition-all active:scale-95">
                <ZoomIn className="w-4 h-4 text-foreground" />
            </button>
        </div>

        {contextMenu && (
            <ContextMenu 
                x={contextMenu.x} y={contextMenu.y} type={contextMenu.type} 
                onClose={() => setContextMenu(null)} onDelete={() => contextMenu.id && removeAnnotation(contextMenu.id)} 
            />
        )}
      </div>
    </div>
  );
};