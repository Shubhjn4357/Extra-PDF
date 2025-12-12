import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useFileStore } from '../../contexts/FileContext';
import { EditorMode } from '../../types';
import { ContextMenu } from './ContextMenu';
import { Maximize2, Wand2 } from 'lucide-react';

// Worker is initialized in FileContext.tsx, removing redundant assignment here.

interface PDFCanvasProps {
  zoom: number;
  mode: EditorMode;
  pendingImage: string | null;
  onImagePlaced: () => void;
  drawColor: string;
  brushSize: number;
  textStyle: any;
  onStampRemove: (pageNum: number) => void;
}

export const PDFCanvas: React.FC<PDFCanvasProps> = ({ 
    zoom, mode, pendingImage, onImagePlaced, 
    drawColor, brushSize, textStyle, onStampRemove 
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

  const getRelativeCoords = (e: React.MouseEvent | React.TouchEvent, pageElement: HTMLElement) => {
     const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
     const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
     const rect = pageElement.getBoundingClientRect();
     return {
        x: (clientX - rect.left) / zoom,
        y: (clientY - rect.top) / zoom
     };
  };

  const handleMouseDown = (e: React.MouseEvent, pageNum: number) => {
    e.stopPropagation();
    const coords = getRelativeCoords(e, e.currentTarget as HTMLElement);

    if (mode === 'image' && pendingImage) {
        addAnnotation({
            id: Date.now().toString(),
            page: pageNum,
            type: 'image',
            x: coords.x - 50,
            y: coords.y - 50,
            width: 100,
            height: 100,
            dataUrl: pendingImage
        });
        onImagePlaced();
        return;
    }

    if (mode === 'text') {
        const id = Date.now().toString();
        addAnnotation({ 
            id, 
            page: pageNum, 
            type: 'text', 
            x: coords.x, 
            y: coords.y, 
            text: 'Type here...',
            color: drawColor,
            size: textStyle.size || 14,
            fontFamily: textStyle.fontFamily,
            isBold: textStyle.isBold,
            isItalic: textStyle.isItalic,
            isUnderline: textStyle.isUnderline,
            align: textStyle.align
        });
        setEditingId(id); // Immediately edit
        return;
    }

    if (mode === 'draw' || mode === 'eraser' || mode === 'whiteout' || mode === 'replace') {
        setInteractionState('drawing');
        setDragStart({ ...coords, page: pageNum });
        if (mode === 'draw') setCurrentPath([{ ...coords }]);
        if (mode === 'whiteout' || mode === 'replace') setCurrentRect({ ...coords, w: 0, h: 0, page: pageNum });
        return;
    }
    
    if (mode === 'stamp_remover') {
        // Trigger logic in parent
        onStampRemove(pageNum);
        return;
    }

    if (mode === 'cursor') {
        setSelectedId(null);
    }
  };

  const handleAnnotationMouseDown = (e: React.MouseEvent, ann: any, action: 'drag' | 'resize') => {
      e.stopPropagation();
      if (mode !== 'cursor') return;
      setSelectedId(ann.id);
      setInteractionState(action === 'drag' ? 'dragging' : 'resizing');
      setInitialAnnState({ ...ann });
      const pageEl = (e.currentTarget.closest('.page-overlay') as HTMLElement);
      const coords = getRelativeCoords(e, pageEl);
      setDragStart({ ...coords, page: ann.page });
  };

  const handleMouseMove = (e: React.MouseEvent, pageNum: number) => {
    const coords = getRelativeCoords(e, e.currentTarget as HTMLElement);

    if (interactionState === 'none') return;

    if (interactionState === 'drawing') {
        if (mode === 'draw') {
            setCurrentPath(prev => [...prev, { ...coords }]);
        } else if (mode === 'whiteout' || mode === 'replace') {
            if (!dragStart) return;
            const w = coords.x - dragStart.x;
            const h = coords.y - dragStart.y;
            setCurrentRect({
                x: w > 0 ? dragStart.x : coords.x,
                y: h > 0 ? dragStart.y : coords.y,
                w: Math.abs(w),
                h: Math.abs(h),
                page: pageNum
            });
        }
    } 
    else if (interactionState === 'dragging' && selectedId && dragStart) {
        const dx = coords.x - dragStart.x;
        const dy = coords.y - dragStart.y;
        updateAnnotation(selectedId, {
            ...initialAnnState,
            x: initialAnnState.x + dx,
            y: initialAnnState.y + dy
        });
    }
    else if (interactionState === 'resizing' && selectedId && dragStart) {
        const dx = coords.x - dragStart.x;
        const dy = coords.y - dragStart.y;
        updateAnnotation(selectedId, {
            ...initialAnnState,
            width: Math.max(20, initialAnnState.width + dx),
            height: Math.max(20, initialAnnState.height + dy)
        });
    }
  };

  const handleMouseUp = (e: React.MouseEvent, pageNum: number) => {
    if (interactionState === 'drawing') {
        if (mode === 'draw' && currentPath.length > 2) {
            addAnnotation({
                id: Date.now().toString(),
                page: pageNum,
                type: 'drawing',
                points: currentPath,
                color: drawColor,
                thickness: brushSize
            });
        } else if ((mode === 'whiteout' || mode === 'replace') && currentRect && currentRect.w > 5) {
             addAnnotation({
                id: Date.now().toString() + '_bg',
                page: pageNum,
                type: 'whiteout',
                x: currentRect.x,
                y: currentRect.y,
                width: currentRect.w,
                height: currentRect.h
            });
        }
    }

    setInteractionState('none');
    setDragStart(null);
    setCurrentRect(null);
    setCurrentPath([]);
    setInitialAnnState(null);
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
    <div className="flex w-full h-full bg-muted/30 relative" onClick={() => setContextMenu(null)}>
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
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className="flex flex-col gap-8 items-center">
           {Array.from(new Array(numPages), (_, index) => {
               const pageNum = index + 1;
               const rotation = pageRotations[pageNum] || 0;

               return (
                <div 
                    key={`page-${pageNum}`} 
                    id={`page-${pageNum}`} 
                    className="relative shadow-2xl rounded-lg overflow-hidden group/page" 
                    style={{ width: 'fit-content' }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        setContextMenu({ x: e.clientX, y: e.clientY, id: null, type: 'canvas' });
                    }}
                >
                    <div style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, transformOrigin: 'center center', transition: 'transform 0.3s' }}>
                        <Page 
                            pageNumber={pageNum} 
                            width={595} 
                            renderTextLayer={true} 
                            renderAnnotationLayer={false} 
                            className="bg-white"
                        />
                        
                        {/* Stamp Remover Overlay Hint */}
                        {mode === 'stamp_remover' && (
                            <div className="absolute inset-0 bg-purple-500/10 z-50 flex items-center justify-center opacity-0 group-hover/page:opacity-100 transition-opacity cursor-pointer pointer-events-none">
                                <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                    <Wand2 className="w-4 h-4 text-purple-600" />
                                    <span className="text-xs font-bold text-purple-900">Click to Auto-Clean Page</span>
                                </div>
                            </div>
                        )}

                        <div 
                            className="absolute inset-0 z-10 page-overlay"
                            style={{ 
                                width: '100%', height: '100%',
                                pointerEvents: (mode === 'cursor' && !selectedId) ? 'none' : 'auto', 
                                cursor: (mode === 'draw') ? 'crosshair' : (mode === 'text' ? 'text' : (mode === 'stamp_remover' ? 'pointer' : 'default'))
                            }}
                            onMouseDown={(e) => handleMouseDown(e, pageNum)}
                            onMouseMove={(e) => handleMouseMove(e, pageNum)}
                            onMouseUp={(e) => handleMouseUp(e, pageNum)}
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
                                        style={{ pointerEvents: 'auto' }}
                                    />
                                ))}
                                {mode === 'draw' && currentPath.length > 1 && dragStart?.page === pageNum && (
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
                                        className={`absolute group pointer-events-auto transition-shadow ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                        style={{ 
                                            left: ann.x, top: ann.y, 
                                            width: (ann as any).width, height: (ann as any).height,
                                            cursor: mode === 'cursor' ? 'move' : 'default',
                                            zIndex: 20
                                        }}
                                        onMouseDown={(e) => handleAnnotationMouseDown(e, ann, 'drag')}
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
                                        
                                        {ann.type === 'image' && <img src={(ann as any).dataUrl} className="w-full h-full object-contain pointer-events-none" />}

                                        {ann.type === 'text' && (
                                            editingId === ann.id ? (
                                                <textarea
                                                    autoFocus
                                                    value={ann.text}
                                                    onChange={(e) => updateAnnotation(ann.id, { ...ann, text: e.target.value })}
                                                    onBlur={() => setEditingId(null)}
                                                    style={{ 
                                                        color: (ann as any).color, 
                                                        fontSize: (ann as any).size + 'px',
                                                        fontFamily: getFontFamily((ann as any).fontFamily),
                                                        fontWeight: (ann as any).isBold ? 'bold' : 'normal',
                                                        fontStyle: (ann as any).isItalic ? 'italic' : 'normal',
                                                        textDecoration: (ann as any).isUnderline ? 'underline' : 'none',
                                                        textAlign: (ann as any).align || 'left',
                                                        minWidth: '150px'
                                                    }}
                                                    className="bg-white/90 border border-primary px-1 outline-none shadow-xl rounded resize"
                                                    onMouseDown={(e) => e.stopPropagation()}
                                                />
                                            ) : (
                                                <div 
                                                    onDoubleClick={() => setEditingId(ann.id)} 
                                                    className="w-max h-auto whitespace-pre-wrap p-1 border border-transparent hover:border-dashed hover:border-gray-300"
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
                                                    {ann.text || "Type here..."}
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