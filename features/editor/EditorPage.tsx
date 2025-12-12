import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFCanvas } from './PDFCanvas';
import { useFileStore } from '../../contexts/FileContext';
import { EditorSidebar } from './components/EditorSidebar';
import { EditorToolbar } from './components/EditorToolbar';
import { ReorderDialog } from './components/ReorderDialog';
import { ExportDialog } from '../../components/ui/ExportDialog';
import { EditorMode, Tool, ToolCategory, ModalState } from '../../types';
import { ChevronLeft } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

// Import Modular Tools
import * as Organize from '../../services/tools/organizeTools';
import * as Edit from '../../services/tools/editTools';
import * as Security from '../../services/tools/securityTools';
import * as Convert from '../../services/tools/convertTools';

export const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { file, replaceFile, annotations, addAnnotation, pageRotations, rotatePage, pdfText, numPages } = useFileStore();
  const { settings } = useSettings();
  
  // State
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<EditorMode>('cursor');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('edit');
  const [statusMsg, setStatusMsg] = useState('');
  
  // Draw State
  const [drawColor, setDrawColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);

  // Text State
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
  
  // File References
  const mergeInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);

  if (!file) { navigate('/'); return null; }

  // Auto-fill password if available when encryption modal opens
  useEffect(() => {
    if (modal.type === 'encrypt' && settings.defaultPassword) {
        setMInput1(settings.defaultPassword);
    }
  }, [modal.type, settings.defaultPassword]);

  /* -------------------------------------------------------------------------- */
  /*                               HANDLERS                                     */
  /* -------------------------------------------------------------------------- */

  const handleToolSelect = (tool: Tool) => {
    // 1. Interactive Modes
    if (['cursor', 'text', 'draw', 'whiteout', 'eraser', 'stamp_remover'].includes(tool.id)) {
        setMode(tool.id as EditorMode);
        return;
    }

    // 2. Modals
    if (tool.requiresModal) {
        setMInput1(''); setMInput2('');
        setModal({ type: tool.id as any, isOpen: true });
        return;
    }

    // 3. Direct Actions
    executeDirectAction(tool.id);
  };

  const handleStampRemove = async (pageNum: number) => {
      // Logic: 
      // 1. Convert Page to Image
      // 2. Send to AI (Mocked for now in client logic or assumed service)
      // 3. Place cleaned image on top
      setStatusMsg("AI Cleaning Page...");
      try {
          // Temporarily mock the visual update for user feedback
          // In a real implementation, we'd grab the canvas dataURL of the page
          setTimeout(() => {
             // For demo: Place a full-page whiteout with low opacity or a "Cleaned" badge
             // Since we can't do real generative in-fill without backend, we show success.
             setStatusMsg("Stamp Removed (Simulated)");
          }, 1500);
      } catch (e) {
          setStatusMsg("Clean failed");
      }
  };

  const executeDirectAction = async (id: string) => {
      try {
          switch(id) {
              case 'rotate': 
                  rotatePage(1); 
                  setStatusMsg("Page 1 Rotated");
                  break;
              case 'merge': mergeInputRef.current?.click(); break;
              case 'add_image': imageInputRef.current?.click(); break;
              case 'flatten':
                  replaceFile(await Security.flattenPdf(file), 'flattened.pdf');
                  setStatusMsg("PDF Flattened");
                  break;
              case 'pdf_to_word':
                  download(await Convert.createDocxFromText(pdfText), 'converted.docx');
                  break;
              case 'pdf_to_jpg':
                  setStatusMsg("Converting...");
                  const imgs = await Convert.pdfToImages(file);
                  if (imgs.length > 0) {
                      const a = document.createElement('a');
                      a.href = imgs[0]; 
                      a.download = `page_1.jpg`; 
                      a.click();
                      setStatusMsg('Downloaded Page 1 as JPG');
                  }
                  break;
          }
      } catch(e) { console.error(e); alert('Action Failed: ' + (e as Error).message); }
  };

  const handleModalSubmit = async () => {
      try {
          let res: Uint8Array | null = null;
          let updateView = false; 

          if (modal.type === 'split') {
              if(!mInput1 || !mInput2) return alert("Please enter start and end pages");
              res = await Organize.splitPdf(file, Number(mInput1), Number(mInput2));
          } 
          else if (modal.type === 'delete_page') {
              const pagesToDelete = mInput1.split(',').map(n => parseInt(n.trim()));
              res = await Organize.deletePages(file, pagesToDelete);
              updateView = true;
          }
          else if (modal.type === 'encrypt') {
              res = await Security.encryptPdf(file, mInput1, settings.permissions);
          } 
          else if (modal.type === 'watermark') {
              res = await Edit.addWatermark(file, mInput1, drawColor);
              updateView = true;
          } 
          else if (modal.type === 'metadata') {
              res = await Security.updateMetadata(file, { title: mInput1, author: mInput2 });
              updateView = true;
          }

          if (res) {
              if (updateView) {
                  replaceFile(res);
                  setStatusMsg("Applied Successfully");
              } else {
                  download(res, 'output.pdf');
              }
          }
          setModal({ type: null, isOpen: false });
      } catch (e) { 
          console.error(e);
          alert('Operation Failed: ' + (e as Error).message); 
      }
  };

  const handleReorderApply = async (newOrder: number[]) => {
      try {
          const res = await Organize.reorderPages(file, newOrder);
          replaceFile(res, 'reordered.pdf');
          setStatusMsg("Pages Reordered");
          setModal({ type: null, isOpen: false });
      } catch (e) { console.error(e); alert("Reorder failed"); }
  };

  const handleExport = async (fileName: string, password?: string) => {
      try {
          setIsExportOpen(false);
          setStatusMsg("Generating...");
          
          let finalBytes = await Edit.saveAnnotations(file, annotations, pageRotations);

          if (password) {
             const tempFile = new File([finalBytes], fileName, { type: 'application/pdf' });
             finalBytes = await Security.encryptPdf(tempFile, password, settings.permissions);
          }

          download(finalBytes, fileName);
      } catch (e) {
          console.error(e);
          alert("Export failed");
      }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>, type: 'merge' | 'image') => {
      const f = e.target.files?.[0];
      if (!f) return;
      
      if (type === 'merge') {
          const res = await Organize.mergePdfs(file, f);
          replaceFile(res, 'merged.pdf');
          setStatusMsg("PDFs Merged");
      } else {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setPendingImage(ev.target?.result as string);
              setMode('image');
          };
          reader.readAsDataURL(f);
      }
  };

  const download = (data: Blob | Uint8Array, name: string) => {
      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url; link.download = name;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      setStatusMsg(`Downloaded ${name}`);
      setTimeout(() => setStatusMsg(''), 3000);
  };

  /* -------------------------------------------------------------------------- */
  /*                               RENDER                                       */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="h-screen flex flex-col bg-transparent font-sans overflow-hidden">
        <input type="file" ref={mergeInputRef} className="hidden" accept=".pdf" onChange={e => handleFile(e, 'merge')} />
        <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={e => handleFile(e, 'image')} />

        {/* Top Navigation */}
        <div className="h-10 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-white/20 flex items-center px-4 justify-between shrink-0">
            <button onClick={() => navigate('/')} className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                <ChevronLeft className="w-3 h-3" /> Back
            </button>
            <span className="text-xs font-bold opacity-50">{file.name}</span>
            <div className="w-10" /> 
        </div>

        <div className="flex-1 flex overflow-hidden">
            {/* Smooth Sidebar */}
            <EditorSidebar 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory}
                activeToolId={mode}
                onToolSelect={handleToolSelect}
            />

            <div className="flex-1 flex flex-col relative min-w-0">
                {/* Dynamic Toolbar */}
                <EditorToolbar 
                    mode={mode} 
                    zoom={zoom} 
                    setZoom={setZoom} 
                    onAction={(a) => { if (a === 'merge_add') mergeInputRef.current?.click(); }}
                    onExport={() => setIsExportOpen(true)}
                    status={statusMsg}
                    drawColor={drawColor}
                    setDrawColor={setDrawColor}
                    brushSize={brushSize}
                    setBrushSize={setBrushSize}
                    textStyle={textStyle}
                    setTextStyle={setTextStyle}
                />

                {/* Canvas Area */}
                <div className="flex-1 overflow-auto bg-black/5 dark:bg-black/20 relative p-4 md:p-8 backdrop-blur-sm">
                     {mode === 'image' && pendingImage && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-primary text-white text-xs px-4 py-2 rounded-full shadow-lg animate-bounce pointer-events-none">
                            Click on document to drop image
                        </div>
                     )}
                     <PDFCanvas 
                        zoom={zoom} 
                        mode={mode} 
                        pendingImage={pendingImage}
                        onImagePlaced={() => { setMode('cursor'); setPendingImage(null); }}
                        drawColor={drawColor}
                        brushSize={brushSize}
                        textStyle={textStyle}
                        onStampRemove={handleStampRemove}
                     />
                </div>
            </div>
        </div>

        {/* Reorder Dialog */}
        <ReorderDialog 
            isOpen={modal.type === 'reorder'} 
            onClose={() => setModal({ type: null, isOpen: false })}
            pageCount={numPages}
            onApply={handleReorderApply}
        />
        
        {/* Export Dialog */}
        <ExportDialog 
            isOpen={isExportOpen}
            onClose={() => setIsExportOpen(false)}
            onExport={handleExport}
            defaultFileName={file.name.replace('.pdf', '')}
        />

        {/* General Glass Modal */}
        {modal.isOpen && modal.type !== 'reorder' && (
            <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-95 border border-white/20">
                    <h3 className="font-bold text-lg capitalize mb-6">{modal.type?.replace('_', ' ')} Settings</h3>
                    <div className="space-y-4">
                        
                        {/* SPLIT */}
                        {modal.type === 'split' && (
                            <div className="space-y-3">
                                <label className="text-xs font-medium text-muted-foreground ml-1">Page Range</label>
                                <div className="flex gap-4">
                                    <input type="number" placeholder="Start" className="flex-1 bg-white/50 dark:bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" value={mInput1} onChange={e => setMInput1(e.target.value)} />
                                    <div className="flex items-center text-muted-foreground">-</div>
                                    <input type="number" placeholder="End" className="flex-1 bg-white/50 dark:bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" value={mInput2} onChange={e => setMInput2(e.target.value)} />
                                </div>
                            </div>
                        )}

                        {/* DELETE */}
                        {modal.type === 'delete_page' && (
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Pages to delete (e.g. 1, 3, 5)" 
                                    className="w-full bg-white/50 dark:bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={mInput1} 
                                    onChange={e => setMInput1(e.target.value)}
                                />
                                <p className="text-[10px] text-muted-foreground mt-2 pl-1">Comma separated page numbers</p>
                            </div>
                        )}

                        {/* ENCRYPT / WATERMARK */}
                        {(modal.type === 'encrypt' || modal.type === 'watermark') && (
                             <div className="space-y-3">
                                <input 
                                    type={modal.type === 'encrypt' ? "password" : "text"} 
                                    placeholder={modal.type === 'watermark' ? "Watermark Text" : "Password"}
                                    className="w-full bg-white/50 dark:bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                                    value={mInput1} onChange={e => setMInput1(e.target.value)} 
                                />
                                {modal.type === 'watermark' && (
                                     <div className="flex items-center gap-2 p-2 bg-white/30 rounded-lg">
                                        <span className="text-xs font-medium">Color:</span>
                                        <input type="color" value={drawColor} onChange={e => setDrawColor(e.target.value)} className="bg-transparent border-none cursor-pointer h-6 w-6" />
                                     </div>
                                )}
                             </div>
                        )}

                        {/* METADATA */}
                         {modal.type === 'metadata' && (
                             <div className="space-y-3">
                                <input type="text" placeholder="Title" className="w-full bg-white/50 dark:bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" value={mInput1} onChange={e => setMInput1(e.target.value)} />
                                <input type="text" placeholder="Author" className="w-full bg-white/50 dark:bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" value={mInput2} onChange={e => setMInput2(e.target.value)} />
                             </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <button onClick={() => setModal({ type: null, isOpen: false })} className="flex-1 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-sm font-medium transition-colors">Cancel</button>
                            <button onClick={handleModalSubmit} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};