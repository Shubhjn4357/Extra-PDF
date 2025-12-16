
import { create } from 'zustand';
import { Annotation, EditableBlock } from '@/types';
// @ts-ignore
import Tesseract from 'tesseract.js';
import * as Convert from '@/services/tools/convertTools';
import { saveFileToIDB, loadFileFromIDB, clearIDB } from '@/services/storage';

// Worker initialized in components


// History State Slice
interface HistoryState {
  annotations: Annotation[];
  editableBlocks: EditableBlock[];
  pageRotations: Record<number, number>;
  pdfText: string;
}

interface FileState {
  file: File | null;
  fileName: string | null;
  pdfText: string;
  annotations: Annotation[];
  editableBlocks: EditableBlock[]; 
  numPages: number;
  pageRotations: Record<number, number>;
  isRestoring: boolean;

  // History
  history: HistoryState[];
  future: HistoryState[];
  undo: () => void;
  redo: () => void;

  // Actions
  setFile: (file: File | null) => void;
  replaceFile: (newFileBytes: Uint8Array, name?: string, keepAnnotations?: boolean) => void;
  setPdfText: (text: string) => void;
  addAnnotation: (ann: Annotation) => void;
  updateAnnotation: (id: string, val: Partial<Annotation>) => void;
  removeAnnotation: (id: string) => void;
  setNumPages: (n: number) => void;
  rotatePage: (page: number) => void;
  updateBlock: (id: string, val: Partial<EditableBlock>) => void;
  deleteBlock: (id: string) => void;
  reset: () => void;
  extractAllText: (file: File) => Promise<void>;
  scanPageForBlocks: (pageNum: number) => Promise<void>;
  persistState: () => Promise<void>;
  restoreState: () => Promise<void>;
}

