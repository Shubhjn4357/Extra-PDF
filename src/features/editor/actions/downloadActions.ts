
import { ExportOptions } from '@/types';
import * as Edit from '@/services/tools/editTools';
import * as Security from '@/services/tools/securityTools';
import { Annotation, EditableBlock } from '@/types';

export const downloadFile = (data: Blob | Uint8Array, name: string) => {
    const blob = data instanceof Blob ? data : new Blob([Buffer.from(data as Uint8Array)]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const handleExportAction = async (
    file: File | null,
    fileName: string,
    options: ExportOptions,
    annotations: Annotation[],
    editableBlocks: EditableBlock[],
    pageRotations: Record<number, number>,
    settingsPermissions: any
): Promise<void> => {
    if (!file) return;

    const blockAnnotations: any[] = [];
    editableBlocks.filter(b => b.isDirty).forEach(block => {
        blockAnnotations.push({
            id: `wo_${block.id}`,
            page: block.page,
            type: 'whiteout',
            x: block.x,
            y: block.y,
            width: block.width,
            height: block.height
        });
        blockAnnotations.push({
            id: `txt_${block.id}`,
            page: block.page,
            type: 'text',
            x: block.x,
            y: block.y,
            text: block.text,
            size: block.fontSize,
            fontFamily: block.fontFamily,
            color: '#000000'
        });
    });

    const allAnnotations = [...annotations, ...blockAnnotations];
    let finalBytes = await Edit.saveAnnotations(file, allAnnotations, pageRotations);

    if (options.password) {
        const blob = new Blob([Buffer.from(finalBytes)], { type: 'application/pdf' });
        const tempFile = new File([blob], fileName, { type: 'application/pdf' });
        finalBytes = await Security.encryptPdf(tempFile, options.password, settingsPermissions);
    }

    downloadFile(finalBytes, fileName);
};
