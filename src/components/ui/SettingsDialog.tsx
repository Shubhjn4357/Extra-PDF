"use client";

import React from 'react';
import { X, Moon, Sun, Monitor, Zap, Shield, Lock, Sliders, Check } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';

interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
    const { settings, updateSettings } = useSettingsStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl w-full max-w-lg border border-white/20 dark:border-white/10 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 shrink-0 bg-gray-50/50 dark:bg-black/20">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-primary" />
                        Settings & Preferences
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

                    {/* Section 1: Core Logic & AI */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                            <Zap className="w-4 h-4" /> Workflow Logic
                        </div>

                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden">
                            <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 last:border-0">
                                <div className="space-y-0.5">
                                    <span className="text-sm font-semibold block">Auto-Compress Exports</span>
                                    <span className="text-xs text-muted-foreground block">Automatically optimize PDF size when saving</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={settings.autoCompress}
                                        onChange={(e) => updateSettings({ autoCompress: e.target.checked })}
                                        className="peer sr-only"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                            </label>

                            <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <div className="space-y-0.5">
                                    <span className="text-sm font-semibold block">AI Thinking Process</span>
                                    <span className="text-xs text-muted-foreground block">Show step-by-step reasoning in chat sidebar</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={settings.aiThinking}
                                        onChange={(e) => updateSettings({ aiThinking: e.target.checked })}
                                        className="peer sr-only"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                            </label>
                        </div>
                    </section>

                    {/* Section 2: Security Defaults */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                            <Shield className="w-4 h-4" /> Security Defaults
                        </div>

                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 p-4 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> Default Password
                                </label>
                                <input
                                    type="password"
                                    value={settings.defaultPassword}
                                    onChange={(e) => updateSettings({ defaultPassword: e.target.value })}
                                    placeholder="Enter a password to pre-fill"
                                    className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-muted-foreground">Default Permissions</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {[
                                        { key: 'printing', label: 'Printing' },
                                        { key: 'copying', label: 'Copying' },
                                        { key: 'modifying', label: 'Modifying' }
                                    ].map((perm) => (
                                        <label key={perm.key} className="flex items-center gap-2 p-2 bg-white dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/10 cursor-pointer hover:border-primary/50 transition-colors">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${settings.permissions[perm.key as keyof typeof settings.permissions] ? 'bg-primary border-primary text-white' : 'border-muted-foreground'}`}>
                                                {settings.permissions[perm.key as keyof typeof settings.permissions] && <Check className="w-3 h-3" />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={!!settings.permissions[perm.key as keyof typeof settings.permissions]}
                                                onChange={(e) => updateSettings({
                                                    permissions: { ...settings.permissions, [perm.key]: e.target.checked }
                                                })}
                                            />
                                            <span className="text-xs font-medium">{perm.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Interface */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                            <Monitor className="w-4 h-4" /> Interface
                        </div>

                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 p-1 flex">
                            <button
                                onClick={() => updateSettings({ theme: 'light' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${settings.theme === 'light' ? 'bg-white shadow text-primary' : 'text-muted-foreground hover:bg-black/5'}`}
                            >
                                <Sun className="w-4 h-4" /> Light
                            </button>
                            <button
                                onClick={() => updateSettings({ theme: 'dark' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${settings.theme === 'dark' ? 'bg-zinc-800 shadow text-primary' : 'text-muted-foreground hover:bg-black/5'}`}
                            >
                                <Moon className="w-4 h-4" /> Dark
                            </button>
                        </div>

                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 p-4 flex items-center justify-between">
                            <span className="text-sm font-semibold">Density</span>
                            <div className="flex bg-white dark:bg-black/20 rounded-lg p-1 border border-gray-200 dark:border-white/10">
                                <button
                                    onClick={() => updateSettings({ density: 'comfortable' })}
                                    className={`px-3 py-1 text-xs rounded-md transition-all ${settings.density === 'comfortable' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    Comfortable
                                </button>
                                <button
                                    onClick={() => updateSettings({ density: 'compact' })}
                                    className={`px-3 py-1 text-xs rounded-md transition-all ${settings.density === 'compact' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    Compact
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/20 shrink-0 text-center">
                    <p className="text-[10px] text-muted-foreground">
                        Settings are automatically saved to your browser.
                    </p>
                </div>
            </div>
        </div>
    );
};