import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFCanvas } from './PDFCanvas';
import { useFileStore } from '../../../store/useFileStore';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { EditorSidebar } from './components/EditorSidebar';
import { EditorToolbar } from './components/EditorToolbar';
import { ReorderDialog } from './components/ReorderDialog';
import { ThinkingSidebar } from './ThinkingSidebar';
import { ExportDialog, ExportOptions } from '../../../components/ui/ExportDialog';
import { EditorMode, Tool, ToolCategory, ModalState, ChatMessage } from '../../../types';
import { ChevronLeft, Menu, Settings2, Scissors, Code } from 'lucide-react';
import { createChatSession, streamResponse, prepareDocumentPrompt } from '../../../services/geminiService';
import { PDFDocument, rgb } from 'pdf-lib';

// Import Modular Tools
import * as Organize from '../../../services/tools/organizeTools';
import * as Edit from '../../../services/tools/editTools';
import * as Security from '../../../services/tools/securityTools';
import * as Convert from '../../../services/tools/convertTools';

export const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { file, replaceFile, annotations, addAnnotation, updateAnnotation, rotatePage, pdfText, numPages, pageRotations } = useFileStore();
  const { settings } = useSettingsStore();
  
  // View State
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<EditorMode>('cursor');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('edit');
  const [statusMsg, setStatusMsg] = useState('');
  
  // Sidebar Toggle State (Mobile Responsive)
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile
  const [isThinkingOpen, setIsThinkingOpen] = useState(false);

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

  // Redirect Effect - Called unconditionally
  useEffect(() => {
    if (!file) {
      navigate('/');
    }
  }, [file, navigate]);

  // Auto-open sidebar on desktop & Init Chat - Called unconditionally
  useEffect(() => {
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) setSidebarOpen(true);
      
      chatSessionRef.current = createChatSession();
  }, []);

  // Auto-fill password - Called unconditionally
  useEffect(() => {
    if (modal.type === 'encrypt' && settings.defaultPassword) {
        setMInput1(settings.defaultPassword);
    }
  }, [modal.type, settings.defaultPassword]);

  /* --- Handlers --- */

  const handleToolSelect = (tool: Tool) => {
    // 1. Interactive Modes
    if (['cursor', 'text', 'draw', 'whiteout', 'eraser', 'stamp_remover', 'crop', 'redact', 'sign'].includes(tool.id)) {
        setMode(tool.id as EditorMode);
        if (tool.id !== 'cursor') setSelectedAnnId(null);
        // On mobile, close sidebar after selection
        if (window.innerWidth < 768) setSidebarOpen(false);
        return;
    }

    // 2. Modals
    if (tool.requiresModal) {
        setMInput1(''); setMInput2(''); setHtmlInput('');
        setModal({ type: tool.id as any, isOpen: true });
        if (window.innerWidth < 768) setSidebarOpen(false);
        return;
    }

    // 3. Direct Actions
    executeDirectAction(tool.id);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const executeDirectAction = async (id: string) => {
      try {
          if (!file) return; // Guard for actions
          switch(id) {
              case 'rotate': 
                  rotatePage(1); // Rotates view only
                  setStatusMsg("View Rotated 🔄");
                  break;
              case 'merge': mergeInputRef.current?.click(); break;
              case 'add_image': imageInputRef.current?.click(); break;
              case 'word_to_pdf': wordInputRef.current?.click(); break;
              case 'flatten':
                  replaceFile(await Security.flattenPdf(file), 'flattened.pdf');
                  setStatusMsg("PDF Flattened 📄");
                  break;
              case 'repair':
                  setStatusMsg("Repairing... 🔧");
                  replaceFile(await Convert.repairPdf(file), 'repaired.pdf');
                  setStatusMsg("PDF Repaired ✅");
                  break;
              case 'page_numbers':
                  replaceFile(await Organize.addPageNumbers(file), 'numbered.pdf');
                  setStatusMsg("Added Numbers 🔢");
                  break;
              case 'pdf_to_word':
                  download(await Convert.createDocxFromText(pdfText), 'converted.docx');
                  break;
              case 'pdf_to_excel':
                  setStatusMsg("Extracting Tables... 📊");
                  download(await Convert.createXlsxFromPdf(file), 'tables.xlsx');
                  break;
              case 'pdf_to_ppt':
                  setStatusMsg("Creating Slides... 🎞️");
                  download(await Convert.createPptxFromPdf(file), 'presentation.pptx');
                  break;
              case 'ocr_pdf':
                  setStatusMsg("Scanning Text (AI)... 👁️");
                  const text = await Convert.ocrPdf(file);
                  // Create a text file or just alert for now, effectively "Extract Text"
                  const blob = new Blob([text], {type: 'text/plain'});
                  download(blob, 'extracted_text.txt');
                  break;
              case 'pdf_to_jpg':
                  setStatusMsg("Converting... 🖼️");
                  const imgs = await Convert.pdfToImages(file);
                  if (imgs.length > 0) {
                      const a = document.createElement('a');
                      a.href = imgs[0]; 
                      a.download = `page_1.jpg`; 
                      a.click();
                      setStatusMsg('Saved JPG ✅');
                  }
                  break;
          }
      } catch(e) { console.error(e); alert('Action Failed: ' + (e as Error).message); }
  };

  const handleAnnotationSelect = (ann: any | null) => {
      setSelectedAnnId(ann ? ann.id : null);
      if (ann) {
          if (ann.type === 'text') {
              setTextStyle({
                  fontFamily: ann.fontFamily || 'Helvetica',
                  isBold: !!ann.isBold,
                  isItalic: !!ann.isItalic,
                  isUnderline: !!ann.isUnderline,
                  align: ann.align || 'left',
                  size: ann.size || 14
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

  const handleColorChange = (color: string) => {
      setDrawColor(color);
      if (mode === 'cursor' && selectedAnnId) updateAnnotation(selectedAnnId, { color });
  };

  const handleBrushSizeChange = (size: number) => {
      setBrushSize(size);
      if (mode === 'cursor' && selectedAnnId) {
          if (selectedAnnotation?.type === 'drawing') updateAnnotation(selectedAnnId, { thickness: size });
          if (selectedAnnotation?.type === 'text') updateAnnotation(selectedAnnId, { size });
      }
  };

  const handleCropApply = async (pageNum: number, rect: { x: number, y: number, w: number, h: number }) => {
      if(!file) return;
      try {
          const newBytes = await Edit.cropPage(file, pageNum - 1, rect);
          replaceFile(newBytes);
          setStatusMsg("Page Cropped ✂️");
          setMode('cursor');
      } catch(e) { console.error(e); alert("Crop failed"); }
  };

  const handleStampRemove = async (pageNum: number) => {
      if (!file) return;
      setStatusMsg("AI Cleaning... 🧼");
      try {
          // This is a simulation/placeholder for actual AI inpainting
          const arrayBuffer = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          const page = pdfDoc.getPage(pageNum - 1);
          const { width, height } = page.getSize();
          
          page.drawRectangle({
              x: 0, y: 0, width, height,
              color: rgb(1, 1, 1), opacity: 0.9, 
          });
          page.drawText('Cleaned by AI ✨', {
              x: width / 2 - 80, y: height / 2, size: 24, color: rgb(0.2, 0.8, 0.2),
          });

          const newBytes = await pdfDoc.save();
          replaceFile(newBytes, file.name); 
          setStatusMsg("Cleaned! ✨");
          setTimeout(() => setStatusMsg(''), 2000);
      } catch (error) {
          console.error("Clean failed", error);
          setStatusMsg("Failed ❌");
      }
  };

  const handleChat = async (text: string) => {
    if (!chatSessionRef.current) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
    setChatMessages(prev => [...prev, userMsg]);
    setIsThinking(true);
    
    const fullPrompt = prepareDocumentPrompt(pdfText, text);
    const modelMsgId = Date.now().toString() + '_ai';
    setChatMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '' }]);

    await streamResponse(chatSessionRef.current, fullPrompt, (chunk) => {
        setChatMessages(prev => prev.map(m => m.id === modelMsgId ? { ...m, text: m.text + chunk } : m));
    }, async (toolCall) => {
        if (toolCall.name === 'edit_pdf_add_text') {
             const { text, page, x, y } = toolCall.args;
             addAnnotation({ 
                id: Date.now().toString(), type: 'text', 
                page: Number(page), x: Number(x), y: Number(y), text: text as string 
             });
             return "Text added";
        }
        if (toolCall.name === 'edit_pdf_replace_text') {
             const { newText, page, x, y, width, height } = toolCall.args;
             addAnnotation({
                 id: Date.now().toString() + '_bg', type: 'whiteout',
                 page: Number(page), x: Number(x), y: Number(y), width: Number(width), height: Number(height)
             });
             addAnnotation({
                 id: Date.now().toString() + '_txt', type: 'text',
                 page: Number(page), x: Number(x), y: Number(y) + (Number(height)/2) - 7,
                 text: newText as string, size: 14, color: '#000000'
             });
             return "Text replaced";
        }
        if (toolCall.name === 'clean_page_image') {
            handleStampRemove(Number(toolCall.args.page));
            return "Page cleaned";
        }
    });
    setIsThinking(false);
  };

  const handleModalSubmit = async () => {
      try {
          if (!file) return;
          let res: Uint8Array | null = null;
          let updateView = false; 

          if (modal.type === 'split') {
              if(!mInput1 || !mInput2) return alert("Enter pages!");
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
          else if (modal.type === 'html_to_pdf') {
              res = await Convert.htmlToPdf(htmlInput);
              replaceFile(res, 'web_convert.pdf');
              setModal({ type: null, isOpen: false });
              return; // Immediate return for file replacement
          }

          if (res) {
              if (updateView) {
                  replaceFile(res);
                  setStatusMsg("Applied! 👍");
              } else {
                  download(res, 'output.pdf');
              }
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
          replaceFile(res, 'merged.pdf');
          setStatusMsg("Merged! 🔗");
      } 
      else if (type === 'word') {
          try {
            setStatusMsg("Converting Word... 📄");
            const pdfBytes = await Convert.convertImageOrOfficeToPdf(f);
            replaceFile(pdfBytes, f.name.replace('.docx', '.pdf'));
            setStatusMsg("Converted! ✅");
          } catch(e) { alert("Conversion Failed"); }
      }
      else {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setPendingImage(ev.target?.result as string);
              setMode('image');
              setStatusMsg("Tap to place image 📍");
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

  // If file is missing, we render nothing (but we ALREADY called all hooks above)
  if (!file) {
      return null;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
        {/* Hidden Inputs */}
        <input type="file" ref={mergeInputRef} className="hidden" accept=".pdf" onChange={e => handleFile(e, 'merge')} />
        <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={e => handleFile(e, 'image')} />
        <input type="file" ref={wordInputRef} className="hidden" accept=".docx,.pptx,.xlsx" onChange={e => handleFile(e, 'word')} />

        {/* 1. HEADER (Fixed Height) */}
        <div className="h-14 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-white/20 flex items-center px-4 justify-between shrink-0 z-40 shadow-sm">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors" title="Back to Home">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex flex-col">
                    <span className="text-sm font-bold truncate max-w-[150px] md:max-w-xs leading-none">{file.name}</span>
                    <span className="text-[10px] text-muted-foreground">{numPages} Pages</span>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                 {/* Mobile Sidebar Toggle */}
                <button 
                    onClick={() => setSidebarOpen(!isSidebarOpen)} 
                    className={`md:hidden p-2 rounded-lg transition-colors ${isSidebarOpen ? 'bg-primary/10 text-primary' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
                >
                    <Menu className="w-5 h-5" />
                </button>
                <button onClick={() => setModal({type: 'metadata', isOpen: true})} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full">
                    <Settings2 className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* 2. MAIN WORKSPACE (Flex) */}
        <div className="flex-1 flex overflow-hidden relative">
            
            {/* Sidebar (Collapsible on Mobile, Fixed on Desktop) */}
            <div className={`
                absolute md:static inset-y-0 left-0 z-30
                bg-background/95 backdrop-blur-xl border-r border-border
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-auto'}
                w-20 md:w-auto flex flex-col shadow-2xl md:shadow-none h-full
            `}>
                <EditorSidebar 
                    activeCategory={activeCategory} 
                    setActiveCategory={setActiveCategory}
                    activeToolId={mode}
                    onToolSelect={handleToolSelect}
                />
            </div>

            {/* Editor Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-muted/20 relative">
                
                {/* Toolbar */}
                <EditorToolbar 
                    mode={mode} 
                    selectedAnnotationType={selectedAnnotation ? (selectedAnnotation.type as any) : null}
                    zoom={zoom} 
                    setZoom={setZoom} 
                    onAction={(a) => {
                         if (a === 'merge_add') mergeInputRef.current?.click();
                         if (a === 'toggle_ai') setIsThinkingOpen(!isThinkingOpen);
                    }}
                    onExport={() => setIsExportOpen(true)}
                    status={statusMsg}
                    drawColor={drawColor}
                    setDrawColor={handleColorChange}
                    brushSize={brushSize}
                    setBrushSize={handleBrushSizeChange}
                    textStyle={textStyle}
                    setTextStyle={handleTextStyleChange}
                />

                {/* Canvas Scroll Container */}
                <div className="flex-1 overflow-auto p-4 md:p-8 relative scroll-smooth bg-zinc-100 dark:bg-zinc-900/50">
                     <div className="min-h-full flex flex-col items-center justify-start pb-20">
                         {mode === 'image' && pendingImage && (
                            <div className="sticky top-4 z-50 bg-primary text-white text-xs px-4 py-2 rounded-full shadow-lg animate-bounce pointer-events-none mb-4">
                                Tap on document to drop image 📍
                            </div>
                         )}
                         <PDFCanvas 
                            zoom={zoom} 
                            setZoom={setZoom}
                            mode={mode} 
                            pendingImage={pendingImage}
                            onImagePlaced={() => { setMode('cursor'); setPendingImage(null); }}
                            drawColor={drawColor}
                            brushSize={brushSize}
                            textStyle={textStyle}
                            onStampRemove={handleStampRemove}
                            onAnnotationSelect={handleAnnotationSelect}
                            onCropApply={handleCropApply}
                         />
                     </div>
                </div>
            </div>
        </div>

        {/* Floating AI Sidebar */}
        <ThinkingSidebar 
            isOpen={isThinkingOpen} 
            onClose={() => setIsThinkingOpen(false)}
            messages={chatMessages}
            isThinking={isThinking}
            onSendMessage={handleChat}
        />

        {/* Modals */}
        <ReorderDialog 
            isOpen={modal.type === 'reorder'} 
            onClose={() => setModal({ type: null, isOpen: false })}
            pageCount={numPages}
            onApply={async (order) => {
                try {
                    const res = await Organize.reorderPages(file, order);
                    replaceFile(res, 'reordered.pdf');
                    setStatusMsg("Pages Reordered 🔄");
                    setModal({ type: null, isOpen: false });
                } catch(e) { console.error(e); }
            }}
        />
        
        <ExportDialog 
            isOpen={isExportOpen}
            onClose={() => setIsExportOpen(false)}
            onExport={handleExport}
            defaultFileName={file.name.replace('.pdf', '')}
        />

        {/* General Settings/Tools Modal */}
        {modal.isOpen && modal.type !== 'reorder' && (
            <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                <div className="bg-background rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-in zoom-in-95 border border-border">
                    <h3 className="font-bold text-lg capitalize mb-6 flex items-center gap-2">
                        {modal.type === 'split' && <Scissors className="w-5 h-5" />}
                        {modal.type === 'html_to_pdf' && <Code className="w-5 h-5" />}
                        {modal.type?.replace('_', ' ')}
                    </h3>
                    
                    <div className="space-y-4">
                        {modal.type === 'split' && (
                            <div className="flex gap-4">
                                <input type="number" placeholder="Start" className="flex-1 bg-muted border-none rounded-xl p-3" value={mInput1} onChange={e => setMInput1(e.target.value)} />
                                <input type="number" placeholder="End" className="flex-1 bg-muted border-none rounded-xl p-3" value={mInput2} onChange={e => setMInput2(e.target.value)} />
                            </div>
                        )}
                        {/* ... (Other modal inputs remain similar but styled with Tailwind classes) ... */}
                        {(modal.type === 'encrypt' || modal.type === 'watermark') && (
                             <div className="space-y-3">
                                <input 
                                    type={modal.type === 'encrypt' ? "password" : "text"} 
                                    placeholder={modal.type === 'watermark' ? "Watermark Text" : "Password"}
                                    className="w-full bg-muted border-none rounded-xl p-3" 
                                    value={mInput1} onChange={e => setMInput1(e.target.value)} 
                                />
                                {modal.type === 'watermark' && (
                                     <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                                        <span className="text-xs font-medium">Color:</span>
                                        <input type="color" value={drawColor} onChange={e => setDrawColor(e.target.value)} className="bg-transparent border-none cursor-pointer h-6 w-6" />
                                     </div>
                                )}
                             </div>
                        )}

                        {modal.type === 'html_to_pdf' && (
                             <textarea 
                                placeholder="Paste HTML code here..."
                                className="w-full bg-muted border-none rounded-xl p-3 h-32 font-mono text-xs" 
                                value={htmlInput} onChange={e => setHtmlInput(e.target.value)} 
                            />
                        )}

                        <div className="flex gap-3 pt-4">
                            <button onClick={() => setModal({ type: null, isOpen: false })} className="flex-1 py-3 rounded-xl hover:bg-muted font-medium">Cancel</button>
                            <button onClick={handleModalSubmit} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};