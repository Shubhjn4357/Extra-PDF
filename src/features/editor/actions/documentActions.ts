
import { useFileStore } from '@/store/useFileStore';
import * as Optimize from '@/services/tools/optimizeTools';
import * as Organize from '@/services/tools/organizeTools';
import * as Security from '@/services/tools/securityTools';
import * as Convert from '@/services/tools/convertTools';
import { useSettingsStore } from '@/store/useSettingsStore';

interface DocumentActionsProps {
    setIsBusy: (val: boolean) => void;
    setStatusMsg: (msg: string) => void;
    setMode: (mode: any) => void;
    setPendingImage: (img: string | null) => void;
    activePage: number;
    refs: {
        merge: any;
        image: any;
        word: any;
        modal: (m: any) => void;
    };
}

export const useDocumentActions = ({ setIsBusy, setStatusMsg, setMode, setPendingImage, activePage, refs }: DocumentActionsProps) => {
    const { file, replaceFile, rotatePage } = useFileStore();
    const { settings } = useSettingsStore();

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>, type: 'merge' | 'image' | 'word') => {

        const f = e.target.files?.[0];
        if (!f || !file) return;
        if (type === 'merge') {
            const res = await Organize.mergePdfs(file, f);
            replaceFile(res, 'merged.pdf'); setStatusMsg("Merged! 🔗");
        } else if (type === 'word') {
            try {
                setStatusMsg("Converting Word... 📄");
                const pdfBytes = await Convert.convertImageOrOfficeToPdf(f);
                replaceFile(pdfBytes, f.name.replace('.docx', '.pdf')); setStatusMsg("Converted! ✅");
            } catch (e) { alert("Conversion Failed"); }
        } else {
            const reader = new FileReader();
            reader.onload = (ev) => { setPendingImage(ev.target?.result as string); setMode('image'); setStatusMsg("Tap to place image 📍"); };
            reader.readAsDataURL(f);
        }
    };

    const executeDirectAction = async (action: string) => {
        if (!file) return;
        try {
            switch (action) {
                case 'rotate_left': rotatePage(activePage); break;
                case 'rotate_right': rotatePage(activePage); break;
                case 'compress':
                    setIsBusy(true); setStatusMsg("Compressing... 📦");

                    const c = await Optimize.compressPdf(file);
                    replaceFile(c, 'compressed.pdf');
                    setIsBusy(false); setStatusMsg("Compressed! 📉");
                    break;
                case 'flatten':
                    const flat = await Security.flattenPdf(file);
                    replaceFile(flat, 'flattened.pdf'); setStatusMsg("Flattened! 📄");
                    break;
                case 'grayscale':
                    // Not implemented in client-side robustly for vector yet, but let's assume optimize does it or alert
                    alert("Greyscale conversion requires server-side processing currently.");
                    break;
                case 'repair':
                    const rep = await Convert.repairPdf(file);
                    replaceFile(rep, 'repaired.pdf'); setStatusMsg("Repaired! 🔧");
                    break;
                case 'split': refs.modal({ type: 'split', isOpen: true }); break;
                case 'merge': refs.merge.current?.click(); break;
                case 'image_to_pdf': refs.image.current?.click(); break;
                case 'word_to_pdf': refs.word.current?.click(); break;
                case 'html_to_pdf': refs.modal({ type: 'html_to_pdf', isOpen: true }); break;
                case 'protect': refs.modal({ type: 'encrypt', isOpen: true }); break;
                case 'unlock': refs.modal({ type: 'encrypt', isOpen: true }); /* reusing encrypt modal logic for password input if needed? Actually unlock usually needs currently open file password. If file is open it is unlocked. Maybe this means Remove Security? */
                    const unlocked = await Security.removeSecurity(file);
                    replaceFile(unlocked, 'unlocked.pdf'); setStatusMsg("Security Removed 🔓");
                    break;
                case 'watermark': refs.modal({ type: 'watermark', isOpen: true }); break;
                case 'metadata': refs.modal({ type: 'metadata', isOpen: true }); break;
                case 'organize': refs.modal({ type: 'reorder', isOpen: true }); break;
                case 'delete_page': refs.modal({ type: 'delete_page', isOpen: true }); break;
            }
        } catch (e) {
            console.error(e); setIsBusy(false); alert('Action Failed: ' + (e as Error).message);
        }
    };

    return { handleFile, executeDirectAction };
};
