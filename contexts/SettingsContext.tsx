import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings } from '../types';

const DEFAULT_SETTINGS: AppSettings = {
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

interface SettingsContextType {
    settings: AppSettings;
    updateSettings: (newSettings: Partial<AppSettings> | ((prev: AppSettings) => Partial<AppSettings>)) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize from LocalStorage or Default
    const [settings, setSettings] = useState<AppSettings>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('extrapdf_settings');
            if (stored) {
                try {
                    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
                } catch (e) {
                    console.error("Failed to parse settings", e);
                }
            }
        }
        return DEFAULT_SETTINGS;
    });

    // Persistence Effect
    useEffect(() => {
        localStorage.setItem('extrapdf_settings', JSON.stringify(settings));
        
        // Apply Theme immediately
        const root = document.documentElement;
        if (settings.theme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.add('light');
            root.classList.remove('dark');
        }
    }, [settings]);

    const updateSettings = (updates: Partial<AppSettings> | ((prev: AppSettings) => Partial<AppSettings>)) => {
        setSettings(prev => {
            const newValues = typeof updates === 'function' ? updates(prev) : updates;
            return { ...prev, ...newValues };
        });
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error("useSettings must be used within SettingsProvider");
    return context;
};