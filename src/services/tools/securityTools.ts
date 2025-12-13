import { PDFDocument } from 'pdf-lib';

const load = async (file: File) => await PDFDocument.load(await file.arrayBuffer());

export const encryptPdf = async (
    file: File,
    password: string,
    permissions: { printing: boolean, copying: boolean, modifying: boolean } = { printing: true, copying: false, modifying: false }
): Promise<Uint8Array> => {
    // Load source
    const srcDoc = await load(file);

    // Create destination
    const dstDoc = await PDFDocument.create();

    // Copy all pages
    const indices = srcDoc.getPageIndices();
    const copiedPages = await dstDoc.copyPages(srcDoc, indices);
    copiedPages.forEach(page => dstDoc.addPage(page));

    // Construct permissions object
    const p = permissions;

    // Encrypt the fresh document using save options
    // @ts-ignore - userPassword might not be directly in the type definition for save options in some environments
    const saveOptions: any = {
        userPassword: password,
        ownerPassword: password,
        permissions: {
            printing: p.printing ? 'highResolution' : undefined,
            modifying: p.modifying,
            copying: p.copying,
            annotating: p.modifying,
            fillingForms: p.modifying,
            contentAccessibility: p.copying,
            documentAssembly: p.modifying
        },
        useObjectStreams: false // Added as per instruction
    };
    return await dstDoc.save(saveOptions);
};

export const flattenPdf = async (file: File): Promise<Uint8Array> => {
    const pdfDoc = await load(file);
    try { pdfDoc.getForm().flatten(); } catch (e) { /* ignore */ }
    return await pdfDoc.save();
};

export const removeSecurity = async (file: File, password?: string): Promise<Uint8Array> => {
    // Load with password (if needed). If password is not provided and file is encrypted, it will throw.
    // If password is provided and correct, it loads the decrypted document.
    // If password is provided but incorrect, it will throw.
    const fileBytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(fileBytes, { password } as any);
    // Saving without any encryption options effectively removes the security
    return await doc.save();
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
        console.log("CheckEncryption Error:", error.name, error.message, error);
        if (error.name === 'PasswordException' || error.password || error.code === 1) { // 1 is often PasswordException code
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
        const blob = new Blob([decryptedBytes as any], { type: 'application/pdf' });

        return new File(
            [blob],
            file.name.replace('.pdf', '_decrypted.pdf'),
            { type: 'application/pdf' }
        );
    } catch (e) {
        throw new Error("Invalid Password or Decryption Failed");
    }
};