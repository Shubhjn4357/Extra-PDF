import { PDFDocument } from 'pdf-lib';

const load = async (file: File) => await PDFDocument.load(await file.arrayBuffer());

export const encryptPdf = async (
    file: File, 
    password: string, 
    permissions: { printing: boolean, copying: boolean, modifying: boolean } = { printing: true, copying: false, modifying: false }
): Promise<Uint8Array> => {
  const pdfDoc = await load(file);
  (pdfDoc as any).encrypt({
    userPassword: password,
    ownerPassword: password,
    permissions: { 
        printing: permissions.printing ? 'highResolution' : undefined,
        modifying: permissions.modifying,
        copying: permissions.copying 
    }
  });
  return await pdfDoc.save();
};

export const flattenPdf = async (file: File): Promise<Uint8Array> => {
    const pdfDoc = await load(file);
    try { pdfDoc.getForm().flatten(); } catch (e) { /* ignore */ }
    return await pdfDoc.save();
};

export const updateMetadata = async (file: File, meta: { title?: string, author?: string }): Promise<Uint8Array> => {
    const pdfDoc = await load(file);
    if (meta.title) pdfDoc.setTitle(meta.title);
    if (meta.author) pdfDoc.setAuthor(meta.author);
    return await pdfDoc.save();
};