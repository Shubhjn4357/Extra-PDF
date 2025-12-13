import { PDFDocument } from 'pdf-lib';
import { pdfToImages } from './convertTools';

export const compressPdf = async (file: File, quality: number = 0.6): Promise<Uint8Array> => {
    // Strategy: Convert pages to images at lower quality, then rebuild PDF.
    // This is a "destructive" but effective client-side compression for scanned docs.
    // For vector PDFs, this rasterizes them (trade-off).
    
    // 1. Convert all pages to JPEG images with reduced quality
    const images = await pdfToImages(file); 
    // pdfToImages uses scale 2.0; we might want a custom version for compression if needed,
    // but controlling JPEG quality in the re-embedding is the key here.

    const newPdf = await PDFDocument.create();

    for (const imgDataUrl of images) {
        // Fetch the blob from data URL
        const res = await fetch(imgDataUrl);
        const blob = await res.blob();
        
        // We can re-compress this blob if needed, or rely on embedding quality?
        // pdf-lib's embedJpg doesn't strictly "re-compress" but takes the binary.
        // So we need to ensure 'images' are ALREADY compressed.
        // 'pdfToImages' returns generic high-ish quality.
        
        // Let's do a canvas resize/compress pass
        const compressedBlob = await compressImageBlob(blob, quality);
        const compressedBytes = await compressedBlob.arrayBuffer();

        const img = await newPdf.embedJpg(compressedBytes);
        const page = newPdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    return await newPdf.save();
};

const compressImageBlob = async (blob: Blob, quality: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if(!ctx) return reject('No context');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(b => {
                if(b) resolve(b);
                else reject('Compression failed');
            }, 'image/jpeg', quality);
        };
        img.onerror = reject;
    });
};
