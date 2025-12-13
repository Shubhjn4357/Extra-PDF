// Centralized environment accessor with safe fallbacks for browser builds
export const API_KEY: string = (() => {
  // Vite defines `process.env` at build time; in some runtimes window.process may be available
  try {
    // @ts-ignore
    const fromProcess = typeof process !== 'undefined' && (process.env?.GEMINI_API_KEY || process.env?.API_KEY);
    if (fromProcess) return String(fromProcess);
  } catch (e) {
    // ignore
  }

  try {
    // In HTML shim cases `window.process` may exist
    // @ts-ignore
    if (typeof window !== 'undefined' && (window.process?.env?.GEMINI_API_KEY || window.process?.env?.API_KEY)) {
      // @ts-ignore
      return String(window.process.env.GEMINI_API_KEY || window.process.env.API_KEY || '');
    }
  } catch (e) {
    // ignore
  }

  return '';
})();

export default API_KEY;
