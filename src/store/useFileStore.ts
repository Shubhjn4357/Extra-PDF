import '@/utils/polyfill';
import { create } from 'zustand';
import { Annotation, EditableBlock } from '@/types';
// @ts-ignore
import Tesseract from 'tesseract.js';
import * as Convert from '@/services/tools/convertTools';
import { saveFileToIDB, loadFileFromIDB, clearIDB } from '@/services/storage';

// Worker initialized in components


interface FileState {
  file: File | null;
  fileName: string | null;
  pdfText: string;
  annotations: Annotation[];
  editableBlocks: EditableBlock[]; // New: Stores OCR/Extracted blocks
  numPages: number;
  pageRotations: Record<number, number>;
  isRestoring: boolean; // New: Loading state

  // Actions
  setFile: (file: File | null) => void;
  // ... other actions
  replaceFile: (newFileBytes: Uint8Array, name?: string) => void;
  setPdfText: (text: string) => void;
  addAnnotation: (ann: Annotation) => void;
  updateAnnotation: (id: string, val: Partial<Annotation>) => void;
  removeAnnotation: (id: string) => void;
  setNumPages: (n: number) => void;
  rotatePage: (page: number) => void;

  // Block Actions
  updateBlock: (id: string, val: Partial<EditableBlock>) => void;
  deleteBlock: (id: string) => void;

  reset: () => void;
  // Async Actions
  extractAllText: (file: File) => Promise<void>;
  scanPageForBlocks: (pageNum: number) => Promise<void>;
  persistState: () => Promise<void>;
  restoreState: () => Promise<void>;
}

