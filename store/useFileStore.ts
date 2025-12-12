import { create } from 'zustand';
import { Annotation } from '../types';
import { pdfjs } from 'react-pdf';

// Initialize worker globally
if (pdfjs.GlobalWorkerOptions) {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
}

interface FileState {
  file: File | null;
  fileName: string | null;
  pdfText: string;
  annotations: Annotation[];
  numPages: number;
  pageRotations: Record<number, number>;
  
  // Actions
  setFile: (file: File | null) => void;
  replaceFile: (newFileBytes: Uint8Array, name?: string) => void;
  setPdfText: (text: string) => void;
  addAnnotation: (ann: Annotation) => void;
  updateAnnotation: (id: string, val: Partial<Annotation>) => void;
  removeAnnotation: (id: string) => void;
  setNumPages: (n: number) => void;
  rotatePage: (page: number) => void;
  reset: () => void;
  
  // Async Actions
  extractAllText: (file: File) => Promise<void>;
}

export const useFileStore = create<FileState>((set, get) => ({
  file: null,
  fileName: null,
  pdfText: "",
  annotations: [],
  numPages: 0,
  pageRotations: {},

  setFile: (file) => set({ 
      file, 
      fileName: file?.name || null,
      annotations: [], 
      pageRotations: {}, 
      pdfText: "" 
  }),

  replaceFile: (newFileBytes, name) => {
    const currentFile = get().file;
    const newName = name || currentFile?.name || 'document.pdf';
    const newFile = new File([newFileBytes], newName, { type: 'application/pdf' });
    set({ 
        file: newFile, 
        fileName: newName,
        annotations: [], 
        pageRotations: {},
        pdfText: "" // Reset text, needs re-extraction
    });
    // Trigger re-extraction if needed, or let component handle it
  },

  setPdfText: (text) => set({ pdfText: text }),

  addAnnotation: (ann) => set((state) => ({ annotations: [...state.annotations, ann] })),

  updateAnnotation: (id, val) => set((state) => ({
    annotations: state.annotations.map((a) => (a.id === id ? { ...a, ...val } as Annotation : a))
  })),

  removeAnnotation: (id) => set((state) => ({
    annotations: state.annotations.filter((a) => a.id !== id)
  })),

  setNumPages: (n) => set({ numPages: n }),

  rotatePage: (page) => set((state) => ({
    pageRotations: {
        ...state.pageRotations,
        [page]: ((state.pageRotations[page] || 0) + 90) % 360
    }
  })),

  reset: () => set({ 
      file: null, fileName: null, pdfText: "", annotations: [], numPages: 0, pageRotations: {} 
  }),

  extractAllText: async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        let lastY = -1;
        const pageText = textContent.items.map((item: any) => {
            let str = item.str;
            // Simple heuristic for newlines based on Y position difference
            if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
                str = '\n' + str;
            }
            lastY = item.transform[5];
            return str;
        }).join(' ');
        
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }
      set({ pdfText: fullText });
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  }
}));