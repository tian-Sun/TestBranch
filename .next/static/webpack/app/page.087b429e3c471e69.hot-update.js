/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/task-category/CategoryWheel.tsx":
/*!********************************************************!*\
  !*** ./src/components/task-category/CategoryWheel.tsx ***!
  \********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CategoryWheel: function() { return /* binding */ CategoryWheel; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_cn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/cn */ \"(app-pages-browser)/./src/utils/cn.ts\");\n/* harmony import */ var _utils_cn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_cn__WEBPACK_IMPORTED_MODULE_2__);\n\n\n // Assuming you have a cn utility for classnames\nfunction CategoryWheel(param) {\n    let { categories, onCategoryChange, onSelect, selectedId, editable } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"grid grid-cols-3 gap-4\",\n        children: categories.map((category)=>{\n            const isSelected = !editable && selectedId === category.id;\n            if (editable) {\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"aspect-square flex items-center justify-center p-2 rounded-lg bg-gray-100\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                        value: category.name,\n                        onChange: (e)=>onCategoryChange === null || onCategoryChange === void 0 ? void 0 : onCategoryChange(category.id, e.target.value),\n                        className: \"w-full h-full text-center bg-transparent focus:outline-none text-sm font-medium text-gray-700 resize-none flex items-center justify-center\",\n                        placeholder: \"未命名\",\n                        rows: 3\n                    }, void 0, false, {\n                        fileName: \"/Users/haotian/mini/code/TestBranch/src/components/task-category/CategoryWheel.tsx\",\n                        lineNumber: 28,\n                        columnNumber: 15\n                    }, this)\n                }, category.id, false, {\n                    fileName: \"/Users/haotian/mini/code/TestBranch/src/components/task-category/CategoryWheel.tsx\",\n                    lineNumber: 27,\n                    columnNumber: 13\n                }, this);\n            }\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: ()=>onSelect === null || onSelect === void 0 ? void 0 : onSelect(category),\n                disabled: !category.name,\n                className: (0,_utils_cn__WEBPACK_IMPORTED_MODULE_2__.cn)(\"aspect-square flex items-center justify-center p-2 rounded-lg transition-all duration-200\", \"text-sm font-medium text-center break-words\", !category.name && \"bg-gray-50 cursor-not-allowed\", category.name && \"bg-gray-100 hover:bg-indigo-100 hover:shadow-md\", isSelected && \"ring-2 ring-offset-2 ring-indigo-500 bg-indigo-100 text-indigo-800 shadow-lg\"),\n                children: category.name || \"空\"\n            }, category.id, false, {\n                fileName: \"/Users/haotian/mini/code/TestBranch/src/components/task-category/CategoryWheel.tsx\",\n                lineNumber: 40,\n                columnNumber: 13\n            }, this);\n        })\n    }, void 0, false, {\n        fileName: \"/Users/haotian/mini/code/TestBranch/src/components/task-category/CategoryWheel.tsx\",\n        lineNumber: 21,\n        columnNumber: 5\n    }, this);\n}\n_c = CategoryWheel;\nvar _c;\n$RefreshReg$(_c, \"CategoryWheel\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3Rhc2stY2F0ZWdvcnkvQ2F0ZWdvcnlXaGVlbC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUEwQjtBQUVVLENBQUMsZ0RBQWdEO0FBVTlFLFNBQVNFLGNBQWMsS0FNVDtRQU5TLEVBQzVCQyxVQUFVLEVBQ1ZDLGdCQUFnQixFQUNoQkMsUUFBUSxFQUNSQyxVQUFVLEVBQ1ZDLFFBQVEsRUFDVyxHQU5TO0lBTzVCLHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVO2tCQUNaTixXQUFXTyxHQUFHLENBQUNDLENBQUFBO1lBQ2QsTUFBTUMsYUFBYSxDQUFDTCxZQUFZRCxlQUFlSyxTQUFTRSxFQUFFO1lBRTFELElBQUlOLFVBQVU7Z0JBQ1oscUJBQ0UsOERBQUNDO29CQUFzQkMsV0FBVTs4QkFDL0IsNEVBQUNLO3dCQUNDQyxPQUFPSixTQUFTSyxJQUFJO3dCQUNwQkMsVUFBVSxDQUFDQyxJQUFNZCw2QkFBQUEsdUNBQUFBLGlCQUFtQk8sU0FBU0UsRUFBRSxFQUFFSyxFQUFFQyxNQUFNLENBQUNKLEtBQUs7d0JBQy9ETixXQUFVO3dCQUNWVyxhQUFZO3dCQUNaQyxNQUFNOzs7Ozs7bUJBTkFWLFNBQVNFLEVBQUU7Ozs7O1lBVXpCO1lBRUEscUJBQ0ksOERBQUNTO2dCQUVHQyxTQUFTLElBQU1sQixxQkFBQUEsK0JBQUFBLFNBQVdNO2dCQUMxQmEsVUFBVSxDQUFDYixTQUFTSyxJQUFJO2dCQUN4QlAsV0FBV1IsNkNBQUVBLENBQ1QsNkZBQ0EsK0NBQ0EsQ0FBQ1UsU0FBU0ssSUFBSSxJQUFJLGlDQUNsQkwsU0FBU0ssSUFBSSxJQUFJLG1EQUNqQkosY0FBYzswQkFHakJELFNBQVNLLElBQUksSUFBSTtlQVhiTCxTQUFTRSxFQUFFOzs7OztRQWM1Qjs7Ozs7O0FBR0o7S0E3Q2dCWCIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy90YXNrLWNhdGVnb3J5L0NhdGVnb3J5V2hlZWwudHN4PzZhNTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlQ2F0ZWdvcmllcyc7XG5pbXBvcnQgeyBjbiB9IGZyb20gJy4uLy4uL3V0aWxzL2NuJzsgLy8gQXNzdW1pbmcgeW91IGhhdmUgYSBjbiB1dGlsaXR5IGZvciBjbGFzc25hbWVzXG5cbmludGVyZmFjZSBDYXRlZ29yeVdoZWVsUHJvcHMge1xuICBjYXRlZ29yaWVzOiBDYXRlZ29yeVtdO1xuICBvbkNhdGVnb3J5Q2hhbmdlPzogKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TZWxlY3Q/OiAoY2F0ZWdvcnk6IENhdGVnb3J5KSA9PiB2b2lkO1xuICBzZWxlY3RlZElkPzogc3RyaW5nIHwgbnVsbDtcbiAgZWRpdGFibGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDYXRlZ29yeVdoZWVsKHsgXG4gIGNhdGVnb3JpZXMsIFxuICBvbkNhdGVnb3J5Q2hhbmdlLCBcbiAgb25TZWxlY3QsXG4gIHNlbGVjdGVkSWQsXG4gIGVkaXRhYmxlIFxufTogQ2F0ZWdvcnlXaGVlbFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0zIGdhcC00XCI+XG4gICAgICB7Y2F0ZWdvcmllcy5tYXAoY2F0ZWdvcnkgPT4ge1xuICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gIWVkaXRhYmxlICYmIHNlbGVjdGVkSWQgPT09IGNhdGVnb3J5LmlkO1xuXG4gICAgICAgIGlmIChlZGl0YWJsZSkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17Y2F0ZWdvcnkuaWR9IGNsYXNzTmFtZT1cImFzcGVjdC1zcXVhcmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0yIHJvdW5kZWQtbGcgYmctZ3JheS0xMDBcIj5cbiAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgdmFsdWU9e2NhdGVnb3J5Lm5hbWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNhdGVnb3J5Q2hhbmdlPy4oY2F0ZWdvcnkuaWQsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIHRleHQtY2VudGVyIGJnLXRyYW5zcGFyZW50IGZvY3VzOm91dGxpbmUtbm9uZSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgcmVzaXplLW5vbmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi5pyq5ZG95ZCNXCJcbiAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17Y2F0ZWdvcnkuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TZWxlY3Q/LihjYXRlZ29yeSl9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYXRlZ29yeS5uYW1lfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y24oXG4gICAgICAgICAgICAgICAgICAgIFwiYXNwZWN0LXNxdWFyZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTIgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDBcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtY2VudGVyIGJyZWFrLXdvcmRzXCIsXG4gICAgICAgICAgICAgICAgICAgICFjYXRlZ29yeS5uYW1lICYmIFwiYmctZ3JheS01MCBjdXJzb3Itbm90LWFsbG93ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkubmFtZSAmJiBcImJnLWdyYXktMTAwIGhvdmVyOmJnLWluZGlnby0xMDAgaG92ZXI6c2hhZG93LW1kXCIsXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgJiYgXCJyaW5nLTIgcmluZy1vZmZzZXQtMiByaW5nLWluZGlnby01MDAgYmctaW5kaWdvLTEwMCB0ZXh0LWluZGlnby04MDAgc2hhZG93LWxnXCJcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjYXRlZ29yeS5uYW1lIHx8ICfnqbonfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIClcbiAgICB9KX1cbiAgICA8L2Rpdj5cbiAgKTtcbn0gIl0sIm5hbWVzIjpbIlJlYWN0IiwiY24iLCJDYXRlZ29yeVdoZWVsIiwiY2F0ZWdvcmllcyIsIm9uQ2F0ZWdvcnlDaGFuZ2UiLCJvblNlbGVjdCIsInNlbGVjdGVkSWQiLCJlZGl0YWJsZSIsImRpdiIsImNsYXNzTmFtZSIsIm1hcCIsImNhdGVnb3J5IiwiaXNTZWxlY3RlZCIsImlkIiwidGV4dGFyZWEiLCJ2YWx1ZSIsIm5hbWUiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsInJvd3MiLCJidXR0b24iLCJvbkNsaWNrIiwiZGlzYWJsZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/task-category/CategoryWheel.tsx\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/utils/cn.ts":
/*!*************************!*\
  !*** ./src/utils/cn.ts ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});