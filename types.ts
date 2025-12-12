import { LucideIcon } from 'lucide-react';

export type EditorMode = 'cursor' | 'text' | 'whiteout' | 'replace' | 'draw' | 'image' | 'watermark' | 'eraser' | 'stamp_remover';

export type ToolCategory = 'organize' | 'edit' | 'security' | 'convert';

export interface Tool {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
  requiresModal?: boolean; 
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface PDFState {
  file: File | null;
  fileName: string | null;
  pageCount: number;
  currentPage: number;
  zoom: number;
}

export interface ThinkingState {
  isOpen: boolean;
  isThinking: boolean;
  streamContent: string;
}

export interface TextAnnotation {
  id: string;
  page: number; // 1-based index
  x: number;
  y: number;
  text: string;
  type: 'text';
  color?: string;
  size?: number;
  // New Typography Props
  fontFamily?: 'Helvetica' | 'Times' | 'Courier';
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface WhiteoutAnnotation {
  id: string;
  page: number; // 1-based index
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'whiteout';
}

export interface ImageAnnotation {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  dataUrl: string; // Base64
  type: 'image';
}

export interface DrawingPath {
  id: string;
  page: number;
  points: { x: number; y: number }[];
  color: string;
  thickness: number;
  type: 'drawing';
}

export type Annotation = TextAnnotation | WhiteoutAnnotation | ImageAnnotation | DrawingPath;

export interface ModalState {
  type: 'split' | 'encrypt' | 'merge' | 'watermark' | 'metadata' | 'reorder' | 'delete_page' | null;
  isOpen: boolean;
}

export interface ExportOptions {
    fileName: string;
    compressionLevel: number; // 0-100
    password?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  autoCompress: boolean;
  aiThinking: boolean;
  defaultPassword?: string;
  permissions: {
    printing: boolean;
    copying: boolean;
    modifying: boolean;
  };
  density: 'comfortable' | 'compact';
}