import React, { useRef, useState } from 'react';
import { AIInput } from '../../components/ui/AIInput';
import { useFileStore } from '../../contexts/FileContext';
import { SettingsDialog } from '../../components/ui/SettingsDialog';
import { 
  FileText, 
  Settings, 
  UploadCloud, 
  ArrowRight,
  Images
} from 'lucide-react';
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
        // Scenario 1: Single PDF
        if (files.length === 1 && files[0].type === 'application/pdf') {
            setFile(files[0]);
            navigate('/editor/cursor');
            return;
        }

        // Scenario 2: Images (Single or Multiple)
        const imageFiles = files.filter(f => f.type.startsWith('image/'));
        if (imageFiles.length > 0) {
            const pdfBytes = await Convert.createPdfFromImages(imageFiles);
            const fileName = imageFiles.length === 1 
                ? imageFiles[0].name.replace(/\.[^/.]+$/, "") + ".pdf"
                : "converted_images.pdf";
            
            const newFile = new File([pdfBytes], fileName, { type: 'application/pdf' });
            setFile(newFile);
            navigate('/editor/cursor');
            return;
        }

        alert("Please upload a PDF file or Images (JPG, PNG).");

    } catch (error) {
        console.error(error);
        alert("Error processing files: " + (error as Error).message);
    } finally {
        setIsProcessing(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      processFiles(e.dataTransfer.files);
  };

  const handleAIRequest = (prompt: string) => {
    const confirmUpload = window.confirm("To use AI features, please upload a PDF or Images first.");
    if (confirmUpload) {
        fileInputRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-transparent">
      <input 
        type="file" 
        accept=".pdf, image/jpeg, image/png, image/jpg" 
        multiple
        ref={fileInputRef} 
        onChange={onFileChange} 
        className="hidden" 
      />

      <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Decorative Blur Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 p-2 pr-4 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 shadow-sm">
            <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">ExtraPDF</span>
        </div>
        <div className="flex gap-4">
             <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 px-4 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 hover:bg-white/50 transition-all flex items-center gap-2 text-sm font-medium"
             >
                <Settings className="w-5 h-5" />
                <span className="hidden md:inline">Settings</span>
             </button>
             <button 
                onClick={() => document.documentElement.classList.toggle('dark')} 
                className="p-2 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 hover:bg-white/50 transition-all"
             >
                <div className="w-5 h-5 rounded-full border-2 border-foreground/30 dark:border-foreground/70" />
             </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative z-10 max-w-5xl mx-auto w-full">
        
        <div className="text-center mb-12 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter drop-shadow-sm">
                Contextual <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto font-light">
                Drag & Drop PDFs or Images to transform them instantly.
            </p>
        </div>

        {/* Glass Drag and Drop Zone */}
        <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
                w-full py-4 max-w-3xl aspect-[3/1] md:aspect-[4/1] rounded-[2rem] border-2 border-dashed transition-all duration-300 cursor-pointer mb-16
                flex flex-col items-center justify-center gap-4 group backdrop-blur-xl shadow-2xl relative overflow-hidden
                ${isDragOver 
                    ? 'border-primary bg-primary/10 scale-[1.02] shadow-primary/20' 
                    : 'border-white/20 bg-white/20 dark:bg-black/20 hover:bg-white/30 hover:border-white/40'
                }
            `}
        >
            {isProcessing && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="flex flex-col items-center gap-2 animate-pulse">
                        <Images className="w-10 h-10 text-primary" />
                        <span className="font-bold text-lg">Converting Images...</span>
                    </div>
                </div>
            )}

            <div className={`
                p-5 rounded-full shadow-lg transition-transform duration-300
                ${isDragOver ? 'bg-primary text-white scale-110' : 'bg-white/50 dark:bg-black/50 text-foreground group-hover:scale-105'}
            `}>
                <UploadCloud className="w-8 h-8" />
            </div>
            <div className="text-center">
                <p className="font-semibold text-lg">Drop PDF or Images here</p>
                <p className="text-sm text-muted-foreground">Supports PDF, JPG, PNG (Multiple files allowed)</p>
            </div>
        </div>

        {/* Persistent Bottom Input */}
        <div className="fixed bottom-8 left-0 right-0 px-4 z-50">
            <AIInput onSubmit={handleAIRequest} placeholder="Describe a document you want to create or edit..." />
        </div>

      </main>
    </div>
  );
};