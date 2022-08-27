"use strict";
exports.__esModule = true;
exports.objectParser = void 0;
var serialize_error_1 = require("serialize-error");
function objectParser(obj) {
    return JSON.parse(JSON.stringify((0, serialize_error_1.serializeError)(obj), function (key, value) { return key.match(/^_/gi) ? undefined : value; }));
}
exports.objectParser = objectParser;
