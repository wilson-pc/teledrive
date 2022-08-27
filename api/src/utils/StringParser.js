"use strict";
exports.__esModule = true;
exports.markdownSafe = void 0;
var markdownSafe = function (str) { return str
    .replaceAll('_', '\\_')
    .replaceAll('*', '\\*')
    .replaceAll('[', '\\[')
    .replaceAll('`', '\\`'); };
exports.markdownSafe = markdownSafe;
