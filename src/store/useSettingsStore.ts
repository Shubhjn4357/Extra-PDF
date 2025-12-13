import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppSettings } from '@/types';

interface SettingsState {
    settings: AppSettings;
    updateSettings: (newSettings: Partial<AppSettings>) => void;
    toggleTheme: () => void;
}

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

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            settings: DEFAULT_SETTINGS,
            updateSettings: (newValues) => set((state) => {
                const updated = { ...state.settings, ...newValues };
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
                return { settings: updated };
            }),
            toggleTheme: () => {
                const current = get().settings.theme;
                const next = current === 'light' ? 'dark' : 'light';
                get().updateSettings({ theme: next });
            }
        }),
        {
            name: 'extrapdf_settings_storage',
        }
    )
);

// Initialize theme on load
const saved = localStorage.getItem('extrapdf_settings_storage');
if (saved) {
    try {
        const parsed = JSON.parse(saved);
        const theme = parsed.state.settings.theme;
        if (theme === 'dark') document.documentElement.classList.add('dark');
    } catch (e) { }
}