import React, { useState } from 'react';
import { X, Moon, Sun, Type, FileCog, Shield, Lock } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = 'general' | 'appearance' | 'security';

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  if (!isOpen) return null;

  const TabButton = ({ id, icon: Icon, label }: { id: SettingsTab, icon: any, label: string }) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
            activeTab === id 
            ? 'bg-primary/10 text-primary font-bold shadow-sm' 
            : 'hover:bg-white/50 dark:hover:bg-black/50 text-muted-foreground hover:text-foreground'
        }`}
    >
        <Icon className="w-4 h-4" /> {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-white/20 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row h-[500px]">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white/20 dark:bg-black/20 border-r border-white/10 p-4 space-y-2 shrink-0 backdrop-blur-md">
            <h3 className="font-bold text-lg px-4 py-4 mb-2 tracking-tight">Settings</h3>
            <TabButton id="general" icon={FileCog} label="General" />
            <TabButton id="appearance" icon={Type} label="Appearance" />
            <TabButton id="security" icon={Shield} label="Security" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-transparent">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h4 className="font-semibold capitalize text-lg">{activeTab}</h4>
                <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
                
                {/* General Tab */}
                {activeTab === 'general' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/30 transition-colors">
                                <div>
                                    <p className="text-sm font-medium">Auto-Compress PDF</p>
                                    <p className="text-xs text-muted-foreground">Automatically reduce file size on export</p>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={settings.autoCompress}
                                    onChange={(e) => updateSettings({ autoCompress: e.target.checked })}
                                    className="accent-primary w-5 h-5" 
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/30 transition-colors">
                                <div>
                                    <p className="text-sm font-medium">Enable AI Thinking Mode</p>
                                    <p className="text-xs text-muted-foreground">Show detailed reasoning step-by-step</p>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={settings.aiThinking}
                                    onChange={(e) => updateSettings({ aiThinking: e.target.checked })}
                                    className="accent-primary w-5 h-5" 
                                />
                            </div>
                        </div>

                        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <h5 className="text-sm font-bold text-primary mb-1">Gemini Pro Integration</h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Your session is powered by Gemini 1.5 Flash. Settings are saved automatically to your browser.
                            </p>
                        </div>
                    </div>
                )}

                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                     <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-3">
                            <label className="text-sm font-medium block pl-1">App Theme</label>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => updateSettings({ theme: 'light' })}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all shadow-sm w-full justify-center ${settings.theme === 'light' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-white/20 bg-white/10 hover:bg-white/20'}`}
                                >
                                    <Sun className="w-4 h-4" /> Light
                                </button>
                                <button 
                                     onClick={() => updateSettings({ theme: 'dark' })}
                                     className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all shadow-sm w-full justify-center ${settings.theme === 'dark' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-white/20 bg-black/20 hover:bg-black/30'}`}
                                >
                                    <Moon className="w-4 h-4" /> Dark
                                </button>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <label className="text-sm font-medium block pl-1">Interface Density</label>
                            <select 
                                value={settings.density}
                                onChange={(e) => updateSettings({ density: e.target.value as 'comfortable' | 'compact' })}
                                className="w-full bg-white/50 dark:bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value="comfortable">Comfortable</option>
                                <option value="compact">Compact</option>
                            </select>
                        </div>
                     </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-3">
                            <label className="text-sm font-medium block pl-1">Default Encryption Password</label>
                            <div className="flex items-center gap-2 bg-white/50 dark:bg-black/50 border border-white/20 rounded-xl px-4 py-3 transition-colors focus-within:ring-2 focus-within:ring-primary/50">
                                <Lock className="w-4 h-4 text-muted-foreground" />
                                <input 
                                    type="password" 
                                    value={settings.defaultPassword}
                                    onChange={(e) => updateSettings({ defaultPassword: e.target.value })}
                                    placeholder="Set a default password"
                                    className="flex-1 bg-transparent text-sm outline-none"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground pl-1">This password will be pre-filled when you choose to encrypt a PDF.</p>
                        </div>

                        <div className="h-px bg-white/10" />

                        <div className="space-y-2">
                            <label className="text-sm font-medium block mb-3 pl-1">Default Permissions</label>
                            <div className="flex items-center justify-between py-2 px-3 hover:bg-white/30 rounded-lg transition-colors">
                                <span className="text-sm text-muted-foreground">Allow Printing</span>
                                <input 
                                    type="checkbox" 
                                    checked={settings.permissions.printing}
                                    onChange={(e) => updateSettings(prev => ({ permissions: { ...prev.permissions, printing: e.target.checked } }))}
                                    className="accent-primary w-4 h-4" 
                                />
                            </div>
                            <div className="flex items-center justify-between py-2 px-3 hover:bg-white/30 rounded-lg transition-colors">
                                <span className="text-sm text-muted-foreground">Allow Copying Text</span>
                                <input 
                                    type="checkbox" 
                                    checked={settings.permissions.copying}
                                    onChange={(e) => updateSettings(prev => ({ permissions: { ...prev.permissions, copying: e.target.checked } }))}
                                    className="accent-primary w-4 h-4" 
                                />
                            </div>
                            <div className="flex items-center justify-between py-2 px-3 hover:bg-white/30 rounded-lg transition-colors">
                                <span className="text-sm text-muted-foreground">Allow Modifications</span>
                                <input 
                                    type="checkbox" 
                                    checked={settings.permissions.modifying}
                                    onChange={(e) => updateSettings(prev => ({ permissions: { ...prev.permissions, modifying: e.target.checked } }))}
                                    className="accent-primary w-4 h-4" 
                                />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};