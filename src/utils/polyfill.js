

// console.log("POLYFILL RUNNING");
// if (typeof window === 'undefined') {
//     global.Buffer = global.Buffer || require('buffer').Buffer;
//     global.DOMMatrix = global.DOMMatrix || class DOMMatrix {
//         constructor() { this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0; }
//     };
//     global.Image = global.Image || class Image { };
//     global.HTMLCanvasElement = global.HTMLCanvasElement || class HTMLCanvasElement { };
//     global.ImageData = global.ImageData || class ImageData { };
//     global.performance = global.performance || require('perf_hooks').performance;
// } else if (!window.Buffer) {
//     window.Buffer = require('buffer').Buffer;
// }
