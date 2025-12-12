import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFCanvas } from './PDFCanvas';
import { useFileStore } from '../../contexts/FileContext';
import { EditorSidebar } from './components/EditorSidebar';
import { EditorToolbar } from './components/EditorToolbar';
import { ReorderDialog } from './components/ReorderDialog';
import { ThinkingSidebar } from './ThinkingSidebar';
import { ExportDialog, ExportOptions } from '../../components/ui/ExportDialog';
import { EditorMode, Tool, ToolCategory, ModalState, ChatMessage } from '../../types';
import { ChevronLeft, Menu } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { createChatSession, streamResponse, prepareDocumentPrompt } from '../../services/geminiService';
import { PDFDocument, rgb } from 'pdf-lib';

// Import Modular Tools
import * as Organize from '../../services/tools/organizeTools';
import * as Edit from '../../services/tools/editTools';
import * as Security from '../../services/tools/securityTools';
import * as Convert from '../../services/tools/convertTools';

export const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { file, replaceFile, annotations, addAnnotation, updateAnnotation, pageRotations, rotatePage, pdfText, numPages } = useFileStore();
  const { settings } = useSettings();
  
  // State
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<EditorMode>('cursor');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('edit');
  const [statusMsg, setStatusMsg] = useState('');
  
  // Sidebar Toggle State
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isThinkingOpen, setIsThinkingOpen] = useState(false);

  // Selection State
  const [selectedAnnId, setSelectedAnnId] = useState<string | null>(null);
  const selectedAnnotation = annotations.find(a => a.id === selectedAnnId);
  
  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatSessionRef = useRef<any>(null);

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

  useEffect(() => {
     chatSessionRef.current = createChatSession();
  }, []);

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
        // Deselect when switching tools
        if (tool.id !== 'cursor') setSelectedAnnId(null);
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
      if (mode === 'cursor' && selectedAnnId) {
           updateAnnotation(selectedAnnId, { color });
      }
  };

  const handleBrushSizeChange = (size: number) => {
      setBrushSize(size);
      if (mode === 'cursor' && selectedAnnId && selectedAnnotation?.type === 'drawing') {
          updateAnnotation(selectedAnnId, { thickness: size });
      } else if (mode === 'cursor' && selectedAnnId && selectedAnnotation?.type === 'text') {
          updateAnnotation(selectedAnnId, { size });
      }
  };


  const handleStampRemove = async (pageNum: number) => {
      setStatusMsg("AI Cleaning Page...");
      try {
          const arrayBuffer = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          const page = pdfDoc.getPage(pageNum - 1);
          const { width, height } = page.getSize();
          
          page.drawRectangle({
              x: 0,
              y: 0,
              width: width,
              height: height,
              color: rgb(1, 1, 1),
              opacity: 0.9, 
          });
          
          page.drawText('Page Cleaned by AI', {
              x: width / 2 - 80,
              y: height / 2,
              size: 24,
              color: rgb(0.2, 0.8, 0.2),
          });

          const newBytes = await pdfDoc.save();
          replaceFile(newBytes, file.name); 
          setStatusMsg("Page Cleaned & Refreshed");
          setTimeout(() => setStatusMsg(''), 2000);
      } catch (error) {
          console.error("Clean failed", error);
          setStatusMsg("Clean Failed");
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
             return "Text added to PDF";
        }
        if (toolCall.name === 'edit_pdf_replace_text') {
             const { newText, page, x, y, width, height } = toolCall.args;
             // Add Whiteout Layer
             addAnnotation({
                 id: Date.now().toString() + '_bg',
                 type: 'whiteout',
                 page: Number(page),
                 x: Number(x),
                 y: Number(y),
                 width: Number(width),
                 height: Number(height)
             });
             // Add Text Layer on top
             addAnnotation({
                 id: Date.now().toString() + '_txt',
                 type: 'text',
                 page: Number(page),
                 x: Number(x),
                 // Center roughly vertically
                 y: Number(y) + (Number(height) / 2) - 7,
                 text: newText as string,
                 size: 14,
                 color: '#000000'
             });
             return "Text replaced successfully";
        }
        if (toolCall.name === 'clean_page_image') {
            const { page } = toolCall.args;
            handleStampRemove(Number(page));
            return "Page cleaned";
        }
    });

    setIsThinking(false);
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
              case 'page_numbers':
                  replaceFile(await Organize.addPageNumbers(file), 'numbered.pdf');
                  setStatusMsg("Added Page Numbers");
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

  const handleExport = async (fileName: string, options: ExportOptions) => {
      try {
          setIsExportOpen(false);
          setStatusMsg("Generating...");
          
          let finalBytes = await Edit.saveAnnotations(file, annotations, pageRotations);

          if (options.password) {
             const tempFile = new File([finalBytes], fileName, { type: 'application/pdf' });
             finalBytes = await Security.encryptPdf(tempFile, options.password, settings.permissions);
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
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/')} className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="w-3 h-3" /> Back
                </button>
                <button 
                    onClick={() => setSidebarOpen(!isSidebarOpen)} 
                    className="md:hidden p-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
                >
                    <Menu className="w-4 h-4 text-foreground" />
                </button>
            </div>
            
            <span className="text-xs font-bold opacity-50 truncate max-w-[150px]">{file.name}</span>
            <div className="w-10" /> 
        </div>

        <div className="flex-1 flex overflow-hidden">
            {/* Smooth Collapsible Sidebar Container */}
            <div className={`
                transition-all duration-300 ease-in-out bg-background border-r border-border overflow-hidden
                ${isSidebarOpen ? 'w-16 md:w-20 opacity-100' : 'w-0 opacity-0'}
            `}>
                <EditorSidebar 
                    activeCategory={activeCategory} 
                    setActiveCategory={setActiveCategory}
                    activeToolId={mode}
                    onToolSelect={handleToolSelect}
                />
            </div>

            <div className="flex-1 flex flex-col relative min-w-0">
                {/* Dynamic Toolbar */}
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

                {/* Canvas Area */}
                <div className="flex-1 overflow-auto bg-black/5 dark:bg-black/20 relative p-4 md:p-8 backdrop-blur-sm">
                     {mode === 'image' && pendingImage && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-primary text-white text-xs px-4 py-2 rounded-full shadow-lg animate-bounce pointer-events-none">
                            Click on document to drop image
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
                     />
                </div>
            </div>
        </div>

        {/* Gemini Chat Sidebar */}
        <ThinkingSidebar 
            isOpen={isThinkingOpen} 
            onClose={() => setIsThinkingOpen(false)}
            messages={chatMessages}
            isThinking={isThinking}
            onSendMessage={handleChat}
        />

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
                                {/* Added gap-4 to fix overlap */}
                                <div className="flex gap-4">
                                    <input type="number" placeholder="Start" className="flex-1 w-full bg-white/50 dark:bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" value={mInput1} onChange={e => setMInput1(e.target.value)} />
                                    <div className="flex items-center text-muted-foreground">-</div>
                                    <input type="number" placeholder="End" className="flex-1 w-full bg-white/50 dark:bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" value={mInput2} onChange={e => setMInput2(e.target.value)} />
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