export const useFileStore = create<FileState>((set, get) => ({
  file: null,
  fileName: null,
  pdfText: "",
  annotations: [],
  editableBlocks: [],
  numPages: 0,
  pageRotations: {},
  isRestoring: true, // Start as true

  setFile: (file) => set({
    file,
    fileName: file?.name || null,
    annotations: [],
    editableBlocks: [],
    pageRotations: {},
    pdfText: "",
    isRestoring: false,
  }),

  replaceFile: (newFileBytes, name) => {
    const currentFile = get().file;
    const newName = name || currentFile?.name || 'document.pdf';
    const blob = new Blob([Buffer.from(newFileBytes) as any], { type: 'application/pdf' });
    const newFile = new File([blob], newName, { type: 'application/pdf' });
    set({
      file: newFile,
      fileName: newName,
      annotations: [],
      editableBlocks: [],
      pageRotations: {},
      pdfText: ""
    });
    // persist updated file bytes
    try { saveFileToIDB('lastFile', newFileBytes, newName); } catch (e) { }
  },

  setPdfText: (text) => set({ pdfText: text }),

  addAnnotation: (ann) => set((state) => ({ annotations: [...state.annotations, ann] })),

  updateAnnotation: (id, val) => set((state) => ({
    annotations: state.annotations.map((a) => (a.id === id ? { ...a, ...val } as Annotation : a))
  })),

  removeAnnotation: (id) => set((state) => ({
    annotations: state.annotations.filter((a) => a.id !== id)
  })),

  updateBlock: (id, val) => set((state) => ({
    editableBlocks: state.editableBlocks.map(b => b.id === id ? { ...b, ...val, isDirty: true } : b)
  })),

  deleteBlock: (id) => set((state) => ({
    editableBlocks: state.editableBlocks.filter(b => b.id !== id)
  })),

  setNumPages: (n) => set({ numPages: n }),

  rotatePage: (page) => set((state) => ({
    pageRotations: {
      ...state.pageRotations,
      [page]: ((state.pageRotations[page] || 0) + 90) % 360
    }
  })),

  reset: () => set({
    file: null, fileName: null, pdfText: "", annotations: [], editableBlocks: [], numPages: 0, pageRotations: {}, isRestoring: false
  }),

  persistState: async () => {
    try {
      const s = {
        annotations: get().annotations,
        editableBlocks: get().editableBlocks,
        pageRotations: get().pageRotations,
        pdfText: get().pdfText,
        numPages: get().numPages,
        fileName: get().fileName
      };
      localStorage.setItem('extrapdf_state', JSON.stringify(s));
      const f = get().file;
      if (f) {
        const bytes = new Uint8Array(await f.arrayBuffer());
        await saveFileToIDB('lastFile', bytes, f.name);
      }
    } catch (e) { console.error('Persist Error', e); }
  },

  restoreState: async () => {
    set({ isRestoring: true });
    try {
      // Initialize Worker Globally if not set
      if (typeof window !== 'undefined') {
        import('@/utils/pdfWorker').then(({ initPdfWorker }) => initPdfWorker());
      }

      const raw = localStorage.getItem('extrapdf_state');
      if (raw) {
        const parsed = JSON.parse(raw);
        set({
          annotations: parsed.annotations || [],
          editableBlocks: parsed.editableBlocks || [],
          pageRotations: parsed.pageRotations || {},
          pdfText: parsed.pdfText || '',
          numPages: parsed.numPages || 0,
          fileName: parsed.fileName || null
        });
      }
      const fileEntry = await loadFileFromIDB('lastFile');
      if (fileEntry && fileEntry.bytes) {
        const blob = new Blob([Buffer.from(fileEntry.bytes)], { type: 'application/pdf' });
        const f = new File([blob], fileEntry.name, { type: 'application/pdf' });
        set({ file: f, fileName: fileEntry.name });
      }
    } catch (e) {
      console.error('Restore Error', e);
    } finally {
      set({ isRestoring: false });
    }
  },

  extractAllText: async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const { pdfjs } = await import('react-pdf');
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

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
      set({ pdfText: fullText });
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  },

  scanPageForBlocks: async (pageNum: number) => {
    const { file, editableBlocks } = get();
    if (!file) return;

    // Clear existing blocks for this page to avoid duplicates
    set({ editableBlocks: editableBlocks.filter(b => b.page !== pageNum) });

    try {
      const arrayBuffer = await file.arrayBuffer();
      const { pdfjs } = await import('react-pdf');
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });

      const textContent = await page.getTextContent();

      const newBlocks: EditableBlock[] = [];

      // 1. Try Native Text Extraction
      if (textContent.items.length > 0) {
        console.log("Native text found, extracting...");
        // Group items by line roughly
        textContent.items.forEach((item: any, idx: number) => {
          if (!item.str.trim()) return;
          // PDF coords (bottom-left) to Viewport coords (top-left)
          // item.transform: [scaleX, skewX, skewY, scaleY, x, y]
          const tx = item.transform;
          const x = tx[4];
          const y = viewport.height - tx[5] - item.height;

          newBlocks.push({
            id: `native_${pageNum}_${idx}`,
            page: pageNum,
            x: x,
            y: y,
            text: item.str,
            width: item.width,
            height: item.height || tx[0], // fallback to scaleY
            fontSize: tx[0] || 12, // approx font size from scale
            fontFamily: 'Helvetica',
          });
        });
      } else {
        // 2. Fallback to OCR (Tesseract)
        console.log("No native text, running OCR...");
        const imgData = await Convert.getPageImage(file, pageNum);

        const worker = await Tesseract.createWorker('eng');
        const { data } = await worker.recognize(imgData);
        await worker.terminate();

        // Canvas dimensions vs Tesseract dimensions mapping
        // Convert.getPageImage uses scale 1.5, so we need to adjust
        const scaleFactor = 1.5;

        (data as any).words.forEach((w: any, idx: number) => {
          newBlocks.push({
            id: `ocr_${pageNum}_${idx}`,
            page: pageNum,
            x: w.bbox.x0 / scaleFactor,
            y: w.bbox.y0 / scaleFactor,
            text: w.text,
            width: (w.bbox.x1 - w.bbox.x0) / scaleFactor,
            height: (w.bbox.y1 - w.bbox.y0) / scaleFactor,
            fontSize: (w.bbox.y1 - w.bbox.y0) / scaleFactor * 0.8, // Approx
            fontFamily: 'Courier',
          });
        });
      }

      set((state) => ({ editableBlocks: [...state.editableBlocks, ...newBlocks] }));

    } catch (e) {
      console.error("Scan Error:", e);
    }
  }
}));