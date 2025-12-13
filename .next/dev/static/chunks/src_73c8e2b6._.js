(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/utils/polyfill.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// console.log("POLYFILL RUNNING");
// if (typeof window === 'undefined') {
//     global.Buffer = global.Buffer || require('buffer').Buffer;
//     global.DOMMatrix = global.DOMMatrix || class DOMMatrix {
//         constructor() { this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0; }
//     };
//     global.Image = global.Image || class Image { };
//     global.HTMLCanvasElement = global.HTMLCanvasElement || class HTMLCanvasElement { };
//     global.ImageData = global.ImageData || class ImageData { };
//     global.performance = global.performance || require('perf_hooks').performance;
// } else if (!window.Buffer) {
//     window.Buffer = require('buffer').Buffer;
// }
__turbopack_context__.s([]);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/tools/convertTools.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertImageOrOfficeToPdf",
    ()=>convertImageOrOfficeToPdf,
    "createDocxFromText",
    ()=>createDocxFromText,
    "createPdfFromImages",
    ()=>createPdfFromImages,
    "createPptxFromPdf",
    ()=>createPptxFromPdf,
    "createXlsxFromPdf",
    ()=>createXlsxFromPdf,
    "getPageImage",
    ()=>getPageImage,
    "htmlToPdf",
    ()=>htmlToPdf,
    "imageToPdf",
    ()=>imageToPdf,
    "ocrPdf",
    ()=>ocrPdf,
    "pdfToImages",
    ()=>pdfToImages,
    "repairPdf",
    ()=>repairPdf,
    "wordToPdf",
    ()=>wordToPdf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$docx$40$9$2e$5$2e$1$2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/docx@9.5.1/node_modules/docx/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/api/index.js [app-client] (ecmascript)");
// @ts-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$xlsx$40$0$2e$18$2e$5$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/xlsx@0.18.5/node_modules/xlsx/xlsx.mjs [app-client] (ecmascript)");
// @ts-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tesseract$2e$js$40$6$2e$0$2e$1_encoding$40$0$2e$1$2e$13$2f$node_modules$2f$tesseract$2e$js$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tesseract.js@6.0.1_encoding@0.1.13/node_modules/tesseract.js/src/index.js [app-client] (ecmascript)");
// @ts-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mammoth$40$1$2e$11$2e$0$2f$node_modules$2f$mammoth$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/mammoth@1.11.0/node_modules/mammoth/lib/index.js [app-client] (ecmascript)");
// @ts-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$html2canvas$40$1$2e$4$2e$1$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/html2canvas@1.4.1/node_modules/html2canvas/dist/html2canvas.js [app-client] (ecmascript)");
// @ts-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jspdf$40$3$2e$0$2e$4$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jspdf@3.0.4/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const createDocxFromText = async (text)=>{
    const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$docx$40$9$2e$5$2e$1$2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Document"]({
        sections: [
            {
                children: text.split('\n').map((line)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$docx$40$9$2e$5$2e$1$2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                        children: [
                            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$docx$40$9$2e$5$2e$1$2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextRun"](line)
                        ],
                        spacing: {
                            after: 200
                        }
                    }))
            }
        ]
    });
    return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$docx$40$9$2e$5$2e$1$2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Packer"].toBlob(doc);
};
const createXlsxFromPdf = async (file)=>{
    const { pdfjs } = await __turbopack_context__.A("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, async loader)");
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    const allData = [];
    for(let i = 1; i <= pdf.numPages; i++){
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item)=>item.str).join(' ');
        // Simple heuristic: Try to split by common CSV delimiters or double spaces if structure is simple
        // For complex PDF tables, this is a best-effort client-side extraction.
        const rows = pageText.split('\n');
        rows.forEach((r)=>{
            allData.push(r.split(/\s{2,}/)); // Split by 2+ spaces
        });
    }
    const ws = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$xlsx$40$0$2e$18$2e$5$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].aoa_to_sheet(allData);
    const wb = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$xlsx$40$0$2e$18$2e$5$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_new();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$xlsx$40$0$2e$18$2e$5$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(wb, ws, "Sheet1");
    const wbout = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$xlsx$40$0$2e$18$2e$5$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["write"](wb, {
        bookType: 'xlsx',
        type: 'array'
    });
    return new Blob([
        wbout
    ], {
        type: 'application/octet-stream'
    });
};
const createPptxFromPdf = async (file)=>{
    // @ts-ignore
    const PptxGenJSModule = await __turbopack_context__.A("[project]/node_modules/.pnpm/pptxgenjs@4.0.1/node_modules/pptxgenjs/dist/pptxgen.es.js [app-client] (ecmascript, async loader)");
    const PptxGenJS = PptxGenJSModule.default || PptxGenJSModule;
    const pres = new PptxGenJS();
    const arrayBuffer = await file.arrayBuffer();
    const { pdfjs } = await __turbopack_context__.A("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, async loader)");
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    for(let i = 1; i <= pdf.numPages; i++){
        const slide = pres.addSlide();
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        // Add extracted text to slide
        const str = textContent.items.map((item)=>item.str).join(' ');
        // Truncate to avoid overflow for demo
        slide.addText(str.substring(0, 1000), {
            x: 0.5,
            y: 0.5,
            w: '90%',
            h: '80%',
            fontSize: 12
        });
        slide.addText(`Page ${i}`, {
            x: 0.5,
            y: '90%',
            fontSize: 10,
            color: '808080'
        });
    }
    return await pres.write({
        outputType: 'blob'
    });
};
const wordToPdf = async (file)=>{
    // Uses mammoth to extract raw text from .docx and put it in a PDF
    const arrayBuffer = await file.arrayBuffer();
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$mammoth$40$1$2e$11$2e$0$2f$node_modules$2f$mammoth$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extractRawText({
        arrayBuffer
    });
    const text = result.value;
    // Create simple PDF from text
    const pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].create();
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    // Simple text wrapping logic
    const lines = text.split('\n');
    let y = height - 50;
    for (const line of lines){
        if (y < 50) {
            page = pdfDoc.addPage();
            y = height - 50;
        }
        // Very basic truncation to prevent error
        const cleanLine = line.replace(/[^\x00-\x7F]/g, "");
        page.drawText(cleanLine.substring(0, 90), {
            x: 50,
            y,
            size: fontSize
        });
        y -= 15;
    }
    return await pdfDoc.save();
};
const convertImageOrOfficeToPdf = async (file)=>{
    // Wrapper to handle different types
    if (file.name.endsWith('.docx')) return wordToPdf(file);
    if (file.name.endsWith('.pptx') || file.name.endsWith('.xlsx')) {
        // Fallback for PPT/Excel client side (Convert to Text PDF)
        // Real implementation requires heavy parsers not available in standard ESM CDN
        const pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].create();
        const page = pdfDoc.addPage();
        page.drawText(`Conversion of ${file.name} to PDF.\n(Preview only supports Text extraction for this format on mobile/web)`, {
            x: 50,
            y: 700,
            size: 12
        });
        return await pdfDoc.save();
    }
    return imageToPdf(file);
};
const htmlToPdf = async (htmlContent)=>{
    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    container.style.width = '595px'; // A4 width approx
    container.style.padding = '20px';
    container.style.background = 'white';
    document.body.appendChild(container);
    try {
        const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$html2canvas$40$1$2e$4$2e$1$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(container);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jspdf$40$3$2e$0$2e$4$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsPDF"]();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = imgProps.height * pdfWidth / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        return new Uint8Array(pdf.output('arraybuffer'));
    } finally{
        document.body.removeChild(container);
    }
};
const repairPdf = async (file)=>{
    // PDF-lib's ignoreEncryption option can sometimes bypass basic corruption or owner passwords
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].load(arrayBuffer, {
        ignoreEncryption: true
    });
    return await pdfDoc.save();
};
const ocrPdf = async (file)=>{
    const images = await pdfToImages(file);
    if (images.length === 0) return "";
    const worker = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tesseract$2e$js$40$6$2e$0$2e$1_encoding$40$0$2e$1$2e$13$2f$node_modules$2f$tesseract$2e$js$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createWorker('eng');
    let fullText = "";
    for (const img of images){
        const ret = await worker.recognize(img);
        fullText += ret.data.text + "\n\n";
    }
    await worker.terminate();
    return fullText;
};
const getPageImage = async (file, pageNum)=>{
    const { pdfjs } = await __turbopack_context__.A("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, async loader)");
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({
        scale: 1.5
    }); // Good balance for AI analysis
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext('2d');
    if (context) {
        await page.render({
            canvasContext: context,
            viewport
        }).promise;
        return canvas.toDataURL('image/jpeg', 0.8);
    }
    throw new Error("Canvas context error");
};
const pdfToImages = async (file)=>{
    const arrayBuffer = await file.arrayBuffer();
    // Use the configured library from react-pdf
    const { pdfjs } = await __turbopack_context__.A("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, async loader)");
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    const images = [];
    for(let i = 1; i <= pdf.numPages; i++){
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({
            scale: 2.0
        }); // Higher scale for better quality
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');
        if (context) {
            // Cast to any to handle potential type mismatch with RenderParameters
            await page.render({
                canvasContext: context,
                viewport
            }).promise;
            images.push(canvas.toDataURL('image/jpeg', 0.8));
        }
    }
    return images;
};
const createPdfFromImages = async (files)=>{
    const pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].create();
    for (const file of files){
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
        const page = pdfDoc.addPage([
            img.width,
            img.height
        ]);
        page.drawImage(img, {
            x: 0,
            y: 0,
            width: img.width,
            height: img.height
        });
    }
    if (pdfDoc.getPageCount() === 0) {
        throw new Error("No valid images were found to create PDF.");
    }
    return await pdfDoc.save();
};
const imageToPdf = async (file)=>{
    return createPdfFromImages([
        file
    ]);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Simple IndexedDB helpers for storing last opened PDF bytes
__turbopack_context__.s([
    "clearIDB",
    ()=>clearIDB,
    "loadFileFromIDB",
    ()=>loadFileFromIDB,
    "saveFileToIDB",
    ()=>saveFileToIDB
]);
const saveFileToIDB = async (key, bytes, name)=>{
    return new Promise((resolve, reject)=>{
        const openReq = indexedDB.open('extrapdf_db', 1);
        openReq.onupgradeneeded = ()=>{
            const db = openReq.result;
            if (!db.objectStoreNames.contains('files')) db.createObjectStore('files');
        };
        openReq.onsuccess = ()=>{
            const db = openReq.result;
            const tx = db.transaction('files', 'readwrite');
            const store = tx.objectStore('files');
            store.put({
                name: name || 'document.pdf',
                bytes: Array.from(bytes)
            }, key);
            tx.oncomplete = ()=>{
                db.close();
                resolve();
            };
            tx.onerror = ()=>{
                db.close();
                reject(tx.error);
            };
        };
        openReq.onerror = ()=>reject(openReq.error);
    });
};
const loadFileFromIDB = async (key)=>{
    return new Promise((resolve, reject)=>{
        const openReq = indexedDB.open('extrapdf_db', 1);
        openReq.onupgradeneeded = ()=>{
            const db = openReq.result;
            if (!db.objectStoreNames.contains('files')) db.createObjectStore('files');
        };
        openReq.onsuccess = ()=>{
            const db = openReq.result;
            const tx = db.transaction('files', 'readonly');
            const store = tx.objectStore('files');
            const getReq = store.get(key);
            getReq.onsuccess = ()=>{
                const val = getReq.result;
                db.close();
                if (!val) return resolve(null);
                resolve({
                    name: val.name,
                    bytes: new Uint8Array(val.bytes)
                });
            };
            getReq.onerror = ()=>{
                db.close();
                reject(getReq.error);
            };
        };
        openReq.onerror = ()=>reject(openReq.error);
    });
};
const clearIDB = async (key)=>{
    return new Promise((resolve, reject)=>{
        const openReq = indexedDB.open('extrapdf_db', 1);
        openReq.onsuccess = ()=>{
            const db = openReq.result;
            const tx = db.transaction('files', 'readwrite');
            const store = tx.objectStore('files');
            store.delete(key);
            tx.oncomplete = ()=>{
                db.close();
                resolve();
            };
            tx.onerror = ()=>{
                db.close();
                reject(tx.error);
            };
        };
        openReq.onerror = ()=>reject(openReq.error);
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/useFileStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFileStore",
    ()=>useFileStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$polyfill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/polyfill.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$9_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$3$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zustand@5.0.9_@types+react@19.2.7_react@19.2.3/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
// @ts-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tesseract$2e$js$40$6$2e$0$2e$1_encoding$40$0$2e$1$2e$13$2f$node_modules$2f$tesseract$2e$js$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tesseract.js@6.0.1_encoding@0.1.13/node_modules/tesseract.js/src/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/tools/convertTools.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage.ts [app-client] (ecmascript)");
;
;
;
;
;
const useFileStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$9_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$3$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        file: null,
        fileName: null,
        pdfText: "",
        annotations: [],
        editableBlocks: [],
        numPages: 0,
        pageRotations: {},
        isRestoring: true,
        setFile: (file)=>set({
                file,
                fileName: file?.name || null,
                annotations: [],
                editableBlocks: [],
                pageRotations: {},
                pdfText: "",
                isRestoring: false
            }),
        replaceFile: (newFileBytes, name)=>{
            const currentFile = get().file;
            const newName = name || currentFile?.name || 'document.pdf';
            const blob = new Blob([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(newFileBytes)
            ], {
                type: 'application/pdf'
            });
            const newFile = new File([
                blob
            ], newName, {
                type: 'application/pdf'
            });
            set({
                file: newFile,
                fileName: newName,
                annotations: [],
                editableBlocks: [],
                pageRotations: {},
                pdfText: ""
            });
            // persist updated file bytes
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveFileToIDB"])('lastFile', newFileBytes, newName);
            } catch (e) {}
        },
        setPdfText: (text)=>set({
                pdfText: text
            }),
        addAnnotation: (ann)=>set((state)=>({
                    annotations: [
                        ...state.annotations,
                        ann
                    ]
                })),
        updateAnnotation: (id, val)=>set((state)=>({
                    annotations: state.annotations.map((a)=>a.id === id ? {
                            ...a,
                            ...val
                        } : a)
                })),
        removeAnnotation: (id)=>set((state)=>({
                    annotations: state.annotations.filter((a)=>a.id !== id)
                })),
        updateBlock: (id, val)=>set((state)=>({
                    editableBlocks: state.editableBlocks.map((b)=>b.id === id ? {
                            ...b,
                            ...val,
                            isDirty: true
                        } : b)
                })),
        deleteBlock: (id)=>set((state)=>({
                    editableBlocks: state.editableBlocks.filter((b)=>b.id !== id)
                })),
        setNumPages: (n)=>set({
                numPages: n
            }),
        rotatePage: (page)=>set((state)=>({
                    pageRotations: {
                        ...state.pageRotations,
                        [page]: ((state.pageRotations[page] || 0) + 90) % 360
                    }
                })),
        reset: ()=>set({
                file: null,
                fileName: null,
                pdfText: "",
                annotations: [],
                editableBlocks: [],
                numPages: 0,
                pageRotations: {},
                isRestoring: false
            }),
        persistState: async ()=>{
            try {
                const s = {
                    annotations: get().annotations,
                    editableBlocks: get().editableBlocks,
                    pageRotations: get().pageRotations,
                    pdfText: get().pdfText,
                    numPages: get().numPages,
                    fileName: get().fileName
                };
                localStorage.setItem('extrapdf_state', JSON.stringify(s));
                const f = get().file;
                if (f) {
                    const bytes = new Uint8Array(await f.arrayBuffer());
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveFileToIDB"])('lastFile', bytes, f.name);
                }
            } catch (e) {
                console.error('Persist Error', e);
            }
        },
        restoreState: async ()=>{
            set({
                isRestoring: true
            });
            try {
                // Initialize Worker Globally if not set
                if ("TURBOPACK compile-time truthy", 1) {
                    __turbopack_context__.A("[project]/src/utils/pdfWorker.ts [app-client] (ecmascript, async loader)").then(({ initPdfWorker })=>initPdfWorker());
                }
                const raw = localStorage.getItem('extrapdf_state');
                if (raw) {
                    const parsed = JSON.parse(raw);
                    set({
                        annotations: parsed.annotations || [],
                        editableBlocks: parsed.editableBlocks || [],
                        pageRotations: parsed.pageRotations || {},
                        pdfText: parsed.pdfText || '',
                        numPages: parsed.numPages || 0,
                        fileName: parsed.fileName || null
                    });
                }
                const fileEntry = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadFileFromIDB"])('lastFile');
                if (fileEntry && fileEntry.bytes) {
                    const blob = new Blob([
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(fileEntry.bytes)
                    ], {
                        type: 'application/pdf'
                    });
                    const f = new File([
                        blob
                    ], fileEntry.name, {
                        type: 'application/pdf'
                    });
                    set({
                        file: f,
                        fileName: fileEntry.name
                    });
                }
            } catch (e) {
                console.error('Restore Error', e);
            } finally{
                set({
                    isRestoring: false
                });
            }
        },
        extractAllText: async (file)=>{
            try {
                const arrayBuffer = await file.arrayBuffer();
                const { pdfjs } = await __turbopack_context__.A("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, async loader)");
                const pdf = await pdfjs.getDocument(arrayBuffer).promise;
                let fullText = "";
                for(let i = 1; i <= pdf.numPages; i++){
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    let lastY = -1;
                    const pageText = textContent.items.map((item)=>{
                        let str = item.str;
                        if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
                            str = '\n' + str;
                        }
                        lastY = item.transform[5];
                        return str;
                    }).join(' ');
                    fullText += `--- Page ${i} ---\n${pageText}\n\n`;
                }
                set({
                    pdfText: fullText
                });
            } catch (error) {
                console.error("Error extracting text:", error);
            }
        },
        scanPageForBlocks: async (pageNum)=>{
            const { file, editableBlocks } = get();
            if (!file) return;
            // Clear existing blocks for this page to avoid duplicates
            set({
                editableBlocks: editableBlocks.filter((b)=>b.page !== pageNum)
            });
            try {
                const arrayBuffer = await file.arrayBuffer();
                const { pdfjs } = await __turbopack_context__.A("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, async loader)");
                const pdf = await pdfjs.getDocument(arrayBuffer).promise;
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({
                    scale: 1.0
                });
                const textContent = await page.getTextContent();
                const newBlocks = [];
                // 1. Try Native Text Extraction
                if (textContent.items.length > 0) {
                    console.log("Native text found, extracting...");
                    // Group items by line roughly
                    textContent.items.forEach((item, idx)=>{
                        if (!item.str.trim()) return;
                        // PDF coords (bottom-left) to Viewport coords (top-left)
                        // item.transform: [scaleX, skewX, skewY, scaleY, x, y]
                        const tx = item.transform;
                        const x = tx[4];
                        const y = viewport.height - tx[5] - item.height;
                        newBlocks.push({
                            id: `native_${pageNum}_${idx}`,
                            page: pageNum,
                            x: x,
                            y: y,
                            text: item.str,
                            width: item.width,
                            height: item.height || tx[0],
                            fontSize: tx[0] || 12,
                            fontFamily: 'Helvetica'
                        });
                    });
                } else {
                    // 2. Fallback to OCR (Tesseract)
                    console.log("No native text, running OCR...");
                    const imgData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPageImage"](file, pageNum);
                    const worker = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tesseract$2e$js$40$6$2e$0$2e$1_encoding$40$0$2e$1$2e$13$2f$node_modules$2f$tesseract$2e$js$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createWorker('eng');
                    const { data } = await worker.recognize(imgData);
                    await worker.terminate();
                    // Canvas dimensions vs Tesseract dimensions mapping
                    // Convert.getPageImage uses scale 1.5, so we need to adjust
                    const scaleFactor = 1.5;
                    data.words.forEach((w, idx)=>{
                        newBlocks.push({
                            id: `ocr_${pageNum}_${idx}`,
                            page: pageNum,
                            x: w.bbox.x0 / scaleFactor,
                            y: w.bbox.y0 / scaleFactor,
                            text: w.text,
                            width: (w.bbox.x1 - w.bbox.x0) / scaleFactor,
                            height: (w.bbox.y1 - w.bbox.y0) / scaleFactor,
                            fontSize: (w.bbox.y1 - w.bbox.y0) / scaleFactor * 0.8,
                            fontFamily: 'Courier'
                        });
                    });
                }
                set((state)=>({
                        editableBlocks: [
                            ...state.editableBlocks,
                            ...newBlocks
                        ]
                    }));
            } catch (e) {
                console.error("Scan Error:", e);
            }
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/geminiService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createChatSession",
    ()=>createChatSession,
    "detectStamps",
    ()=>detectStamps,
    "enhanceTextBlock",
    ()=>enhanceTextBlock,
    "prepareDocumentPrompt",
    ()=>prepareDocumentPrompt,
    "removeStampWithMask",
    ()=>removeStampWithMask,
    "streamResponse",
    ()=>streamResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@google+genai@1.33.0/node_modules/@google/genai/dist/web/index.mjs [app-client] (ecmascript)");
;
// Initialize the Gemini client
const getClient = ()=>{
    const apiKey = ("TURBOPACK compile-time value", "AIzaSyDpJ3r6nGs-HIh-_MvDrP8qPo2IKsNXRVA");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
        apiKey: apiKey || ''
    });
};
// --- Tool Definitions ---
const addTextTool = {
    name: 'edit_pdf_add_text',
    description: 'Add new text to the PDF. Use this for filling forms, adding comments, or inserting headers/footers.',
    parameters: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].OBJECT,
        properties: {
            text: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].STRING,
                description: 'The text content to add.'
            },
            page: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER,
                description: 'Page number (1-based index).'
            },
            x: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER,
                description: 'X coordinate in points (0 is left). Default to 100 if unknown.'
            },
            y: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER,
                description: 'Y coordinate in points (0 is top). Default to 100 if unknown.'
            },
            fontSize: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER,
                description: 'Font size (default 14).'
            },
            color: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].STRING,
                description: 'Hex color (default #000000).'
            }
        },
        required: [
            'text',
            'page'
        ]
    }
};
const cleanStampTool = {
    name: 'clean_page_image',
    description: 'Use AI Vision to detect and remove stamps, watermarks, or logos from a specific page.',
    parameters: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].OBJECT,
        properties: {
            page: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER,
                description: 'Page number to clean (1-based index).'
            }
        },
        required: [
            'page'
        ]
    }
};
const rotatePageTool = {
    name: 'organize_rotate_page',
    description: 'Rotate a specific page by 90 degrees clockwise.',
    parameters: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].OBJECT,
        properties: {
            page: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER,
                description: 'Page number to rotate.'
            }
        },
        required: [
            'page'
        ]
    }
};
const deletePageTool = {
    name: 'organize_delete_page',
    description: 'Delete a specific page or list of pages from the document.',
    parameters: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].OBJECT,
        properties: {
            pages: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].ARRAY,
                items: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].NUMBER
                },
                description: 'Array of page numbers to delete.'
            }
        },
        required: [
            'pages'
        ]
    }
};
const pageCountTool = {
    name: 'get_page_count',
    description: 'Get the total number of pages in the document.',
    parameters: {
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$genai$40$1$2e$33$2e$0$2f$node_modules$2f40$google$2f$genai$2f$dist$2f$web$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Type"].OBJECT,
        properties: {}
    }
};
const createChatSession = ()=>{
    const ai = getClient();
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are ExtraPDF Assistant, an expert AI document editor.
            
            Capabilities:
            1. **Edit Content**: Add text, comments, or form fills using 'edit_pdf_add_text'.
            2. **Clean Up**: Remove stamps/watermarks using 'clean_page_image'.
            3. **Organize**: Rotate pages ('organize_rotate_page') or delete pages ('organize_delete_page').
            4. **Analyze**: Summarize or explain content based on the text provided by the user.
            
            Rules:
            - Always confirm action completion (e.g., "I've rotated page 3").
            - For 'clean_page_image', tell the user you are "scanning the page for visual artifacts".
            - If the user asks to "fix" or "clean" a page, assume they mean stamp/artifact removal.
            - Coordinate System: PDF origin is Top-Left. Width ~595pt.
            `,
            tools: [
                {
                    functionDeclarations: [
                        addTextTool,
                        cleanStampTool,
                        rotatePageTool,
                        deletePageTool,
                        pageCountTool
                    ]
                }
            ]
        }
    });
};
const prepareDocumentPrompt = (pdfText, userQuery, isFirstMessage)=>{
    if (!isFirstMessage) return userQuery;
    const MAX_CONTEXT = 50000;
    const context = pdfText.length > MAX_CONTEXT ? pdfText.substring(0, MAX_CONTEXT) + "\n...(truncated)..." : pdfText;
    return `Context (Document Text):\n${context}\n\nUser Query: ${userQuery}`;
};
const streamResponse = async (chat, message, onChunk, onToolCall)=>{
    try {
        const result = await chat.sendMessageStream({
            message
        });
        let fullText = "";
        for await (const chunk of result){
            const c = chunk;
            if (c.text) {
                fullText += c.text;
                onChunk(c.text);
            }
            const functionCalls = c.candidates?.[0]?.content?.parts?.filter((p)=>p.functionCall).map((p)=>p.functionCall);
            if (functionCalls && functionCalls.length > 0 && onToolCall) {
                for (const fc of functionCalls){
                    // Notify UI of tool usage via text stream
                    // onChunk(`\n(Executing ${fc.name.replace(/_/g, ' ')}...)\n`);
                    const toolResult = await onToolCall(fc);
                    // Send result back to model
                    const toolResponse = await chat.sendMessageStream({
                        message: [
                            {
                                functionResponse: {
                                    name: fc?.name,
                                    response: {
                                        result: toolResult
                                    }
                                }
                            }
                        ]
                    });
                    // Stream the explanation after tool execution
                    for await (const toolChunk of toolResponse){
                        const tc = toolChunk;
                        if (tc.text) onChunk(tc.text);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Gemini Stream Error:", error);
        onChunk("\nError: Could not complete request. Please try again.");
    }
};
const detectStamps = async (base64Image)=>{
    const ai = getClient();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/jpeg',
                            data: base64Image.split(',')[1]
                        }
                    },
                    {
                        text: `Locate visual stamps, seals, logos, or bold watermarks on this page.
                             Return a JSON array of bounding boxes: [{"ymin": 0, "xmin": 0, "ymax": 1000, "xmax": 1000}].
                             Normalize coordinates to 0-1000 scale.
                             Rules:
                             - TIGHT boxes only.
                             - Ignore regular text paragraphs.
                             - Focus on colored ink (red/blue) or circular seals.`
                    }
                ]
            },
            config: {
                responseMimeType: 'application/json'
            }
        });
        const text = response.text || "[]";
        const boxes = JSON.parse(text);
        if (!Array.isArray(boxes)) return [];
        return boxes.map((b)=>({
                x: b.xmin / 1000,
                y: b.ymin / 1000,
                width: (b.xmax - b.xmin) / 1000,
                height: (b.ymax - b.ymin) / 1000
            }));
    } catch (e) {
        console.error("Gemini Vision Error:", e);
        return [];
    }
};
const enhanceTextBlock = async (text, instruction)=>{
    const ai = getClient();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `System: You are a text editor assistant. Improve the following text based on this instruction: "${instruction}". Return ONLY the improved text, no quotes, no explanations.
            Text: "${text}"`
        });
        return response.text?.trim() || text;
    } catch (e) {
        console.error(e);
        return text;
    }
};
const removeStampWithMask = async (imageBase64, maskBase64)=>{
    const ai = getClient();
    try {
        const response = await ai.models.generateContent({
            // Using 2.5 Flash for vision tasks or Pro if higher quality needed.
            // Note: Standard 'generateContent' with mask implies an editing task.
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        text: "Remove the object covered by the white mask. Restore the background naturally to match the document paper."
                    },
                    {
                        inlineData: {
                            mimeType: 'image/png',
                            data: imageBase64.split(',')[1]
                        }
                    },
                    {
                        inlineData: {
                            mimeType: 'image/png',
                            data: maskBase64.split(',')[1]
                        }
                    }
                ]
            }
        });
        // Find the image part in the response
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts){
                if (part.inlineData && part.inlineData.data) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        return null;
    } catch (e) {
        console.error("Gemini Inpainting Error:", e);
        throw e;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/editor/components/TextBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextBlock",
    ()=>TextBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$40$16$2e$0$2e$1_$40$types$2b$nod_051c85fd356a5830779d8fdb27fcb698$2f$node_modules$2f$react$2d$dnd$2f$dist$2f$hooks$2f$useDrag$2f$useDrag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-dnd@16.0.1_@types+nod_051c85fd356a5830779d8fdb27fcb698/node_modules/react-dnd/dist/hooks/useDrag/useDrag.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/geminiService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const TextBlock = ({ block, zoom, onUpdate, onDelete })=>{
    _s();
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isThinking, setIsThinking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // React DnD Hook - Attach drag source only to the handle
    const [{ isDragging }, drag, preview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$40$16$2e$0$2e$1_$40$types$2b$nod_051c85fd356a5830779d8fdb27fcb698$2f$node_modules$2f$react$2d$dnd$2f$dist$2f$hooks$2f$useDrag$2f$useDrag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDrag"])({
        "TextBlock.useDrag": ()=>({
                type: 'TEXT_BLOCK',
                item: {
                    id: block.id,
                    type: 'TEXT_BLOCK'
                },
                collect: ({
                    "TextBlock.useDrag": (monitor)=>({
                            isDragging: monitor.isDragging()
                        })
                })["TextBlock.useDrag"]
            })
    }["TextBlock.useDrag"]);
    // Sync content from props to DOM, but ONLY when not editing to prevent overwriting user input
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TextBlock.useEffect": ()=>{
            if (contentRef.current && !isEditing) {
                // Only update if strictly different to avoid cursor jumps or unnecessary paints
                if (contentRef.current.innerText !== block.text) {
                    contentRef.current.innerText = block.text;
                }
            }
        }
    }["TextBlock.useEffect"], [
        block.text,
        isEditing
    ]);
    const handleBlur = ()=>{
        setIsEditing(false);
        if (contentRef.current) {
            const newText = contentRef.current.innerText;
            // Debounce update or check diff
            if (newText !== block.text) {
                onUpdate(block.id, newText, block.x, block.y);
            }
        }
    };
    const handleGemini = async (e)=>{
        e.stopPropagation();
        e.preventDefault();
        setIsThinking(true);
        const currentText = contentRef.current?.innerText || block.text;
        const improved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enhanceTextBlock"])(currentText, "Fix grammar and make it professional");
        if (contentRef.current) contentRef.current.innerText = improved;
        onUpdate(block.id, improved, block.x, block.y);
        setIsThinking(false);
    };
    const handleInteraction = (e)=>{
        e.stopPropagation();
        setIsEditing(true);
        // Delay focus to allow render cycle to apply contentEditable=true
        setTimeout(()=>{
            contentRef.current?.focus();
        }, 50);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: preview,
        style: {
            position: 'absolute',
            left: block.x,
            top: block.y,
            fontSize: `${block.fontSize}px`,
            // Ensure width is sufficient for editing
            minWidth: '20px',
            width: block.width > 20 ? 'auto' : 'auto',
            maxWidth: '600px',
            minHeight: block.height,
            opacity: isDragging ? 0 : 1,
            zIndex: isEditing ? 100 : 50,
            transformOrigin: 'top left'
        },
        className: `
                group transition-all
                ${isEditing ? 'bg-white shadow-xl ring-2 ring-primary z-50 rounded p-1' : 'hover:bg-primary/5 hover:ring-1 hover:ring-primary/50'}
            `,
        onDoubleClick: handleInteraction,
        // Add touch support for entering edit mode
        onTouchEnd: (e)=>{
        // If it was a quick tap without drag
        // For simplicity, rely on double tap logic via standard browser events or add a button
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: drag,
                className: `
                    absolute -left-8 top-0 p-2 cursor-grab active:cursor-grabbing bg-white shadow-md rounded-l border border-gray-200
                    ${isEditing || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    transition-opacity touch-none
                `,
                style: {
                    touchAction: 'none'
                },
                onMouseDown: (e)=>e.stopPropagation(),
                onTouchStart: (e)=>e.stopPropagation(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                    className: "w-5 h-5 text-gray-400"
                }, void 0, false, {
                    fileName: "[project]/src/features/editor/components/TextBlock.tsx",
                    lineNumber: 115,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/editor/components/TextBlock.tsx",
                lineNumber: 104,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-12 left-0 flex items-center gap-1 bg-white shadow-lg border border-border rounded-lg p-1.5 animate-in zoom-in-95 z-[60]",
                onMouseDown: (e)=>e.stopPropagation(),
                onTouchStart: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleGemini,
                        disabled: isThinking,
                        className: "px-2 py-1 hover:bg-purple-50 text-purple-600 rounded flex items-center gap-1 text-[10px] font-bold uppercase",
                        children: [
                            isThinking ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "w-4 h-4 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/TextBlock.tsx",
                                lineNumber: 130,
                                columnNumber: 39
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/TextBlock.tsx",
                                lineNumber: 130,
                                columnNumber: 87
                            }, ("TURBOPACK compile-time value", void 0)),
                            "AI Fix"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/components/TextBlock.tsx",
                        lineNumber: 125,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-4 bg-gray-200"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/TextBlock.tsx",
                        lineNumber: 133,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onDelete(block.id),
                        className: "p-1.5 hover:bg-red-50 text-red-500 rounded",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/TextBlock.tsx",
                            lineNumber: 138,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/TextBlock.tsx",
                        lineNumber: 134,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/components/TextBlock.tsx",
                lineNumber: 120,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: contentRef,
                contentEditable: isEditing,
                suppressContentEditableWarning: true,
                onBlur: handleBlur,
                // Stop propagation to ensure keystrokes don't bubble to canvas listeners
                onKeyDown: (e)=>e.stopPropagation(),
                onKeyPress: (e)=>e.stopPropagation(),
                onKeyUp: (e)=>e.stopPropagation(),
                onMouseDown: (e)=>e.stopPropagation(),
                onTouchStart: (e)=>e.stopPropagation(),
                className: `
                    outline-none whitespace-pre-wrap select-text
                    ${isEditing ? 'cursor-text text-black' : 'cursor-default text-transparent selection:bg-blue-200 selection:text-black'} 
                `,
                style: {
                    fontFamily: block.fontFamily,
                    // Overlay mode: text is transparent to show underlying PDF text, unless dirty/editing
                    color: block.isDirty || isEditing ? 'black' : 'transparent',
                    backgroundColor: block.isDirty && !isEditing ? 'white' : 'transparent',
                    userSelect: 'text',
                    WebkitUserSelect: 'text'
                }
            }, void 0, false, {
                fileName: "[project]/src/features/editor/components/TextBlock.tsx",
                lineNumber: 144,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/editor/components/TextBlock.tsx",
        lineNumber: 73,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TextBlock, "Y5P8TEZ8JXcmDv40Z0h8g3DaQbg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$40$16$2e$0$2e$1_$40$types$2b$nod_051c85fd356a5830779d8fdb27fcb698$2f$node_modules$2f$react$2d$dnd$2f$dist$2f$hooks$2f$useDrag$2f$useDrag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDrag"]
    ];
});
_c = TextBlock;
var _c;
__turbopack_context__.k.register(_c, "TextBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/editor/components/SinglePage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$40$16$2e$0$2e$1_$40$types$2b$nod_051c85fd356a5830779d8fdb27fcb698$2f$node_modules$2f$react$2d$dnd$2f$dist$2f$hooks$2f$useDrop$2f$useDrop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-dnd@16.0.1_@types+nod_051c85fd356a5830779d8fdb27fcb698/node_modules/react-dnd/dist/hooks/useDrop/useDrop.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Page.js [app-client] (ecmascript) <export default as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdfjs-dist@5.4.296/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript) <export * as pdfjs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanText$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/scan-text.js [app-client] (ecmascript) <export default as ScanText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$TextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/editor/components/TextBlock.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
if ("TURBOPACK compile-time truthy", 1) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].version}/build/pdf.worker.min.mjs`;
;
;
;
;
const SinglePage = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(_c = _s(({ pageNum, zoom, rotation, mode, file, annotations, editableBlocks, onMouseDown, onAnnotationMouseDown, onContextMenu, onPageSelect, selectedId, editingId, currentRect, currentPath, dragStart, drawColor, brushSize, textStyle, removeAnnotation, updateAnnotation, getFontFamily, isActive, onBlockUpdate, onBlockDelete, scanPage })=>{
    _s();
    const [dimensions, setDimensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 595,
        height: 842
    });
    const [, drop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$40$16$2e$0$2e$1_$40$types$2b$nod_051c85fd356a5830779d8fdb27fcb698$2f$node_modules$2f$react$2d$dnd$2f$dist$2f$hooks$2f$useDrop$2f$useDrop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDrop"])({
        "SinglePage.useDrop": ()=>({
                accept: 'TEXT_BLOCK',
                drop: ({
                    "SinglePage.useDrop": (item, monitor)=>{
                        const delta = monitor.getDifferenceFromInitialOffset();
                        const block = editableBlocks.find({
                            "SinglePage.useDrop.block": (b)=>b.id === item.id
                        }["SinglePage.useDrop.block"]);
                        if (block && delta) {
                            onBlockUpdate(block.id, block.text, block.x + delta.x / zoom, block.y + delta.y / zoom);
                        }
                    }
                })["SinglePage.useDrop"]
            })
    }["SinglePage.useDrop"], [
        editableBlocks,
        zoom
    ]);
    const onPageLoad = (page)=>{
        const viewport = page.getViewport({
            scale: 1
        });
        const scaleFactor = 595 / viewport.width;
        setDimensions({
            width: 595,
            height: viewport.height * scaleFactor
        });
    };
    const isRotatedSides = rotation % 180 !== 0;
    const containerStyle = {
        width: isRotatedSides ? dimensions.height : dimensions.width,
        height: isRotatedSides ? dimensions.width : dimensions.height,
        transition: 'width 0.3s, height 0.3s'
    };
    const innerStyle = {
        width: dimensions.width,
        height: dimensions.height,
        transformOrigin: 'center center',
        transform: `rotate(${rotation}deg)`,
        position: isRotatedSides ? 'absolute' : 'relative',
        left: isRotatedSides ? '50%' : 'auto',
        top: isRotatedSides ? '50%' : 'auto',
        translate: isRotatedSides ? '-50% -50%' : 'none',
        transition: 'transform 0.3s ease-out'
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SinglePage.useEffect": ()=>{
            if (mode === 'edit_text' && isActive && editableBlocks.filter({
                "SinglePage.useEffect": (b)=>b.page === pageNum
            }["SinglePage.useEffect"]).length === 0) {
                scanPage(pageNum);
            }
        }
    }["SinglePage.useEffect"], [
        mode,
        isActive,
        pageNum
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: `page-wrapper-${pageNum}`,
        className: `relative rounded-sm overflow-hidden group/page bg-white transition-all mx-auto my-4 border-2 
        ${isActive ? 'border-primary shadow-2xl ring-4 ring-primary/10' : 'border-transparent shadow-xl hover:shadow-2xl'}`,
        style: containerStyle,
        onMouseDown: (e)=>onMouseDown(e, pageNum),
        onTouchStart: (e)=>onMouseDown(e, pageNum),
        onContextMenu: (e)=>{
            e.preventDefault();
            e.stopPropagation();
            onContextMenu(e, null, 'canvas');
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100%',
                height: '100%',
                transform: `scale(${zoom})`,
                transformOrigin: 'top center'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: innerStyle,
                ref: drop,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__["Page"], {
                        pageNumber: pageNum,
                        width: 595,
                        renderTextLayer: mode !== 'edit_text',
                        renderAnnotationLayer: false,
                        className: `bg-white ${mode === 'edit_text' ? 'opacity-50' : ''}`,
                        onLoadSuccess: onPageLoad
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                        lineNumber: 106,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    mode === 'edit_text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 z-30",
                        children: [
                            editableBlocks.length === 0 && isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanText$3e$__["ScanText"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                            lineNumber: 121,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Scanning Text..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                    lineNumber: 120,
                                    columnNumber: 37
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                lineNumber: 119,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0)),
                            editableBlocks.filter((b)=>b.page === pageNum).map((block)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$TextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextBlock"], {
                                    block: block,
                                    zoom: zoom,
                                    onUpdate: onBlockUpdate,
                                    onDelete: onBlockDelete
                                }, block.id, false, {
                                    fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                    lineNumber: 126,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                        lineNumber: 117,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: `page-${pageNum}-overlay`,
                        className: `absolute inset-0 z-10 ${mode === 'edit_text' ? 'pointer-events-none' : ''}`,
                        style: {
                            touchAction: [
                                'draw',
                                'sign',
                                'whiteout',
                                'replace',
                                'redact',
                                'crop',
                                'stamp_remover'
                            ].includes(mode) ? 'none' : 'manipulation',
                            cursor: mode === 'draw' || mode === 'sign' ? 'crosshair' : mode === 'crop' || mode === 'stamp_remover' ? 'cell' : mode === 'text' ? 'text' : mode === 'cursor' ? 'default' : 'pointer'
                        },
                        onMouseDown: (e)=>onMouseDown(e, pageNum),
                        onTouchStart: (e)=>onMouseDown(e, pageNum),
                        onContextMenu: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "absolute inset-0 w-full h-full pointer-events-none",
                                style: {
                                    zIndex: 5
                                },
                                children: [
                                    annotations.filter((a)=>a.page === pageNum && (a.type === 'drawing' || a.type === 'signature')).map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                            points: a.points.map((p)=>`${p.x},${p.y}`).join(' '),
                                            fill: "none",
                                            stroke: a.color,
                                            strokeWidth: a.thickness,
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            style: {
                                                pointerEvents: mode === 'cursor' || mode === 'eraser' ? 'auto' : 'none',
                                                cursor: mode === 'eraser' ? 'crosshair' : 'pointer'
                                            },
                                            onMouseDown: (e)=>onAnnotationMouseDown(e, a, 'drag'),
                                            onTouchStart: (e)=>onAnnotationMouseDown(e, a, 'drag'),
                                            onMouseEnter: ()=>mode === 'eraser' && removeAnnotation(a.id)
                                        }, a.id, false, {
                                            fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                            lineNumber: 152,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    (mode === 'draw' || mode === 'sign') && currentPath.length > 0 && dragStart?.page === pageNum && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: currentPath.map((p)=>`${p.x},${p.y}`).join(' '),
                                        fill: "none",
                                        stroke: mode === 'sign' ? '#000000' : drawColor,
                                        strokeWidth: mode === 'sign' ? 2 : brushSize,
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                        lineNumber: 163,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                lineNumber: 150,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            annotations.filter((a)=>a.page === pageNum && a.type !== 'drawing' && a.type !== 'signature').map((ann)=>{
                                const isSelected = selectedId === ann.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `
                    absolute group transition-shadow 
                    ${isSelected ? 'ring-1 ring-primary ring-offset-1' : ''}
                    ${mode === 'cursor' ? 'hover:ring-1 hover:ring-primary/50 cursor-move' : ''}
                  `,
                                    style: {
                                        left: ann.x,
                                        top: ann.y,
                                        width: ann.width || 200,
                                        height: ann.height || 50,
                                        pointerEvents: 'auto',
                                        zIndex: 20
                                    },
                                    onMouseDown: (e)=>onAnnotationMouseDown(e, ann, 'drag'),
                                    onTouchStart: (e)=>onAnnotationMouseDown(e, ann, 'drag'),
                                    onMouseEnter: ()=>mode === 'eraser' && removeAnnotation(ann.id),
                                    onContextMenu: (e)=>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onContextMenu(e, ann.id, ann.type);
                                    },
                                    children: [
                                        isSelected && mode === 'cursor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -bottom-2 -right-2 w-4 h-4 bg-primary rounded-full cursor-se-resize shadow-md z-50 flex items-center justify-center hover:scale-125 transition-transform",
                                            onMouseDown: (e)=>onAnnotationMouseDown(e, ann, 'resize'),
                                            onTouchStart: (e)=>onAnnotationMouseDown(e, ann, 'resize'),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                                className: "w-2 h-2 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                                lineNumber: 201,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                            lineNumber: 196,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        ann.type === 'whiteout' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full bg-white border border-gray-100/50"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                            lineNumber: 205,
                                            columnNumber: 65
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        ann.type === 'redact' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full bg-black"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                            lineNumber: 206,
                                            columnNumber: 63
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        ann.type === 'image' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: ann.dataUrl,
                                            className: "w-full h-full object-contain select-none",
                                            draggable: false,
                                            alt: "inserted"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                            lineNumber: 209,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        ann.type === 'text' && (editingId === ann.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            autoFocus: true,
                                            value: ann.text,
                                            onChange: (e)=>updateAnnotation(ann.id, {
                                                    text: e.target.value
                                                }),
                                            onBlur: ()=>{
                                                if (!ann.text.trim()) removeAnnotation(ann.id);
                                            },
                                            placeholder: "Type here...",
                                            style: {
                                                color: ann.color,
                                                fontSize: ann.size + 'px',
                                                fontFamily: getFontFamily(ann.fontFamily),
                                                fontWeight: ann.isBold ? 'bold' : 'normal',
                                                fontStyle: ann.isItalic ? 'italic' : 'normal',
                                                textDecoration: ann.isUnderline ? 'underline' : 'none',
                                                textAlign: ann.align || 'left'
                                            },
                                            className: "w-full h-full bg-white/90 p-2 border border-primary rounded resize-none outline-none shadow-lg pointer-events-auto text-black",
                                            onMouseDown: (e)=>e.stopPropagation(),
                                            onTouchStart: (e)=>e.stopPropagation()
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                            lineNumber: 214,
                                            columnNumber: 45
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full p-2 whitespace-pre-wrap overflow-hidden",
                                            style: {
                                                color: ann.color,
                                                fontSize: ann.size + 'px',
                                                fontFamily: getFontFamily(ann.fontFamily),
                                                fontWeight: ann.isBold ? 'bold' : 'normal',
                                                fontStyle: ann.isItalic ? 'italic' : 'normal',
                                                textDecoration: ann.isUnderline ? 'underline' : 'none',
                                                textAlign: ann.align || 'left'
                                            },
                                            children: ann.text || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-400 italic bg-white/80 px-2 py-1 border border-dashed border-gray-300 rounded shadow-sm block w-full",
                                                children: "Type text..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                                lineNumber: 238,
                                                columnNumber: 62
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                            lineNumber: 230,
                                            columnNumber: 45
                                        }, ("TURBOPACK compile-time value", void 0)))
                                    ]
                                }, ann.id, true, {
                                    fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                    lineNumber: 174,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0));
                            }),
                            currentRect && currentRect.page === pageNum && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `
                absolute border-2
                ${mode === 'redact' ? 'bg-black/50 border-black' : mode === 'crop' ? 'bg-black/10 border-dashed border-primary' : mode === 'stamp_remover' ? 'bg-purple-500/20 border-purple-500 animate-pulse' : 'bg-primary/20 border-primary'}
              `,
                                style: {
                                    left: currentRect.x,
                                    top: currentRect.y,
                                    width: currentRect.w,
                                    height: currentRect.h
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                                lineNumber: 248,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                        lineNumber: 138,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/components/SinglePage.tsx",
                lineNumber: 105,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/editor/components/SinglePage.tsx",
            lineNumber: 104,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/editor/components/SinglePage.tsx",
        lineNumber: 95,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
}, "+jR0zDELxVp8lrY/dpqbHn5DXqY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$40$16$2e$0$2e$1_$40$types$2b$nod_051c85fd356a5830779d8fdb27fcb698$2f$node_modules$2f$react$2d$dnd$2f$dist$2f$hooks$2f$useDrop$2f$useDrop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDrop"]
    ];
})), "+jR0zDELxVp8lrY/dpqbHn5DXqY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$40$16$2e$0$2e$1_$40$types$2b$nod_051c85fd356a5830779d8fdb27fcb698$2f$node_modules$2f$react$2d$dnd$2f$dist$2f$hooks$2f$useDrop$2f$useDrop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDrop"]
    ];
});
_c1 = SinglePage;
const __TURBOPACK__default__export__ = SinglePage;
var _c, _c1;
__turbopack_context__.k.register(_c, "SinglePage$React.memo");
__turbopack_context__.k.register(_c1, "SinglePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/editor/PDFCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PDFCanvas",
    ()=>PDFCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdfjs-dist@5.4.296/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript) <export * as pdfjs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Document.js [app-client] (ecmascript) <export default as Document>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Page.js [app-client] (ecmascript) <export default as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$40$16$2e$0$2e$1_$40$types$2b$nod_051c85fd356a5830779d8fdb27fcb698$2f$node_modules$2f$react$2d$dnd$2f$dist$2f$core$2f$DndProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-dnd@16.0.1_@types+nod_051c85fd356a5830779d8fdb27fcb698/node_modules/react-dnd/dist/core/DndProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$2d$html5$2d$backend$40$16$2e$0$2e$1$2f$node_modules$2f$react$2d$dnd$2d$html5$2d$backend$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-dnd-html5-backend@16.0.1/node_modules/react-dnd-html5-backend/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$2d$touch$2d$backend$40$16$2e$0$2e$1$2f$node_modules$2f$react$2d$dnd$2d$touch$2d$backend$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-dnd-touch-backend@16.0.1/node_modules/react-dnd-touch-backend/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useFileStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$SinglePage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/editor/components/SinglePage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Dynamic Import for PDF Components to avoid SSR/Worker issues
const PDFDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(async ()=>{
    if ("TURBOPACK compile-time truthy", 1) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].version}/build/pdf.worker.min.mjs`;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__["Document"];
}, {
    ssr: false
});
_c = PDFDocument;
const PDFPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_c1 = async ()=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__["Page"];
}, {
    ssr: false
});
_c2 = PDFPage;
;
;
;
;
;
const PDFCanvas = ({ zoom, setZoom, mode, activePage = 1, onPageSelect, pendingImage, onImagePlaced, drawColor, brushSize, textStyle, onStampRemove, onAnnotationSelect, onCropApply })=>{
    _s();
    const { file, annotations, addAnnotation, updateAnnotation, removeAnnotation, extractAllText, setNumPages, numPages, pageRotations, editableBlocks, updateBlock, deleteBlock, scanPageForBlocks } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileStore"])();
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Interaction State
    const [interactionState, setInteractionState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('none');
    const [dragStart, setDragStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [initialAnnState, setInitialAnnState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentRect, setCurrentRect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPath, setCurrentPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [contextMenu, setContextMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const placingImageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Pinch Zoom Refs
    const initialTouchDist = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const initialZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
    // Determine Backend based on device capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const Backend = isTouchDevice ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$2d$touch$2d$backend$40$16$2e$0$2e$1$2f$node_modules$2f$react$2d$dnd$2d$touch$2d$backend$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TouchBackend"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$2d$html5$2d$backend$40$16$2e$0$2e$1$2f$node_modules$2f$react$2d$dnd$2d$html5$2d$backend$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HTML5Backend"];
    const backendOptions = {
        enableMouseEvents: true
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFCanvas.useEffect": ()=>{
            if (file) extractAllText(file);
        }
    }["PDFCanvas.useEffect"], [
        file
    ]);
    const getRelativeCoords = (clientX, clientY, pageElement)=>{
        const rect = pageElement.getBoundingClientRect();
        return {
            x: (clientX - rect.left) / zoom,
            y: (clientY - rect.top) / zoom
        };
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PDFCanvas.useEffect": ()=>{
            const handleGlobalMove = {
                "PDFCanvas.useEffect.handleGlobalMove": (e)=>{
                    if (interactionState === 'none') return;
                    // Pinch Zoom Logic
                    if (interactionState === 'zooming' && 'touches' in e && e.touches.length === 2) {
                        e.preventDefault();
                        const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
                        if (initialTouchDist.current > 0) {
                            const scale = dist / initialTouchDist.current;
                            setZoom(Math.min(Math.max(initialZoom.current * scale, 0.5), 3));
                        }
                        return;
                    }
                    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
                    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
                    if (dragStart) {
                        const pageEl = document.getElementById(`page-${dragStart.page}-overlay`);
                        if (!pageEl) return;
                        const coords = getRelativeCoords(clientX, clientY, pageEl);
                        if (interactionState === 'drawing') {
                            e.preventDefault(); // Prevent scrolling while drawing/selecting
                            if (mode === 'draw' || mode === 'sign') {
                                setCurrentPath({
                                    "PDFCanvas.useEffect.handleGlobalMove": (prev)=>[
                                            ...prev,
                                            {
                                                ...coords
                                            }
                                        ]
                                }["PDFCanvas.useEffect.handleGlobalMove"]);
                            } else if (mode === 'whiteout' || mode === 'replace' || mode === 'redact' || mode === 'crop' || mode === 'stamp_remover') {
                                const w = coords.x - dragStart.x;
                                const h = coords.y - dragStart.y;
                                setCurrentRect({
                                    x: w > 0 ? dragStart.x : coords.x,
                                    y: h > 0 ? dragStart.y : coords.y,
                                    w: Math.abs(w),
                                    h: Math.abs(h),
                                    page: dragStart.page
                                });
                            }
                        }
                        // ... existing dragging logic ...
                        if ((interactionState === 'dragging' || interactionState === 'resizing') && selectedId && initialAnnState) {
                            e.preventDefault(); // Prevent scroll while moving items
                            const dx = coords.x - dragStart.x;
                            const dy = coords.y - dragStart.y;
                            if (interactionState === 'dragging') {
                                updateAnnotation(selectedId, {
                                    x: initialAnnState.x + dx,
                                    y: initialAnnState.y + dy
                                });
                            } else if (interactionState === 'resizing') {
                                updateAnnotation(selectedId, {
                                    width: Math.max(20, (initialAnnState.width || 200) + dx),
                                    height: Math.max(20, (initialAnnState.height || 50) + dy)
                                });
                            }
                        }
                    }
                }
            }["PDFCanvas.useEffect.handleGlobalMove"];
            const handleGlobalUp = {
                "PDFCanvas.useEffect.handleGlobalUp": (e)=>{
                    if (interactionState === 'drawing' && dragStart) {
                        if ((mode === 'draw' || mode === 'sign') && currentPath.length > 2) {
                            addAnnotation({
                                id: Date.now().toString(),
                                page: dragStart.page,
                                type: mode === 'sign' ? 'signature' : 'drawing',
                                points: currentPath,
                                color: mode === 'sign' ? '#000000' : drawColor,
                                thickness: mode === 'sign' ? 2 : brushSize
                            });
                        } else if ((mode === 'whiteout' || mode === 'replace' || mode === 'redact') && currentRect && currentRect.w > 5) {
                            addAnnotation({
                                id: Date.now().toString() + '_bg',
                                page: dragStart.page,
                                type: mode === 'redact' ? 'redact' : 'whiteout',
                                x: currentRect.x,
                                y: currentRect.y,
                                width: currentRect.w,
                                height: currentRect.h
                            });
                        } else if (mode === 'crop' && currentRect && currentRect.w > 20 && onCropApply) {
                            if (window.confirm("Apply crop to this page?")) {
                                onCropApply(dragStart.page, {
                                    x: currentRect.x,
                                    y: currentRect.y,
                                    w: currentRect.w,
                                    h: currentRect.h
                                });
                            }
                        } else if (mode === 'stamp_remover' && currentRect && currentRect.w > 10) {
                            if (window.confirm("Use AI to clean this area?")) {
                                onStampRemove(dragStart.page, currentRect);
                            }
                        }
                    }
                    setInteractionState('none');
                    setDragStart(null);
                    setCurrentRect(null);
                    setCurrentPath([]);
                    setInitialAnnState(null);
                }
            }["PDFCanvas.useEffect.handleGlobalUp"];
            if (interactionState !== 'none') {
                window.addEventListener('mousemove', handleGlobalMove);
                window.addEventListener('mouseup', handleGlobalUp);
                window.addEventListener('touchmove', handleGlobalMove, {
                    passive: false
                });
                window.addEventListener('touchend', handleGlobalUp);
            }
            return ({
                "PDFCanvas.useEffect": ()=>{
                    window.removeEventListener('mousemove', handleGlobalMove);
                    window.removeEventListener('mouseup', handleGlobalUp);
                    window.removeEventListener('touchmove', handleGlobalMove);
                    window.removeEventListener('touchend', handleGlobalUp);
                }
            })["PDFCanvas.useEffect"];
        }
    }["PDFCanvas.useEffect"], [
        interactionState,
        dragStart,
        selectedId,
        initialAnnState,
        currentPath,
        currentRect,
        mode,
        drawColor,
        brushSize
    ]);
    // Unified Handler for Mouse and Touch
    const handleMouseDown = (e, pageNum)=>{
        // Detect Pinch Zoom
        if ('touches' in e && e.touches.length === 2) {
            setInteractionState('zooming');
            initialTouchDist.current = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            initialZoom.current = zoom;
            return;
        }
        if (onPageSelect) onPageSelect(pageNum);
        if (mode === 'edit_text') return;
        // Check tool compatibility for interaction
        const isInteractiveTool = [
            'text',
            'cursor',
            'draw',
            'whiteout',
            'sign',
            'crop',
            'image',
            'stamp_remover'
        ].includes(mode);
        if (!isInteractiveTool) return;
        const pageEl = document.getElementById(`page-${pageNum}-overlay`);
        if (!pageEl) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const coords = getRelativeCoords(clientX, clientY, pageEl);
        if ([
            'draw',
            'whiteout',
            'replace',
            'redact',
            'sign',
            'crop',
            'stamp_remover'
        ].includes(mode)) {
            e.stopPropagation();
            setInteractionState('drawing');
            setDragStart({
                ...coords,
                page: pageNum
            });
            if (mode === 'draw' || mode === 'sign') setCurrentPath([
                {
                    ...coords
                }
            ]);
            else setCurrentRect({
                ...coords,
                w: 0,
                h: 0,
                page: pageNum
            });
        } else if (mode === 'text') {
            // Place Text
            addAnnotation({
                id: Date.now().toString(),
                page: pageNum,
                type: 'text',
                x: coords.x,
                y: coords.y,
                text: '',
                color: drawColor,
                size: textStyle.size,
                ...textStyle
            });
            setEditingId(Date.now().toString());
        } else if (mode === 'image' && pendingImage && onImagePlaced) {
            // Place Image
            if (placingImageRef.current) return;
            placingImageRef.current = true;
            const img = new Image();
            img.onload = ()=>{
                addAnnotation({
                    id: Date.now().toString(),
                    page: pageNum,
                    type: 'image',
                    x: coords.x - 50,
                    y: coords.y - 50,
                    width: 100,
                    height: 100 * (img.height / img.width),
                    dataUrl: pendingImage
                });
                onImagePlaced();
                // Reset after a short delay to be safe, though mode switch usually handles it
                setTimeout(()=>{
                    placingImageRef.current = false;
                }, 500);
            };
            img.src = pendingImage;
        }
    };
    const handleAnnotationMouseDown = (e, ann, action)=>{
        if (mode === 'edit_text') return;
        e.stopPropagation(); // prevent background interaction
        setSelectedId(ann.id);
        if (onAnnotationSelect) onAnnotationSelect(ann);
        setInteractionState(action === 'drag' ? 'dragging' : 'resizing');
        setInitialAnnState({
            ...ann
        });
        const pageEl = document.getElementById(`page-${ann.page}-overlay`);
        if (pageEl) {
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            const coords = getRelativeCoords(clientX, clientY, pageEl);
            setDragStart({
                ...coords,
                page: ann.page
            });
        }
    };
    const getFontFamily = (f)=>{
        switch(f){
            case 'Times':
                return 'Times New Roman, serif';
            case 'Courier':
                return 'Courier New, monospace';
            default:
                return 'Inter, Helvetica, Arial, sans-serif';
        }
    };
    if (!file) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-10 text-center text-muted-foreground animate-pulse",
        children: "Loading Document..."
    }, void 0, false, {
        fileName: "[project]/src/features/editor/PDFCanvas.tsx",
        lineNumber: 271,
        columnNumber: 23
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$dnd$40$16$2e$0$2e$1_$40$types$2b$nod_051c85fd356a5830779d8fdb27fcb698$2f$node_modules$2f$react$2d$dnd$2f$dist$2f$core$2f$DndProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndProvider"], {
        backend: Backend,
        options: backendOptions,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full h-full relative ${mode === 'text' ? 'mode-edit' : ''}`,
            onClick: ()=>setContextMenu(null),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PDFDocument, {
                file: file,
                onLoadSuccess: ({ numPages })=>setNumPages(numPages),
                className: "flex flex-col gap-6 items-center",
                children: Array.from(new Array(numPages), (_, index)=>{
                    const pageNum = index + 1;
                    const rotation = pageRotations[pageNum] || 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$SinglePage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        pageNum: pageNum,
                        zoom: zoom,
                        rotation: rotation,
                        mode: mode,
                        file: file,
                        annotations: annotations,
                        editableBlocks: editableBlocks,
                        onMouseDown: handleMouseDown,
                        onAnnotationMouseDown: handleAnnotationMouseDown,
                        onContextMenu: (e, id, type)=>setContextMenu({
                                x: e.clientX,
                                y: e.clientY,
                                id,
                                type
                            }),
                        onPageSelect: onPageSelect || (()=>{}),
                        isActive: pageNum === activePage,
                        selectedId: selectedId,
                        editingId: editingId,
                        currentRect: currentRect,
                        currentPath: currentPath,
                        dragStart: dragStart,
                        drawColor: drawColor,
                        brushSize: brushSize,
                        textStyle: textStyle,
                        removeAnnotation: removeAnnotation,
                        updateAnnotation: updateAnnotation,
                        getFontFamily: getFontFamily,
                        // DND
                        onBlockUpdate: (id, text, x, y)=>updateBlock(id, {
                                text,
                                x,
                                y
                            }),
                        onBlockDelete: (id)=>deleteBlock(id),
                        scanPage: scanPageForBlocks
                    }, `page-${pageNum}`, false, {
                        fileName: "[project]/src/features/editor/PDFCanvas.tsx",
                        lineNumber: 284,
                        columnNumber: 29
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/features/editor/PDFCanvas.tsx",
                lineNumber: 279,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/editor/PDFCanvas.tsx",
            lineNumber: 275,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/editor/PDFCanvas.tsx",
        lineNumber: 274,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PDFCanvas, "dqLdEooUPCGR4lQD4ATInCvehBA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileStore"]
    ];
});
_c3 = PDFCanvas;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "PDFDocument");
__turbopack_context__.k.register(_c1, "PDFPage$dynamic");
__turbopack_context__.k.register(_c2, "PDFPage");
__turbopack_context__.k.register(_c3, "PDFCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/useSettingsStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSettingsStore",
    ()=>useSettingsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$9_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$3$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zustand@5.0.9_@types+react@19.2.7_react@19.2.3/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$9_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$3$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zustand@5.0.9_@types+react@19.2.7_react@19.2.3/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const DEFAULT_SETTINGS = {
    theme: 'light',
    autoCompress: false,
    aiThinking: true,
    permissions: {
        printing: true,
        copying: true,
        modifying: false
    },
    density: 'comfortable',
    defaultPassword: ''
};
const useSettingsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$9_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$3$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$9_$40$types$2b$react$40$19$2e$2$2e$7_react$40$19$2e$2$2e$3$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        settings: DEFAULT_SETTINGS,
        updateSettings: (newValues)=>set((state)=>{
                const updated = {
                    ...state.settings,
                    ...newValues
                };
                // Apply theme side-effect
                if (newValues.theme) {
                    const root = document.documentElement;
                    if (newValues.theme === 'dark') {
                        root.classList.add('dark');
                        root.classList.remove('light');
                    } else {
                        root.classList.add('light');
                        root.classList.remove('dark');
                    }
                }
                return {
                    settings: updated
                };
            }),
        toggleTheme: ()=>{
            const current = get().settings.theme;
            const next = current === 'light' ? 'dark' : 'light';
            get().updateSettings({
                theme: next
            });
        }
    }), {
    name: 'extrapdf_settings_storage'
}));
// Initialize theme on load
const saved = localStorage.getItem('extrapdf_settings_storage');
if (saved) {
    try {
        const parsed = JSON.parse(saved);
        const theme = parsed.state.settings.theme;
        if (theme === 'dark') document.documentElement.classList.add('dark');
    } catch (e) {}
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/editor/components/EditorSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorSidebar",
    ()=>EditorSidebar,
    "toolsList",
    ()=>toolsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/mouse-pointer.js [app-client] (ecmascript) <export default as MousePointer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/type.js [app-client] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLine$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-client] (ecmascript) <export default as PenLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/scissors.js [app-client] (ecmascript) <export default as Scissors>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$merge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Merge$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/merge.js [app-client] (ecmascript) <export default as Merge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-client] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileImage$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/file-image.js [app-client] (ecmascript) <export default as FileImage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stamp$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/stamp.js [app-client] (ecmascript) <export default as Stamp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/text-align-start.js [app-client] (ecmascript) <export default as AlignLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileStack$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/file-stack.js [app-client] (ecmascript) <export default as FileStack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$output$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileOutput$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/file-output.js [app-client] (ecmascript) <export default as FileOutput>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-client] (ecmascript) <export default as Wand2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileMinus$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/file-minus.js [app-client] (ecmascript) <export default as FileMinus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useSettingsStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const toolsList = [
    // ORGANIZE
    {
        id: 'merge',
        label: 'Merge',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$merge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Merge$3e$__["Merge"],
        category: 'organize',
        description: 'Combine PDFs'
    },
    {
        id: 'split',
        label: 'Split',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__["Scissors"],
        category: 'organize',
        description: 'Extract pages',
        requiresModal: true
    },
    {
        id: 'remove_empty',
        label: 'Remove Empty',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileMinus$3e$__["FileMinus"],
        category: 'organize',
        description: 'Auto-delete blank'
    },
    {
        id: 'reorder',
        label: 'Reorder',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileStack$3e$__["FileStack"],
        category: 'organize',
        description: 'Move pages',
        requiresModal: true
    },
    {
        id: 'rotate',
        label: 'Rotate',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"],
        category: 'organize',
        description: 'Rotate Page'
    },
    {
        id: 'delete_page',
        label: 'Delete',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"],
        category: 'organize',
        description: 'Remove Page',
        requiresModal: true
    },
    {
        id: 'page_numbers',
        label: 'Numbers',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"],
        category: 'organize',
        description: 'Add Footer'
    },
    // EDIT
    {
        id: 'cursor',
        label: 'Select',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer$3e$__["MousePointer"],
        category: 'edit',
        description: 'Select'
    },
    {
        id: 'edit_text',
        label: 'Edit Text',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        category: 'edit',
        description: 'Edit Existing'
    },
    {
        id: 'text',
        label: 'Add Text',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"],
        category: 'edit',
        description: 'Add Text'
    },
    {
        id: 'draw',
        label: 'Draw',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLine$3e$__["PenLine"],
        category: 'edit',
        description: 'Freehand'
    },
    {
        id: 'eraser',
        label: 'Eraser',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"],
        category: 'edit',
        description: 'Delete Drawing'
    },
    {
        id: 'whiteout',
        label: 'Whiteout',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__["AlignLeft"],
        category: 'edit',
        description: 'Cover Text'
    },
    {
        id: 'add_image',
        label: 'Image',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"],
        category: 'edit',
        description: 'Add Image'
    },
    {
        id: 'watermark',
        label: 'Stamp',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stamp$3e$__["Stamp"],
        category: 'edit',
        description: 'Watermark',
        requiresModal: true
    },
    {
        id: 'stamp_remover',
        label: 'Clean AI',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"],
        category: 'edit',
        description: 'Remove Stamp'
    },
    // SECURITY
    {
        id: 'encrypt',
        label: 'Encrypt',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        category: 'security',
        description: 'Password',
        requiresModal: true
    },
    {
        id: 'flatten',
        label: 'Flatten',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"],
        category: 'security',
        description: 'Flatten'
    },
    {
        id: 'metadata',
        label: 'Meta',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"],
        category: 'security',
        description: 'Metadata',
        requiresModal: true
    },
    // CONVERT
    {
        id: 'pdf_to_word',
        label: 'Word',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileImage$3e$__["FileImage"],
        category: 'convert',
        description: 'To DOCX'
    },
    {
        id: 'pdf_to_jpg',
        label: 'JPG',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$output$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileOutput$3e$__["FileOutput"],
        category: 'convert',
        description: 'To Images'
    }
];
const EditorSidebar = ({ activeCategory, setActiveCategory, activeToolId, onToolSelect })=>{
    _s();
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettingsStore"])();
    const categories = [
        'edit',
        'organize',
        'security',
        'convert'
    ];
    const isCompact = settings.density === 'compact';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `
        w-20 h-full flex flex-col items-center shrink-0 z-20 shadow-xl transition-all border-r
        bg-white/60 dark:bg-black/60 backdrop-blur-xl border-white/20
        ${isCompact ? 'py-2 gap-3' : 'py-4 gap-6'}
    `,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex flex-col w-full px-2 no-scrollbar ${isCompact ? 'gap-1' : 'gap-3'}`,
                children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveCategory(cat),
                        className: `
                        rounded-2xl flex items-center justify-center transition-all duration-300 mx-auto
                        ${isCompact ? 'w-10 h-10' : 'w-12 h-12'}
                        ${activeCategory === cat ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105' : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:scale-105'}
                    `,
                        title: cat.toUpperCase(),
                        children: [
                            cat === 'edit' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenLine$3e$__["PenLine"], {
                                className: isCompact ? "w-4 h-4" : "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                                lineNumber: 78,
                                columnNumber: 44
                            }, ("TURBOPACK compile-time value", void 0)),
                            cat === 'organize' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                className: isCompact ? "w-4 h-4" : "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                                lineNumber: 79,
                                columnNumber: 48
                            }, ("TURBOPACK compile-time value", void 0)),
                            cat === 'security' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                className: isCompact ? "w-4 h-4" : "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                                lineNumber: 80,
                                columnNumber: 48
                            }, ("TURBOPACK compile-time value", void 0)),
                            cat === 'convert' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileImage$3e$__["FileImage"], {
                                className: isCompact ? "w-4 h-4" : "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                                lineNumber: 81,
                                columnNumber: 47
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, cat, true, {
                        fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                        lineNumber: 65,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-10 h-px bg-white/20 my-2"
            }, void 0, false, {
                fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                lineNumber: 86,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-1 w-full flex flex-col overflow-y-auto px-2 pb-20 no-scrollbar ${isCompact ? 'gap-1' : 'gap-2'}`,
                children: toolsList.filter((t)=>t.category === activeCategory).map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onToolSelect(tool),
                        className: `
                        group relative w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all
                        ${activeToolId === tool.id ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground'}
                    `,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(tool.icon, {
                                className: isCompact ? "w-4 h-4" : "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                                lineNumber: 102,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] font-medium opacity-0 group-hover:opacity-100 absolute -bottom-2 bg-white/90 dark:bg-black/90 px-1 rounded shadow-sm transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10",
                                children: tool.label
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                                lineNumber: 103,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, tool.id, true, {
                        fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                        lineNumber: 91,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
                lineNumber: 89,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/editor/components/EditorSidebar.tsx",
        lineNumber: 57,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(EditorSidebar, "prg6N6QydvsqgYVSsCcs4vMY7rI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettingsStore"]
    ];
});
_c = EditorSidebar;
var _c;
__turbopack_context__.k.register(_c, "EditorSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/editor/components/ThumbnailSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThumbnailSidebar",
    ()=>ThumbnailSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useFileStore.ts [app-client] (ecmascript)");
;
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const PDFDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(async ()=>{
    const mod = await __turbopack_context__.A("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, next/dynamic entry, async loader)");
    if ("TURBOPACK compile-time truthy", 1) mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
    return mod.Document;
}, {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = PDFDocument;
const PDFPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.Page), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full bg-muted/20 animate-pulse"
        }, void 0, false, {
            fileName: "[project]/src/features/editor/components/ThumbnailSidebar.tsx",
            lineNumber: 15,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0))
});
_c1 = PDFPage;
const ThumbnailSidebar = ({ onPageClick, currentPageView })=>{
    _s();
    const { file, numPages } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileStore"])();
    if (!file) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-32 h-full bg-muted/30 border-r border-border flex flex-col overflow-y-auto scroll-smooth",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xs font-bold uppercase text-muted-foreground mb-4 tracking-wider",
                    children: "Pages"
                }, void 0, false, {
                    fileName: "[project]/src/features/editor/components/ThumbnailSidebar.tsx",
                    lineNumber: 31,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PDFDocument, {
                    file: file,
                    className: "space-y-4",
                    children: Array.from(new Array(numPages), (_, index)=>{
                        const pageNum = index + 1;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>onPageClick(pageNum),
                            className: `
                                    relative group cursor-pointer transition-all duration-200
                                    ${currentPageView === pageNum ? 'ring-2 ring-primary scale-105' : 'hover:bg-black/5'}
                                `,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg overflow-hidden border border-border shadow-sm bg-white aspect-[1/1.4] relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PDFPage, {
                                        pageNumber: pageNum,
                                        width: 100,
                                        renderTextLayer: false,
                                        renderAnnotationLayer: false,
                                        className: "pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/components/ThumbnailSidebar.tsx",
                                        lineNumber: 45,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/components/ThumbnailSidebar.tsx",
                                    lineNumber: 44,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground",
                                    children: pageNum
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/components/ThumbnailSidebar.tsx",
                                    lineNumber: 53,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, pageNum, true, {
                            fileName: "[project]/src/features/editor/components/ThumbnailSidebar.tsx",
                            lineNumber: 36,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/src/features/editor/components/ThumbnailSidebar.tsx",
                    lineNumber: 32,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/editor/components/ThumbnailSidebar.tsx",
            lineNumber: 30,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/editor/components/ThumbnailSidebar.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ThumbnailSidebar, "kGjvjs8DMptAYFQ23Y9UetYWwXw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileStore"]
    ];
});
_c2 = ThumbnailSidebar;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "PDFDocument");
__turbopack_context__.k.register(_c1, "PDFPage");
__turbopack_context__.k.register(_c2, "ThumbnailSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/editor/components/EditorToolbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorToolbar",
    ()=>EditorToolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/eraser.js [app-client] (ecmascript) <export default as Eraser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/bold.js [app-client] (ecmascript) <export default as Bold>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/italic.js [app-client] (ecmascript) <export default as Italic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Underline$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/underline.js [app-client] (ecmascript) <export default as Underline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-client] (ecmascript) <export default as Wand2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanText$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/scan-text.js [app-client] (ecmascript) <export default as ScanText>");
"use client";
;
;
const EditorToolbar = ({ mode, selectedAnnotationType, zoom, setZoom, onAction, onExport, status, drawColor, setDrawColor, brushSize, setBrushSize, textStyle, setTextStyle })=>{
    const colors = [
        '#000000',
        '#FF0000',
        '#0000FF',
        '#008000',
        '#FFA500',
        '#800080'
    ];
    const updateTextStyle = (key, val)=>{
        setTextStyle((prev)=>({
                ...prev,
                [key]: val
            }));
    };
    const renderToolSpecifics = ()=>{
        // Edit Text Mode
        if (mode === 'edit_text') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-600 rounded-full border border-blue-200/50 backdrop-blur-sm animate-in slide-in-from-top-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanText$3e$__["ScanText"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 57,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-bold",
                        children: "Edit Mode: Text is extracted. Drag or double-click to edit."
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 58,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                lineNumber: 56,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0));
        }
        // ... (Keep existing conditionals for other modes)
        if (mode === 'text' || mode === 'cursor' && selectedAnnotationType === 'text') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 px-4 py-1.5 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 animate-in slide-in-from-top-2 shadow-sm",
                children: [
                    mode === 'cursor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-bold text-primary uppercase mr-2",
                        children: "Edit Text"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 67,
                        columnNumber: 43
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: textStyle.fontFamily,
                        onChange: (e)=>updateTextStyle('fontFamily', e.target.value),
                        className: "bg-transparent text-xs font-medium border-none outline-none cursor-pointer w-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Helvetica",
                                children: "Sans"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                                lineNumber: 74,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Times",
                                children: "Serif"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                                lineNumber: 75,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Courier",
                                children: "Mono"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                                lineNumber: 76,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 69,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-px bg-white/20"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 79,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>updateTextStyle('isBold', !textStyle.isBold),
                        className: `p-1 rounded hover:bg-black/10 ${textStyle.isBold ? 'bg-white/50 text-primary' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__["Bold"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                            lineNumber: 81,
                            columnNumber: 188
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 81,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>updateTextStyle('isItalic', !textStyle.isItalic),
                        className: `p-1 rounded hover:bg-black/10 ${textStyle.isItalic ? 'bg-white/50 text-primary' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__["Italic"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                            lineNumber: 82,
                            columnNumber: 194
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 82,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>updateTextStyle('isUnderline', !textStyle.isUnderline),
                        className: `p-1 rounded hover:bg-black/10 ${textStyle.isUnderline ? 'bg-white/50 text-primary' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Underline$3e$__["Underline"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                            lineNumber: 83,
                            columnNumber: 203
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 83,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-px bg-white/20"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 85,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        value: textStyle.size,
                        onChange: (e)=>updateTextStyle('size', Number(e.target.value)),
                        className: "w-12 bg-transparent text-xs text-center border-b border-white/20 focus:border-primary outline-none"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 87,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-px bg-white/20"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 94,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative group flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "color",
                            value: drawColor,
                            onChange: (e)=>setDrawColor(e.target.value),
                            className: "w-5 h-5 rounded border-none cursor-pointer"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                            lineNumber: 97,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 96,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                lineNumber: 66,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0));
        }
        if (mode === 'draw' || mode === 'cursor' && selectedAnnotationType === 'drawing') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 px-4 py-1 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 animate-in slide-in-from-top-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium text-muted-foreground uppercase",
                        children: mode === 'cursor' ? 'Edit Drawing' : 'Drawing'
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 111,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-px bg-white/20"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 112,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            colors.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDrawColor(c),
                                    className: `w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${drawColor === c ? 'border-foreground shadow-sm' : 'border-transparent'}`,
                                    style: {
                                        backgroundColor: c
                                    }
                                }, c, false, {
                                    fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                                    lineNumber: 116,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "color",
                                value: drawColor,
                                onChange: (e)=>setDrawColor(e.target.value),
                                className: "w-6 h-6 rounded-full border-0 p-0 overflow-hidden cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                                lineNumber: 123,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 114,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 w-px bg-white/20"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 131,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: "1",
                        max: "10",
                        step: "1",
                        value: brushSize,
                        onChange: (e)=>setBrushSize(Number(e.target.value)),
                        className: "w-20 accent-primary h-1.5 bg-muted rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 133,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                lineNumber: 110,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0));
        }
        switch(mode){
            case 'stamp_remover':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 px-4 py-1 bg-purple-500/10 text-purple-600 rounded-full border border-purple-200/50 backdrop-blur-sm animate-in slide-in-from-top-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                            lineNumber: 147,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-bold",
                            children: "AI Stamp Remover: Click page to clean"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                            lineNumber: 148,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                    lineNumber: 146,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0));
            case 'eraser':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 px-4 py-1 bg-red-500/10 text-red-600 rounded-full border border-red-200/50 backdrop-blur-sm animate-in slide-in-from-top-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eraser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eraser$3e$__["Eraser"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                            lineNumber: 154,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-bold",
                            children: "Click items to delete"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                            lineNumber: 155,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                    lineNumber: 153,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-16 border-b border-white/20 bg-white/60 dark:bg-black/60 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 z-30 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 flex-1 overflow-x-auto no-scrollbar",
                children: [
                    renderToolSpecifics(),
                    status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-green-600 font-medium px-3 py-1 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-full whitespace-nowrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                                lineNumber: 171,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            " ",
                            status
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 170,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                lineNumber: 167,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 flex-none justify-end ml-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onAction('toggle_ai'),
                        className: "flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-bold hover:bg-primary/20 transition-all border border-primary/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                                lineNumber: 182,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Ask AI"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                                lineNumber: 183,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 178,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onExport,
                        className: "flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                                lineNumber: 189,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Export"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                                lineNumber: 190,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                        lineNumber: 185,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
                lineNumber: 177,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/editor/components/EditorToolbar.tsx",
        lineNumber: 164,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = EditorToolbar;
var _c;
__turbopack_context__.k.register(_c, "EditorToolbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/editor/components/ReorderDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReorderDialog",
    ()=>ReorderDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Document.js [app-client] (ecmascript) <export default as Document>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Page.js [app-client] (ecmascript) <export default as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdfjs-dist@5.4.296/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript) <export * as pdfjs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useFileStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
if ("TURBOPACK compile-time truthy", 1) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].version}/build/pdf.worker.min.mjs`;
const ReorderDialog = ({ isOpen, onClose, pageCount, onApply })=>{
    _s();
    const { file } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileStore"])();
    const [pages, setPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [draggedItem, setDraggedItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Initialize/Reset pages when dialog opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReorderDialog.useEffect": ()=>{
            if (isOpen) {
                setPages(Array.from({
                    length: pageCount
                }, {
                    "ReorderDialog.useEffect": (_, i)=>i
                }["ReorderDialog.useEffect"]));
            }
        }
    }["ReorderDialog.useEffect"], [
        isOpen,
        pageCount
    ]);
    if (!isOpen) return null;
    const onDragStart = (e, index)=>{
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = "move";
        // Optional: Set a custom drag image or styling
        e.dataTransfer.setData('text/plain', index.toString());
    };
    const onDragOver = (e, index)=>{
        e.preventDefault(); // Necessary to allow dropping
        if (draggedItem === null || draggedItem === index) return;
        const newPages = [
            ...pages
        ];
        const item = newPages.splice(draggedItem, 1)[0];
        newPages.splice(index, 0, item);
        setPages(newPages);
        setDraggedItem(index);
    };
    const onDragEnd = ()=>{
        setDraggedItem(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-background/95 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col border border-border overflow-hidden animate-in zoom-in-95",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-border flex justify-between items-center bg-muted/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-xl tracking-tight",
                                    children: "Reorder Pages"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                    lineNumber: 61,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Drag and drop pages to rearrange the document"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                    lineNumber: 62,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                            lineNumber: 60,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-2 hover:bg-muted rounded-full transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                lineNumber: 65,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                            lineNumber: 64,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                    lineNumber: 59,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6 bg-muted/10",
                    children: file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Document$3e$__["Document"], {
                        file: file,
                        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
                        children: pages.map((originalIndex, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                draggable: true,
                                onDragStart: (e)=>onDragStart(e, i),
                                onDragOver: (e)=>onDragOver(e, i),
                                onDragEnd: onDragEnd,
                                className: `
                                group relative flex flex-col gap-2 p-3 rounded-xl cursor-move transition-all duration-200
                                ${draggedItem === i ? 'opacity-30 scale-95 bg-primary/20 ring-2 ring-primary border-transparent' : 'hover:bg-white/50 dark:hover:bg-black/20 border border-transparent hover:border-border hover:shadow-lg'}
                            `,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative rounded-lg overflow-hidden shadow-sm border border-border bg-white pointer-events-none select-none aspect-[1/1.4] flex items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Page$3e$__["Page"], {
                                                pageNumber: originalIndex + 1,
                                                width: 150,
                                                renderTextLayer: false,
                                                renderAnnotationLayer: false,
                                                className: "max-w-full max-h-full object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                                lineNumber: 89,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md z-10",
                                                children: originalIndex + 1
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                                lineNumber: 97,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-2 right-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                                                    className: "w-5 h-5 drop-shadow-md"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                                lineNumber: 100,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                        lineNumber: 88,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium text-muted-foreground",
                                            children: [
                                                "Page ",
                                                i + 1
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                            lineNumber: 106,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                        lineNumber: 105,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, originalIndex, true, {
                                fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                                lineNumber: 74,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                        lineNumber: 72,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center h-full text-muted-foreground",
                        children: "Loading preview..."
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                        lineNumber: 112,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                    lineNumber: 70,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-t border-border flex justify-end gap-3 bg-muted/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-6 py-2.5 rounded-xl border border-border hover:bg-muted font-medium transition-colors text-sm",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                            lineNumber: 120,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onApply(pages),
                            className: "px-8 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm",
                            children: "Apply Changes"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                            lineNumber: 126,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
                    lineNumber: 119,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
            lineNumber: 56,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/editor/components/ReorderDialog.tsx",
        lineNumber: 55,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ReorderDialog, "w7wEimHdIVG0kki4aP3l+e41mCE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileStore"]
    ];
});
_c = ReorderDialog;
var _c;
__turbopack_context__.k.register(_c, "ReorderDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/editor/ThinkingSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThinkingSidebar",
    ()=>ThinkingSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
;
var _s = __turbopack_context__.k.signature();
;
;
const ThinkingSidebar = ({ isOpen, onClose, messages, isThinking, onSendMessage })=>{
    _s();
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [inputVal, setInputVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThinkingSidebar.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ThinkingSidebar.useEffect"], [
        messages,
        isThinking
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (inputVal.trim()) {
            onSendMessage(inputVal);
            setInputVal('');
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-0 bottom-0 right-0 w-full md:w-[450px] bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl z-[1000] flex flex-col animate-in slide-in-from-right duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-16 px-4 border-b border-border flex items-center justify-between bg-background/50 backdrop-blur-md shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-primary font-bold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Gemini Assistant"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-6 bg-muted/10",
                children: [
                    messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full flex flex-col items-center justify-center text-muted-foreground text-center p-8 opacity-70",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                    className: "w-8 h-8 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-foreground mb-2",
                                children: "How can I help?"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm mb-6",
                                children: "Ask me to edit content, summarize text, or clean up stamps."
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onSendMessage("Summarize this document"),
                                        className: "text-xs border px-3 py-1.5 rounded-full hover:bg-primary/5",
                                        children: "Summarize"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onSendMessage("Suggest edits for this page"),
                                        className: "text-xs border px-3 py-1.5 rounded-full hover:bg-primary/5",
                                        children: "Suggest Edits"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `
                w-8 h-8 rounded-full flex items-center justify-center shrink-0 border
                ${msg.role === 'user' ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-red-50 dark:bg-red-900/20 text-primary border-red-100'}
            `,
                                    children: msg.role === 'user' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                        lineNumber: 66,
                                        columnNumber: 38
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                        lineNumber: 66,
                                        columnNumber: 69
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `
                max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words
                ${msg.role === 'user' ? 'bg-white dark:bg-zinc-800 text-foreground rounded-tr-sm border border-border' : 'bg-white dark:bg-black/40 text-foreground border border-primary/10 rounded-tl-sm'}
            `,
                                    children: msg.text
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, msg.id, true, {
                            fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    isThinking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 animate-pulse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 w-full pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 bg-muted rounded w-3/4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 bg-muted rounded w-1/2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-border bg-background shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: inputVal,
                            onChange: (e)=>setInputVal(e.target.value),
                            placeholder: "Ask Gemini to analyze or edit...",
                            className: "w-full bg-muted/50 border border-input rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: !inputVal.trim() || isThinking,
                            className: "absolute right-2 top-2 p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/editor/ThinkingSidebar.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ThinkingSidebar, "b0ltpPMCvsbpdH/JC0hQN3WYwl4=");
_c = ThinkingSidebar;
var _c;
__turbopack_context__.k.register(_c, "ThinkingSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/ExportDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExportDialog",
    ()=>ExportDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileDown$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/file-down.js [app-client] (ecmascript) <export default as FileDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/sliders-vertical.js [app-client] (ecmascript) <export default as Sliders>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useSettingsStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const ExportDialog = ({ isOpen, onClose, onExport, defaultFileName })=>{
    _s();
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettingsStore"])();
    const [fileName, setFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultFileName.replace('.pdf', ''));
    const [compression, setCompression] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(80);
    const [isEncrypted, setIsEncrypted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Apply Auto-Compress setting on open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExportDialog.useEffect": ()=>{
            if (isOpen) {
                // If autoCompress is on, default to 50% (aggressive) otherwise 80% (high quality)
                setCompression(settings.autoCompress ? 50 : 80);
            }
        }
    }["ExportDialog.useEffect"], [
        isOpen,
        settings.autoCompress
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-background rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-border animate-in zoom-in-95 duration-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 border-b border-border flex justify-between items-center bg-muted/30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 bg-primary/10 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileDown$3e$__["FileDown"], {
                                        className: "w-5 h-5 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                        lineNumber: 44,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 43,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-lg",
                                    children: "Export Document"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 46,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                            lineNumber: 42,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-1 hover:bg-muted rounded-full transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                lineNumber: 49,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                            lineNumber: 48,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium text-muted-foreground",
                                    children: "File Name"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 57,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: fileName,
                                            onChange: (e)=>setFileName(e.target.value),
                                            className: "flex-1 bg-background border border-input rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                            lineNumber: 59,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-muted-foreground font-medium",
                                            children: ".pdf"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                            lineNumber: 65,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 58,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                            lineNumber: 56,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-muted-foreground flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__["Sliders"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Compression Quality",
                                                settings.autoCompress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                            className: "w-3 h-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                                            lineNumber: 76,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Auto"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                            lineNumber: 72,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-primary font-mono",
                                            children: [
                                                compression,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                            lineNumber: 80,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 71,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "10",
                                    max: "100",
                                    value: compression,
                                    onChange: (e)=>setCompression(Number(e.target.value)),
                                    className: "w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 82,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-muted-foreground",
                                    children: compression < 50 ? "High compression (smaller file, lower quality)" : "Balanced compression"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 90,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                            lineNumber: 70,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 pt-2 border-t border-border",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 text-sm font-medium cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: isEncrypted,
                                                onChange: (e)=>setIsEncrypted(e.target.checked),
                                                className: "rounded border-input text-primary focus:ring-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                                lineNumber: 99,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                className: "w-4 h-4 text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                                lineNumber: 105,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Encrypt with Password"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                        lineNumber: 98,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 97,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                isEncrypted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    placeholder: "Enter secure password",
                                    className: "w-full bg-background border border-input rounded-lg px-3 py-2 text-sm animate-in slide-in-from-top-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 111,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                            lineNumber: 96,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 123,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onExport(fileName + '.pdf', {
                                            password: isEncrypted ? password : undefined,
                                            compression
                                        }),
                                    disabled: isEncrypted && !password,
                                    className: "flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                            lineNumber: 134,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Export PDF"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                                    lineNumber: 129,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ExportDialog.tsx",
                            lineNumber: 122,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/ExportDialog.tsx",
                    lineNumber: 53,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/ExportDialog.tsx",
            lineNumber: 38,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/ExportDialog.tsx",
        lineNumber: 37,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ExportDialog, "Zl9LbuC03IeHunQlJhDCNaQPDtE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettingsStore"]
    ];
});
_c = ExportDialog;
var _c;
__turbopack_context__.k.register(_c, "ExportDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/SettingsDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsDialog",
    ()=>SettingsDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/monitor.js [app-client] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/sliders-vertical.js [app-client] (ecmascript) <export default as Sliders>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useSettingsStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const SettingsDialog = ({ isOpen, onClose })=>{
    _s();
    const { settings, updateSettings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettingsStore"])();
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl w-full max-w-lg border border-white/20 dark:border-white/10 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 shrink-0 bg-gray-50/50 dark:bg-black/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-bold flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__["Sliders"], {
                                    className: "w-5 h-5 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                    lineNumber: 24,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Settings & Preferences"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                            lineNumber: 23,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                lineNumber: 31,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                            lineNumber: 27,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                    lineNumber: 22,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 41,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Workflow Logic"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                    lineNumber: 40,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 last:border-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-semibold block",
                                                            children: "Auto-Compress Exports"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                            lineNumber: 47,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground block",
                                                            children: "Automatically optimize PDF size when saving"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                            lineNumber: 48,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 46,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: settings.autoCompress,
                                                            onChange: (e)=>updateSettings({
                                                                    autoCompress: e.target.checked
                                                                }),
                                                            className: "peer sr-only"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                            lineNumber: 51,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                            lineNumber: 57,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 50,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 45,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-semibold block",
                                                            children: "AI Thinking Process"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                            lineNumber: 63,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground block",
                                                            children: "Show step-by-step reasoning in chat sidebar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                            lineNumber: 64,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: settings.aiThinking,
                                                            onChange: (e)=>updateSettings({
                                                                    aiThinking: e.target.checked
                                                                }),
                                                            className: "peer sr-only"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                            lineNumber: 67,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                            lineNumber: 73,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 61,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                    lineNumber: 44,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                            lineNumber: 39,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 82,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Security Defaults"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                    lineNumber: 81,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 p-4 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                            className: "w-3 h-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                            lineNumber: 88,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Default Password"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    value: settings.defaultPassword,
                                                    onChange: (e)=>updateSettings({
                                                            defaultPassword: e.target.value
                                                        }),
                                                    placeholder: "Enter a password to pre-fill",
                                                    className: "w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 86,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-semibold uppercase text-muted-foreground",
                                                    children: "Default Permissions"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-3 gap-2",
                                                    children: [
                                                        {
                                                            key: 'printing',
                                                            label: 'Printing'
                                                        },
                                                        {
                                                            key: 'copying',
                                                            label: 'Copying'
                                                        },
                                                        {
                                                            key: 'modifying',
                                                            label: 'Modifying'
                                                        }
                                                    ].map((perm)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-2 p-2 bg-white dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/10 cursor-pointer hover:border-primary/50 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-4 h-4 rounded border flex items-center justify-center transition-colors ${settings.permissions[perm.key] ? 'bg-primary border-primary text-white' : 'border-muted-foreground'}`,
                                                                    children: settings.permissions[perm.key] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                        className: "w-3 h-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                                        lineNumber: 109,
                                                                        columnNumber: 121
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                                    lineNumber: 108,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    className: "hidden",
                                                                    checked: !!settings.permissions[perm.key],
                                                                    onChange: (e)=>updateSettings({
                                                                            permissions: {
                                                                                ...settings.permissions,
                                                                                [perm.key]: e.target.checked
                                                                            }
                                                                        })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                                    lineNumber: 111,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-medium",
                                                                    children: perm.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                                    lineNumber: 119,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, perm.key, true, {
                                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 99,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                    lineNumber: 85,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                            lineNumber: 80,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 130,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Interface"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                    lineNumber: 129,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 p-1 flex",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateSettings({
                                                    theme: 'light'
                                                }),
                                            className: `flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${settings.theme === 'light' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:bg-black/5'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Light"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 134,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateSettings({
                                                    theme: 'dark'
                                                }),
                                            className: `flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${settings.theme === 'dark' ? 'bg-zinc-800 shadow text-primary' : 'text-muted-foreground hover:bg-black/5'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Dark"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 140,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                    lineNumber: 133,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 p-4 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold",
                                            children: "Density"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 149,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex bg-white dark:bg-black/20 rounded-lg p-1 border border-gray-200 dark:border-white/10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>updateSettings({
                                                            density: 'comfortable'
                                                        }),
                                                    className: `px-3 py-1 text-xs rounded-md transition-all ${settings.density === 'comfortable' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`,
                                                    children: "Comfortable"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>updateSettings({
                                                            density: 'compact'
                                                        }),
                                                    className: `px-3 py-1 text-xs rounded-md transition-all ${settings.density === 'compact' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`,
                                                    children: "Compact"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                            lineNumber: 150,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                                    lineNumber: 148,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                            lineNumber: 128,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/20 shrink-0 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-muted-foreground",
                        children: "Settings are automatically saved to your browser."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                        lineNumber: 170,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/SettingsDialog.tsx",
                    lineNumber: 169,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/SettingsDialog.tsx",
            lineNumber: 19,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/SettingsDialog.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SettingsDialog, "Hi8YiYJ8iboCbsPh/2fP9RRAzo0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettingsStore"]
    ];
});
_c = SettingsDialog;
var _c;
__turbopack_context__.k.register(_c, "SettingsDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/editorHelpers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFinalPrompt",
    ()=>buildFinalPrompt,
    "generateMaskBase64",
    ()=>generateMaskBase64
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/geminiService.ts [app-client] (ecmascript)");
;
const buildFinalPrompt = (pdfText, userQuery, isFirstMsg, settings)=>{
    const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareDocumentPrompt"])(pdfText, userQuery, isFirstMsg);
    return settings.aiThinking ? prompt + "\n\n(IMPORTANT: Please Explain your reasoning step-by-step before giving the final answer.)" : prompt + "\n\n(IMPORTANT: Be concise. Do not explain reasoning unless asked.)";
};
const generateMaskBase64 = async (imageBase64, boxes)=>{
    const img = new Image();
    img.src = imageBase64;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
    // Black background (keep)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // White boxes for mask
    ctx.fillStyle = 'white';
    boxes.forEach((b)=>{
        // support both normalized (0-1) coordinates and absolute pixel coords
        const bx = b.x ?? 0;
        const by = b.y ?? 0;
        const bw = b.w ?? b.width ?? 0;
        const bh = b.h ?? b.height ?? 0;
        let x, y, w, h;
        if (bx > 0 && bx <= 1 && by >= 0 && by <= 1 && bw > 0 && bw <= 1 && bh >= 0 && bh <= 1) {
            x = Math.round(bx * canvas.width);
            y = Math.round(by * canvas.height);
            w = Math.round(bw * canvas.width);
            h = Math.round(bh * canvas.height);
        } else {
            x = Math.round(bx);
            y = Math.round(by);
            w = Math.round(bw);
            h = Math.round(bh);
        }
        ctx.fillRect(x, y, w, h);
    });
    return canvas.toDataURL('image/png');
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/tools/organizeTools.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addPageNumbers",
    ()=>addPageNumbers,
    "deletePages",
    ()=>deletePages,
    "mergePdfs",
    ()=>mergePdfs,
    "removeEmptyPages",
    ()=>removeEmptyPages,
    "reorderPages",
    ()=>reorderPages,
    "rotateSpecificPage",
    ()=>rotateSpecificPage,
    "splitPdf",
    ()=>splitPdf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/api/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/api/rotations.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/api/colors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/api/StandardFonts.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdfjs-dist@5.4.296/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript) <export * as pdfjs>");
;
;
// Helper to load PDF
const load = async (file)=>await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].load(await file.arrayBuffer());
const mergePdfs = async (file1, file2)=>{
    const [b1, b2] = await Promise.all([
        file1.arrayBuffer(),
        file2.arrayBuffer()
    ]);
    const pdf1 = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].load(b1);
    const pdf2 = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].load(b2);
    const merged = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].create();
    (await merged.copyPages(pdf1, pdf1.getPageIndices())).forEach((p)=>merged.addPage(p));
    (await merged.copyPages(pdf2, pdf2.getPageIndices())).forEach((p)=>merged.addPage(p));
    return await merged.save();
};
const splitPdf = async (file, startPage, endPage)=>{
    const pdfDoc = await load(file);
    const newPdf = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].create();
    const count = pdfDoc.getPageCount();
    const indices = [];
    for(let i = startPage - 1; i < endPage; i++){
        if (i >= 0 && i < count) indices.push(i);
    }
    (await newPdf.copyPages(pdfDoc, indices)).forEach((p)=>newPdf.addPage(p));
    return await newPdf.save();
};
const deletePages = async (file, pageNumbers)=>{
    const pdfDoc = await load(file);
    const total = pdfDoc.getPageCount();
    // Sort descending to avoid index shifting problems
    const toDelete = pageNumbers.map((p)=>p - 1).filter((p)=>p >= 0 && p < total).sort((a, b)=>b - a);
    toDelete.forEach((idx)=>pdfDoc.removePage(idx));
    return await pdfDoc.save();
};
const reorderPages = async (file, newOrderIndices)=>{
    // newOrderIndices should be 0-based array of old indices
    const pdfDoc = await load(file);
    const newPdf = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].create();
    const copiedPages = await newPdf.copyPages(pdfDoc, newOrderIndices);
    copiedPages.forEach((p)=>newPdf.addPage(p));
    return await newPdf.save();
};
const rotateSpecificPage = async (file, pageNumber, angle)=>{
    const pdfDoc = await load(file);
    const page = pdfDoc.getPage(pageNumber - 1);
    const currentAngle = page.getRotation().angle;
    page.setRotation((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"])(currentAngle + angle));
    return await pdfDoc.save();
};
const addPageNumbers = async (file)=>{
    const pdfDoc = await load(file);
    const font = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].Helvetica);
    const total = pdfDoc.getPageCount();
    pdfDoc.getPages().forEach((page, idx)=>{
        const { width } = page.getSize();
        page.drawText(`Page ${idx + 1} of ${total}`, {
            x: width / 2 - 30,
            y: 20,
            size: 10,
            font,
            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(0, 0, 0)
        });
    });
    return await pdfDoc.save();
};
const removeEmptyPages = async (file)=>{
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__pdfjs$3e$__["pdfjs"].getDocument(arrayBuffer).promise;
    const totalPages = pdf.numPages;
    const emptyPageIndices = []; // 1-based indices for consistency with other tools
    for(let i = 1; i <= totalPages; i++){
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const str = textContent.items.map((item)=>item.str).join('').trim();
        // Basic check: No text
        if (str.length === 0) {
            // Heuristic: Check for drawing operations
            // An absolutely empty page typically has very few operators (save, restore, transform)
            // A scanned image page will have 'paintImageXObject' or similar
            const ops = await page.getOperatorList();
            // Threshold: If fewer than 10 drawing commands, assume it's blank.
            // Real content usually has many more.
            if (ops.fnArray.length < 10) {
                emptyPageIndices.push(i);
            }
        }
    }
    if (emptyPageIndices.length === 0) {
        return {
            pdfBytes: null,
            removedCount: 0
        };
    }
    const newPdfBytes = await deletePages(file, emptyPageIndices);
    return {
        pdfBytes: newPdfBytes,
        removedCount: emptyPageIndices.length
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/tools/editTools.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addWatermark",
    ()=>addWatermark,
    "cropPage",
    ()=>cropPage,
    "replacePageWithImage",
    ()=>replacePageWithImage,
    "saveAnnotations",
    ()=>saveAnnotations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/api/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/api/colors.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/api/StandardFonts.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/api/rotations.js [app-client] (ecmascript)");
;
const load = async (file)=>await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].load(await file.arrayBuffer());
const cropPage = async (file, pageIndex, rect)=>{
    const pdfDoc = await load(file);
    const page = pdfDoc.getPage(pageIndex);
    const { height } = page.getSize();
    // Convert UI Coords (Top-Left Origin) to PDF Coords (Bottom-Left Origin)
    page.setCropBox(rect.x, height - rect.y - rect.h, rect.w, rect.h);
    page.setMediaBox(rect.x, height - rect.y - rect.h, rect.w, rect.h);
    return await pdfDoc.save();
};
const saveAnnotations = async (file, annotations, rotations)=>{
    const pdfDoc = await load(file);
    const pages = pdfDoc.getPages();
    // Embed Fonts
    const helvetica = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].Helvetica);
    const helveticaBold = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].HelveticaBold);
    const helveticaOblique = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].HelveticaOblique);
    const helveticaBoldOblique = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].HelveticaBoldOblique);
    const times = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].TimesRoman);
    const timesBold = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].TimesRomanBold);
    const timesItalic = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].TimesRomanItalic);
    const timesBoldItalic = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].TimesRomanBoldItalic);
    const courier = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].Courier);
    const getFont = (family, bold, italic)=>{
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
        Object.entries(rotations).forEach(([idx, angle])=>{
            const i = parseInt(idx) - 1;
            if (pages[i]) pages[i].setRotation((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"])(pages[i].getRotation().angle + angle));
        });
    }
    // Apply Annotations
    for (const ann of annotations){
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
                y: height - ann.y - (ann.size || 14),
                size: ann.size || 14,
                font: fontToUse,
                color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(r, g, b)
            });
            if (ann.isUnderline) {
                const width = fontToUse.widthOfTextAtSize(ann.text, ann.size || 14);
                page.drawLine({
                    start: {
                        x: ann.x,
                        y: height - ann.y - (ann.size || 14) - 2
                    },
                    end: {
                        x: ann.x + width,
                        y: height - ann.y - (ann.size || 14) - 2
                    },
                    thickness: 1,
                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(r, g, b)
                });
            }
        } else if (ann.type === 'whiteout' || ann.type === 'redact') {
            const color = ann.type === 'redact' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(0, 0, 0) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(1, 1, 1);
            page.drawRectangle({
                x: ann.x,
                y: height - ann.y - ann.height,
                width: ann.width,
                height: ann.height,
                color
            });
        } else if (ann.type === 'image') {
            const img = ann.dataUrl.startsWith('data:image/png') ? await pdfDoc.embedPng(ann.dataUrl) : await pdfDoc.embedJpg(ann.dataUrl);
            page.drawImage(img, {
                x: ann.x,
                y: height - ann.y - ann.height,
                width: ann.width,
                height: ann.height
            });
        } else if (ann.type === 'drawing' || ann.type === 'signature') {
            const p = ann.points;
            const r = parseInt(ann.color?.slice(1, 3) || '00', 16) / 255;
            const g = parseInt(ann.color?.slice(3, 5) || '00', 16) / 255;
            const b = parseInt(ann.color?.slice(5, 7) || '00', 16) / 255;
            for(let i = 0; i < p.length - 1; i++){
                page.drawLine({
                    start: {
                        x: p[i].x,
                        y: height - p[i].y
                    },
                    end: {
                        x: p[i + 1].x,
                        y: height - p[i + 1].y
                    },
                    thickness: ann.thickness,
                    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(r, g, b)
                });
            }
        }
    }
    return await pdfDoc.save();
};
const addWatermark = async (file, text, colorHex = '#000000')=>{
    const pdfDoc = await load(file);
    const font = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$StandardFonts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardFonts"].HelveticaBold);
    const r = parseInt(colorHex.slice(1, 3), 16) / 255;
    const g = parseInt(colorHex.slice(3, 5), 16) / 255;
    const b = parseInt(colorHex.slice(5, 7), 16) / 255;
    pdfDoc.getPages().forEach((page)=>{
        const { width, height } = page.getSize();
        const fontSize = 60;
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const textHeight = fontSize; // Approx height
        // Calculate position to center the rotated text
        const angle = 45;
        const rad = angle * Math.PI / 180;
        // Offset from rotation origin to text visual center
        const cx = textWidth / 2;
        const cy = textHeight / 3; // Approximate baseline offset
        // Rotate offset
        const rcx = cx * Math.cos(rad) - cy * Math.sin(rad);
        const rcy = cx * Math.sin(rad) + cy * Math.cos(rad);
        // Center on page
        const x = width / 2 - rcx;
        const y = height / 2 - rcy;
        page.drawText(text, {
            x: x,
            y: y,
            size: fontSize,
            font: font,
            color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$colors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgb"])(r, g, b),
            rotate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"])(angle),
            opacity: 0.3
        });
    });
    return await pdfDoc.save();
};
const replacePageWithImage = async (file, pageIndex, imageBase64)=>{
    const pdfDoc = await load(file);
    const page = pdfDoc.getPage(pageIndex);
    const { width, height } = page.getSize();
    const img = imageBase64.startsWith('data:image/png') ? await pdfDoc.embedPng(imageBase64) : await pdfDoc.embedJpg(imageBase64);
    // Draw image over the entire page
    page.drawImage(img, {
        x: 0,
        y: 0,
        width: width,
        height: height
    });
    return await pdfDoc.save();
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/tools/securityTools.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkEncryption",
    ()=>checkEncryption,
    "decryptPdf",
    ()=>decryptPdf,
    "encryptPdf",
    ()=>encryptPdf,
    "flattenPdf",
    ()=>flattenPdf,
    "updateMetadata",
    ()=>updateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdf-lib@1.17.1/node_modules/pdf-lib/es/api/index.js [app-client] (ecmascript)");
;
const load = async (file)=>await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].load(await file.arrayBuffer());
const encryptPdf = async (file, password, permissions = {
    printing: true,
    copying: false,
    modifying: false
})=>{
    // Load source
    const srcDoc = await load(file);
    // Create destination (fresh doc always has encrypt method)
    const dstDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].create();
    // Copy all pages
    const indices = srcDoc.getPageIndices();
    const copiedPages = await dstDoc.copyPages(srcDoc, indices);
    copiedPages.forEach((page)=>dstDoc.addPage(page));
    // Construct permissions object
    const permObj = {
        modifying: !!permissions.modifying,
        copying: !!permissions.copying,
        annotating: !!permissions.modifying,
        fillingForms: !!permissions.modifying,
        contentAccessibility: !!permissions.copying,
        documentAssembly: !!permissions.modifying
    };
    if (permissions.printing) {
        permObj.printing = 'highResolution';
    }
    // Encrypt the fresh document
    dstDoc.encrypt({
        userPassword: password,
        ownerPassword: password,
        permissions: permObj
    });
    return await dstDoc.save();
};
const flattenPdf = async (file)=>{
    const pdfDoc = await load(file);
    try {
        pdfDoc.getForm().flatten();
    } catch (e) {}
    return await pdfDoc.save();
};
const updateMetadata = async (file, meta)=>{
    const pdfDoc = await load(file);
    if (meta.title) pdfDoc.setTitle(meta.title);
    if (meta.author) pdfDoc.setAuthor(meta.author);
    return await pdfDoc.save();
};
const checkEncryption = async (file)=>{
    try {
        const arrayBuffer = await file.arrayBuffer();
        const { pdfjs } = await __turbopack_context__.A("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript, async loader)");
        // Try loading without password
        await pdfjs.getDocument(arrayBuffer).promise;
        return false;
    } catch (error) {
        if (error.name === 'PasswordException' || error.password) {
            return true;
        }
        return false;
    }
};
const decryptPdf = async (file, password)=>{
    try {
        const arrayBuffer = await file.arrayBuffer();
        // Load with password
        const pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdf$2d$lib$40$1$2e$17$2e$1$2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].load(arrayBuffer, {
            password
        });
        // Save without any encryption settings (removes it)
        const decryptedBytes = await pdfDoc.save();
        return new File([
            decryptedBytes
        ], file.name.replace('.pdf', '_decrypted.pdf'), {
            type: 'application/pdf'
        });
    } catch (e) {
        throw new Error("Invalid Password or Decryption Failed");
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/editor/EditorPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorPage",
    ()=>EditorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$PDFCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/editor/PDFCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useFileStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useSettingsStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$EditorSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/editor/components/EditorSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$ThumbnailSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/editor/components/ThumbnailSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$EditorToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/editor/components/EditorToolbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$ReorderDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/editor/components/ReorderDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$ThinkingSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/editor/ThinkingSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ExportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ExportDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SettingsDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SettingsDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/scissors.js [app-client] (ecmascript) <export default as Scissors>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/panel-left-close.js [app-client] (ecmascript) <export default as PanelLeftClose>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/panel-left-open.js [app-client] (ecmascript) <export default as PanelLeftOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stamp$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/stamp.js [app-client] (ecmascript) <export default as Stamp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.561.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/geminiService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$editorHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/editorHelpers.ts [app-client] (ecmascript)");
// Import Modular Tools
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$organizeTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/tools/organizeTools.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$editTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/tools/editTools.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$securityTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/tools/securityTools.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/tools/convertTools.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const EditorPage = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { file, replaceFile, addAnnotation, annotations, updateAnnotation, rotatePage, pdfText, numPages, pageRotations, removeAnnotation, editableBlocks, isRestoring } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileStore"])();
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettingsStore"])();
    // View State
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('cursor');
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('edit');
    const [statusMsg, setStatusMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activePage, setActivePage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // UI State
    const [isSidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isThumbnailsOpen, setThumbnailsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isThinkingOpen, setIsThinkingOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSettingsOpen, setIsSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAIProcessing, setIsAIProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // NEW: Global AI Loading State
    // Selection State
    const [selectedAnnId, setSelectedAnnId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedAnnotation = annotations.find((a)=>a.id === selectedAnnId);
    // Chat State
    const [chatMessages, setChatMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isThinking, setIsThinking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const chatSessionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isFirstMsgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    // Draw/Text State
    const [drawColor, setDrawColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#000000');
    const [brushSize, setBrushSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2);
    const [textStyle, setTextStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        fontFamily: 'Helvetica',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        align: 'left',
        size: 14
    });
    // Modal State
    const [modal, setModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: null,
        isOpen: false
    });
    const [isExportOpen, setIsExportOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mInput1, setMInput1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [mInput2, setMInput2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [htmlInput, setHtmlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Refs
    const mergeInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wordInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pendingImage, setPendingImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorPage.useEffect": ()=>{
            if (!isRestoring && !file) {
                router.push('/');
            }
        }
    }["EditorPage.useEffect"], [
        isRestoring,
        file,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorPage.useEffect": ()=>{
            const isDesktop = window.innerWidth >= 768;
            if (isDesktop) setSidebarOpen(true);
            else setThumbnailsOpen(false);
            chatSessionRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createChatSession"])();
            // Restore
            ({
                "EditorPage.useEffect": async ()=>{
                    // restoreState is now idempotent and handles isRestoring
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileStore"].getState().isRestoring) {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileStore"].getState().restoreState();
                    }
                }
            })["EditorPage.useEffect"]();
        }
    }["EditorPage.useEffect"], []);
    // Persist file state when annotations/blocks change (debounced)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorPage.useEffect": ()=>{
            const timeout = setTimeout({
                "EditorPage.useEffect.timeout": ()=>{
                    ({
                        "EditorPage.useEffect.timeout": async ()=>{
                            try {
                                await (await __turbopack_context__.A("[project]/src/store/useFileStore.ts [app-client] (ecmascript, async loader)")).useFileStore.getState().persistState();
                            } catch (e) {}
                        }
                    })["EditorPage.useEffect.timeout"]();
                }
            }["EditorPage.useEffect.timeout"], 700);
            return ({
                "EditorPage.useEffect": ()=>clearTimeout(timeout)
            })["EditorPage.useEffect"];
        }
    }["EditorPage.useEffect"], [
        annotations,
        editableBlocks,
        pageRotations,
        pdfText
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorPage.useEffect": ()=>{
            if (modal.type === 'encrypt' && settings.defaultPassword) {
                setMInput1(settings.defaultPassword);
            }
        }
    }["EditorPage.useEffect"], [
        modal.type,
        settings.defaultPassword
    ]);
    /* --- Chat & AI Implementation --- */ const handleChatSendMessage = async (text)=>{
        if (!chatSessionRef.current) return;
        setIsThinking(true);
        const userMsgId = Date.now().toString();
        // Optimistic UI update
        setChatMessages((prev)=>[
                ...prev,
                {
                    id: userMsgId,
                    role: 'user',
                    text
                }
            ]);
        const finalPrompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$editorHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFinalPrompt"])(pdfText, text, isFirstMsgRef.current, settings);
        isFirstMsgRef.current = false;
        // Placeholder for model response
        const modelMsgId = (Date.now() + 1).toString();
        setChatMessages((prev)=>[
                ...prev,
                {
                    id: modelMsgId,
                    role: 'model',
                    text: ''
                }
            ]);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["streamResponse"])(chatSessionRef.current, finalPrompt, (chunk)=>{
            setChatMessages((prev)=>prev.map((m)=>m.id === modelMsgId ? {
                        ...m,
                        text: m.text + chunk
                    } : m));
        }, async (toolCall)=>{
            // Intercept tool calls from Gemini
            return await handleAIToolExecution(toolCall);
        });
        setIsThinking(false);
    };
    const handleAIToolExecution = async (toolCall)=>{
        const { name, args } = toolCall;
        console.log(`[AI Tool] Executing ${name}`, args);
        try {
            switch(name){
                case 'edit_pdf_add_text':
                    addAnnotation({
                        id: Date.now().toString(),
                        page: args.page,
                        type: 'text',
                        x: args.x || 100,
                        y: args.y || 100,
                        text: args.text,
                        color: args.color || '#000000',
                        size: args.fontSize || 14
                    });
                    return "Text added successfully.";
                case 'clean_page_image':
                    // Trigger the visual stamp removal process
                    // Default to page center if no interaction? AI auto-detect
                    await handleStampRemove(args.page);
                    return "Stamp removal process completed.";
                case 'organize_rotate_page':
                    rotatePage(args.page);
                    return `Page ${args.page} rotated.`;
                case 'organize_delete_page':
                    if (args.pages && args.pages.length > 0) {
                        // We need to actually replace the file, which is async
                        setIsAIProcessing(true);
                        const newBytes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$organizeTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deletePages"](file, args.pages);
                        replaceFile(newBytes);
                        setIsAIProcessing(false);
                        return `Pages ${args.pages.join(', ')} deleted.`;
                    }
                    return "No pages specified.";
                case 'get_page_count':
                    return `The document has ${numPages} pages.`;
                default:
                    return "Tool not implemented.";
            }
        } catch (e) {
            console.error("AI Tool Execution Error", e);
            setIsAIProcessing(false);
            return "Error executing tool.";
        }
    };
    /* --- Editor Handlers --- */ const handleToolSelect = (tool)=>{
        if ([
            'cursor',
            'text',
            'edit_text',
            'draw',
            'whiteout',
            'eraser',
            'stamp_remover',
            'crop',
            'redact',
            'sign'
        ].includes(tool.id)) {
            setMode(tool.id);
            if (tool.id !== 'cursor') setSelectedAnnId(null);
            if (window.innerWidth < 768) setSidebarOpen(false);
            return;
        }
        if (tool.requiresModal) {
            setMInput1('');
            setMInput2('');
            setHtmlInput('');
            setModal({
                type: tool.id,
                isOpen: true
            });
            if (window.innerWidth < 768) setSidebarOpen(false);
            return;
        }
        executeDirectAction(tool.id);
        if (window.innerWidth < 768) setSidebarOpen(false);
    };
    const executeDirectAction = async (id)=>{
        try {
            if (!file) return;
            switch(id){
                case 'rotate':
                    rotatePage(activePage);
                    setStatusMsg(`Page ${activePage} Rotated 🔄`);
                    break;
                case 'merge':
                    mergeInputRef.current?.click();
                    break;
                case 'add_image':
                    imageInputRef.current?.click();
                    break;
                case 'word_to_pdf':
                    wordInputRef.current?.click();
                    break;
                case 'remove_empty':
                    setStatusMsg("Scanning for blank pages... 🔍");
                    const { pdfBytes, removedCount } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$organizeTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeEmptyPages"](file);
                    if (pdfBytes && removedCount > 0) {
                        replaceFile(pdfBytes);
                        setStatusMsg(`Removed ${removedCount} empty pages 🗑️`);
                    } else {
                        setStatusMsg("No empty pages found 🤷");
                    }
                    break;
                case 'flatten':
                    replaceFile(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$securityTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flattenPdf"](file), 'flattened.pdf');
                    setStatusMsg("PDF Flattened 📄");
                    break;
                case 'repair':
                    setStatusMsg("Repairing... 🔧");
                    replaceFile(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["repairPdf"](file), 'repaired.pdf');
                    setStatusMsg("PDF Repaired ✅");
                    break;
                case 'page_numbers':
                    replaceFile(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$organizeTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPageNumbers"](file), 'numbered.pdf');
                    setStatusMsg("Added Numbers 🔢");
                    break;
                case 'pdf_to_word':
                    download(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDocxFromText"](pdfText), 'converted.docx');
                    break;
                case 'pdf_to_excel':
                    setStatusMsg("Extracting Tables... 📊");
                    download(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createXlsxFromPdf"](file), 'tables.xlsx');
                    break;
                case 'pdf_to_ppt':
                    setStatusMsg("Creating Slides... 🎞️");
                    download(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPptxFromPdf"](file), 'presentation.pptx');
                    break;
                case 'ocr_pdf':
                    setStatusMsg("Scanning... 👁️");
                    const text = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ocrPdf"](file);
                    download(new Blob([
                        text
                    ], {
                        type: 'text/plain'
                    }), 'extracted_text.txt');
                    break;
                case 'pdf_to_jpg':
                    setStatusMsg("Converting... 🖼️");
                    const imgs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfToImages"](file);
                    if (imgs.length > 0) {
                        const a = document.createElement('a');
                        a.href = imgs[0];
                        a.download = `page_1.jpg`;
                        a.click();
                        setStatusMsg('Saved JPG ✅');
                    }
                    break;
            }
        } catch (e) {
            console.error(e);
            alert('Action Failed: ' + e.message);
        }
    };
    const handleAnnotationSelect = (ann)=>{
        setSelectedAnnId(ann ? ann.id : null);
        if (ann) {
            if (ann.type === 'text') {
                setTextStyle({
                    fontFamily: ann.fontFamily || 'Helvetica',
                    isBold: !!ann.isBold,
                    isItalic: !!ann.isItalic,
                    isUnderline: !!ann.isUnderline,
                    align: ann.align || 'left',
                    size: ann.size || 14
                });
                setDrawColor(ann.color || '#000000');
            } else if (ann.type === 'drawing') {
                setDrawColor(ann.color || '#000000');
                setBrushSize(ann.thickness || 2);
            }
        }
    };
    const handleTextStyleChange = (updater)=>{
        setTextStyle((prev)=>{
            const newState = typeof updater === 'function' ? updater(prev) : updater;
            if (mode === 'cursor' && selectedAnnId && selectedAnnotation?.type === 'text') {
                updateAnnotation(selectedAnnId, newState);
            }
            return newState;
        });
    };
    const handlePageClick = (pageNum)=>{
        setActivePage(pageNum);
        const el = document.getElementById(`page-wrapper-${pageNum}`);
        if (el) el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    // REAL AI STAMP REMOVAL (INPAINTING)
    const handleStampRemove = async (pageNum, rect)=>{
        if (!file) return;
        setIsAIProcessing(true);
        setStatusMsg(rect ? "AI Inpainting: Removing area..." : "AI Vision: Auto-detecting artifacts...");
        try {
            // 1. Get Page Image (High Res)
            const imgBase64 = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPageImage"](file, pageNum);
            let boxes = [];
            // 2. Logic: If rect provided (manual drag), use it. Else auto-detect.
            if (rect) {
                // Convert PDF point coords (595 width) to 0-1 normalized for mask generation logic later if needed
                // But our helper 'createMask' below needs pixel matching.
                // Convert.getPageImage uses scale 1.5 (~892px width).
                // We need to map 'rect' (PDF points) to Image Pixels.
                const pdfWidth = 595;
                const scale = 1.5; // From Convert.getPageImage logic
                boxes = [
                    {
                        x: Math.floor(rect.x * scale),
                        y: Math.floor(rect.y * scale),
                        w: Math.floor(rect.w * scale),
                        h: Math.floor(rect.h * scale)
                    }
                ];
            } else {
                // Auto-detect using Vision (Old Logic)
                const autoBoxes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectStamps"])(imgBase64);
                if (autoBoxes.length === 0) {
                    setIsAIProcessing(false);
                    setStatusMsg("AI: No stamps detected.");
                    return;
                }
                // Map normalized 0-1 to pixels
                const imgObj = new Image();
                imgObj.src = imgBase64;
                await imgObj.decode();
                boxes = autoBoxes.map((b)=>({
                        x: Math.floor(b.x * imgObj.width),
                        y: Math.floor(b.y * imgObj.height),
                        w: Math.floor(b.width * imgObj.width),
                        h: Math.floor(b.height * imgObj.height)
                    }));
            }
            // 3. Generate Mask (centralized helper supports pixel or normalized boxes)
            const maskBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$editorHelpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateMaskBase64"])(imgBase64, boxes);
            // 4. Call Gemini Inpainting
            const cleanedImage = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeStampWithMask"])(imgBase64, maskBase64);
            if (!cleanedImage) throw new Error("AI returned no image");
            // 5. Replace PDF Page
            const newPdfBytes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$editTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replacePageWithImage"](file, pageNum - 1, cleanedImage);
            replaceFile(newPdfBytes, "cleaned.pdf");
            setIsAIProcessing(false);
            setStatusMsg("Cleaned Page Replaced ✨");
            setMode('cursor');
        } catch (e) {
            console.error("Stamp Removal Error", e);
            setIsAIProcessing(false);
            setStatusMsg("AI Error: Removal Failed.");
        }
    };
    const handleCropApply = async (pageNum, rect)=>{
        try {
            if (!file) return;
            setStatusMsg("Cropping... ✂️");
            const newBytes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$editTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cropPage"](file, pageNum - 1, rect);
            replaceFile(newBytes, 'cropped.pdf');
            setStatusMsg("Cropped! ✅");
            setMode('cursor');
        } catch (e) {
            console.error(e);
            alert("Crop failed: " + e.message);
        }
    };
    const handleModalSubmit = async ()=>{
        try {
            if (!file) return;
            let res = null;
            let updateView = false;
            if (modal.type === 'split') {
                if (!mInput1 || !mInput2) return alert("Enter pages!");
                res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$organizeTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitPdf"](file, Number(mInput1), Number(mInput2));
            } else if (modal.type === 'delete_page') {
                const pagesToDelete = mInput1.split(',').map((n)=>parseInt(n.trim()));
                res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$organizeTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deletePages"](file, pagesToDelete);
                updateView = true;
            } else if (modal.type === 'encrypt') {
                res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$securityTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encryptPdf"](file, mInput1, settings.permissions);
            } else if (modal.type === 'watermark') {
                res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$editTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addWatermark"](file, mInput1, drawColor);
                updateView = true;
            } else if (modal.type === 'metadata') {
                res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$securityTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMetadata"](file, {
                    title: mInput1,
                    author: mInput2
                });
                updateView = true;
            } else if (modal.type === 'html_to_pdf') {
                res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["htmlToPdf"](htmlInput);
                replaceFile(res, 'web_convert.pdf');
                setModal({
                    type: null,
                    isOpen: false
                });
                return;
            }
            if (res) {
                if (updateView) {
                    replaceFile(res);
                    setStatusMsg("Applied! 👍");
                } else download(res, 'output.pdf');
            }
            setModal({
                type: null,
                isOpen: false
            });
        } catch (e) {
            console.error(e);
            alert('Error: ' + e.message);
        }
    };
    const handleExport = async (fileName, options)=>{
        try {
            if (!file) return;
            setIsExportOpen(false);
            setStatusMsg("Saving... 💾");
            // 1. Convert dirty blocks to whiteout + text annotations
            const blockAnnotations = [];
            editableBlocks.filter((b)=>b.isDirty).forEach((block)=>{
                // Whiteout the original area
                blockAnnotations.push({
                    id: `wo_${block.id}`,
                    page: block.page,
                    type: 'whiteout',
                    x: block.x,
                    y: block.y,
                    width: block.width,
                    height: block.height
                });
                // Add new text on top
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
            // Merge normal annotations + block overrides
            const allAnnotations = [
                ...annotations,
                ...blockAnnotations
            ];
            let finalBytes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$editTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAnnotations"](file, allAnnotations, pageRotations);
            if (options.password) {
                const blob = new Blob([
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(finalBytes)
                ], {
                    type: 'application/pdf'
                });
                const tempFile = new File([
                    blob
                ], fileName, {
                    type: 'application/pdf'
                });
                finalBytes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$securityTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encryptPdf"](tempFile, options.password, settings.permissions);
            }
            download(finalBytes, fileName);
        } catch (e) {
            console.error(e);
            alert("Export failed: " + e.message);
        }
    };
    const handleFile = async (e, type)=>{
        const f = e.target.files?.[0];
        if (!f || !file) return;
        if (type === 'merge') {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$organizeTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergePdfs"](file, f);
            replaceFile(res, 'merged.pdf');
            replaceFile(res, 'merged.pdf');
            setStatusMsg("Merged! 🔗");
        } else if (type === 'word') {
            try {
                setStatusMsg("Converting Word... 📄");
                const pdfBytes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tools$2f$convertTools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertImageOrOfficeToPdf"](f);
                replaceFile(pdfBytes, f.name.replace('.docx', '.pdf'));
                setStatusMsg("Converted! ✅");
            } catch (e) {
                alert("Conversion Failed");
            }
        } else {
            const reader = new FileReader();
            reader.onload = (ev)=>{
                setPendingImage(ev.target?.result);
                setMode('image');
                setStatusMsg("Tap to place image 📍");
            };
            reader.readAsDataURL(f);
        }
    };
    const download = (data, name)=>{
        const blob = data instanceof Blob ? data : new Blob([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(data)
        ]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setStatusMsg(`Saved ${name} 🎉`);
        setTimeout(()=>setStatusMsg(''), 3000);
    };
    if (isRestoring) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen w-screen flex flex-col items-center justify-center bg-background text-foreground",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "w-10 h-10 animate-spin text-primary mb-4"
                }, void 0, false, {
                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                    lineNumber: 529,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold animate-pulse",
                    children: "Loading Workspace..."
                }, void 0, false, {
                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                    lineNumber: 530,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground text-sm mt-2",
                    children: "Restoring your document"
                }, void 0, false, {
                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                    lineNumber: 531,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/editor/EditorPage.tsx",
            lineNumber: 528,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (!file) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                ref: mergeInputRef,
                className: "hidden",
                accept: ".pdf",
                onChange: (e)=>handleFile(e, 'merge')
            }, void 0, false, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 540,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                ref: imageInputRef,
                className: "hidden",
                accept: "image/*",
                onChange: (e)=>handleFile(e, 'image')
            }, void 0, false, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 541,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                ref: wordInputRef,
                className: "hidden",
                accept: ".docx,.pptx,.xlsx",
                onChange: (e)=>handleFile(e, 'word')
            }, void 0, false, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 542,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            isAIProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-[200] bg-background/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/EditorPage.tsx",
                                lineNumber: 548,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "w-8 h-8 text-primary animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 550,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/EditorPage.tsx",
                                lineNumber: 549,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                        lineNumber: 547,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mt-8 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 animate-pulse",
                        children: "Generative AI Processing"
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                        lineNumber: 553,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground mt-2",
                        children: "Scrubbing document and restructuring pixels..."
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                        lineNumber: 556,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 546,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-14 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-white/20 flex items-center px-4 justify-between shrink-0 z-40 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push('/'),
                                className: "p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 563,
                                    columnNumber: 149
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/EditorPage.tsx",
                                lineNumber: 563,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold truncate max-w-[150px] md:max-w-xs leading-none",
                                        children: file.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                                        lineNumber: 565,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-muted-foreground",
                                        children: [
                                            numPages,
                                            " Pages"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                                        lineNumber: 566,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/editor/EditorPage.tsx",
                                lineNumber: 564,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                        lineNumber: 562,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setThumbnailsOpen(!isThumbnailsOpen),
                                className: "hidden md:block p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10",
                                title: "Toggle Page Thumbnails",
                                children: isThumbnailsOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__["PanelLeftClose"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 571,
                                    columnNumber: 45
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftOpen$3e$__["PanelLeftOpen"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 571,
                                    columnNumber: 86
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/EditorPage.tsx",
                                lineNumber: 570,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSidebarOpen(!isSidebarOpen),
                                className: "md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 574,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/EditorPage.tsx",
                                lineNumber: 573,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSettingsOpen(true),
                                className: "p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 576,
                                    columnNumber: 138
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/EditorPage.tsx",
                                lineNumber: 576,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                        lineNumber: 569,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 561,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `
                absolute md:static inset-y-0 left-0 z-50
                bg-background/95 backdrop-blur-xl border-r border-border
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-auto'}
                h-full flex flex-col shadow-2xl md:shadow-none
            `,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$EditorSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorSidebar"], {
                            activeCategory: activeCategory,
                            setActiveCategory: setActiveCategory,
                            activeToolId: mode,
                            onToolSelect: handleToolSelect
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                            lineNumber: 591,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                        lineNumber: 584,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `
                hidden md:block transition-all duration-300 overflow-hidden bg-muted/20 border-r border-border
                ${isThumbnailsOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}
            `,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$ThumbnailSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThumbnailSidebar"], {
                            onPageClick: handlePageClick,
                            currentPageView: activePage
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                            lineNumber: 602,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                        lineNumber: 598,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col min-w-0 bg-muted/20 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$EditorToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorToolbar"], {
                                mode: mode,
                                selectedAnnotationType: selectedAnnotation ? selectedAnnotation.type : null,
                                zoom: zoom,
                                setZoom: setZoom,
                                onAction: (a)=>{
                                    if (a === 'merge_add') mergeInputRef.current?.click();
                                    if (a === 'toggle_ai') setIsThinkingOpen(!isThinkingOpen);
                                },
                                onExport: ()=>setIsExportOpen(true),
                                status: statusMsg,
                                drawColor: drawColor,
                                setDrawColor: (c)=>{
                                    setDrawColor(c);
                                    if (mode === 'cursor' && selectedAnnId) updateAnnotation(selectedAnnId, {
                                        color: c
                                    });
                                },
                                brushSize: brushSize,
                                setBrushSize: (s)=>{
                                    setBrushSize(s);
                                    if (mode === 'cursor' && selectedAnnId) updateAnnotation(selectedAnnId, {
                                        thickness: s,
                                        size: s
                                    });
                                },
                                textStyle: textStyle,
                                setTextStyle: handleTextStyleChange
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/EditorPage.tsx",
                                lineNumber: 607,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-auto p-4 md:p-8 relative scroll-smooth bg-zinc-100 dark:bg-zinc-900/50",
                                ref: scrollContainerRef,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-h-full flex flex-col items-center justify-start pb-20",
                                    children: [
                                        mode === 'image' && pendingImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "sticky top-4 z-50 bg-primary text-white text-xs px-4 py-2 rounded-full shadow-lg animate-bounce pointer-events-none mb-4",
                                            children: "Tap on document to drop image 📍"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                                            lineNumber: 621,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$PDFCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFCanvas"], {
                                            zoom: zoom,
                                            setZoom: setZoom,
                                            mode: mode,
                                            activePage: activePage,
                                            onPageSelect: setActivePage,
                                            pendingImage: pendingImage,
                                            onImagePlaced: ()=>{
                                                setMode('cursor');
                                                setPendingImage(null);
                                            },
                                            drawColor: drawColor,
                                            brushSize: brushSize,
                                            textStyle: textStyle,
                                            onStampRemove: handleStampRemove,
                                            onAnnotationSelect: handleAnnotationSelect,
                                            onCropApply: handleCropApply
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                                            lineNumber: 625,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 619,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/editor/EditorPage.tsx",
                                lineNumber: 618,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                        lineNumber: 606,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 581,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$ThinkingSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThinkingSidebar"], {
                isOpen: isThinkingOpen,
                onClose: ()=>setIsThinkingOpen(false),
                messages: chatMessages,
                isThinking: isThinking,
                onSendMessage: handleChatSendMessage
            }, void 0, false, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 639,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$editor$2f$components$2f$ReorderDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReorderDialog"], {
                isOpen: modal.type === 'reorder',
                onClose: ()=>setModal({
                        type: null,
                        isOpen: false
                    }),
                pageCount: numPages,
                onApply: async (order)=>{}
            }, void 0, false, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 647,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ExportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExportDialog"], {
                isOpen: isExportOpen,
                onClose: ()=>setIsExportOpen(false),
                onExport: handleExport,
                defaultFileName: file.name.replace('.pdf', '')
            }, void 0, false, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 648,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SettingsDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SettingsDialog"], {
                isOpen: isSettingsOpen,
                onClose: ()=>setIsSettingsOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 649,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            modal.isOpen && modal.type !== 'reorder' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-background rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-in zoom-in-95 border border-border",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold capitalize flex items-center gap-2",
                                children: [
                                    modal.type === 'watermark' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stamp$3e$__["Stamp"], {
                                        className: "w-5 h-5 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                                        lineNumber: 658,
                                        columnNumber: 64
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    modal.type === 'encrypt' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "w-5 h-5 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                                        lineNumber: 659,
                                        columnNumber: 62
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    modal.type === 'split' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$561$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__["Scissors"], {
                                        className: "w-5 h-5 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/editor/EditorPage.tsx",
                                        lineNumber: 660,
                                        columnNumber: 60
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    modal.type?.replace('_', ' ')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/editor/EditorPage.tsx",
                                lineNumber: 657,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                            lineNumber: 656,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        modal.type === 'split' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Enter the page range to extract (e.g., 1 to 5)."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 667,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            placeholder: "Start",
                                            value: mInput1,
                                            onChange: (e)=>setMInput1(e.target.value),
                                            className: "w-full bg-muted p-2 rounded-lg border border-input"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                                            lineNumber: 669,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            placeholder: "End",
                                            value: mInput2,
                                            onChange: (e)=>setMInput2(e.target.value),
                                            className: "w-full bg-muted p-2 rounded-lg border border-input"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                                            lineNumber: 670,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 668,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                            lineNumber: 666,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        modal.type === 'delete_page' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Enter page numbers to delete, separated by commas (e.g., 1, 3, 5)."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 677,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "1, 3, 5",
                                    value: mInput1,
                                    onChange: (e)=>setMInput1(e.target.value),
                                    className: "w-full bg-muted p-2 rounded-lg border border-input"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 678,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                            lineNumber: 676,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        modal.type === 'encrypt' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Set a password to protect this document."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 684,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    placeholder: "Password",
                                    value: mInput1,
                                    onChange: (e)=>setMInput1(e.target.value),
                                    className: "w-full bg-muted p-2 rounded-lg border border-input"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 685,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                            lineNumber: 683,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        modal.type === 'watermark' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Enter text for the watermark stamp."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 691,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "CONFIDENTIAL",
                                    value: mInput1,
                                    onChange: (e)=>setMInput1(e.target.value),
                                    className: "w-full bg-muted p-2 rounded-lg border border-input"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 692,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium",
                                            children: "Color:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                                            lineNumber: 694,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "color",
                                            value: drawColor,
                                            onChange: (e)=>setDrawColor(e.target.value),
                                            className: "h-8 w-16 rounded cursor-pointer"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                                            lineNumber: 695,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 693,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                            lineNumber: 690,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        modal.type === 'metadata' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-bold text-muted-foreground uppercase",
                                            children: "Title"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                                            lineNumber: 703,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Document Title",
                                            value: mInput1,
                                            onChange: (e)=>setMInput1(e.target.value),
                                            className: "w-full bg-muted p-2 rounded-lg border border-input"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                                            lineNumber: 704,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 702,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-bold text-muted-foreground uppercase",
                                            children: "Author"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                                            lineNumber: 707,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Author Name",
                                            value: mInput2,
                                            onChange: (e)=>setMInput2(e.target.value),
                                            className: "w-full bg-muted p-2 rounded-lg border border-input"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                                            lineNumber: 708,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 706,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                            lineNumber: 701,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        modal.type === 'html_to_pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Paste HTML code to convert to PDF."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 715,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: htmlInput,
                                    onChange: (e)=>setHtmlInput(e.target.value),
                                    placeholder: "<h1>Hello World</h1>",
                                    className: "w-full h-32 bg-muted p-2 rounded-lg border border-input font-mono text-xs"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 716,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                            lineNumber: 714,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-2 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setModal({
                                            type: null,
                                            isOpen: false
                                        }),
                                    className: "px-4 py-2 rounded-lg hover:bg-muted font-medium text-sm transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 726,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleModalSubmit,
                                    className: "px-6 py-2 bg-primary text-white rounded-lg shadow-lg shadow-primary/20 text-sm font-bold hover:scale-105 transition-transform",
                                    children: "Apply"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                                    lineNumber: 727,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/editor/EditorPage.tsx",
                            lineNumber: 725,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/editor/EditorPage.tsx",
                    lineNumber: 654,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/editor/EditorPage.tsx",
                lineNumber: 653,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/editor/EditorPage.tsx",
        lineNumber: 539,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(EditorPage, "DyjgnRcrvETeHFhcY6dp4o/c8Kg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useFileStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSettingsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSettingsStore"]
    ];
});
_c = EditorPage;
var _c;
__turbopack_context__.k.register(_c, "EditorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/editor/EditorPage.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/features/editor/EditorPage.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_73c8e2b6._.js.map