
import { useState, useRef } from 'react';
import { useFileStore } from '@/store/useFileStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { createChatSession, streamResponse } from '@/services/geminiService';
import { buildFinalPrompt, generateMaskBase64 } from '@/services/editorHelpers';
import { toast } from "sonner";
import { detectStamps, removeStampWithMask } from '@/services/geminiService';
import * as Convert from '@/services/tools/convertTools';
import * as Edit from '@/services/tools/editTools';
import * as Organize from '@/services/tools/organizeTools';
import { ChatMessage } from '@/types';

interface UAActionsProps {
    setStatusMsg: (msg: string) => void;
    setMode: (mode: any) => void;
}

export const useAIActions = ({ setStatusMsg, setMode }: UAActionsProps) => {
    const { file, replaceFile, addAnnotation, rotatePage, pdfText, numPages } = useFileStore();
    const { settings } = useSettingsStore();

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

    const [isThinking, setIsThinking] = useState(false);
    const [isAIProcessing, setIsAIProcessing] = useState(false);

    const chatSessionRef = useRef<any>(null);
    const isFirstMsgRef = useRef(true);

    const initializeChat = () => {
        chatSessionRef.current = createChatSession();
    };

    const handleStampRemove = async (pageNum: number, rect?: { x: number, y: number, w: number, h: number }, onStatus?: (msg: string) => void) => {
        if (!file) return;
        setIsAIProcessing(true);
        if (onStatus) onStatus(rect ? "AI Inpainting: Removing area..." : "AI Vision: Auto-detecting artifacts...");
        try {
            const imgBase64 = await Convert.getPageImage(file, pageNum);
            let boxes: any[] = [];
            if (rect) {
                const scale = 1.5;
                boxes = [{ x: Math.floor(rect.x * scale), y: Math.floor(rect.y * scale), w: Math.floor(rect.w * scale), h: Math.floor(rect.h * scale) }];
            } else {
                const autoBoxes = await detectStamps(imgBase64);
                if (autoBoxes.length === 0) { setIsAIProcessing(false); if (onStatus) onStatus("AI: No stamps detected."); return; }
                const imgObj = new Image(); imgObj.src = imgBase64; await imgObj.decode();
                boxes = autoBoxes.map(b => ({ x: Math.floor(b.x * imgObj.width), y: Math.floor(b.y * imgObj.height), w: Math.floor(b.width * imgObj.width), h: Math.floor(b.height * imgObj.height) }));
            }
            const maskBase64 = await generateMaskBase64(imgBase64, boxes);
            // Request clean image from Gemini
            const cleanedImage = await removeStampWithMask(imgBase64, maskBase64);
            if (!cleanedImage) {
                console.warn("AI did not return an image. Check console for model response text.");
                throw new Error("AI could not remove the stamp. The model might have refused the request or returned text.");
            }

            // Replace page. NOTE: This uses replaceFile which currently wipes annotations. 
            // We will fix useFileStore later to support overlay mode.
            const newPdfBytes = await Edit.replacePageWithImage(file, pageNum - 1, cleanedImage);
            replaceFile(newPdfBytes, "cleaned.pdf", true);

            setIsAIProcessing(false);
            if (onStatus) onStatus("Cleaned Page Replaced ✨");
            return true;
        } catch (e: any) {
            console.error("Stamp Removal Error", e);
            setIsAIProcessing(false);
            if (onStatus) onStatus("AI Error: Removal Failed.");
            toast.error("Stamp Removal Failed", { description: e.message || "An unexpected error occurred." });
            return false;
        }
    };

    const handleAIToolExecution = async (toolCall: any): Promise<string> => {
        const { name, args } = toolCall;
        console.log(`[AI Tool] Executing ${name}`, args);
        try {
            switch (name) {
                case 'edit_pdf_add_text':
                    addAnnotation({
                        id: Date.now().toString(), page: args.page, type: 'text', x: args.x || 100, y: args.y || 100, text: args.text, color: args.color || '#000000', size: args.fontSize || 14
                    });
                    return "Text added successfully.";
                case 'clean_page_image':
                    await handleStampRemove(args.page);
                    return "Stamp removal process completed.";
                case 'organize_rotate_page':
                    rotatePage(args.page);
                    return `Page ${args.page} rotated.`;
                case 'organize_delete_page':
                    if (args.pages && args.pages.length > 0) {
                        setIsAIProcessing(true);
                        const newBytes = await Organize.deletePages(file!, args.pages);
                        replaceFile(newBytes);
                        setIsAIProcessing(false);
                        return `Pages ${args.pages.join(', ')} deleted.`;
                    }
                    return "No pages specified.";
                case 'get_page_count':
                    return `The document has ${numPages} pages.`;
                default:
                    return "Tool not implemented.";
            }
        } catch (e) {
            console.error("AI Tool Execution Error", e);
            setIsAIProcessing(false);
            return "Error executing tool.";
        }
    };

    const handleChatSendMessage = async (text: string) => {
        if (!chatSessionRef.current) initializeChat();
        if (!chatSessionRef.current) return;

        setIsThinking(true);
        const userMsgId = Date.now().toString();
        setChatMessages(prev => [...prev, { id: userMsgId, role: 'user', text }]);

        const finalPrompt = buildFinalPrompt(pdfText, text, isFirstMsgRef.current, settings);
        isFirstMsgRef.current = false;

        const modelMsgId = (Date.now() + 1).toString();
        setChatMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '' }]);

        await streamResponse(
            chatSessionRef.current,
            finalPrompt,
            (chunk) => {
                setChatMessages(prev => prev.map(m => m.id === modelMsgId ? { ...m, text: m.text + chunk } : m));
            },
            async (toolCall) => await handleAIToolExecution(toolCall)
        );
        setIsThinking(false);
    };

    return {
        chatMessages,
        isThinking,
        isAIProcessing,
        handleChatSendMessage,
        handleStampRemove,
        initializeChat,
        setChatMessages, // Needed if we want to reset manually
    };
};
