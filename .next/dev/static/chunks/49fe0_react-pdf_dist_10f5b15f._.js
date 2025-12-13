(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/OutlineContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
'use client';
;
const outlineContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const __TURBOPACK__default__export__ = outlineContext;
}),
"[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Ref.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Ref
]);
class Ref {
    constructor({ num, gen }){
        this.num = num;
        this.gen = gen;
    }
    toString() {
        let str = `${this.num}R`;
        if (this.gen !== 0) {
            str += this.gen;
        }
        return str;
    }
}
}),
"[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useCachedValue.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useCachedValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/utils.js [app-client] (ecmascript)");
'use client';
;
;
function useCachedValue(getter) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const currentValue = ref.current;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefined"])(currentValue)) {
        return ()=>currentValue;
    }
    return ()=>{
        const value = getter();
        ref.current = value;
        return value;
    };
}
}),
"[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useOutlineContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useOutlineContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$OutlineContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/OutlineContext.js [app-client] (ecmascript)");
;
;
function useOutlineContext() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$OutlineContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
}
}),
"[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/OutlineItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OutlineItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tiny$2d$invariant$40$1$2e$3$2e$3$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tiny-invariant@1.3.3/node_modules/tiny-invariant/dist/esm/tiny-invariant.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Ref$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Ref.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useCachedValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useCachedValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useDocumentContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useDocumentContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useOutlineContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useOutlineContext.js [app-client] (ecmascript)");
;
;
;
;
;
;
function OutlineItem(props) {
    const documentContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useDocumentContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const outlineContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useOutlineContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tiny$2d$invariant$40$1$2e$3$2e$3$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(outlineContext, 'Unable to find Outline context.');
    const mergedProps = {
        ...documentContext,
        ...outlineContext,
        ...props
    };
    const { item, linkService, onItemClick, pdf, ...otherProps } = mergedProps;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tiny$2d$invariant$40$1$2e$3$2e$3$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(pdf, 'Attempted to load an outline, but no document was specified. Wrap <Outline /> in a <Document /> or pass explicit `pdf` prop.');
    const getDestination = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useCachedValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "OutlineItem.useCachedValue[getDestination]": ()=>{
            if (typeof item.dest === 'string') {
                return pdf.getDestination(item.dest);
            }
            return item.dest;
        }
    }["OutlineItem.useCachedValue[getDestination]"]);
    const getPageIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useCachedValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "OutlineItem.useCachedValue[getPageIndex]": async ()=>{
            const destination = await getDestination();
            if (!destination) {
                throw new Error('Destination not found.');
            }
            const [ref] = destination;
            return pdf.getPageIndex(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Ref$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](ref));
        }
    }["OutlineItem.useCachedValue[getPageIndex]"]);
    const getPageNumber = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useCachedValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "OutlineItem.useCachedValue[getPageNumber]": async ()=>{
            const pageIndex = await getPageIndex();
            return pageIndex + 1;
        }
    }["OutlineItem.useCachedValue[getPageNumber]"]);
    function onClick(event) {
        event.preventDefault();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tiny$2d$invariant$40$1$2e$3$2e$3$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(onItemClick || linkService, 'Either onItemClick callback or linkService must be defined in order to navigate to an outline item.');
        if (onItemClick) {
            Promise.all([
                getDestination(),
                getPageIndex(),
                getPageNumber()
            ]).then(([dest, pageIndex, pageNumber])=>{
                onItemClick({
                    dest,
                    pageIndex,
                    pageNumber
                });
            });
        } else if (linkService) {
            linkService.goToDestination(item.dest);
        }
    }
    function renderSubitems() {
        if (!item.items || !item.items.length) {
            return null;
        }
        const { items: subitems } = item;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ul", {
            children: subitems.map((subitem, subitemIndex)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(OutlineItem, {
                    item: subitem,
                    pdf: pdf,
                    ...otherProps
                }, typeof subitem.dest === 'string' ? subitem.dest : subitemIndex))
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("li", {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
                href: "#",
                onClick: onClick,
                children: item.title
            }),
            renderSubitems()
        ]
    });
}
}),
"[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Outline.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Outline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$make$2d$cancellable$2d$promise$40$2$2e$0$2e$0$2f$node_modules$2f$make$2d$cancellable$2d$promise$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/make-cancellable-promise@2.0.0/node_modules/make-cancellable-promise/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$make$2d$event$2d$props$40$2$2e$0$2e$0$2f$node_modules$2f$make$2d$event$2d$props$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/make-event-props@2.0.0/node_modules/make-event-props/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tiny$2d$invariant$40$1$2e$3$2e$3$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tiny-invariant@1.3.3/node_modules/tiny-invariant/dist/esm/tiny-invariant.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$warning$40$4$2e$0$2e$3$2f$node_modules$2f$warning$2f$warning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/warning@4.0.3/node_modules/warning/warning.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$OutlineContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/OutlineContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$OutlineItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/OutlineItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useDocumentContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useDocumentContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useResolver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useResolver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function Outline(props) {
    const documentContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useDocumentContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const mergedProps = {
        ...documentContext,
        ...props
    };
    const { className, inputRef, onItemClick, onLoadError: onLoadErrorProps, onLoadSuccess: onLoadSuccessProps, pdf, ...otherProps } = mergedProps;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tiny$2d$invariant$40$1$2e$3$2e$3$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(pdf, 'Attempted to load an outline, but no document was specified. Wrap <Outline /> in a <Document /> or pass explicit `pdf` prop.');
    const [outlineState, outlineDispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useResolver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const { value: outline, error: outlineError } = outlineState;
    /**
     * Called when an outline is read successfully
     */ function onLoadSuccess() {
        if (typeof outline === 'undefined' || outline === false) {
            return;
        }
        if (onLoadSuccessProps) {
            onLoadSuccessProps(outline);
        }
    }
    /**
     * Called when an outline failed to read successfully
     */ function onLoadError() {
        if (!outlineError) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$warning$40$4$2e$0$2e$3$2f$node_modules$2f$warning$2f$warning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(false, outlineError.toString());
        if (onLoadErrorProps) {
            onLoadErrorProps(outlineError);
        }
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect intentionally triggered on pdf change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(function resetOutline() {
        outlineDispatch({
            type: 'RESET'
        });
    }, [
        outlineDispatch,
        pdf
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(function loadOutline() {
        if (!pdf) {
            // Impossible, but TypeScript doesn't know that
            return;
        }
        const cancellable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$make$2d$cancellable$2d$promise$40$2$2e$0$2e$0$2f$node_modules$2f$make$2d$cancellable$2d$promise$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(pdf.getOutline());
        const runningTask = cancellable;
        cancellable.promise.then({
            "Outline.useEffect.loadOutline": (nextOutline)=>{
                outlineDispatch({
                    type: 'RESOLVE',
                    value: nextOutline
                });
            }
        }["Outline.useEffect.loadOutline"]).catch({
            "Outline.useEffect.loadOutline": (error)=>{
                outlineDispatch({
                    type: 'REJECT',
                    error
                });
            }
        }["Outline.useEffect.loadOutline"]);
        return ({
            "Outline.useEffect.loadOutline": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelRunningTask"])(runningTask)
        })["Outline.useEffect.loadOutline"];
    }, [
        outlineDispatch,
        pdf
    ]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: Omitted callbacks so they are not called every time they change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Outline.useEffect": ()=>{
            if (outline === undefined) {
                return;
            }
            if (outline === false) {
                onLoadError();
                return;
            }
            onLoadSuccess();
        }
    }["Outline.useEffect"], [
        outline
    ]);
    const childContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Outline.useMemo[childContext]": ()=>({
                onItemClick
            })
    }["Outline.useMemo[childContext]"], [
        onItemClick
    ]);
    const eventProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Outline.useMemo[eventProps]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$make$2d$event$2d$props$40$2$2e$0$2e$0$2f$node_modules$2f$make$2d$event$2d$props$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(otherProps, {
                "Outline.useMemo[eventProps]": ()=>outline
            }["Outline.useMemo[eventProps]"])
    }["Outline.useMemo[eventProps]"], // biome-ignore lint/correctness/useExhaustiveDependencies: FIXME
    [
        otherProps,
        outline
    ]);
    if (!outline) {
        return null;
    }
    function renderOutline() {
        if (!outline) {
            return null;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ul", {
            children: outline.map((item, itemIndex)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$OutlineItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    item: item,
                    pdf: pdf
                }, typeof item.dest === 'string' ? item.dest : itemIndex))
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('react-pdf__Outline', className),
        ref: inputRef,
        ...eventProps,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$OutlineContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Provider, {
            value: childContext,
            children: renderOutline()
        })
    });
}
}),
"[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Thumbnail.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Thumbnail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._59b2c4e49353e66c503ff99109bd4451/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tiny$2d$invariant$40$1$2e$3$2e$3$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tiny-invariant@1.3.3/node_modules/tiny-invariant/dist/esm/tiny-invariant.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Page.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useDocumentContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useDocumentContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/utils.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function Thumbnail(props) {
    const documentContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useDocumentContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const mergedProps = {
        ...documentContext,
        ...props
    };
    const { className, linkService, onItemClick, pageIndex: pageIndexProps, pageNumber: pageNumberProps, pdf } = mergedProps;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tiny$2d$invariant$40$1$2e$3$2e$3$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(pdf, 'Attempted to load a thumbnail, but no document was specified. Wrap <Thumbnail /> in a <Document /> or pass explicit `pdf` prop.');
    const pageIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isProvided"])(pageNumberProps) ? pageNumberProps - 1 : pageIndexProps !== null && pageIndexProps !== void 0 ? pageIndexProps : null;
    const pageNumber = pageNumberProps !== null && pageNumberProps !== void 0 ? pageNumberProps : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isProvided"])(pageIndexProps) ? pageIndexProps + 1 : null;
    function onClick(event) {
        event.preventDefault();
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isProvided"])(pageIndex) || !pageNumber) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tiny$2d$invariant$40$1$2e$3$2e$3$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(onItemClick || linkService, 'Either onItemClick callback or linkService must be defined in order to navigate to an outline item.');
        if (onItemClick) {
            onItemClick({
                pageIndex,
                pageNumber
            });
        } else if (linkService) {
            linkService.goToPage(pageNumber);
        }
    }
    const { className: classNameProps, onItemClick: onItemClickProps, ...pageProps } = props;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('react-pdf__Thumbnail', className),
        href: pageNumber ? '#' : undefined,
        onClick: onClick,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_59b2c4e49353e66c503ff99109bd4451$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            ...pageProps,
            _className: "react-pdf__Thumbnail__page",
            _enableRegisterUnregisterPage: false,
            renderAnnotationLayer: false,
            renderTextLayer: false
        })
    });
}
}),
"[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdfjs-dist@5.4.296/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Document.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Outline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Outline.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Page.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$PasswordResponses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/PasswordResponses.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Thumbnail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Thumbnail.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useDocumentContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useDocumentContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useOutlineContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useOutlineContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$usePageContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/usePageContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/utils.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["displayWorkerWarning"])();
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlobalWorkerOptions"].workerSrc = 'pdf.worker.mjs';
;
}),
"[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Document",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Outline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Outline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Page",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "PasswordResponses",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$PasswordResponses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Thumbnail",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Thumbnail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "pdfjs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    "useDocumentContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useDocumentContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "useOutlineContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useOutlineContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "usePageContext",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$usePageContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pdfjs$2d$dist$40$5$2e$4$2e$296$2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/pdfjs-dist@5.4.296/node_modules/pdfjs-dist/build/pdf.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Document$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Document.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Outline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Outline.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Page$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Page.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$PasswordResponses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/PasswordResponses.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$Thumbnail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/Thumbnail.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useDocumentContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useDocumentContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$useOutlineContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/useOutlineContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$pdf$40$10$2e$2$2e$0_$40$types$2b$rea_1e1f33a3307c4ead238fa08a3f15b507$2f$node_modules$2f$react$2d$pdf$2f$dist$2f$shared$2f$hooks$2f$usePageContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-pdf@10.2.0_@types+rea_1e1f33a3307c4ead238fa08a3f15b507/node_modules/react-pdf/dist/shared/hooks/usePageContext.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=49fe0_react-pdf_dist_10f5b15f._.js.map