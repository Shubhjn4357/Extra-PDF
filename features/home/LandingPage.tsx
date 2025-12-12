import React, { useRef, useState } from 'react';
import { AIInput } from '../../components/ui/AIInput';
import { useFileStore } from '../../store/useFileStore';
import { SettingsDialog } from '../../components/ui/SettingsDialog';
import { FileText, Settings, UploadCloud, Images, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Convert from '../../services/tools/convertTools';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setFile } = useFileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    
    const files = Array.from(fileList);
    setIsProcessing(true);

    try {
        if (files.length === 1 && files[0].type === 'application/pdf') {
            setFile(files[0]);
            navigate('/editor/cursor');
            return;
        }

        const imageFiles = files.filter(f => f.type.startsWith('image/'));
        if (imageFiles.length > 0) {
            const pdfBytes = await Convert.createPdfFromImages(imageFiles);
            const fileName = imageFiles.length === 1 
                ? imageFiles[0].name.replace(/\.[^/.]+$/, "") + ".pdf"
                : "images_bundle.pdf";
            
            const newFile = new File([pdfBytes], fileName, { type: 'application/pdf' });
            setFile(newFile);
            navigate('/editor/cursor');
            return;
        }
        alert("Please upload a PDF or Images 📁");
    } catch (error) {
        console.error(error);
        alert("Error: " + (error as Error).message);
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-transparent">
      <input type="file" accept=".pdf, image/jpeg, image/png" multiple ref={fileInputRef} onChange={(e) => processFiles(e.target.files)} className="hidden" />
      <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Decorative Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 p-2 pr-4 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 shadow-sm">
            <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">ExtraPDF</span>
        </div>
        <button onClick={() => setIsSettingsOpen(true)} className="p-3 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 hover:bg-white/50 transition-all">
            <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 max-w-5xl mx-auto w-full gap-8">
        <div className="text-center space-y-4 animate-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" /> AI Powered Editor
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter drop-shadow-sm">
                Contextual <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Intelligence</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
                Chat with your documents, edit text, and organize pages magically ✨
            </p>
        </div>

        {/* Drop Zone */}
        <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragOver(false); processFiles(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
            className={`
                w-full max-w-2xl aspect-[3/1] rounded-[2.5rem] border-2 border-dashed transition-all duration-300 cursor-pointer
                flex flex-col items-center justify-center gap-4 group backdrop-blur-xl shadow-2xl relative overflow-hidden
                ${isDragOver 
                    ? 'border-primary bg-primary/10 scale-105 shadow-primary/20' 
                    : 'border-white/20 bg-white/40 dark:bg-black/20 hover:bg-white/50 hover:border-primary/30'
                }
            `}
        >
            {isProcessing ? (
                <div className="flex flex-col items-center gap-3 animate-pulse text-primary">
                    <Images className="w-12 h-12" />
                    <span className="font-bold text-lg">Crunching pixels... 🍪</span>
                </div>
            ) : (
                <>
                    <div className={`
                        p-6 rounded-full shadow-lg transition-transform duration-500
                        ${isDragOver ? 'bg-primary text-white scale-110' : 'bg-white text-foreground group-hover:scale-110'}
                    `}>
                        <UploadCloud className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-lg">Drop PDF or Images</p>
                        <p className="text-xs text-muted-foreground mt-1">Combine multiple files instantly</p>
                    </div>
                </>
            )}
        </div>

        {/* Floating Input */}
        <div className="fixed bottom-8 w-full max-w-xl px-4 z-50 animate-in slide-in-from-bottom-10 delay-300">
            <AIInput onSubmit={() => fileInputRef.current?.click()} placeholder="Ask to summarize or edit a document..." />
        </div>
      </main>
    </div>
  );
};