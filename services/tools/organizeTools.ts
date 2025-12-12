import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';

// Helper to load PDF
const load = async (file: File) => await PDFDocument.load(await file.arrayBuffer());

export const mergePdfs = async (file1: File, file2: File): Promise<Uint8Array> => {
  const [b1, b2] = await Promise.all([file1.arrayBuffer(), file2.arrayBuffer()]);
  const pdf1 = await PDFDocument.load(b1);
  const pdf2 = await PDFDocument.load(b2);
  const merged = await PDFDocument.create();
  
  (await merged.copyPages(pdf1, pdf1.getPageIndices())).forEach(p => merged.addPage(p));
  (await merged.copyPages(pdf2, pdf2.getPageIndices())).forEach(p => merged.addPage(p));
  
  return await merged.save();
};

export const splitPdf = async (file: File, startPage: number, endPage: number): Promise<Uint8Array> => {
  const pdfDoc = await load(file);
  const newPdf = await PDFDocument.create();
  const count = pdfDoc.getPageCount();
  const indices = [];

  for(let i = startPage - 1; i < endPage; i++) {
    if(i >= 0 && i < count) indices.push(i);
  }

  (await newPdf.copyPages(pdfDoc, indices)).forEach(p => newPdf.addPage(p));
  return await newPdf.save();
};

export const deletePages = async (file: File, pageNumbers: number[]): Promise<Uint8Array> => {
    const pdfDoc = await load(file);
    const total = pdfDoc.getPageCount();
    // Sort descending to avoid index shifting problems
    const toDelete = pageNumbers.map(p => p - 1).filter(p => p >= 0 && p < total).sort((a, b) => b - a);
    
    toDelete.forEach(idx => pdfDoc.removePage(idx));
    return await pdfDoc.save();
};

export const reorderPages = async (file: File, newOrderIndices: number[]): Promise<Uint8Array> => {
    // newOrderIndices should be 0-based array of old indices
    const pdfDoc = await load(file);
    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdfDoc, newOrderIndices);
    copiedPages.forEach(p => newPdf.addPage(p));
    return await newPdf.save();
};

export const rotateSpecificPage = async (file: File, pageNumber: number, angle: number): Promise<Uint8Array> => {
    const pdfDoc = await load(file);
    const page = pdfDoc.getPage(pageNumber - 1);
    const currentAngle = page.getRotation().angle;
    page.setRotation(degrees(currentAngle + angle));
    return await pdfDoc.save();
};

export const addPageNumbers = async (file: File): Promise<Uint8Array> => {
    const pdfDoc = await load(file);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const total = pdfDoc.getPageCount();

    pdfDoc.getPages().forEach((page, idx) => {
        const { width } = page.getSize();
        page.drawText(`Page ${idx + 1} of ${total}`, {
            x: width / 2 - 30, y: 20, size: 10, font, color: rgb(0,0,0)
        });
    });
    return await pdfDoc.save();
};