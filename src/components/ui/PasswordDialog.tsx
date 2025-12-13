import React, { useState } from 'react';
import { Lock, Unlock, Loader2 } from 'lucide-react';

interface PasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onUnlock: (password: string) => Promise<void>;
    fileName: string;
}

export const PasswordDialog: React.FC<PasswordDialogProps> = ({ isOpen, onClose, onUnlock, fileName }) => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await onUnlock(password);
            onClose();
        } catch (err) {
            setError('Incorrect password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-6 rounded-2xl shadow-xl border border-white/20 scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
                        <Lock className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold">Protected Document</h2>
                        <p className="text-sm text-muted-foreground break-all">
                            "{fileName}" is encrypted.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-4 mt-2">
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Password</label>
                            <input 
                                type="password" 
                                autoFocus
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                className="w-full p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent focus:border-primary/50 outline-none transition-all font-mono"
                                placeholder="Enter document password..."
                            />
                            {error && <p className="text-xs text-red-500 font-medium ml-1 animate-in slide-in-from-left-1">{error}</p>}
                        </div>

                        <div className="flex gap-2 pt-2">
                             <button 
                                type="button" 
                                onClick={onClose}
                                className="flex-1 px-4 py-3 rounded-xl font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-muted-foreground"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={!password || isLoading}
                                className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Unlock className="w-4 h-4" />}
                                Unlock / Force Decrypt
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
