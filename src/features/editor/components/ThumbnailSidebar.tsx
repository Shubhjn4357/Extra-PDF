"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useFileStore } from '@/store/useFileStore';

const PDFDocument = dynamic(async () => {
    const mod = await import('react-pdf');
    if (typeof window !== 'undefined') mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
    return mod.Document;
}, { ssr: false });

const PDFPage = dynamic(() => import('react-pdf').then(mod => mod.Page), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-muted/20 animate-pulse" />
});

interface ThumbnailSidebarProps {
    onPageClick: (page: number) => void;
    currentPageView: number; // Currently visible page in viewport
}

export const ThumbnailSidebar: React.FC<ThumbnailSidebarProps> = ({ onPageClick, currentPageView }) => {
    const { file, numPages } = useFileStore();

    if (!file) return null;

    return (
        <div className="w-32 h-full bg-muted/30 border-r border-border flex flex-col overflow-y-auto scroll-smooth">
            <div className="p-4">
                <h3 className="text-xs font-bold uppercase text-muted-foreground mb-4 tracking-wider">Pages</h3>
                <PDFDocument file={file} className="space-y-4">
                    {Array.from(new Array(numPages), (_, index) => {
                        const pageNum = index + 1;
                        return (
                            <div
                                key={pageNum}
                                onClick={() => onPageClick(pageNum)}
                                className={`
                                    relative group cursor-pointer transition-all duration-200
                                    ${currentPageView === pageNum ? 'ring-2 ring-primary scale-105' : 'hover:bg-black/5'}
                                `}
                            >
                                <div className="rounded-lg overflow-hidden border border-border shadow-sm bg-white aspect-[1/1.4] relative">
                                    <PDFPage
                                        pageNumber={pageNum}
                                        width={100}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        className="pointer-events-none"
                                    />
                                </div>
                                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground">
                                    {pageNum}
                                </span>
                            </div>
                        );
                    })}
                </PDFDocument>
            </div>
        </div>
    );
};