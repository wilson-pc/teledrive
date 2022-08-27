"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthMaybe = exports.Auth = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var teledrive_client_1 = require("teledrive-client");
var Logger_1 = require("teledrive-client/extensions/Logger");
var sessions_1 = require("teledrive-client/sessions");
var model_1 = require("../../model");
var Cache_1 = require("../../service/Cache");
var Constant_1 = require("../../utils/Constant");
function Auth(req, _, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var authkey, data, session, _b, userAuth, user;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    authkey = (_a = (req.headers.authorization || req.cookies.authorization)) === null || _a === void 0 ? void 0 : _a.replace(/^Bearer\ /gi, '');
                    console.log(authkey);
                    if (!authkey) {
                        throw { status: 401, body: { error: 'Auth key is required' } };
                    }
                    try {
                        data = (0, jsonwebtoken_1.verify)(authkey, Constant_1.API_JWT_SECRET);
                    }
                    catch (error) {
                        throw { status: 401, body: { error: 'Access token is invalid' } };
                    }
                    try {
                        session = new sessions_1.StringSession(data.session);
                        req.tg = new teledrive_client_1.TelegramClient(session, Constant_1.TG_CREDS.apiId, Constant_1.TG_CREDS.apiHash, __assign({ connectionRetries: Constant_1.CONNECTION_RETRIES, useWSS: false }, process.env.ENV === 'production' ? { baseLogger: new teledrive_client_1.Logger(Logger_1.LogLevel.NONE) } : {}));
                    }
                    catch (error) {
                        throw { status: 401, body: { error: 'Invalid key' } };
                    }
                    return [4 /*yield*/, req.tg.connect()];
                case 1:
                    _c.sent();
                    req.authKey = authkey;
                    return [4 /*yield*/, Cache_1.Redis.connect().getFromCacheFirst("auth:".concat(authkey), function () { return __awaiter(_this, void 0, void 0, function () {
                            var userAuth, error_1, error_2, user;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 12]);
                                        return [4 /*yield*/, req.tg.getMe()];
                                    case 1:
                                        userAuth = _a.sent();
                                        return [3 /*break*/, 12];
                                    case 2:
                                        error_1 = _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        _a.trys.push([3, 7, , 11]);
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, req.tg.connect()];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, req.tg.getMe()];
                                    case 6:
                                        userAuth = _a.sent();
                                        return [3 /*break*/, 11];
                                    case 7:
                                        error_2 = _a.sent();
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                                    case 8:
                                        _a.sent();
                                        return [4 /*yield*/, req.tg.connect()];
                                    case 9:
                                        _a.sent();
                                        return [4 /*yield*/, req.tg.getMe()];
                                    case 10:
                                        userAuth = _a.sent();
                                        return [3 /*break*/, 11];
                                    case 11: return [3 /*break*/, 12];
                                    case 12: return [4 /*yield*/, model_1.prisma.users.findFirst({ where: { tg_id: userAuth['id'].toString() } })];
                                    case 13:
                                        user = _a.sent();
                                        if (!user) {
                                            throw { status: 401, body: { error: 'User not found' } };
                                        }
                                        return [2 /*return*/, [userAuth, user]];
                                }
                            });
                        }); }, 54000)];
                case 2:
                    _b = _c.sent(), userAuth = _b[0], user = _b[1];
                    req.user = user;
                    req.userAuth = userAuth;
                    return [2 /*return*/, next()];
            }
        });
    });
}
exports.Auth = Auth;
function AuthMaybe(req, _, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var authkey, data, session, _b, userAuth, user;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    authkey = (_a = (req.headers.authorization || req.cookies.authorization)) === null || _a === void 0 ? void 0 : _a.replace(/^Bearer\ /gi, '');
                    if (!authkey) return [3 /*break*/, 3];
                    data = void 0;
                    try {
                        data = (0, jsonwebtoken_1.verify)(authkey, Constant_1.API_JWT_SECRET);
                    }
                    catch (error) {
                        // throw { status: 401, body: { error: 'Access token is invalid' } }
                        return [2 /*return*/, next()];
                    }
                    try {
                        session = new sessions_1.StringSession(data.session);
                        req.tg = new teledrive_client_1.TelegramClient(session, Constant_1.TG_CREDS.apiId, Constant_1.TG_CREDS.apiHash, __assign({ connectionRetries: Constant_1.CONNECTION_RETRIES, useWSS: false }, process.env.ENV === 'production' ? { baseLogger: new teledrive_client_1.Logger(Logger_1.LogLevel.NONE) } : {}));
                    }
                    catch (error) {
                        // throw { status: 401, body: { error: 'Invalid key' } }
                        return [2 /*return*/, next()];
                    }
                    return [4 /*yield*/, req.tg.connect()];
                case 1:
                    _c.sent();
                    req.authKey = authkey;
                    return [4 /*yield*/, Cache_1.Redis.connect().getFromCacheFirst("auth:".concat(authkey), function () { return __awaiter(_this, void 0, void 0, function () {
                            var userAuth, error_3, error_4, user;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        userAuth = null;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 13]);
                                        return [4 /*yield*/, req.tg.getMe()];
                                    case 2:
                                        userAuth = _a.sent();
                                        return [3 /*break*/, 13];
                                    case 3:
                                        error_3 = _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        _a.trys.push([4, 8, , 12]);
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, req.tg.connect()];
                                    case 6:
                                        _a.sent();
                                        return [4 /*yield*/, req.tg.getMe()];
                                    case 7:
                                        userAuth = _a.sent();
                                        return [3 /*break*/, 12];
                                    case 8:
                                        error_4 = _a.sent();
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                                    case 9:
                                        _a.sent();
                                        return [4 /*yield*/, req.tg.connect()];
                                    case 10:
                                        _a.sent();
                                        return [4 /*yield*/, req.tg.getMe()];
                                    case 11:
                                        userAuth = _a.sent();
                                        return [3 /*break*/, 12];
                                    case 12: return [3 /*break*/, 13];
                                    case 13: return [4 /*yield*/, model_1.prisma.users.findFirst({ where: { tg_id: userAuth['id'].toString() } })];
                                    case 14:
                                        user = _a.sent();
                                        if (!user) {
                                            // throw { status: 401, body: { error: 'User not found' } }
                                            return [2 /*return*/, [userAuth, null]];
                                        }
                                        return [2 /*return*/, [userAuth, user]];
                                }
                            });
                        }); }, 54000)];
                case 2:
                    _b = _c.sent(), userAuth = _b[0], user = _b[1];
                    req.user = user;
                    req.userAuth = userAuth;
                    _c.label = 3;
                case 3: return [2 /*return*/, next()];
            }
        });
    });
}
exports.AuthMaybe = AuthMaybe;
