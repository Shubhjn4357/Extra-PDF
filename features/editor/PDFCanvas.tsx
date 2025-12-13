import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useFileStore } from '../../store/useFileStore';
import { EditorMode } from '../../types';
import { ContextMenu } from './ContextMenu';
import { Maximize2, ZoomIn, ZoomOut, ScanText } from 'lucide-react';
import { TextBlock } from './components/TextBlock';

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

// Sub-component to handle individual page layout and rotation logic
const SinglePage = React.memo(({ 
    pageNum, zoom, rotation, mode, file, annotations, editableBlocks,
    onMouseDown, onAnnotationMouseDown, onAnnotationEnter, onContextMenu, onPageSelect,
    selectedId, editingId, currentRect, currentPath, dragStart, drawColor, brushSize, textStyle, 
    removeAnnotation, updateAnnotation, getFontFamily, isActive,
    // DnD Props
    onBlockUpdate, onBlockDelete, scanPage
}: any) => {
    const [dimensions, setDimensions] = useState({ width: 595, height: 842 }); // Default A4 approx
    
    // Setup Drop Target for Text Blocks
    const [, drop] = useDrop(() => ({
        accept: 'TEXT_BLOCK',
        drop: (item: any, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const block = editableBlocks.find((b: any) => b.id === item.id);
            if (block && delta) {
                // Update block position
                onBlockUpdate(block.id, block.text, block.x + delta.x / zoom, block.y + delta.y / zoom);
            }
        },
    }), [editableBlocks, zoom]);

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

    // Auto-scan on entering edit mode for this page if no blocks exist
    useEffect(() => {
        if (mode === 'edit_text' && isActive && editableBlocks.filter((b:any) => b.page === pageNum).length === 0) {
            scanPage(pageNum);
        }
    }, [mode, isActive, pageNum]);

    return (
        <div 
            id={`page-wrapper-${pageNum}`}
            className={`relative rounded-sm overflow-hidden group/page bg-white transition-all mx-auto my-4 border-2 
                ${isActive ? 'border-primary shadow-2xl ring-4 ring-primary/10' : 'border-transparent shadow-xl hover:shadow-2xl'}`}
            style={containerStyle}
            onMouseDown={(e) => onMouseDown(e, pageNum)}
            onTouchStart={(e) => onMouseDown(e, pageNum)}
            onContextMenu={(e) => {
                e.preventDefault(); e.stopPropagation();
                onContextMenu(e, null, 'canvas');
            }}
        >
             <div style={{ width: '100%', height: '100%', transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                 <div style={innerStyle} ref={drop as any}>
                    <Page 
                        pageNumber={pageNum} 
                        width={595} 
                        renderTextLayer={mode !== 'edit_text'} // Hide native text layer when editing
                        renderAnnotationLayer={false} 
                        className={`bg-white ${mode === 'edit_text' ? 'opacity-50' : ''}`} // Dim PDF when editing
                        onLoadSuccess={onPageLoad}
                    />
                    
                    {/* EDIT TEXT LAYER */}
                    {mode === 'edit_text' && (
                        <div className="absolute inset-0 z-30">
                            {editableBlocks.length === 0 && isActive && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
                                        <ScanText className="w-4 h-4" /> Scanning Text...
                                    </div>
                                </div>
                            )}
                            {editableBlocks.filter((b:any) => b.page === pageNum).map((block: any) => (
                                <TextBlock 
                                    key={block.id} 
                                    block={block} 
                                    zoom={zoom}
                                    onUpdate={onBlockUpdate}
                                    onDelete={onBlockDelete}
                                />
                            ))}
                        </div>
                    )}

                    {/* Interactive Overlay (Normal Annotations) */}
                    <div 
                        id={`page-${pageNum}-overlay`}
                        className={`absolute inset-0 z-10 ${mode === 'edit_text' ? 'pointer-events-none' : ''}`}
                        style={{ 
                            // Ensure touch actions are captured for drawing/dragging, but allow zoom/scroll if cursor mode
                            touchAction: (['draw', 'sign', 'whiteout', 'replace', 'redact', 'crop', 'stamp_remover'].includes(mode)) ? 'none' : 'manipulation',
                            cursor: mode === 'draw' || mode === 'sign' ? 'crosshair' : mode === 'crop' || mode === 'stamp_remover' ? 'cell' : mode === 'text' ? 'text' : mode === 'cursor' ? 'default' : 'pointer'
                        }}
                        onMouseDown={(e) => onMouseDown(e, pageNum)}
                        onTouchStart={(e) => onMouseDown(e, pageNum)}
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
                                    onMouseDown={(e) => onAnnotationMouseDown(e, a, 'drag')}
                                    onTouchStart={(e) => onAnnotationMouseDown(e, a, 'drag')}
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
                                    onTouchStart={(e) => onAnnotationMouseDown(e, ann, 'drag')}
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
                                            onTouchStart={(e) => onAnnotationMouseDown(e, ann, 'resize')}
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
                                                onTouchStart={(e) => e.stopPropagation()}
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
                                ${mode === 'redact' ? 'bg-black/50 border-black' : 
                                  mode === 'crop' ? 'bg-black/10 border-dashed border-primary' : 
                                  mode === 'stamp_remover' ? 'bg-purple-500/20 border-purple-500 animate-pulse' :
                                  'bg-primary/20 border-primary'}
                            `} style={{ left: currentRect.x, top: currentRect.y, width: currentRect.w, height: currentRect.h }}>
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
      extractAllText, setNumPages, numPages, pageRotations,
      editableBlocks, updateBlock, deleteBlock, scanPageForBlocks
  } = useFileStore();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Interaction State
  const [interactionState, setInteractionState] = useState<'none' | 'drawing' | 'dragging' | 'resizing' | 'zooming'>('none');
  const [dragStart, setDragStart] = useState<{x: number, y: number, page: number} | null>(null);
  const [initialAnnState, setInitialAnnState] = useState<any>(null);
  const [currentRect, setCurrentRect] = useState<{x: number, y: number, w: number, h: number, page: number} | null>(null);
  const [currentPath, setCurrentPath] = useState<{x: number, y: number}[]>([]);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, id: string | null, type: any } | null>(null);

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
                if(window.confirm("Use AI to clean this area?")) {
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

    if(onPageSelect) onPageSelect(pageNum);
    if (mode === 'edit_text') return; 
    
    // Check tool compatibility for interaction
    const isInteractiveTool = ['text', 'cursor', 'draw', 'whiteout', 'sign', 'crop', 'image', 'stamp_remover'].includes(mode);
    if(!isInteractiveTool) return;

    const pageEl = document.getElementById(`page-${pageNum}-overlay`);
    if(!pageEl) return;

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
        const img = new Image();
        img.onload = () => {
            addAnnotation({
                id: Date.now().toString(), page: pageNum, type: 'image',
                x: coords.x - 50, y: coords.y - 50, width: 100, height: 100 * (img.height/img.width),
                dataUrl: pendingImage
            });
            onImagePlaced();
        };
        img.src = pendingImage;
    }
  };

  const handleAnnotationMouseDown = (e: React.MouseEvent | React.TouchEvent, ann: any, action: 'drag' | 'resize') => {
      if (mode === 'edit_text') return;
      e.stopPropagation(); // prevent background interaction
      
      setSelectedId(ann.id); if(onAnnotationSelect) onAnnotationSelect(ann);
      setInteractionState(action === 'drag' ? 'dragging' : 'resizing');
      setInitialAnnState({ ...ann });
      
      const pageEl = document.getElementById(`page-${ann.page}-overlay`);
      if(pageEl) {
         const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
         const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
         const coords = getRelativeCoords(clientX, clientY, pageEl);
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
    <DndProvider backend={Backend} options={backendOptions}>
        <div 
            className={`w-full h-full relative ${mode === 'text' ? 'mode-edit' : ''}`}
            onClick={() => setContextMenu(null)}
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
                        editableBlocks={editableBlocks}
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
                        // DND
                        onBlockUpdate={(id: string, text: string, x: number, y: number) => updateBlock(id, { text, x, y })}
                        onBlockDelete={(id: string) => deleteBlock(id)}
                        scanPage={scanPageForBlocks}
                    />
                );
            })}
            </Document>
            {/* ... controls ... */}
        </div>
    </DndProvider>
  );
};