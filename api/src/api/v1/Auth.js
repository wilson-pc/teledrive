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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.Auth = void 0;
var crypto_js_1 = require("crypto-js");
var jsonwebtoken_1 = require("jsonwebtoken");
var serialize_error_1 = require("serialize-error");
var teledrive_client_1 = require("teledrive-client");
var Logger_1 = require("teledrive-client/extensions/Logger");
var Helpers_1 = require("teledrive-client/Helpers");
var Password_1 = require("teledrive-client/Password");
var sessions_1 = require("teledrive-client/sessions");
var model_1 = require("../../model");
var Cache_1 = require("../../service/Cache");
var Constant_1 = require("../../utils/Constant");
var Endpoint_1 = require("../base/Endpoint");
var TGClient_1 = require("../middlewares/TGClient");
var TGSessionAuth_1 = require("../middlewares/TGSessionAuth");
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.prototype.sendCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var phoneNumber, _a, phoneCodeHash, timeout, session, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        phoneNumber = req.body.phoneNumber;
                        if (!phoneNumber) {
                            throw { status: 400, body: { error: 'Phone number is required' } };
                        }
                        return [4 /*yield*/, req.tg.connect()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.auth.SendCode(__assign(__assign({}, Constant_1.TG_CREDS), { phoneNumber: phoneNumber, settings: new teledrive_client_1.Api.CodeSettings({
                                    allowFlashcall: true,
                                    currentNumber: true,
                                    allowAppHash: true
                                }) })))];
                    case 2:
                        _a = _b.sent(), phoneCodeHash = _a.phoneCodeHash, timeout = _a.timeout;
                        session = req.tg.session.save();
                        accessToken = (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '3h' });
                        return [2 /*return*/, res.cookie('authorization', "Bearer ".concat(accessToken))
                                .send({ phoneCodeHash: phoneCodeHash, timeout: timeout, accessToken: accessToken })];
                }
            });
        });
    };
    Auth.prototype.reSendCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, phoneNumber, phoneCodeHash, _b, newPhoneCodeHash, timeout, session, accessToken;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, phoneNumber = _a.phoneNumber, phoneCodeHash = _a.phoneCodeHash;
                        if (!phoneNumber || !phoneCodeHash) {
                            throw { status: 400, body: { error: 'Phone number and phone code hash are required' } };
                        }
                        return [4 /*yield*/, req.tg.connect()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.auth.ResendCode({
                                phoneNumber: phoneNumber,
                                phoneCodeHash: phoneCodeHash
                            }))];
                    case 2:
                        _b = _c.sent(), newPhoneCodeHash = _b.phoneCodeHash, timeout = _b.timeout;
                        session = req.tg.session.save();
                        accessToken = (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '3h' });
                        return [2 /*return*/, res.cookie('authorization', "Bearer ".concat(accessToken))
                                .send({ phoneCodeHash: newPhoneCodeHash, timeout: timeout, accessToken: accessToken })];
                }
            });
        });
    };
    Auth.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, phoneNumber, phoneCode, phoneCodeHash, password, invitationCode, signIn, data, _b, _c, _d, _e, userAuth, user, config, username, session, auth;
            var _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = req.body, phoneNumber = _a.phoneNumber, phoneCode = _a.phoneCode, phoneCodeHash = _a.phoneCodeHash, password = _a.password, invitationCode = _a.invitationCode;
                        if ((!phoneNumber || !phoneCode || !phoneCodeHash) && !password) {
                            if (!password) {
                                throw { status: 400, body: { error: 'Password is required' } };
                            }
                            throw { status: 400, body: { error: 'Phone number, phone code, and phone code hash are required' } };
                        }
                        return [4 /*yield*/, req.tg.connect()];
                    case 1:
                        _g.sent();
                        if (!password) return [3 /*break*/, 5];
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.account.GetPassword())];
                    case 2:
                        data = _g.sent();
                        data.newAlgo['salt1'] = Buffer.concat([data.newAlgo['salt1'], (0, Helpers_1.generateRandomBytes)(32)]);
                        _c = (_b = req.tg).invoke;
                        _e = (_d = teledrive_client_1.Api.auth.CheckPassword).bind;
                        _f = {};
                        return [4 /*yield*/, (0, Password_1.computeCheck)(data, password)];
                    case 3: return [4 /*yield*/, _c.apply(_b, [new (_e.apply(_d, [void 0, (_f.password = _g.sent(), _f)]))()])];
                    case 4:
                        signIn = _g.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.auth.SignIn({ phoneNumber: phoneNumber, phoneCode: phoneCode, phoneCodeHash: phoneCodeHash }))];
                    case 6:
                        signIn = _g.sent();
                        _g.label = 7;
                    case 7:
                        userAuth = signIn['user'];
                        if (!userAuth) {
                            throw { status: 400, body: { error: 'User not found/authorized' } };
                        }
                        return [4 /*yield*/, model_1.prisma.users.findFirst({ where: { tg_id: userAuth.id.toString() } })];
                    case 8:
                        user = _g.sent();
                        return [4 /*yield*/, model_1.prisma.config.findFirst()];
                    case 9:
                        config = _g.sent();
                        username = userAuth.username || userAuth.phone || phoneNumber;
                        if (!!user) return [3 /*break*/, 11];
                        if (config === null || config === void 0 ? void 0 : config.disable_signup) {
                            throw { status: 403, body: { error: 'Signup is disabled' } };
                        }
                        if ((config === null || config === void 0 ? void 0 : config.invitation_code) && (config === null || config === void 0 ? void 0 : config.invitation_code) !== invitationCode) {
                            throw { status: 403, body: { error: 'Invalid invitation code' } };
                        }
                        return [4 /*yield*/, model_1.prisma.users.create({
                                data: {
                                    username: username,
                                    plan: 'premium',
                                    name: "".concat(userAuth.firstName || '', " ").concat(userAuth.lastName || '').trim() || username,
                                    tg_id: userAuth.id.toString()
                                }
                            })];
                    case 10:
                        user = _g.sent();
                        _g.label = 11;
                    case 11: return [4 /*yield*/, model_1.prisma.users.update({
                            data: {
                                username: username,
                                plan: 'premium'
                            },
                            where: { id: user.id }
                        })];
                    case 12:
                        _g.sent();
                        session = req.tg.session.save();
                        auth = {
                            session: session,
                            accessToken: (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '15h' }),
                            refreshToken: (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '1y' }),
                            expiredAfter: Date.now() + Constant_1.COOKIE_AGE
                        };
                        res
                            .cookie('authorization', "Bearer ".concat(auth.accessToken), { maxAge: Constant_1.COOKIE_AGE, expires: new Date(auth.expiredAfter) })
                            .cookie('refreshToken', auth.refreshToken, { maxAge: 3.154e+10, expires: new Date(Date.now() + 3.154e+10) })
                            .send(__assign({ user: user }, auth));
                        // sync all shared files in background, if any
                        model_1.prisma.files.findMany({
                            where: {
                                AND: [
                                    { user_id: user.id },
                                    {
                                        NOT: { signed_key: null }
                                    }
                                ]
                            }
                        }).then(function (files) { return files === null || files === void 0 ? void 0 : files.map(function (file) {
                            var signedKey = crypto_js_1.AES.encrypt(JSON.stringify({ file: { id: file.id }, session: req.tg.session.save() }), Constant_1.FILES_JWT_SECRET).toString();
                            model_1.prisma.files.update({
                                data: { signed_key: signedKey },
                                where: { id: file.id }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.refreshToken = function (req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, data, session, userAuth, user, session, auth, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        refreshToken = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.refreshToken) || ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken);
                        if (!refreshToken) {
                            throw { status: 400, body: { error: 'Refresh token is required' } };
                        }
                        try {
                            data = (0, jsonwebtoken_1.verify)(refreshToken, Constant_1.API_JWT_SECRET);
                        }
                        catch (error) {
                            throw { status: 400, body: { error: 'Refresh token is invalid' } };
                        }
                        try {
                            session = new sessions_1.StringSession(data.session);
                            req.tg = new teledrive_client_1.TelegramClient(session, Constant_1.TG_CREDS.apiId, Constant_1.TG_CREDS.apiHash, __assign({ connectionRetries: Constant_1.CONNECTION_RETRIES, useWSS: false }, process.env.ENV === 'production' ? { baseLogger: new teledrive_client_1.Logger(Logger_1.LogLevel.NONE) } : {}));
                        }
                        catch (error) {
                            throw { status: 400, body: { error: 'Invalid key' } };
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, req.tg.connect()];
                    case 2:
                        _e.sent();
                        return [4 /*yield*/, req.tg.getMe()];
                    case 3:
                        userAuth = _e.sent();
                        return [4 /*yield*/, model_1.prisma.users.findFirst({ where: { tg_id: userAuth['id'].toString() } })];
                    case 4:
                        user = _e.sent();
                        if (!user) {
                            throw { status: 404, body: { error: 'User not found' } };
                        }
                        return [4 /*yield*/, model_1.prisma.users.update({
                                data: {
                                    username: ((_c = req.userAuth) === null || _c === void 0 ? void 0 : _c.username) || ((_d = req.userAuth) === null || _d === void 0 ? void 0 : _d.phone) || user.username,
                                    plan: 'premium'
                                },
                                where: { id: user.id }
                            })];
                    case 5:
                        _e.sent();
                        session = req.tg.session.save();
                        auth = {
                            session: session,
                            accessToken: (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '15h' }),
                            refreshToken: (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '100y' }),
                            expiredAfter: Date.now() + Constant_1.COOKIE_AGE
                        };
                        return [2 /*return*/, res
                                .cookie('authorization', "Bearer ".concat(auth.accessToken), { maxAge: Constant_1.COOKIE_AGE, expires: new Date(auth.expiredAfter) })
                                .cookie('refreshToken', auth.refreshToken, { maxAge: 3.154e+10, expires: new Date(Date.now() + 3.154e+10) })
                                .send(__assign({ user: user }, auth))];
                    case 6:
                        error_1 = _e.sent();
                        throw { status: 400, body: { error: error_1.message || 'Something error', details: (0, serialize_error_1.serializeError)(error_1) } };
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Initialize export login token to be a param for URL tg://login?token={{token}}
     * @param req
     * @param res
     * @returns
     */
    Auth.prototype.qrCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, session, auth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.tg.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.auth.ExportLoginToken(__assign(__assign({}, Constant_1.TG_CREDS), { exceptIds: [] })))];
                    case 2:
                        data = _a.sent();
                        session = req.tg.session.save();
                        auth = {
                            session: session,
                            accessToken: (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '15h' }),
                            refreshToken: (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '100y' }),
                            expiredAfter: Date.now() + Constant_1.COOKIE_AGE
                        };
                        return [2 /*return*/, res
                                .cookie('authorization', "Bearer ".concat(auth.accessToken), { maxAge: Constant_1.COOKIE_AGE, expires: new Date(auth.expiredAfter) })
                                .cookie('refreshToken', auth.refreshToken, { maxAge: 3.154e+10, expires: new Date(Date.now() + 3.154e+10) })
                                .send({ loginToken: Buffer.from(data['token'], 'utf8').toString('base64url'), accessToken: auth.accessToken })];
                }
            });
        });
    };
    /**
     * Sign in process with QR Code https://core.telegram.org/api/qr-login
     * @param req
     * @param res
     * @returns
     */
    Auth.prototype.qrCodeSignIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, sessionString, invitationCode, passwordData, signIn, _b, _c, _d, _e, userAuth, user, config, username, session, auth, data, buildResponse, result, userAuth, user, config, username, userAuth, user, config, username, error_2;
            var _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = req.body, password = _a.password, sessionString = _a.session, invitationCode = _a.invitationCode;
                        if (!(password && sessionString)) return [3 /*break*/, 10];
                        req.tg = new teledrive_client_1.TelegramClient(new sessions_1.StringSession(sessionString), Constant_1.TG_CREDS.apiId, Constant_1.TG_CREDS.apiHash, __assign({ connectionRetries: Constant_1.CONNECTION_RETRIES, useWSS: false }, process.env.ENV === 'production' ? { baseLogger: new teledrive_client_1.Logger(Logger_1.LogLevel.NONE) } : {}));
                        return [4 /*yield*/, req.tg.connect()];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.account.GetPassword())];
                    case 2:
                        passwordData = _g.sent();
                        passwordData.newAlgo['salt1'] = Buffer.concat([passwordData.newAlgo['salt1'], (0, Helpers_1.generateRandomBytes)(32)]);
                        _c = (_b = req.tg).invoke;
                        _e = (_d = teledrive_client_1.Api.auth.CheckPassword).bind;
                        _f = {};
                        return [4 /*yield*/, (0, Password_1.computeCheck)(passwordData, password)];
                    case 3: return [4 /*yield*/, _c.apply(_b, [new (_e.apply(_d, [void 0, (_f.password = _g.sent(),
                                    _f)]))()])];
                    case 4:
                        signIn = _g.sent();
                        userAuth = signIn['user'];
                        if (!userAuth) {
                            throw { status: 400, body: { error: 'User not found/authorized' } };
                        }
                        return [4 /*yield*/, model_1.prisma.users.findFirst({ where: { tg_id: userAuth.id.toString() } })];
                    case 5:
                        user = _g.sent();
                        return [4 /*yield*/, model_1.prisma.config.findFirst()];
                    case 6:
                        config = _g.sent();
                        if (!!user) return [3 /*break*/, 8];
                        if (config === null || config === void 0 ? void 0 : config.disable_signup) {
                            throw { status: 403, body: { error: 'Signup is disabled' } };
                        }
                        if ((config === null || config === void 0 ? void 0 : config.invitation_code) && (config === null || config === void 0 ? void 0 : config.invitation_code) !== invitationCode) {
                            throw { status: 403, body: { error: 'Invalid invitation code' } };
                        }
                        username = userAuth.username || userAuth.phone;
                        return [4 /*yield*/, model_1.prisma.users.create({
                                data: {
                                    username: username,
                                    plan: 'premium',
                                    name: "".concat(userAuth.firstName || '', " ").concat(userAuth.lastName || '').trim() || username,
                                    tg_id: userAuth.id.toString()
                                }
                            })];
                    case 7:
                        user = _g.sent();
                        _g.label = 8;
                    case 8: return [4 /*yield*/, model_1.prisma.users.update({
                            data: {
                                username: userAuth.username || userAuth.phone,
                                plan: 'premium'
                            },
                            where: { id: user.id }
                        })];
                    case 9:
                        _g.sent();
                        session = req.tg.session.save();
                        auth = {
                            session: session,
                            accessToken: (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '15h' }),
                            refreshToken: (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '1y' }),
                            expiredAfter: Date.now() + Constant_1.COOKIE_AGE
                        };
                        res
                            .cookie('authorization', "Bearer ".concat(auth.accessToken), { maxAge: Constant_1.COOKIE_AGE, expires: new Date(auth.expiredAfter) })
                            .cookie('refreshToken', auth.refreshToken, { maxAge: 3.154e+10, expires: new Date(Date.now() + 3.154e+10) })
                            .send(__assign({ user: user }, auth));
                        // sync all shared files in background, if any
                        model_1.prisma.files.findMany({
                            where: {
                                AND: [
                                    { user_id: user.id },
                                    {
                                        NOT: { signed_key: null }
                                    }
                                ]
                            }
                        }).then(function (files) { return files === null || files === void 0 ? void 0 : files.map(function (file) {
                            var signedKey = crypto_js_1.AES.encrypt(JSON.stringify({ file: { id: file.id }, session: req.tg.session.save() }), Constant_1.FILES_JWT_SECRET).toString();
                            model_1.prisma.files.update({
                                data: { signed_key: signedKey },
                                where: { id: file.id }
                            });
                        }); });
                        return [2 /*return*/];
                    case 10: 
                    // handle the second call for export login token, result case: success, need to migrate to other dc, or 2fa
                    return [4 /*yield*/, req.tg.connect()];
                    case 11:
                        // handle the second call for export login token, result case: success, need to migrate to other dc, or 2fa
                        _g.sent();
                        _g.label = 12;
                    case 12:
                        _g.trys.push([12, 29, , 30]);
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.auth.ExportLoginToken(__assign(__assign({}, Constant_1.TG_CREDS), { exceptIds: [] })))
                            // build response with user data and auth data
                        ];
                    case 13:
                        data = _g.sent();
                        buildResponse = function (data) {
                            var _a;
                            var session = req.tg.session.save();
                            var auth = {
                                session: session,
                                accessToken: (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '15h' }),
                                refreshToken: (0, jsonwebtoken_1.sign)({ session: session }, Constant_1.API_JWT_SECRET, { expiresIn: '1y' }),
                                expiredAfter: Date.now() + Constant_1.COOKIE_AGE
                            };
                            res
                                .cookie('authorization', "Bearer ".concat(auth.accessToken), { maxAge: Constant_1.COOKIE_AGE, expires: new Date(auth.expiredAfter) })
                                .cookie('refreshToken', auth.refreshToken, { maxAge: 3.154e+10, expires: new Date(Date.now() + 3.154e+10) })
                                .send(__assign(__assign({}, data), auth));
                            if ((_a = data.user) === null || _a === void 0 ? void 0 : _a.id) {
                                // sync all shared files in background, if any
                                model_1.prisma.files.findMany({
                                    where: {
                                        AND: [
                                            { user_id: data.user.id },
                                            {
                                                NOT: { signed_key: null }
                                            }
                                        ]
                                    }
                                }).then(function (files) { return files === null || files === void 0 ? void 0 : files.map(function (file) {
                                    var signedKey = crypto_js_1.AES.encrypt(JSON.stringify({ file: { id: file.id }, session: req.tg.session.save() }), Constant_1.FILES_JWT_SECRET).toString();
                                    model_1.prisma.files.update({
                                        data: { signed_key: signedKey },
                                        where: { id: file.id }
                                    });
                                }); });
                            }
                            return;
                        };
                        if (!(data instanceof teledrive_client_1.Api.auth.LoginTokenMigrateTo)) return [3 /*break*/, 22];
                        return [4 /*yield*/, req.tg._switchDC(data.dcId)];
                    case 14:
                        _g.sent();
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.auth.ImportLoginToken({
                                token: data.token
                            }))
                            // result import login token success
                        ];
                    case 15:
                        result = _g.sent();
                        if (!(result instanceof teledrive_client_1.Api.auth.LoginTokenSuccess && result.authorization instanceof teledrive_client_1.Api.auth.Authorization)) return [3 /*break*/, 21];
                        userAuth = result.authorization.user;
                        return [4 /*yield*/, model_1.prisma.users.findFirst({ where: { tg_id: userAuth.id.toString() } })];
                    case 16:
                        user = _g.sent();
                        return [4 /*yield*/, model_1.prisma.config.findFirst()];
                    case 17:
                        config = _g.sent();
                        if (!!user) return [3 /*break*/, 19];
                        if (config === null || config === void 0 ? void 0 : config.disable_signup) {
                            throw { status: 403, body: { error: 'Signup is disabled' } };
                        }
                        if ((config === null || config === void 0 ? void 0 : config.invitation_code) && (config === null || config === void 0 ? void 0 : config.invitation_code) !== invitationCode) {
                            throw { status: 403, body: { error: 'Invalid invitation code' } };
                        }
                        username = userAuth['username'] || userAuth['phone'];
                        return [4 /*yield*/, model_1.prisma.users.create({
                                data: {
                                    username: username,
                                    plan: 'premium',
                                    name: "".concat(userAuth['firstName'] || '', " ").concat(userAuth['lastName'] || '').trim() || username,
                                    tg_id: userAuth.id.toString()
                                }
                            })];
                    case 18:
                        user = _g.sent();
                        _g.label = 19;
                    case 19: return [4 /*yield*/, model_1.prisma.users.update({
                            data: {
                                username: userAuth['username'] || userAuth['phone'],
                                plan: 'premium'
                            },
                            where: { id: user.id }
                        })];
                    case 20:
                        _g.sent();
                        return [2 /*return*/, buildResponse({ user: user })];
                    case 21: return [2 /*return*/, buildResponse({ data: data, result: result })
                        // handle if success
                    ];
                    case 22:
                        if (!(data instanceof teledrive_client_1.Api.auth.LoginTokenSuccess && data.authorization instanceof teledrive_client_1.Api.auth.Authorization)) return [3 /*break*/, 28];
                        userAuth = data.authorization.user;
                        return [4 /*yield*/, model_1.prisma.users.findFirst({ where: { tg_id: userAuth.id.toString() } })];
                    case 23:
                        user = _g.sent();
                        return [4 /*yield*/, model_1.prisma.config.findFirst()];
                    case 24:
                        config = _g.sent();
                        if (!!user) return [3 /*break*/, 26];
                        if (config === null || config === void 0 ? void 0 : config.disable_signup) {
                            throw { status: 403, body: { error: 'Signup is disabled' } };
                        }
                        if ((config === null || config === void 0 ? void 0 : config.invitation_code) && (config === null || config === void 0 ? void 0 : config.invitation_code) !== invitationCode) {
                            throw { status: 403, body: { error: 'Invalid invitation code' } };
                        }
                        username = userAuth['username'] || userAuth['phone'];
                        return [4 /*yield*/, model_1.prisma.users.create({
                                data: {
                                    username: username,
                                    plan: 'premium',
                                    name: "".concat(userAuth['firstName'] || '', " ").concat(userAuth['lastName'] || '').trim() || username,
                                    tg_id: userAuth.id.toString()
                                }
                            })];
                    case 25:
                        user = _g.sent();
                        _g.label = 26;
                    case 26: return [4 /*yield*/, model_1.prisma.users.update({
                            data: {
                                username: userAuth['username'] || userAuth['phone'],
                                plan: 'premium'
                            },
                            where: { id: user.id }
                        })];
                    case 27:
                        _g.sent();
                        return [2 /*return*/, buildResponse({ user: user })];
                    case 28: 
                    // data instanceof auth.LoginToken
                    return [2 /*return*/, buildResponse({
                            loginToken: Buffer.from(data['token'], 'utf8').toString('base64url')
                        })];
                    case 29:
                        error_2 = _g.sent();
                        // handle if need 2fa password
                        if (error_2.errorMessage === 'SESSION_PASSWORD_NEEDED') {
                            error_2.session = req.tg.session.save();
                        }
                        throw error_2;
                    case 30: return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.me = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.tg.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, req.tg.getMe()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, res.send({ user: data })];
                }
            });
        });
    };
    Auth.prototype.logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var success, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req.tg.connect()];
                    case 1:
                        _b.sent();
                        if (!(req.query.destroySession === '1')) return [3 /*break*/, 3];
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.auth.LogOut())];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = true;
                        _b.label = 4;
                    case 4:
                        success = _a;
                        return [4 /*yield*/, Cache_1.Redis.connect().del("auth:".concat(req.authKey))];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, res.clearCookie('authorization').clearCookie('refreshToken').send({ success: success })];
                }
            });
        });
    };
    __decorate([
        Endpoint_1.Endpoint.POST({ middlewares: [TGClient_1.TGClient] })
    ], Auth.prototype, "sendCode");
    __decorate([
        Endpoint_1.Endpoint.POST({ middlewares: [TGSessionAuth_1.TGSessionAuth] })
    ], Auth.prototype, "reSendCode");
    __decorate([
        Endpoint_1.Endpoint.POST({ middlewares: [TGSessionAuth_1.TGSessionAuth] })
    ], Auth.prototype, "login");
    __decorate([
        Endpoint_1.Endpoint.POST()
    ], Auth.prototype, "refreshToken");
    __decorate([
        Endpoint_1.Endpoint.GET({ middlewares: [TGClient_1.TGClient] })
    ], Auth.prototype, "qrCode");
    __decorate([
        Endpoint_1.Endpoint.POST({ middlewares: [TGSessionAuth_1.TGSessionAuth] })
    ], Auth.prototype, "qrCodeSignIn");
    __decorate([
        Endpoint_1.Endpoint.GET({ middlewares: [TGSessionAuth_1.TGSessionAuth] })
    ], Auth.prototype, "me");
    __decorate([
        Endpoint_1.Endpoint.POST({ middlewares: [TGSessionAuth_1.TGSessionAuth] })
    ], Auth.prototype, "logout");
    Auth = __decorate([
        Endpoint_1.Endpoint.API()
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
