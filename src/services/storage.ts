// Simple IndexedDB helpers for storing last opened PDF bytes
export const saveFileToIDB = async (key: string, bytes: Uint8Array, name?: string) => {
    return new Promise<void>((resolve, reject) => {
        const openReq = indexedDB.open('extrapdf_db', 1);
        openReq.onupgradeneeded = () => {
            const db = openReq.result;
            if (!db.objectStoreNames.contains('files')) db.createObjectStore('files');
        };
        openReq.onsuccess = () => {
            const db = openReq.result;
            const tx = db.transaction('files', 'readwrite');
            const store = tx.objectStore('files');
            store.put({ name: name || 'document.pdf', bytes: Array.from(bytes) }, key);
            tx.oncomplete = () => { db.close(); resolve(); };
            tx.onerror = () => { db.close(); reject(tx.error); };
        };
        openReq.onerror = () => reject(openReq.error);
    });
};

export const loadFileFromIDB = async (key: string): Promise<{ name: string, bytes: Uint8Array } | null> => {
    return new Promise((resolve, reject) => {
        const openReq = indexedDB.open('extrapdf_db', 1);
        openReq.onupgradeneeded = () => {
            const db = openReq.result;
            if (!db.objectStoreNames.contains('files')) db.createObjectStore('files');
        };
        openReq.onsuccess = () => {
            const db = openReq.result;
            const tx = db.transaction('files', 'readonly');
            const store = tx.objectStore('files');
            const getReq = store.get(key);
            getReq.onsuccess = () => {
                const val = getReq.result;
                db.close();
                if (!val) return resolve(null);
                resolve({ name: val.name, bytes: new Uint8Array(val.bytes) });
            };
            getReq.onerror = () => { db.close(); reject(getReq.error); };
        };
        openReq.onerror = () => reject(openReq.error);
    });
};

export const clearIDB = async (key: string) => {
    return new Promise<void>((resolve, reject) => {
        const openReq = indexedDB.open('extrapdf_db', 1);
        openReq.onsuccess = () => {
            const db = openReq.result;
            const tx = db.transaction('files', 'readwrite');
            const store = tx.objectStore('files');
            store.delete(key);
            tx.oncomplete = () => { db.close(); resolve(); };
            tx.onerror = () => { db.close(); reject(tx.error); };
        };
        openReq.onerror = () => reject(openReq.error);
    });
};
