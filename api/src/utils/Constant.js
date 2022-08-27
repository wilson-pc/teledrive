"use strict";
var _a;
exports.__esModule = true;
exports.FILES_JWT_SECRET = exports.API_JWT_SECRET = exports.CACHE_FILES_LIMIT = exports.PROCESS_RETRY = exports.CONNECTION_RETRIES = exports.COOKIE_AGE = exports.TG_CREDS = void 0;
var crypto_1 = require("crypto");
var fs_1 = require("fs");
var human_format_1 = require("human-format");
exports.TG_CREDS = {
    apiId: Number(process.env.TG_API_ID),
    apiHash: process.env.TG_API_HASH
};
// export const COOKIE_AGE = 3.154e+12
exports.COOKIE_AGE = 54e6;
exports.CONNECTION_RETRIES = 10;
exports.PROCESS_RETRY = 50;
exports.CACHE_FILES_LIMIT = (0, human_format_1.parse)(process.env.CACHE_FILES_LIMIT || '20GB');
// generate random secret keys
var keys = (0, fs_1.existsSync)("".concat(__dirname, "/../../keys")) ? (0, fs_1.readFileSync)("".concat(__dirname, "/../../keys"), 'utf-8') : null;
var _b = ((_a = keys === null || keys === void 0 ? void 0 : keys.toString()) === null || _a === void 0 ? void 0 : _a.split('\n')) || [
    (0, crypto_1.randomBytes)(48).toString('base64'),
    (0, crypto_1.randomBytes)(48).toString('base64')
], apiSecret = _b[0], filesSecret = _b[1];
if (!process.env.API_JWT_SECRET) {
    process.env.API_JWT_SECRET = apiSecret;
    (0, fs_1.writeFileSync)("".concat(__dirname, "/../../keys"), process.env.API_JWT_SECRET);
}
if (!process.env.FILES_JWT_SECRET) {
    process.env.FILES_JWT_SECRET = filesSecret;
    (0, fs_1.appendFileSync)("".concat(__dirname, "/../../keys"), "\n".concat(process.env.FILES_JWT_SECRET));
}
exports.API_JWT_SECRET = process.env.API_JWT_SECRET;
exports.FILES_JWT_SECRET = process.env.FILES_JWT_SECRET;
