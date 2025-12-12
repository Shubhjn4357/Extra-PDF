import { Document, Packer, Paragraph, TextRun } from 'docx';
import { PDFDocument, rgb } from 'pdf-lib';
import { pdfjs } from 'react-pdf';
// @ts-ignore
import * as XLSX from 'xlsx';
// @ts-ignore
import PptxGenJS from 'pptxgenjs';
// @ts-ignore
import Tesseract from 'tesseract.js';
// @ts-ignore
import mammoth from 'mammoth';
// @ts-ignore
import html2canvas from 'html2canvas';
// @ts-ignore
import { jsPDF } from 'jspdf';

// Ensure worker is configured. Using the instance from react-pdf ensures consistency.
if (pdfjs.GlobalWorkerOptions) {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
}

// --- PDF TO OFFICE ---

export const createDocxFromText = async (text: string): Promise<Blob> => {
  const doc = new Document({
    sections: [{
      children: text.split('\n').map(line => 
        new Paragraph({ children: [new TextRun(line)], spacing: { after: 200 } })
      ),
    }],
  });
  return await Packer.toBlob(doc);
};

export const createXlsxFromPdf = async (file: File): Promise<Blob> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    const allData: string[][] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        
        // Simple heuristic: Try to split by common CSV delimiters or double spaces if structure is simple
        // For complex PDF tables, this is a best-effort client-side extraction.
        const rows = pageText.split('\n');
        rows.forEach(r => {
            allData.push(r.split(/\s{2,}/)); // Split by 2+ spaces
        });
    }

    const ws = XLSX.utils.aoa_to_sheet(allData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    return new Blob([wbout], { type: 'application/octet-stream' });
};

export const createPptxFromPdf = async (file: File): Promise<Blob> => {
    const pres = new PptxGenJS();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;

    for (let i = 1; i <= pdf.numPages; i++) {
        const slide = pres.addSlide();
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Add extracted text to slide
        const str = textContent.items.map((item: any) => item.str).join(' ');
        // Truncate to avoid overflow for demo
        slide.addText(str.substring(0, 1000), { x: 0.5, y: 0.5, w: '90%', h: '80%', fontSize: 12 });
        slide.addText(`Page ${i}`, { x: 0.5, y: '90%', fontSize: 10, color: '808080' });
    }

    return await pres.write("blob");
};

// --- OFFICE TO PDF (Client Side Simulation/Best Effort) ---

export const wordToPdf = async (file: File): Promise<Uint8Array> => {
    // Uses mammoth to extract raw text from .docx and put it in a PDF
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;
    
    // Create simple PDF from text
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    
    // Simple text wrapping logic
    const lines = text.split('\n');
    let y = height - 50;
    
    for (const line of lines) {
        if (y < 50) { page = pdfDoc.addPage(); y = height - 50; }
        // Very basic truncation to prevent error
        const cleanLine = line.replace(/[^\x00-\x7F]/g, ""); 
        page.drawText(cleanLine.substring(0, 90), { x: 50, y, size: fontSize });
        y -= 15;
    }
    
    return await pdfDoc.save();
};

export const convertImageOrOfficeToPdf = async (file: File): Promise<Uint8Array> => {
    // Wrapper to handle different types
    if (file.name.endsWith('.docx')) return wordToPdf(file);
    if (file.name.endsWith('.pptx') || file.name.endsWith('.xlsx')) {
        // Fallback for PPT/Excel client side (Convert to Text PDF)
        // Real implementation requires heavy parsers not available in standard ESM CDN
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        page.drawText(`Conversion of ${file.name} to PDF.\n(Preview only supports Text extraction for this format on mobile/web)`, { x: 50, y: 700, size: 12 });
        return await pdfDoc.save();
    }
    return imageToPdf(file);
};

// --- HTML TO PDF ---

export const htmlToPdf = async (htmlContent: string): Promise<Uint8Array> => {
    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    container.style.width = '595px'; // A4 width approx
    container.style.padding = '20px';
    container.style.background = 'white';
    document.body.appendChild(container);

    try {
        const canvas = await html2canvas(container);
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        return new Uint8Array(pdf.output('arraybuffer'));
    } finally {
        document.body.removeChild(container);
    }
};

// --- UTILS ---

export const repairPdf = async (file: File): Promise<Uint8Array> => {
    // PDF-lib's ignoreEncryption option can sometimes bypass basic corruption or owner passwords
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    return await pdfDoc.save();
};

export const ocrPdf = async (file: File): Promise<string> => {
    const images = await pdfToImages(file);
    if (images.length === 0) return "";
    
    const worker = await Tesseract.createWorker('eng');
    let fullText = "";
    
    for (const img of images) {
        const ret = await worker.recognize(img);
        fullText += ret.data.text + "\n\n";
    }
    await worker.terminate();
    return fullText;
};

// --- EXISTING IMAGE TOOLS ---

export const pdfToImages = async (file: File): Promise<string[]> => {
    const arrayBuffer = await file.arrayBuffer();
    // Use the configured library from react-pdf
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    const images: string[] = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        const context = canvas.getContext('2d');
        if (context) {
            // Cast to any to handle potential type mismatch with RenderParameters
            await page.render({ canvasContext: context, viewport } as any).promise;
            images.push(canvas.toDataURL('image/jpeg', 0.8));
        }
    }
    return images;
};

export const createPdfFromImages = async (files: File[]): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
        const buffer = await file.arrayBuffer();
        let img;
        try {
            if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                img = await pdfDoc.embedJpg(buffer);
            } else if (file.type === 'image/png') {
                img = await pdfDoc.embedPng(buffer);
            } else {
                continue; 
            }
        } catch (e) {
            console.warn(`Skipping invalid image: ${file.name}`);
            continue;
        }

        // Add page matching image dimensions
        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, {
            x: 0,
            y: 0,
            width: img.width,
            height: img.height,
        });
    }
    
    if (pdfDoc.getPageCount() === 0) {
        throw new Error("No valid images were found to create PDF.");
    }

    return await pdfDoc.save();
};

export const imageToPdf = async (file: File): Promise<Uint8Array> => {
    return createPdfFromImages([file]);
};