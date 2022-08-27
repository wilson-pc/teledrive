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
exports.Dialogs = void 0;
var teledrive_client_1 = require("teledrive-client");
var big_integer_1 = require("big-integer");
var Cache_1 = require("../../service/Cache");
var ObjectParser_1 = require("../../utils/ObjectParser");
var Endpoint_1 = require("../base/Endpoint");
var Auth_1 = require("../middlewares/Auth");
var Dialogs = /** @class */ (function () {
    function Dialogs() {
    }
    Dialogs.prototype.find = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, offset, limit, dialogs;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, offset = _a.offset, limit = _a.limit;
                        return [4 /*yield*/, Cache_1.Redis.connect().getFromCacheFirst("dialogs:".concat(req.user.id, ":").concat(JSON.stringify(req.query)), function () { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = ObjectParser_1.objectParser;
                                            return [4 /*yield*/, req.tg.getDialogs({
                                                    limit: Number(limit) || 0,
                                                    offsetDate: Number(offset) || undefined,
                                                    ignorePinned: false
                                                })];
                                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                                    }
                                });
                            }); }, 2)];
                    case 1:
                        dialogs = _b.sent();
                        return [2 /*return*/, res.send({ dialogs: dialogs })];
                }
            });
        });
    };
    Dialogs.prototype.retrieve = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, id, peer, dialogs, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, type = _a.type, id = _a.id;
                        if (type === 'channel') {
                            peer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(req.query.accessHash)
                            });
                        }
                        else if (type === 'chat') {
                            peer = new teledrive_client_1.Api.InputPeerChat({
                                chatId: (0, big_integer_1["default"])(id)
                            });
                        }
                        else if (type === 'user') {
                            peer = new teledrive_client_1.Api.InputPeerUser({
                                userId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(req.query.accessHash)
                            });
                        }
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.GetPeerDialogs({
                                peers: [new teledrive_client_1.Api.InputDialogPeer({ peer: peer })]
                            }))];
                    case 1:
                        dialogs = _b.sent();
                        result = (0, ObjectParser_1.objectParser)(dialogs);
                        return [2 /*return*/, res.send({ dialog: __assign(__assign({}, result), { dialog: result.dialogs[0], message: result.messages[0], chat: result.chats[0], user: result.users[0], dialogs: undefined, messages: undefined, chats: undefined, users: undefined }) })];
                }
            });
        });
    };
    Dialogs.prototype.avatar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, id, peer, file, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, type = _a.type, id = _a.id;
                        if (type === 'channel') {
                            peer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(req.query.accessHash)
                            });
                        }
                        else if (type === 'chat') {
                            peer = new teledrive_client_1.Api.InputPeerChat({
                                chatId: (0, big_integer_1["default"])(id)
                            });
                        }
                        else if (type === 'user') {
                            peer = new teledrive_client_1.Api.InputPeerUser({
                                userId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(req.query.accessHash)
                            });
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, req.tg.downloadProfilePhoto(peer)];
                    case 2:
                        file = _b.sent();
                        if (!(file === null || file === void 0 ? void 0 : file.length)) {
                            return [2 /*return*/, res.redirect('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')];
                        }
                        res.setHeader('Content-Disposition', "inline; filename=avatar-".concat(id, ".jpg"));
                        res.setHeader('Content-Type', 'image/jpeg');
                        res.setHeader('Content-Length', file.length);
                        res.write(file);
                        return [2 /*return*/, res.end()];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.redirect('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Endpoint_1.Endpoint.GET('/', { middlewares: [Auth_1.Auth] })
    ], Dialogs.prototype, "find");
    __decorate([
        Endpoint_1.Endpoint.GET('/:type/:id', { middlewares: [Auth_1.Auth] })
    ], Dialogs.prototype, "retrieve");
    __decorate([
        Endpoint_1.Endpoint.GET('/:type/:id/avatar.jpg', { middlewares: [Auth_1.Auth] })
    ], Dialogs.prototype, "avatar");
    Dialogs = __decorate([
        Endpoint_1.Endpoint.API()
    ], Dialogs);
    return Dialogs;
}());
exports.Dialogs = Dialogs;
