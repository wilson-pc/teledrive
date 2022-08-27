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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Users = void 0;
var axios_1 = require("axios");
var moment_1 = require("moment");
var teledrive_client_1 = require("teledrive-client");
var model_1 = require("../../model");
var Cache_1 = require("../../service/Cache");
var FilterQuery_1 = require("../../utils/FilterQuery");
var StringParser_1 = require("../../utils/StringParser");
var Endpoint_1 = require("../base/Endpoint");
var Auth_1 = require("../middlewares/Auth");
var Users = /** @class */ (function () {
    function Users() {
    }
    Users.prototype.search = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, limit, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, username = _a.username, limit = _a.limit;
                        if (!username) {
                            throw { status: 400, body: { error: 'Username is required' } };
                        }
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.contacts.Search({
                                q: username,
                                limit: Number(limit) || 10
                            }))];
                    case 1:
                        data = _b.sent();
                        return [2 /*return*/, res.send({ users: data.users })];
                }
            });
        });
    };
    Users.prototype.usage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.prisma.usages.findUnique({ where: { key: req.user ? "u:".concat(req.user.id) : "ip:".concat(req.headers['cf-connecting-ip'] || req.ip) } })];
                    case 1:
                        usage = _a.sent();
                        if (!!usage) return [3 /*break*/, 3];
                        return [4 /*yield*/, model_1.prisma.usages.create({
                                data: {
                                    key: req.user ? "u:".concat(req.user.id) : "ip:".concat(req.headers['cf-connecting-ip'] || req.ip),
                                    usage: 0,
                                    expire: (0, moment_1["default"])().add(1, 'day').toDate()
                                }
                            })];
                    case 2:
                        usage = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(new Date().getTime() - new Date(usage.expire).getTime() > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, model_1.prisma.usages.update({
                                where: { key: usage.key },
                                data: {
                                    expire: (0, moment_1["default"])().add(1, 'day').toDate(),
                                    usage: 0
                                }
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, res.send({ usage: usage })];
                }
            });
        });
    };
    Users.prototype.find = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sort, offset, limit, search, filters, where, _b, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = req.query, sort = _a.sort, offset = _a.offset, limit = _a.limit, search = _a.search, filters = __rest(_a, ["sort", "offset", "limit", "search"]);
                        where = __assign({}, search ? {
                            OR: [
                                { username: { contains: search } },
                                { name: { contains: search } },
                            ]
                        } : filters);
                        _c = (_b = res).send;
                        _d = {};
                        return [4 /*yield*/, model_1.prisma.users.findMany({
                                where: where,
                                select: req.user.role === 'admin' ? {
                                    id: true,
                                    username: true,
                                    name: true,
                                    role: true,
                                    created_at: true
                                } : { username: true },
                                skip: Number(offset) || undefined,
                                take: Number(limit) || undefined,
                                orderBy: (0, FilterQuery_1.buildSort)(sort)
                            })];
                    case 1:
                        _d.users = _e.sent();
                        return [4 /*yield*/, model_1.prisma.users.count({ where: where })];
                    case 2: return [2 /*return*/, _c.apply(_b, [(_d.length = _e.sent(), _d)])];
                }
            });
        });
    };
    Users.prototype.settings = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var settings;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        settings = req.body.settings;
                        // if (settings.theme === 'dark' && (!req.user.plan || req.user.plan === 'free') && moment().format('l') !== '2/2/2022') {
                        //   throw { status: 402, body: { error: 'You need to upgrade your plan to use dark theme' } }
                        // }
                        // if (settings.saved_location && (!req.user.plan || req.user.plan === 'free') && moment().format('l') !== '2/2/2022') {
                        //   throw { status: 402, body: { error: 'You need to upgrade your plan to use this feature' } }
                        // }
                        req.user.settings = __assign(__assign({}, req.user.settings || {}), settings);
                        return [4 /*yield*/, model_1.prisma.users.update({
                                where: { id: req.user.id },
                                data: req.user
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Cache_1.Redis.connect().del("auth:".concat(req.authKey))];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.send({ settings: (_a = req.user) === null || _a === void 0 ? void 0 : _a.settings })];
                }
            });
        });
    };
    Users.prototype.remove = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, reason, agreement, success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, reason = _a.reason, agreement = _a.agreement;
                        if (agreement !== 'permanently removed') {
                            throw { status: 400, body: { error: 'Invalid agreement' } };
                        }
                        if (!(reason && process.env.TG_BOT_TOKEN && process.env.TG_BOT_OWNER_ID)) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1["default"].post("https://api.telegram.org/bot".concat(process.env.TG_BOT_TOKEN, "/sendMessage"), {
                                chat_id: process.env.TG_BOT_OWNER_ID,
                                parse_mode: 'Markdown',
                                text: "\uD83D\uDE2D ".concat((0, StringParser_1.markdownSafe)(req.user.name), " (@").concat((0, StringParser_1.markdownSafe)(req.user.username), ") removed their account.\n\nReason: ").concat((0, StringParser_1.markdownSafe)(reason), "\n\nfrom: `").concat((0, StringParser_1.markdownSafe)(req.headers['cf-connecting-ip'] || req.ip), "`\ndomain: `").concat(req.headers['authority'] || req.headers.origin, "`").concat(req.user ? "\nplan: ".concat(req.user.plan) : '')
                            })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, model_1.prisma.files.deleteMany({
                            where: { user_id: req.user.id }
                        })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, model_1.prisma.users["delete"]({ where: { id: req.user.id } })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.auth.LogOut())];
                    case 5:
                        success = _b.sent();
                        return [2 /*return*/, res.clearCookie('authorization').clearCookie('refreshToken').send({ success: success })];
                }
            });
        });
    };
    Users.prototype.retrieve = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, param, file, user, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.params, username = _a.username, param = _a.param;
                        if (!(param === 'photo')) return [3 /*break*/, 2];
                        return [4 /*yield*/, req.tg.downloadProfilePhoto(username, { isBig: false })];
                    case 1:
                        file = _c.sent();
                        if (!(file === null || file === void 0 ? void 0 : file.length)) {
                            return [2 /*return*/, res.redirect('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')];
                        }
                        res.setHeader('Cache-Control', 'public, max-age=604800');
                        res.setHeader('ETag', Buffer.from(file).toString('base64').slice(10, 50));
                        res.setHeader('Content-Disposition', "inline; filename=".concat(username === 'me' ? req.user.username : username, ".jpg"));
                        res.setHeader('Content-Type', 'image/jpeg');
                        res.setHeader('Content-Length', file.length);
                        res.write(file);
                        return [2 /*return*/, res.end()];
                    case 2:
                        if (!(username === 'me' || username === req.user.username)) return [3 /*break*/, 3];
                        _b = req.user;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, model_1.prisma.users.findFirst({
                            where: {
                                OR: [
                                    { username: username },
                                    { id: username }
                                ]
                            }
                        })];
                    case 4:
                        _b = _c.sent();
                        _c.label = 5;
                    case 5:
                        user = _b;
                        if (!user) {
                            throw { status: 404, body: { error: 'User not found' } };
                        }
                        return [2 /*return*/, res.send({ user: user })];
                }
            });
        });
    };
    Users.prototype["delete"] = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.user.role !== 'admin') {
                            throw { status: 403, body: { error: 'You are not allowed to do this' } };
                        }
                        id = req.params.id;
                        return [4 /*yield*/, model_1.prisma.files.deleteMany({
                                where: { user_id: id }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, model_1.prisma.users["delete"]({ where: { id: id } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.send({})];
                }
            });
        });
    };
    Users.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.user.role !== 'admin') {
                            throw { status: 403, body: { error: 'You are not allowed to do this' } };
                        }
                        id = req.params.id;
                        user = req.body.user;
                        if (!user) {
                            throw { status: 400, body: { error: 'User is required' } };
                        }
                        return [4 /*yield*/, model_1.prisma.users.update({
                                where: { id: id },
                                data: { role: user === null || user === void 0 ? void 0 : user.role }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.send({})];
                }
            });
        });
    };
    __decorate([
        Endpoint_1.Endpoint.GET({ middlewares: [Auth_1.Auth] })
    ], Users.prototype, "search");
    __decorate([
        Endpoint_1.Endpoint.GET('/me/usage', { middlewares: [Auth_1.AuthMaybe] })
    ], Users.prototype, "usage");
    __decorate([
        Endpoint_1.Endpoint.GET('/', { middlewares: [Auth_1.Auth] })
    ], Users.prototype, "find");
    __decorate([
        Endpoint_1.Endpoint.PATCH('/me/settings', { middlewares: [Auth_1.Auth] })
    ], Users.prototype, "settings");
    __decorate([
        Endpoint_1.Endpoint.POST('/me/delete', { middlewares: [Auth_1.Auth] })
    ], Users.prototype, "remove");
    __decorate([
        Endpoint_1.Endpoint.GET('/:username/:param?', { middlewares: [Auth_1.Auth] })
    ], Users.prototype, "retrieve");
    __decorate([
        Endpoint_1.Endpoint.DELETE('/:id', { middlewares: [Auth_1.Auth] })
    ], Users.prototype, "delete");
    __decorate([
        Endpoint_1.Endpoint.PATCH('/:id', { middlewares: [Auth_1.Auth] })
    ], Users.prototype, "update");
    Users = __decorate([
        Endpoint_1.Endpoint.API()
    ], Users);
    return Users;
}());
exports.Users = Users;
