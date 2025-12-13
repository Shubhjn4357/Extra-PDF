import { PDFDocument } from 'pdf-lib';

const load = async (file: File) => await PDFDocument.load(await file.arrayBuffer());

export const encryptPdf = async (
    file: File,
    password: string,
    permissions: { printing: boolean, copying: boolean, modifying: boolean } = { printing: true, copying: false, modifying: false }
): Promise<Uint8Array> => {
    // Load source
    const srcDoc = await load(file);

    // Create destination (fresh doc always has encrypt method)
    const dstDoc = await PDFDocument.create();

    // Copy all pages
    const indices = srcDoc.getPageIndices();
    const copiedPages = await dstDoc.copyPages(srcDoc, indices);
    copiedPages.forEach(page => dstDoc.addPage(page));

    // Construct permissions object
    const permObj: any = {
        modifying: !!permissions.modifying,
        copying: !!permissions.copying,
        annotating: !!permissions.modifying,
        fillingForms: !!permissions.modifying,
        contentAccessibility: !!permissions.copying,
        documentAssembly: !!permissions.modifying,
    };

    if (permissions.printing) {
        permObj.printing = 'highResolution';
    }

    // Encrypt the fresh document
    (dstDoc as any).encrypt({
        userPassword: password,
        ownerPassword: password,
        permissions: permObj
    });

    return await dstDoc.save();
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

export const checkEncryption = async (file: File): Promise<boolean> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const { pdfjs } = await import('react-pdf');
        // Try loading without password
        await pdfjs.getDocument(arrayBuffer).promise;
        return false;
    } catch (error: any) {
        if (error.name === 'PasswordException' || error.password) {
            return true;
        }
        return false;
    }
};

export const decryptPdf = async (file: File, password: string): Promise<File> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        // Load with password
        const pdfDoc = await PDFDocument.load(arrayBuffer, { password } as any);
        // Save without any encryption settings (removes it)
        const decryptedBytes = await pdfDoc.save();

        return new File(
            [decryptedBytes],
            file.name.replace('.pdf', '_decrypted.pdf'),
            { type: 'application/pdf' }
        );
    } catch (e) {
        throw new Error("Invalid Password or Decryption Failed");
    }
};