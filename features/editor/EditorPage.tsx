import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFCanvas } from './PDFCanvas';
import { useFileStore } from '../../../store/useFileStore';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { EditorSidebar } from './components/EditorSidebar';
import { ThumbnailSidebar } from './components/ThumbnailSidebar';
import { EditorToolbar } from './components/EditorToolbar';
import { ReorderDialog } from './components/ReorderDialog';
import { ThinkingSidebar } from './ThinkingSidebar';
import { ExportDialog, ExportOptions } from '../../../components/ui/ExportDialog';
import { SettingsDialog } from '../../../components/ui/SettingsDialog';
import { EditorMode, Tool, ToolCategory, ModalState, ChatMessage } from '../../../types';
import { ChevronLeft, Menu, Settings2, Scissors, Code, PanelLeftClose, PanelLeftOpen, Stamp, Lock, FileText, Type } from 'lucide-react';
import { createChatSession } from '../../../services/geminiService';

// Import Modular Tools
import * as Organize from '../../../services/tools/organizeTools';
import * as Edit from '../../../services/tools/editTools';
import * as Security from '../../../services/tools/securityTools';
import * as Convert from '../../../services/tools/convertTools';

export const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { file, replaceFile, annotations, updateAnnotation, rotatePage, pdfText, numPages, pageRotations, removeAnnotation } = useFileStore();
  const { settings } = useSettingsStore();
  
  // View State
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<EditorMode>('cursor');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('edit');
  const [statusMsg, setStatusMsg] = useState('');
  const [activePage, setActivePage] = useState(1); // Track selected page
  
  // UI State
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar
  const [isThumbnailsOpen, setThumbnailsOpen] = useState(true); // Desktop thumbnails
  const [isThinkingOpen, setIsThinkingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Selection State
  const [selectedAnnId, setSelectedAnnId] = useState<string | null>(null);
  const selectedAnnotation = annotations.find(a => a.id === selectedAnnId);
  
  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatSessionRef = useRef<any>(null);

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

  // Redirect Effect
  useEffect(() => {
    if (!file) navigate('/');
  }, [file, navigate]);

  // Init
  useEffect(() => {
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) setSidebarOpen(true);
      else setThumbnailsOpen(false);
      
      chatSessionRef.current = createChatSession();
  }, []);

  useEffect(() => {
    if (modal.type === 'encrypt' && settings.defaultPassword) {
        setMInput1(settings.defaultPassword);
    }
  }, [modal.type, settings.defaultPassword]);

  /* --- Handlers --- */

  const handleToolSelect = (tool: Tool) => {
    if (['cursor', 'text', 'draw', 'whiteout', 'eraser', 'stamp_remover', 'crop', 'redact', 'sign'].includes(tool.id)) {
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
          switch(id) {
              case 'rotate': 
                  rotatePage(activePage); 
                  setStatusMsg(`Page ${activePage} Rotated 🔄`); 
                  break;
              case 'merge': mergeInputRef.current?.click(); break;
              case 'add_image': imageInputRef.current?.click(); break;
              case 'word_to_pdf': wordInputRef.current?.click(); break;
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
                  download(new Blob([text], {type: 'text/plain'}), 'extracted_text.txt'); break;
              case 'pdf_to_jpg':
                  setStatusMsg("Converting... 🖼️");
                  const imgs = await Convert.pdfToImages(file);
                  if (imgs.length > 0) {
                      const a = document.createElement('a');
                      a.href = imgs[0]; a.download = `page_1.jpg`; a.click();
                      setStatusMsg('Saved JPG ✅');
                  } break;
          }
      } catch(e) { console.error(e); alert('Action Failed: ' + (e as Error).message); }
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

  const handleStampRemove = (pageNum: number) => {
      const stamps = annotations.filter(a => a.page === pageNum && a.type === 'image');
      if (stamps.length > 0) {
          stamps.forEach(s => removeAnnotation(s.id));
          setStatusMsg("Removed Image/Stamp 🧹");
      } else {
          setStatusMsg("AI: No stamps detected to remove.");
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
              if(!mInput1 || !mInput2) return alert("Enter pages!");
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
          let finalBytes = await Edit.saveAnnotations(file, annotations, pageRotations);
          if (options.password) {
             const tempFile = new File([finalBytes], fileName, { type: 'application/pdf' });
             finalBytes = await Security.encryptPdf(tempFile, options.password, settings.permissions);
          }
          download(finalBytes, fileName);
      } catch (e) { console.error(e); alert("Export failed"); }
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
          } catch(e) { alert("Conversion Failed"); }
      } else {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setPendingImage(ev.target?.result as string); setMode('image'); setStatusMsg("Tap to place image 📍");
          };
          reader.readAsDataURL(f);
      }
  };

  const download = (data: Blob | Uint8Array, name: string) => {
      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url; link.download = name;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      setStatusMsg(`Saved ${name} 🎉`);
      setTimeout(() => setStatusMsg(''), 3000);
  };

  if (!file) return null;

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
        <input type="file" ref={mergeInputRef} className="hidden" accept=".pdf" onChange={e => handleFile(e, 'merge')} />
        <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={e => handleFile(e, 'image')} />
        <input type="file" ref={wordInputRef} className="hidden" accept=".docx,.pptx,.xlsx" onChange={e => handleFile(e, 'word')} />

        {/* 1. HEADER */}
        <div className="h-14 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-white/20 flex items-center px-4 justify-between shrink-0 z-40 shadow-sm">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"><ChevronLeft className="w-5 h-5" /></button>
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
                    drawColor={drawColor} setDrawColor={(c) => { setDrawColor(c); if(mode==='cursor' && selectedAnnId) updateAnnotation(selectedAnnId, {color: c}); }}
                    brushSize={brushSize} setBrushSize={(s) => { setBrushSize(s); if(mode==='cursor' && selectedAnnId) updateAnnotation(selectedAnnId, {thickness: s, size: s}); }}
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

        <ThinkingSidebar isOpen={isThinkingOpen} onClose={() => setIsThinkingOpen(false)} messages={chatMessages} isThinking={isThinking} onSendMessage={(txt) => { /*... */ }} />
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
                        <button onClick={() => setModal({type: null, isOpen: false})} className="px-4 py-2 rounded-lg hover:bg-muted font-medium text-sm transition-colors">Cancel</button>
                        <button onClick={handleModalSubmit} className="px-6 py-2 bg-primary text-white rounded-lg shadow-lg shadow-primary/20 text-sm font-bold hover:scale-105 transition-transform">Apply</button>
                     </div>
                </div>
            </div>
        )}
    </div>
  );
};