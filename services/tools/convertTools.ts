import { Document, Packer, Paragraph, TextRun } from 'docx';
import { PDFDocument } from 'pdf-lib';
import { pdfjs } from 'react-pdf';

// Ensure worker is configured. Using the instance from react-pdf ensures consistency.
// We add a check to ensure the object exists before setting properties to avoid runtime errors.
if (pdfjs.GlobalWorkerOptions) {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
}

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

export const imageToPdf = async (file: File): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.create();
    const bytes = await file.arrayBuffer();
    const img = file.type === 'image/jpeg' ? await pdfDoc.embedJpg(bytes) : await pdfDoc.embedPng(bytes);
    const page = pdfDoc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    return await pdfDoc.save();
};