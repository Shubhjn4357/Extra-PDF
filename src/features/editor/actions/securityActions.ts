
import { useFileStore } from '@/store/useFileStore';
import * as Security from '@/services/tools/securityTools';
import { useSettingsStore } from '@/store/useSettingsStore';

// Common passwords list (truncated for demo, in real app load from file or larger list)
const COMMON_PASSWORDS = [
    '123456', 'password', '12345678', '1234', 'qwerty', '12345', 'dragon', 'p@ssword', 'admin', '123'
];

interface SecurityActionsProps {
    setIsBusy: (val: boolean) => void;
    setStatusMsg: (msg: string) => void;
}

export const useSecurityActions = ({ setIsBusy, setStatusMsg }: SecurityActionsProps) => {
    const { file, replaceFile } = useFileStore();
    const { settings } = useSettingsStore();

    const bruteForceUnlock = async () => {
        if (!file) return;
        setIsBusy(true);
        setStatusMsg("Starting Dictionary Attack... 🔓");

        try {
            // Check if encrypted first
            const isEncrypted = await Security.checkEncryption(file); // Ensure this exists in securityTools or use pdf-lib
            // If checkIsEncrypted is not available, we try straightforward.

            // Note: Brute forcing client side is slow. 
            // We'll iterate through common passwords.
            let unlockedBytes: Uint8Array | null = null;
            let foundPass = '';

            for (const pass of COMMON_PASSWORDS) {
                setStatusMsg(`Trying: ${pass}...`);
                try {
                    const res = await Security.decryptPdf(file, pass);
                    if (res) {
                        unlockedBytes = res;
                        foundPass = pass;
                        break;
                    }
                } catch (e) {
                    // Wrong password
                }
                // Yield to UI
                await new Promise(r => setTimeout(r, 10));
            }

            if (unlockedBytes) {
                replaceFile(unlockedBytes, 'unlocked.pdf');
                setStatusMsg(`Success! Password was: "${foundPass}" 🎉`);
                alert(`Unlocked! Password found: ${foundPass}`);
            } else {
                setStatusMsg("Force Unlock Failed (Password not in dictionary).");
                alert("Could not find password in common list.");
            }
        } catch (e) {
            console.error(e);
            setStatusMsg("Error during force unlock");
        } finally {
            setIsBusy(false);
        }
    };

    return { bruteForceUnlock };
};
