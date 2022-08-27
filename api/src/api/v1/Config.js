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
exports.Config = void 0;
var crypto_1 = require("crypto");
var model_1 = require("../../model");
var Cache_1 = require("../../service/Cache");
var Endpoint_1 = require("../base/Endpoint");
var Auth_1 = require("../middlewares/Auth");
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.prototype.retrieve = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var admin, config;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, model_1.prisma.users.findFirst({ where: { role: 'admin' } })];
                    case 1:
                        admin = _b.sent();
                        if (!(!admin && process.env.ADMIN_USERNAME)) return [3 /*break*/, 5];
                        return [4 /*yield*/, model_1.prisma.users.findFirst({ where: { username: process.env.ADMIN_USERNAME } })];
                    case 2:
                        admin = _b.sent();
                        if (!admin) {
                            throw { status: 404, body: { error: 'Admin user not found' } };
                        }
                        return [4 /*yield*/, model_1.prisma.users.update({
                                data: {
                                    role: 'admin'
                                },
                                where: { id: admin.id }
                            })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, Cache_1.Redis.connect().del("auth:".concat(req.authKey))];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [4 /*yield*/, model_1.prisma.config.findFirst()];
                    case 6:
                        config = _b.sent();
                        if (!!config) return [3 /*break*/, 8];
                        return [4 /*yield*/, model_1.prisma.config.create({
                                data: {
                                    disable_signup: false,
                                    invitation_code: null
                                }
                            })];
                    case 7:
                        config = _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/, res.send({ config: __assign(__assign({}, config), { invitation_code: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'admin' ? config.invitation_code : undefined }) })];
                }
            });
        });
    };
    Config.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var config, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.user.role !== 'admin') {
                            throw { status: 403, body: { error: 'Forbidden' } };
                        }
                        config = req.body.config;
                        if (!config) {
                            throw { status: 400, body: { error: 'Invalid request' } };
                        }
                        return [4 /*yield*/, model_1.prisma.config.findFirst()];
                    case 1:
                        model = _a.sent();
                        return [4 /*yield*/, model_1.prisma.config.update({
                                data: __assign({ disable_signup: config.disable_signup }, config.clear_invitation_code ? { invitation_code: null } : {}),
                                where: { id: model.id }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.send({ config: model })];
                }
            });
        });
    };
    Config.prototype.resetInvitationCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var code, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.user.role !== 'admin') {
                            throw { status: 403, body: { error: 'Forbidden' } };
                        }
                        code = crypto_1["default"].randomBytes(9).toString('base64url');
                        return [4 /*yield*/, model_1.prisma.config.findFirst()];
                    case 1:
                        model = _a.sent();
                        return [4 /*yield*/, model_1.prisma.config.update({
                                data: {
                                    invitation_code: code
                                },
                                where: { id: model.id }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.send({ config: model })];
                }
            });
        });
    };
    Config.prototype.validateInvitationCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var model, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model_1.prisma.config.findFirst()];
                    case 1:
                        model = _a.sent();
                        if (!model.invitation_code) {
                            return [2 /*return*/, res.send({ valid: true })];
                        }
                        code = req.query.code;
                        return [2 /*return*/, res.send({
                                valid: model.invitation_code === code
                            })];
                }
            });
        });
    };
    __decorate([
        Endpoint_1.Endpoint.GET('/', { middlewares: [Auth_1.AuthMaybe] })
    ], Config.prototype, "retrieve");
    __decorate([
        Endpoint_1.Endpoint.PATCH('/', { middlewares: [Auth_1.Auth] })
    ], Config.prototype, "update");
    __decorate([
        Endpoint_1.Endpoint.POST('/resetInvitationCode', { middlewares: [Auth_1.Auth] })
    ], Config.prototype, "resetInvitationCode");
    __decorate([
        Endpoint_1.Endpoint.POST('/validateInvitationCode')
    ], Config.prototype, "validateInvitationCode");
    Config = __decorate([
        Endpoint_1.Endpoint.API()
    ], Config);
    return Config;
}());
exports.Config = Config;
