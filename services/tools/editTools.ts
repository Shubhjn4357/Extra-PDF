import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { Annotation } from '../../types';

const load = async (file: File) => await PDFDocument.load(await file.arrayBuffer());

export const saveAnnotations = async (
    file: File, 
    annotations: Annotation[], 
    rotations?: Record<number, number>
): Promise<Uint8Array> => {
  const pdfDoc = await load(file);
  const pages = pdfDoc.getPages();
  
  // Embed Fonts
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const helveticaBoldOblique = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);
  
  const times = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const timesBoldItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

  const courier = await pdfDoc.embedFont(StandardFonts.Courier);
  // Add other courier variants if needed

  const getFont = (family: string | undefined, bold: boolean | undefined, italic: boolean | undefined) => {
      if (family === 'Times') {
          if (bold && italic) return timesBoldItalic;
          if (bold) return timesBold;
          if (italic) return timesItalic;
          return times;
      }
      if (family === 'Courier') return courier;
      // Default Helvetica
      if (bold && italic) return helveticaBoldOblique;
      if (bold) return helveticaBold;
      if (italic) return helveticaOblique;
      return helvetica;
  };

  // Apply Rotations (Only rotates the page view, keeps content relative)
  if (rotations) {
      Object.entries(rotations).forEach(([idx, angle]) => {
          const i = parseInt(idx) - 1;
          if (pages[i]) pages[i].setRotation(degrees(pages[i].getRotation().angle + angle));
      });
  }

  // Apply Annotations
  for (const ann of annotations) {
    const pageIndex = ann.page - 1;
    if (!pages[pageIndex]) continue;
    const page = pages[pageIndex];
    const { height } = page.getSize();

    if (ann.type === 'text') {
        const r = parseInt(ann.color?.slice(1, 3) || '00', 16) / 255;
        const g = parseInt(ann.color?.slice(3, 5) || '00', 16) / 255;
        const b = parseInt(ann.color?.slice(5, 7) || '00', 16) / 255;
        
        const fontToUse = getFont(ann.fontFamily, ann.isBold, ann.isItalic);

        page.drawText(ann.text, { 
           x: ann.x, 
           y: height - ann.y - (ann.size || 14), // Adjust Y to align top-left logic
           size: ann.size || 14, 
           font: fontToUse, 
           color: rgb(r, g, b) 
        });
        
        // Basic Underline Implementation
        if (ann.isUnderline) {
            const width = fontToUse.widthOfTextAtSize(ann.text, ann.size || 14);
            page.drawLine({
                start: { x: ann.x, y: height - ann.y - (ann.size || 14) - 2 },
                end: { x: ann.x + width, y: height - ann.y - (ann.size || 14) - 2 },
                thickness: 1,
                color: rgb(r, g, b)
            });
        }

    } else if (ann.type === 'whiteout') {
       page.drawRectangle({ x: ann.x, y: height - ann.y - ann.height, width: ann.width, height: ann.height, color: rgb(1,1,1) });
    } else if (ann.type === 'image') {
       const img = ann.dataUrl.startsWith('data:image/png') 
         ? await pdfDoc.embedPng(ann.dataUrl) 
         : await pdfDoc.embedJpg(ann.dataUrl);
       page.drawImage(img, { x: ann.x, y: height - ann.y - ann.height, width: ann.width, height: ann.height });
    } else if (ann.type === 'drawing') {
        const p = ann.points;
        const r = parseInt(ann.color?.slice(1, 3) || '00', 16) / 255;
        const g = parseInt(ann.color?.slice(3, 5) || '00', 16) / 255;
        const b = parseInt(ann.color?.slice(5, 7) || '00', 16) / 255;
        
        for(let i=0; i<p.length-1; i++) {
            page.drawLine({
                start: { x: p[i].x, y: height - p[i].y },
                end: { x: p[i+1].x, y: height - p[i+1].y },
                thickness: ann.thickness, 
                color: rgb(r, g, b)
            });
        }
    }
  }
  return await pdfDoc.save();
};

export const addWatermark = async (file: File, text: string, colorHex: string = '#000000'): Promise<Uint8Array> => {
    const pdfDoc = await load(file);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Parse hex color
    const r = parseInt(colorHex.slice(1, 3), 16) / 255;
    const g = parseInt(colorHex.slice(3, 5), 16) / 255;
    const b = parseInt(colorHex.slice(5, 7), 16) / 255;

    pdfDoc.getPages().forEach(page => {
        const { width, height } = page.getSize();
        const fontSize = 80;
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        
        page.drawText(text, {
            x: width / 2 - (textWidth / 2) * 0.7, 
            y: height / 2,
            size: fontSize,
            font: font,
            color: rgb(r, g, b),
            rotate: degrees(45),
            opacity: 0.3,
        });
    });
    return await pdfDoc.save();
};