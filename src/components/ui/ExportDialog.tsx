"use client";

import React, { useState, useEffect } from 'react';
import { X, Download, Lock, FileDown, Sliders, Zap } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';

export interface ExportOptions {
    password?: string;
    compression?: number;
}

interface ExportDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onExport: (fileName: string, options: ExportOptions) => void;
    defaultFileName: string;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({ isOpen, onClose, onExport, defaultFileName }) => {
    const { settings } = useSettingsStore();
    const [fileName, setFileName] = useState(defaultFileName.replace('.pdf', ''));
    const [compression, setCompression] = useState(80);
    const [isEncrypted, setIsEncrypted] = useState(false);
    const [password, setPassword] = useState('');

    // Apply Auto-Compress setting on open
    useEffect(() => {
        if (isOpen) {
            // If autoCompress is on, default to 50% (aggressive) otherwise 80% (high quality)
            setCompression(settings.autoCompress ? 50 : 80);
        }
    }, [isOpen, settings.autoCompress]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-border animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/30">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FileDown className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">Export Document</h3>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-muted rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">

                    {/* File Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">File Name</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                className="flex-1 bg-background border border-input rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                            <span className="text-sm text-muted-foreground font-medium">.pdf</span>
                        </div>
                    </div>

                    {/* Compression Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-muted-foreground flex items-center gap-2">
                                <Sliders className="w-4 h-4" /> Compression Quality
                                {settings.autoCompress && (
                                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                        <Zap className="w-3 h-3" /> Auto
                                    </span>
                                )}
                            </span>
                            <span className="text-primary font-mono">{compression}%</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={compression}
                            onChange={(e) => setCompression(Number(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <p className="text-[10px] text-muted-foreground">
                            {compression < 50 ? "High compression (smaller file, lower quality)" : "Balanced compression"}
                        </p>
                    </div>

                    {/* Encryption Toggle */}
                    <div className="space-y-3 pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isEncrypted}
                                    onChange={(e) => setIsEncrypted(e.target.checked)}
                                    className="rounded border-input text-primary focus:ring-primary"
                                />
                                <Lock className="w-4 h-4 text-muted-foreground" />
                                Encrypt with Password
                            </label>
                        </div>

                        {isEncrypted && (
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter secure password"
                                className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm animate-in slide-in-from-top-2"
                            />
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onExport(fileName + '.pdf', { password: isEncrypted ? password : undefined, compression })}
                            disabled={isEncrypted && !password}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="w-4 h-4" />
                            Export PDF
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};