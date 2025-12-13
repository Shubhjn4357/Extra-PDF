module.exports = [
"[project]/src/utils/polyfill.js [instrumentation] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/src_utils_polyfill_f124dc2e.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/utils/polyfill.js [instrumentation] (ecmascript)");
    });
});
}),
];