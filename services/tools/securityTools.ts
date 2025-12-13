import { PDFDocument } from 'pdf-lib';

const load = async (file: File) => await PDFDocument.load(await file.arrayBuffer());

export const encryptPdf = async (
    file: File, 
    password: string, 
    permissions: { printing: boolean, copying: boolean, modifying: boolean } = { printing: true, copying: false, modifying: false }
): Promise<Uint8Array> => {
  const pdfDoc = await load(file);
  
  // Construct permissions object explicitly for pdf-lib
  const permObj: any = {
      modifying: !!permissions.modifying,
      copying: !!permissions.copying,
      annotating: !!permissions.modifying,
      fillingForms: !!permissions.modifying,
      contentAccessibility: !!permissions.copying,
      documentAssembly: !!permissions.modifying,
  };

  // specific string enum for printing in pdf-lib
  if (permissions.printing) {
      permObj.printing = 'highResolution';
  }

  (pdfDoc as any).encrypt({
    userPassword: password,
    ownerPassword: password, // pdf-lib requires owner password to set permissions
    permissions: permObj
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