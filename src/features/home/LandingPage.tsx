"use client";

/**
 * LandingPage Component
 * 
 * The main entry point for ExtraPDF application. Provides:
 * - Drag-and-drop file upload for PDFs and images
 * - Password dialog for encrypted PDFs
 * - Image-to-PDF conversion for multiple images
 * - AI-powered document generation via Gemini API
 * 
 * @module features/home/LandingPage
 */

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// UI Components
import { AIInput } from '@/components/ui/AIInput';
import { SettingsDialog } from '@/components/ui/SettingsDialog';
import { PasswordDialog } from '@/components/ui/PasswordDialog';

// Icons
import { FileText, Settings, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

// State & Services
import { useFileStore } from '@/store/useFileStore';
import * as Convert from '@/services/tools/convertTools';
import { checkEncryption, decryptPdf } from '@/services/tools/securityTools';

/**
 * LandingPage - Main homepage component for ExtraPDF
 * Handles file uploads, encryption detection, and AI document generation
 */
export const LandingPage: React.FC = () => {
    const router = useRouter();
    const { setFile } = useFileStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // UI State
    const [isDragOver, setIsDragOver] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Encryption dialog state for password-protected PDFs
    const [passwordDialog, setPasswordDialog] = useState<{ isOpen: boolean, file: File | null }>({ isOpen: false, file: null });

    const processFiles = async (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return;

        const files = Array.from(fileList);
        setIsProcessing(true);

        try {
            if (files.length === 1 && files[0].type === 'application/pdf') {
                const file = files[0];
                const isEncrypted = await checkEncryption(file);

                if (isEncrypted) {
                    setIsProcessing(false);
                    setPasswordDialog({ isOpen: true, file });
                    return;
                }

                setFile(file);
                // Fix: Persist immediately
                await import('@/store/useFileStore').then(({ useFileStore }) => useFileStore.getState().persistState());

                router.push('/editor');
                return;
            }

            const imageFiles = files.filter(f => f.type.startsWith('image/'));
            if (imageFiles.length > 0) {
                const pdfBytes = await Convert.createPdfFromImages(imageFiles);
                const fileName = imageFiles.length === 1
                    ? imageFiles[0].name.replace(/\.[^/.]+$/, "") + ".pdf"
                    : "images_bundle.pdf";

                // Fix: Properly handle Blob/File creation without 'any'
                const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
                const newFile = new File([blob], fileName, { type: 'application/pdf' });

                setFile(newFile);
                // Fix: Persist immediately to avoid race condition on router push
                await import('@/store/useFileStore').then(({ useFileStore }) => useFileStore.getState().persistState());

                router.push('/editor');
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

    const handleUnlock = async (password: string) => {
        if (!passwordDialog.file) return;

        try {
            // Decrypt and set file - create new Uint8Array to ensure standard ArrayBuffer
            const decryptedFileBytes = await decryptPdf(passwordDialog.file, password);
            const blob = new Blob([new Uint8Array(decryptedFileBytes)], { type: 'application/pdf' });
            const decryptedFile = new File([blob], passwordDialog.file.name, { type: 'application/pdf' });
            setFile(decryptedFile);

            // Persist state immediately
            await import('@/store/useFileStore').then(({ useFileStore }) => useFileStore.getState().persistState());

            setPasswordDialog({ isOpen: false, file: null });
            router.push('/editor');
        } catch (e) {
            alert("Failed to unlock PDF. Please check the password.");
            console.error(e);
        }
    };

    const generatePdfFromAi = async (text: string) => {
        setIsProcessing(true);
        try {
            // 1. Get HTML content from Gemini
            const { generatePDFContent } = await import('@/services/geminiService');
            const htmlContent = await generatePDFContent(text);

            // 2. Render to PDF using html2canvas + jspdf
            // Create a temporary container
            const container = document.createElement('div');
            container.innerHTML = htmlContent;
            container.style.position = 'fixed';
            container.style.top = '-9999px';
            container.style.left = '-9999px';
            container.style.width = '794px'; // A4 width at 96 DPI (approx)
            container.style.backgroundColor = 'white';
            document.body.appendChild(container);

            const { default: html2canvas } = await import('html2canvas');
            const { jsPDF } = await import('jspdf');

            const canvas = await html2canvas(container, {
                scale: 2, // Better quality
                useCORS: true,
                logging: false
            });

            document.body.removeChild(container);

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'pt',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

            // 3. Convert to File and Set
            const pdfBlob = pdf.output('blob');
            const file = new File([pdfBlob], "ai_generated_document.pdf", { type: "application/pdf" });

            setFile(file);
            await import('@/store/useFileStore').then(({ useFileStore }) => useFileStore.getState().persistState());

            router.push('/editor');

        } catch (error) {
            console.error("AI Generation Failed:", error);
            alert("Failed to generate document. Please check your API usage or try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col bg-transparent">
            <input type="file" accept=".pdf, image/jpeg, image/png" multiple ref={fileInputRef} onChange={(e) => processFiles(e.target.files)} className="hidden" />
            <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

            <PasswordDialog
                isOpen={passwordDialog.isOpen}
                onClose={() => setPasswordDialog({ isOpen: false, file: null })}
                onUnlock={handleUnlock}
                fileName={passwordDialog.file?.name || 'Document'}
            />

            {/* Decorative Elements */}
            <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-3 p-2 pr-4 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 shadow-sm">
                    <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <FileText className="text-white w-6 h-6" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">ExtraPDF</span>
                </div>
                <button onClick={() => setIsSettingsOpen(true)} className="p-3 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 hover:bg-white/50 transition-all">
                    <Settings className="w-5 h-5" />
                </button>
            </header>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 max-w-5xl mx-auto w-full gap-4">
                <div className="text-center space-y-4 animate-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                        <Sparkles className="w-3 h-3" /> AI Powered Editor
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter drop-shadow-sm">
                        Contextual <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Intelligence</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
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
                flex flex-col items-center mb-20 md:mb-24 justify-center gap-4 group backdrop-blur-xl shadow-2xl relative overflow-hidden
                ${isDragOver
                            ? 'border-primary bg-primary/10 scale-105 shadow-primary/20'
                            : 'border-white/20 bg-white/40 dark:bg-black/20 hover:bg-white/50 hover:border-primary/30'
                        }
            `}
                >
                    {isProcessing ? (
                        <div className="flex flex-col items-center gap-3 animate-pulse text-primary">
                            <ImageIcon className="w-12 h-12" />
                            <span className="font-bold text-lg">Crunching pixels... 🍪</span>
                        </div>
                    ) : (
                        <>
                            <div className={`
                        p-6 rounded-full shadow-lg transition-transform duration-500
                        ${isDragOver ? 'bg-primary text-white scale-110' : 'bg-secondary text-foreground group-hover:scale-110'}
                    `}>
                                    <Upload className="size-4 md:size-8" />
                            </div>
                            <div className="text-center">
                                    <p className="font-bold  md:text-lg">Drop PDF or Images</p>
                                <p className="text-xs text-muted-foreground mt-1">Combine multiple files instantly</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Floating Input */}
                <div className="fixed bottom-8 w-full max-w-xl px-4 z-50 animate-in slide-in-from-bottom-10 delay-300">
                    <AIInput
                        onSubmit={(text) => generatePdfFromAi(text)}
                        isThinking={isProcessing}
                        placeholder="Ask to create a document (e.g. 'Resume for a Designer')..."
                    />
                </div>
            </main>
        </div>
    );
};