export const useFileStore = create<FileState>((set, get) => {

  const addToHistory = () => {
    const { annotations, editableBlocks, pageRotations, pdfText, history } = get();
    // Limit to 30
    const newHistory = [...history, { annotations, editableBlocks, pageRotations, pdfText }];
    if (newHistory.length > 30) newHistory.shift();
    set({ history: newHistory, future: [] });
  };

  return {
    file: null, fileName: null, pdfText: "", annotations: [], editableBlocks: [], numPages: 0, pageRotations: {}, isRestoring: true,
    history: [], future: [],

    undo: () => {
      const { history, future, annotations, editableBlocks, pageRotations, pdfText } = get();
      if (history.length === 0) return;
      const prev = history[history.length - 1];
      const newFuture = [{ annotations, editableBlocks, pageRotations, pdfText }, ...future];
      set({
        annotations: prev.annotations,
        editableBlocks: prev.editableBlocks,
        pageRotations: prev.pageRotations,
        pdfText: prev.pdfText,
        history: history.slice(0, -1),
        future: newFuture
      });
    },

    redo: () => {
      const { history, future, annotations, editableBlocks, pageRotations, pdfText } = get();
      if (future.length === 0) return;
      const next = future[0];
      const newHistory = [...history, { annotations, editableBlocks, pageRotations, pdfText }];
      set({
        annotations: next.annotations,
        editableBlocks: next.editableBlocks,
        pageRotations: next.pageRotations,
        pdfText: next.pdfText,
        future: future.slice(1),
        history: newHistory
      });
    },

    setFile: (file) => set({
      file, fileName: file?.name || null, annotations: [], editableBlocks: [], pageRotations: {}, pdfText: "", isRestoring: false, history: [], future: []
    }),

    replaceFile: (newFileBytes, name, keepAnnotations = false) => {
      const newName = name || get().fileName || 'modified.pdf';
      const blob = new Blob([Buffer.from(newFileBytes) as any], { type: 'application/pdf' });
      const newFile = new File([blob], newName, { type: 'application/pdf' });
      // Clean history but optional keep annotations
      set(state => ({
        file: newFile,
        fileName: newName,
        annotations: keepAnnotations ? state.annotations : [],
        // editableBlocks: keepAnnotations ? state.editableBlocks : [], // Blocks usually invalidated by page replacement but let's clear them to be safe or re-scan? Safest to clear.
        editableBlocks: [],
        pageRotations: {},
        pdfText: "",
        history: [],
        future: []
      }));
      try { saveFileToIDB('lastFile', newFileBytes, newName); } catch (e) { }
    },

    setPdfText: (text) => { addToHistory(); set({ pdfText: text }); },

    addAnnotation: (ann) => { addToHistory(); set((state) => ({ annotations: [...state.annotations, ann] })); },

    updateAnnotation: (id, val) => { addToHistory(); set((state) => ({ annotations: state.annotations.map((a) => (a.id === id ? { ...a, ...val } as Annotation : a)) })); },

    removeAnnotation: (id) => { addToHistory(); set((state) => ({ annotations: state.annotations.filter((a) => a.id !== id) })); },

    updateBlock: (id, val) => { addToHistory(); set((state) => ({ editableBlocks: state.editableBlocks.map(b => b.id === id ? { ...b, ...val, isDirty: true } : b) })); },

    deleteBlock: (id) => { addToHistory(); set((state) => ({ editableBlocks: state.editableBlocks.filter(b => b.id !== id) })); },

    setNumPages: (n) => set({ numPages: n }),

    rotatePage: (page) => {
      addToHistory();
      set((state) => ({
        pageRotations: { ...state.pageRotations, [page]: ((state.pageRotations[page] || 0) + 90) % 360 }
      }));
    },

    reset: () => set({
      file: null, fileName: null, pdfText: "", annotations: [], editableBlocks: [], numPages: 0, pageRotations: {}, isRestoring: false, history: [], future: []
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
        const raw = localStorage.getItem('extrapdf_state');
        if (raw) {
          const parsed = JSON.parse(raw);
          set({
            annotations: parsed.annotations || [],
            editableBlocks: parsed.editableBlocks || [],
            pageRotations: parsed.pageRotations || {},
            pdfText: parsed.pdfText || '',
            numPages: parsed.numPages || 0,
            fileName: parsed.fileName || null,
            history: [], future: []
          });
        }
        const fileEntry = await loadFileFromIDB('lastFile');
        if (fileEntry && fileEntry.bytes) {
          const blob = new Blob([Buffer.from(fileEntry.bytes) as any], { type: 'application/pdf' });
          const f = new File([blob], fileEntry.name, { type: 'application/pdf' });
          set({ file: f, fileName: fileEntry.name });
        }
      } catch (e) { console.error('Restore Error', e); } finally { set({ isRestoring: false }); }
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
              if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) str = '\n' + str;
              lastY = item.transform[5];
              return str;
            }).join(' ');
          fullText += `--- Page ${i} ---\n${pageText}\n\n`;
        }
        set({ pdfText: fullText });
      } catch (error) { console.error("Error extracting text:", error); }
    },

    scanPageForBlocks: async (pageNum: number) => {
      const { file, editableBlocks } = get();
      if (!file) return;
      set({ editableBlocks: editableBlocks.filter(b => b.page !== pageNum) });
      try {
        const arrayBuffer = await file.arrayBuffer();
        const { pdfjs } = await import('react-pdf');
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.0 });
        const textContent = await page.getTextContent();
        const newBlocks: EditableBlock[] = [];
        if (textContent.items.length > 0) {
          console.log("Native text found, extracting...");
           textContent.items.forEach((item: any, idx: number) => {
             if (!item.str.trim()) return;
              const tx = item.transform;
              newBlocks.push({
                 id: `native_${pageNum}_${idx}`, page: pageNum, x: tx[4], y: viewport.height - tx[5] - item.height,
                 text: item.str, width: item.width, height: item.height || tx[0], fontSize: tx[0] || 12, fontFamily: 'Helvetica',
               });
            });
         } else {
           console.log("No native text, running OCR...");
           const imgData = await Convert.getPageImage(file, pageNum);
           const worker = await Tesseract.createWorker('eng');
           const { data } = await worker.recognize(imgData);
           await worker.terminate();
           const scaleFactor = 1.5;
           (data as any).words.forEach((w: any, idx: number) => {
             newBlocks.push({
                 id: `ocr_${pageNum}_${idx}`, page: pageNum, x: w.bbox.x0 / scaleFactor, y: w.bbox.y0 / scaleFactor,
                 text: w.text, width: (w.bbox.x1 - w.bbox.x0) / scaleFactor, height: (w.bbox.y1 - w.bbox.y0) / scaleFactor,
                 fontSize: (w.bbox.y1 - w.bbox.y0) / scaleFactor * 0.8, fontFamily: 'Courier',
               });
            });
         }
        addToHistory(); // Record block addition
        set((state) => ({ editableBlocks: [...state.editableBlocks, ...newBlocks] }));
      } catch (e) { console.error("Scan Error:", e); }
    }
  };
});