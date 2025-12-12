import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { useFileStore } from '../../../store/useFileStore';
import { EditorMode } from '../../../types';
import { ContextMenu } from './ContextMenu';
import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

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
  onStampRemove: (pageNum: number) => void;
  onAnnotationSelect?: (ann: any | null) => void;
  onCropApply?: (pageNum: number, rect: { x: number, y: number, w: number, h: number }) => void;
}

// Sub-component to handle individual page layout and rotation logic
const SinglePage = React.memo(({ 
    pageNum, zoom, rotation, mode, file, annotations, 
    onMouseDown, onAnnotationMouseDown, onAnnotationEnter, onContextMenu, onPageSelect,
    selectedId, editingId, currentRect, currentPath, dragStart, drawColor, brushSize, textStyle, removeAnnotation, updateAnnotation,
    getFontFamily, isActive
}: any) => {
    const [dimensions, setDimensions] = useState({ width: 595, height: 842 }); // Default A4 approx
    
    const onPageLoad = (page: any) => {
        const viewport = page.getViewport({ scale: 1 });
        const scaleFactor = 595 / viewport.width;
        setDimensions({
            width: 595,
            height: viewport.height * scaleFactor
        });
    };

    const isRotatedSides = rotation % 180 !== 0;
    
    // Calculate container dimensions based on rotation
    const containerStyle = {
        width: isRotatedSides ? dimensions.height : dimensions.width,
        height: isRotatedSides ? dimensions.width : dimensions.height,
        transition: 'width 0.3s, height 0.3s'
    };

    // Calculate inner content transform
    const innerStyle: React.CSSProperties = {
        width: dimensions.width,
        height: dimensions.height,
        transformOrigin: 'center center',
        transform: `rotate(${rotation}deg)`,
        position: isRotatedSides ? 'absolute' : 'relative',
        left: isRotatedSides ? '50%' : 'auto',
        top: isRotatedSides ? '50%' : 'auto',
        translate: isRotatedSides ? '-50% -50%' : 'none',
        transition: 'transform 0.3s ease-out'
    };

    return (
        <div 
            id={`page-wrapper-${pageNum}`} // Hook for scrollIntoView
            className={`relative rounded-sm overflow-hidden group/page bg-white transition-all mx-auto my-4 border-2 
                ${isActive ? 'border-primary shadow-2xl ring-4 ring-primary/10' : 'border-transparent shadow-xl hover:shadow-2xl'}`}
            style={containerStyle}
            onMouseDown={() => onPageSelect(pageNum)}
            onContextMenu={(e) => {
                e.preventDefault(); e.stopPropagation();
                onContextMenu(e, null, 'canvas');
            }}
        >
             <div style={{ width: '100%', height: '100%', transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                 <div style={innerStyle}>
                    <Page 
                        pageNumber={pageNum} 
                        width={595} 
                        renderTextLayer={true} 
                        renderAnnotationLayer={false} 
                        className="bg-white"
                        onLoadSuccess={onPageLoad}
                    />
                    
                    {/* Interactive Overlay */}
                    <div 
                        id={`page-${pageNum}-overlay`}
                        className="absolute inset-0 z-10"
                        style={{ 
                            cursor: mode === 'draw' || mode === 'sign' ? 'crosshair' : mode === 'crop' ? 'cell' : mode === 'text' ? 'text' : mode === 'cursor' ? 'default' : 'pointer'
                        }}
                        onMouseDown={(e) => onMouseDown(e, pageNum)}
                        onContextMenu={(e) => e.stopPropagation()} 
                    >
                        {/* SVG Layer for Drawings */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                            {annotations.filter((a:any) => a.page === pageNum && (a.type === 'drawing' || a.type === 'signature')).map((a:any) => (
                                <polyline 
                                    key={a.id}
                                    points={(a as any).points.map((p: any) => `${p.x},${p.y}`).join(' ')}
                                    fill="none" stroke={(a as any).color} strokeWidth={(a as any).thickness} strokeLinecap="round" strokeLinejoin="round"
                                    style={{ pointerEvents: (mode === 'cursor' || mode === 'eraser') ? 'auto' : 'none', cursor: mode === 'eraser' ? 'crosshair' : 'pointer' }}
                                    onClick={(e) => onAnnotationMouseDown(e as any, a, 'drag')}
                                    onMouseEnter={() => mode === 'eraser' && removeAnnotation(a.id)}
                                />
                            ))}
                            {(mode === 'draw' || mode === 'sign') && currentPath.length > 0 && dragStart?.page === pageNum && (
                                <polyline 
                                    points={currentPath.map((p:any) => `${p.x},${p.y}`).join(' ')}
                                    fill="none" stroke={mode === 'sign' ? '#000000' : drawColor} strokeWidth={mode === 'sign' ? 2 : brushSize} strokeLinecap="round"
                                />
                            )}
                        </svg>

                        {/* HTML Layer for Elements */}
                        {annotations.filter((a:any) => a.page === pageNum && a.type !== 'drawing' && a.type !== 'signature').map((ann:any) => {
                            const isSelected = selectedId === ann.id;
                            // Add pointer-events-auto explicitly so they can be clicked
                            // Z-index 20 ensures they are above the PDF text layer (z-index 5)
                            return (
                                <div
                                    key={ann.id}
                                    className={`
                                        absolute group transition-shadow 
                                        ${isSelected ? 'ring-1 ring-primary ring-offset-1' : ''}
                                        ${mode === 'cursor' ? 'hover:ring-1 hover:ring-primary/50 cursor-move' : ''}
                                    `}
                                    style={{ 
                                        left: ann.x, top: ann.y, 
                                        width: (ann as any).width || 200, height: (ann as any).height || 50,
                                        pointerEvents: 'auto',
                                        zIndex: 20
                                    }}
                                    onMouseDown={(e) => onAnnotationMouseDown(e, ann, 'drag')}
                                    onMouseEnter={() => mode === 'eraser' && removeAnnotation(ann.id)}
                                    onContextMenu={(e) => { 
                                        e.preventDefault(); e.stopPropagation();
                                        onContextMenu(e, ann.id, ann.type);
                                    }}
                                >
                                    {isSelected && mode === 'cursor' && (
                                        <div 
                                            className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary rounded-full cursor-se-resize shadow-md z-50 flex items-center justify-center hover:scale-125 transition-transform"
                                            onMouseDown={(e) => onAnnotationMouseDown(e, ann, 'resize')}
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
                                                onBlur={() => { if (!ann.text.trim()) removeAnnotation(ann.id); }}
                                                placeholder="Type here..."
                                                style={{ 
                                                    color: (ann as any).color, fontSize: (ann as any).size + 'px', fontFamily: getFontFamily((ann as any).fontFamily),
                                                    fontWeight: (ann as any).isBold ? 'bold' : 'normal', fontStyle: (ann as any).isItalic ? 'italic' : 'normal',
                                                    textDecoration: (ann as any).isUnderline ? 'underline' : 'none', textAlign: (ann as any).align || 'left',
                                                }}
                                                className="w-full h-full bg-white/90 p-2 border border-primary rounded resize-none outline-none shadow-lg pointer-events-auto text-black"
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
                                                {ann.text || <span className="text-gray-400 italic bg-white/80 px-2 py-1 border border-dashed border-gray-300 rounded shadow-sm block w-full">Type text...</span>}
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
        </div>
    );
});

export const PDFCanvas: React.FC<PDFCanvasProps> = ({ 
    zoom, setZoom, mode, activePage = 1, onPageSelect, pendingImage, onImagePlaced, 
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

  // Pinch Zoom Refs
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

  const handleTextLayerClick = (e: React.MouseEvent, pageNum: number) => {
    if (mode !== 'text') return;
    const target = e.target as HTMLElement;
    if (target.tagName === 'SPAN' && target.textContent) {
        e.stopPropagation();
        const pageEl = document.getElementById(`page-${pageNum}-overlay`);
        if (!pageEl) return;
        
        const rect = target.getBoundingClientRect();
        const pageRect = pageEl.getBoundingClientRect();
        
        // Coordinates relative to the scaled element
        const x = (rect.left - pageRect.left) / zoom;
        const y = (rect.top - pageRect.top) / zoom;
        const w = rect.width / zoom;
        const h = rect.height / zoom;
        
        const whiteoutId = Date.now().toString() + '_mask';
        addAnnotation({
            id: whiteoutId, page: pageNum, type: 'whiteout',
            x: x - 2, y: y - 2, width: w + 4, height: h + 4
        });

        const textId = Date.now().toString() + '_edit';
        const fontSize = parseFloat(window.getComputedStyle(target).fontSize) || (h * 0.8);
        
        addAnnotation({
            id: textId, page: pageNum, type: 'text',
            x: x, y: y, text: target.textContent,
            color: '#000000', size: fontSize,
            fontFamily: textStyle.fontFamily, isBold: textStyle.isBold,
            width: Math.max(w + 10, 100), height: Math.max(h + 10, 40)
        });
        setEditingId(textId); setSelectedId(textId);
    }
  };

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
                          w: Math.abs(w), h: Math.abs(h), page: dragStart.page
                      });
                  }
              }

              if ((interactionState === 'dragging' || interactionState === 'resizing') && selectedId && initialAnnState) {
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

      const handleGlobalUp = () => {
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
            } else if (mode === 'crop' && currentRect && currentRect.w > 20 && onCropApply) {
                if (window.confirm("Apply crop to this page?")) {
                    onCropApply(dragStart.page, { x: currentRect.x, y: currentRect.y, w: currentRect.w, h: currentRect.h });
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

  const handleMouseDown = (e: React.MouseEvent, pageNum: number) => {
    if(onPageSelect) onPageSelect(pageNum);
    if (e.button === 2) return; 
    
    // Check for Text Layer Click
    if (mode === 'text' && (e.target as HTMLElement).tagName === 'SPAN') {
        handleTextLayerClick(e, pageNum);
        return;
    }

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
            width: 200, height: 50 
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
    
    if (mode === 'stamp_remover') { onStampRemove(pageNum); return; }
    if (mode === 'cursor') { setSelectedId(null); setEditingId(null); if(onAnnotationSelect) onAnnotationSelect(null); }
  };

  const handleAnnotationMouseDown = (e: React.MouseEvent, ann: any, action: 'drag' | 'resize') => {
      e.stopPropagation();
      if(onPageSelect) onPageSelect(ann.page);
      if (mode === 'eraser') { removeAnnotation(ann.id); return; }
      if (mode !== 'cursor' && mode !== 'text') return;
      
      if (ann.type === 'text') {
        if (mode === 'text' || (mode === 'cursor' && selectedId === ann.id && editingId !== ann.id)) {
            setEditingId(ann.id); setSelectedId(ann.id); if(onAnnotationSelect) onAnnotationSelect(ann); return; 
        }
      }
      
      if (editingId !== ann.id) e.preventDefault(); 
      setSelectedId(ann.id); if(onAnnotationSelect) onAnnotationSelect(ann);
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
        className={`w-full h-full relative ${mode === 'text' ? 'mode-edit' : ''}`}
        onClick={() => setContextMenu(null)}
        onTouchStart={(e) => {
            if (e.touches.length === 2) {
                initialTouchDist.current = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
                initialZoom.current = zoom;
            }
        }}
        onTouchMove={(e) => {
            if (e.touches.length === 2 && initialTouchDist.current > 0) {
                const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
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
                   <SinglePage 
                      key={`page-${pageNum}`}
                      pageNum={pageNum}
                      zoom={zoom}
                      rotation={rotation}
                      mode={mode}
                      file={file}
                      annotations={annotations}
                      onMouseDown={handleMouseDown}
                      onAnnotationMouseDown={handleAnnotationMouseDown}
                      onContextMenu={(e: any, id: string | null, type: any) => setContextMenu({ x: e.clientX, y: e.clientY, id, type })}
                      onPageSelect={onPageSelect || (() => {})}
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
                   />
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