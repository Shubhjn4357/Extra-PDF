import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Page, pdfjs } from 'react-pdf';
if (typeof window !== 'undefined') pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import { ScanText, Maximize2 } from 'lucide-react';
import { TextBlock } from './TextBlock';

import "react-pdf/dist/Page/TextLayer.css";
import 'react-pdf/dist/Page/AnnotationLayer.css';

interface SinglePageProps {
    pageNum: number;
    zoom: number;
    rotation: number;
    mode: string;
    file: File | null;
    annotations: any[];
    editableBlocks: any[];
    onMouseDown: (e: React.MouseEvent | React.TouchEvent, pageNum: number) => void;
    onAnnotationMouseDown: (e: React.MouseEvent | React.TouchEvent, ann: any, action: 'drag' | 'resize') => void;
    onContextMenu: (e: any, id: string | null, type: any) => void;
    onPageSelect: (pageNum: number) => void;
    isActive: boolean;
    selectedId: string | null;
    editingId: string | null;
    currentRect: any;
    currentPath: any[];
    dragStart: any;
    drawColor: string;
    brushSize: number;
    textStyle: any;
    removeAnnotation: (id: string) => void;
    updateAnnotation: (id: string, val: any) => void;
    getFontFamily: (f: string) => string;
    onBlockUpdate: (id: string, text: string, x: number, y: number) => void;
    onBlockDelete: (id: string) => void;
    scanPage: (pageNum: number) => Promise<void>;
}

const SinglePage = React.memo(({
    pageNum, zoom, rotation, mode, file, annotations, editableBlocks,
    onMouseDown, onAnnotationMouseDown, onContextMenu, onPageSelect,
    selectedId, editingId, currentRect, currentPath, dragStart, drawColor, brushSize, textStyle,
    removeAnnotation, updateAnnotation, getFontFamily, isActive,
    onBlockUpdate, onBlockDelete, scanPage
}: SinglePageProps) => {
    const [dimensions, setDimensions] = useState({ width: 595, height: 842 });

    const [, drop] = useDrop(() => ({
        accept: 'TEXT_BLOCK',
        drop: (item: any, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const block = editableBlocks.find((b: any) => b.id === item.id);
            if (block && delta) {
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
    const containerStyle = {
        width: isRotatedSides ? dimensions.height : dimensions.width,
        height: isRotatedSides ? dimensions.width : dimensions.height,
        transition: 'width 0.3s, height 0.3s'
    } as React.CSSProperties;

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

    useEffect(() => {
        if (mode === 'edit_text' && isActive && editableBlocks.filter((b: any) => b.page === pageNum).length === 0) {
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
            onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); onContextMenu(e, null, 'canvas'); }}
        >
            <div style={{ width: '100%', height: '100%', transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                <div style={innerStyle} ref={drop as any}>
                    <Page
                        pageNumber={pageNum}
                        width={595}
                        renderTextLayer={mode !== 'edit_text'}
                        renderAnnotationLayer={false}
                        className={`bg-white ${mode === 'edit_text' ? 'opacity-50' : ''}`}
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
                            {editableBlocks.filter((b: any) => b.page === pageNum).map((block: any) => (
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
                            touchAction: (['draw', 'sign', 'whiteout', 'replace', 'redact', 'crop', 'stamp_remover'].includes(mode)) ? 'none' : 'manipulation',
                            cursor: mode === 'draw' || mode === 'sign' ? 'crosshair' : mode === 'crop' || mode === 'stamp_remover' ? 'cell' : mode === 'text' ? 'text' : mode === 'cursor' ? 'default' : 'pointer'
                        }}
                        onMouseDown={(e) => onMouseDown(e, pageNum)}
                        onTouchStart={(e) => onMouseDown(e, pageNum)}
                        onContextMenu={(e) => e.stopPropagation()}
                    >
                        {/* SVG Layer for Drawings */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                            {annotations.filter((a: any) => a.page === pageNum && (a.type === 'drawing' || a.type === 'signature')).map((a: any) => (
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
                                    points={currentPath.map((p: any) => `${p.x},${p.y}`).join(' ')}
                                    fill="none" stroke={mode === 'sign' ? '#000000' : drawColor} strokeWidth={mode === 'sign' ? 2 : brushSize} strokeLinecap="round"
                                />
                            )}
                        </svg>

                        {/* HTML Layer for Elements */}
                        {annotations.filter((a: any) => a.page === pageNum && a.type !== 'drawing' && a.type !== 'signature').map((ann: any) => {
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

export default SinglePage;
