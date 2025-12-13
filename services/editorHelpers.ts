import { prepareDocumentPrompt } from './geminiService';

export const buildFinalPrompt = (
    pdfText: string,
    userQuery: string,
    isFirstMsg: boolean,
    settings: any
) => {
    const prompt = prepareDocumentPrompt(pdfText, userQuery, isFirstMsg);
    return settings.aiThinking
        ? prompt + "\n\n(IMPORTANT: Please Explain your reasoning step-by-step before giving the final answer.)"
        : prompt + "\n\n(IMPORTANT: Be concise. Do not explain reasoning unless asked.)";
};

export const generateMaskBase64 = async (imageBase64: string, boxes: Array<{ x: number; y: number; w?: number; width?: number; h?: number; height?: number }>) => {
    const img = new Image();
    img.src = imageBase64;
    await img.decode();

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');

    // Black background (keep)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // White boxes for mask
    ctx.fillStyle = 'white';
    boxes.forEach(b => {
        // support both normalized (0-1) coordinates and absolute pixel coords
        const bx = b.x ?? 0;
        const by = b.y ?? 0;
        const bw = (b.w ?? b.width ?? 0);
        const bh = (b.h ?? b.height ?? 0);

        let x, y, w, h;
        if (bx > 0 && bx <= 1 && by >= 0 && by <= 1 && bw > 0 && bw <= 1 && bh >= 0 && bh <= 1) {
            x = Math.round(bx * canvas.width);
            y = Math.round(by * canvas.height);
            w = Math.round(bw * canvas.width);
            h = Math.round(bh * canvas.height);
        } else {
            x = Math.round(bx);
            y = Math.round(by);
            w = Math.round(bw);
            h = Math.round(bh);
        }

        ctx.fillRect(x, y, w, h);
    });

    return canvas.toDataURL('image/png');
};
