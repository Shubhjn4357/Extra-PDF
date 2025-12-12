import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Annotation, DrawingPath } from '../types';
import { pdfjs } from 'react-pdf';

// Ensure worker is loaded for text extraction
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

interface FileContextType {
  file: File | null;
  setFile: (file: File | null) => void;
  replaceFile: (newFileBytes: Uint8Array, name?: string) => void;
  pdfText: string;
  setPdfText: (text: string) => void;
  annotations: Annotation[];
  addAnnotation: (ann: Annotation) => void;
  updateAnnotation: (id: string, val: any) => void;
  removeAnnotation: (id: string) => void;
  extractAllText: (file: File) => Promise<void>;
  numPages: number;
  setNumPages: (n: number) => void;
  pageRotations: Record<number, number>; // Page Number -> Degrees (0, 90, 180, 270)
  rotatePage: (page: number) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState<string>("");
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [pageRotations, setPageRotations] = useState<Record<number, number>>({});

  const replaceFile = (newFileBytes: Uint8Array, name?: string) => {
    const newFile = new File([newFileBytes], name || file?.name || 'document.pdf', { type: 'application/pdf' });
    setFile(newFile);
    // Reset annotations and rotations as the underlying file structure changed
    setAnnotations([]);
    setPageRotations({});
  };

  const extractAllText = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Improve extraction by checking for end-of-line markers or item positioning
        let lastY = -1;
        const pageText = textContent.items.map((item: any) => {
            let str = item.str;
            if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
                str = '\n' + str;
            }
            lastY = item.transform[5];
            return str;
        }).join(' ');
        
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }
      setPdfText(fullText);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  const addAnnotation = (ann: Annotation) => {
    setAnnotations(prev => [...prev, ann]);
  };

  const updateAnnotation = (id: string, val: any) => {
    setAnnotations(prev => prev.map(a => {
        if (a.id !== id) return a;
        if (a.type === 'text' && typeof val === 'string') return { ...a, text: val };
        // Add more update logic here if needed
        return a;
    }));
  };

  const removeAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id));
  };

  const rotatePage = (page: number) => {
    setPageRotations(prev => ({
        ...prev,
        [page]: ((prev[page] || 0) + 90) % 360
    }));
  };

  return (
    <FileContext.Provider value={{ 
      file, 
      setFile, 
      replaceFile,
      pdfText, 
      setPdfText, 
      annotations, 
      addAnnotation, 
      updateAnnotation,
      removeAnnotation,
      extractAllText,
      numPages,
      setNumPages,
      pageRotations,
      rotatePage
    }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileStore = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileStore must be used within a FileProvider");
  }
  return context;
};