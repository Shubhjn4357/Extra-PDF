import React from 'react';
import { Tool, ToolCategory } from '../../../types';
import { 
    MousePointer, Type, Eraser, PenLine, Scissors, Merge, 
    Shield, RotateCw, FileImage, Layers, Trash, Stamp, 
    Image as ImageIcon, AlignLeft, Info, FileStack,
    Hash, FileOutput, Wand2, FileText, FileMinus
} from 'lucide-react';
import { useSettingsStore } from '../../../store/useSettingsStore';

interface SidebarProps {
    activeCategory: ToolCategory;
    setActiveCategory: (c: ToolCategory) => void;
    activeToolId: string;
    onToolSelect: (t: Tool) => void;
}

export const toolsList: Tool[] = [
    // ORGANIZE
    { id: 'merge', label: 'Merge', icon: Merge, category: 'organize', description: 'Combine PDFs' },
    { id: 'split', label: 'Split', icon: Scissors, category: 'organize', description: 'Extract pages', requiresModal: true },
    { id: 'remove_empty', label: 'Remove Empty', icon: FileMinus, category: 'organize', description: 'Auto-delete blank' },
    { id: 'reorder', label: 'Reorder', icon: FileStack, category: 'organize', description: 'Move pages', requiresModal: true },
    { id: 'rotate', label: 'Rotate', icon: RotateCw, category: 'organize', description: 'Rotate Page' },
    { id: 'delete_page', label: 'Delete', icon: Trash, category: 'organize', description: 'Remove Page', requiresModal: true },
    { id: 'page_numbers', label: 'Numbers', icon: Hash, category: 'organize', description: 'Add Footer' },
    
    // EDIT
    { id: 'cursor', label: 'Select', icon: MousePointer, category: 'edit', description: 'Select' },
    { id: 'edit_text', label: 'Edit Text', icon: FileText, category: 'edit', description: 'Edit Existing' }, // NEW
    { id: 'text', label: 'Add Text', icon: Type, category: 'edit', description: 'Add Text' },
    { id: 'draw', label: 'Draw', icon: PenLine, category: 'edit', description: 'Freehand' },
    { id: 'eraser', label: 'Eraser', icon: Eraser, category: 'edit', description: 'Delete Drawing' },
    { id: 'whiteout', label: 'Whiteout', icon: AlignLeft, category: 'edit', description: 'Cover Text' },
    { id: 'add_image', label: 'Image', icon: ImageIcon, category: 'edit', description: 'Add Image' },
    { id: 'watermark', label: 'Stamp', icon: Stamp, category: 'edit', description: 'Watermark', requiresModal: true },
    { id: 'stamp_remover', label: 'Clean AI', icon: Wand2, category: 'edit', description: 'Remove Stamp' },

    // SECURITY
    { id: 'encrypt', label: 'Encrypt', icon: Shield, category: 'security', description: 'Password', requiresModal: true },
    { id: 'flatten', label: 'Flatten', icon: Layers, category: 'security', description: 'Flatten' },
    { id: 'metadata', label: 'Meta', icon: Info, category: 'security', description: 'Metadata', requiresModal: true },

    // CONVERT
    { id: 'pdf_to_word', label: 'Word', icon: FileImage, category: 'convert', description: 'To DOCX' },
    { id: 'pdf_to_jpg', label: 'JPG', icon: FileOutput, category: 'convert', description: 'To Images' },
];

export const EditorSidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, activeToolId, onToolSelect }) => {
  const { settings } = useSettingsStore();
  const categories: ToolCategory[] = ['edit', 'organize', 'security', 'convert'];
  const isCompact = settings.density === 'compact';

  return (
    <div className={`
        w-20 flex flex-col items-center shrink-0 z-20 shadow-xl transition-all border-r
        bg-white/60 dark:bg-black/60 backdrop-blur-xl border-white/20
        ${isCompact ? 'py-2 gap-3' : 'py-4 gap-6'}
    `}>
        {/* Categories */}
        <div className={`flex flex-col w-full px-2 ${isCompact ? 'gap-1' : 'gap-3'}`}>
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                        rounded-2xl flex items-center justify-center transition-all duration-300 mx-auto
                        ${isCompact ? 'w-10 h-10' : 'w-12 h-12'}
                        ${activeCategory === cat 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105' 
                            : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:scale-105'
                        }
                    `}
                    title={cat.toUpperCase()}
                >
                   {cat === 'edit' && <PenLine className={isCompact ? "w-4 h-4" : "w-5 h-5"} />}
                   {cat === 'organize' && <Layers className={isCompact ? "w-4 h-4" : "w-5 h-5"} />}
                   {cat === 'security' && <Shield className={isCompact ? "w-4 h-4" : "w-5 h-5"} />}
                   {cat === 'convert' && <FileImage className={isCompact ? "w-4 h-4" : "w-5 h-5"} />}
                </button>
            ))}
        </div>

        <div className="w-10 h-px bg-white/20 my-2" />

        {/* Tools in Category */}
        <div className={`flex-1 w-full flex flex-col overflow-y-auto px-2 no-scrollbar ${isCompact ? 'gap-1' : 'gap-2'}`}>
            {toolsList.filter(t => t.category === activeCategory).map(tool => (
                <button
                    key={tool.id}
                    onClick={() => onToolSelect(tool)}
                    className={`
                        group relative w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all
                        ${activeToolId === tool.id 
                            ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' 
                            : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground'
                        }
                    `}
                >
                    <tool.icon className={isCompact ? "w-4 h-4" : "w-5 h-5"} />
                    <span className="text-[9px] font-medium opacity-0 group-hover:opacity-100 absolute -bottom-2 bg-white/90 dark:bg-black/90 px-1 rounded shadow-sm transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10">
                        {tool.label}
                    </span>
                </button>
            ))}
        </div>
    </div>
  );
};