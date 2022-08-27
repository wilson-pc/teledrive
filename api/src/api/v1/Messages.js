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
exports.Messages = void 0;
var teledrive_client_1 = require("teledrive-client");
var big_integer_1 = require("big-integer");
var Cache_1 = require("../../service/Cache");
var Endpoint_1 = require("../base/Endpoint");
var Auth_1 = require("../middlewares/Auth");
var Messages = /** @class */ (function () {
    function Messages() {
    }
    Messages.prototype.history = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, id, _b, offset, limit, accessHash, peer, result;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.params, type = _a.type, id = _a.id;
                        _b = req.query, offset = _b.offset, limit = _b.limit, accessHash = _b.accessHash;
                        if (type === 'channel') {
                            peer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(accessHash)
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
                                accessHash: (0, big_integer_1["default"])(accessHash)
                            });
                        }
                        return [4 /*yield*/, Cache_1.Redis.connect().getFromCacheFirst("history:".concat(req.user.id, ":").concat(JSON.stringify(req.params), ":").concat(JSON.stringify(req.query)), function () { return __awaiter(_this, void 0, void 0, function () {
                                var messages, result;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.GetHistory({
                                                peer: peer,
                                                limit: Number(limit) || 0,
                                                offsetId: Number(offset) || 0
                                            }))];
                                        case 1:
                                            messages = _b.sent();
                                            result = JSON.parse(JSON.stringify(messages));
                                            result.messages = (_a = result.messages) === null || _a === void 0 ? void 0 : _a.map(function (msg, i) { var _a, _b; return (__assign(__assign({}, msg), { action: __assign(__assign({}, msg.action), { className: (_b = (_a = messages['messages'][i]) === null || _a === void 0 ? void 0 : _a.action) === null || _b === void 0 ? void 0 : _b.className }) })); });
                                            return [2 /*return*/, result];
                                    }
                                });
                            }); }, 2)];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, res.send({ messages: result })];
                }
            });
        });
    };
    Messages.prototype.sponsoredMessages = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, id, accessHash, peer, messages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, type = _a.type, id = _a.id;
                        accessHash = req.query.accessHash;
                        if (type === 'channel') {
                            peer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(accessHash)
                            });
                        }
                        else {
                            return [2 /*return*/, res.send({ messages: {
                                        messages: [],
                                        chats: [],
                                        users: []
                                    } })];
                        }
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.channels.GetSponsoredMessages({ channel: peer }))];
                    case 1:
                        messages = _b.sent();
                        return [2 /*return*/, res.send({ messages: messages })];
                }
            });
        });
    };
    Messages.prototype.readSponsoredMessages = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, id, accessHash, randomId, peer, accepted;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, type = _a.type, id = _a.id;
                        accessHash = req.query.accessHash;
                        randomId = req.body.random_id;
                        if (type === 'channel') {
                            peer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(accessHash)
                            });
                        }
                        else {
                            return [2 /*return*/, res.status(202).send({ accepted: true })];
                        }
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.channels.ViewSponsoredMessage({
                                channel: peer, randomId: Buffer.from(randomId)
                            }))];
                    case 1:
                        accepted = _b.sent();
                        return [2 /*return*/, res.status(202).send({ accepted: accepted })];
                }
            });
        });
    };
    Messages.prototype.read = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, id, accessHash, peer, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, type = _a.type, id = _a.id;
                        accessHash = req.query.accessHash;
                        if (type === 'channel') {
                            peer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(accessHash)
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
                                accessHash: (0, big_integer_1["default"])(accessHash)
                            });
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.ReadHistory({ peer: peer }))];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _b.sent();
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.channels.ReadHistory({ channel: peer }))];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, res.status(202).send({ accepted: true })];
                }
            });
        });
    };
    Messages.prototype.send = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, id, accessHash, _b, message, replyToMsgId, peer, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.params, type = _a.type, id = _a.id;
                        accessHash = req.query.accessHash;
                        _b = req.body, message = _b.message, replyToMsgId = _b.replyToMsgId;
                        if (type === 'channel') {
                            peer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(accessHash)
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
                                accessHash: (0, big_integer_1["default"])(accessHash)
                            });
                        }
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.SendMessage(__assign({ peer: peer, message: message }, replyToMsgId ? { replyToMsgId: replyToMsgId } : {})))];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, res.send({ message: result })];
                }
            });
        });
    };
    Messages.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, id, msgId, accessHash, message, peer, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, type = _a.type, id = _a.id, msgId = _a.msgId;
                        accessHash = req.query.accessHash;
                        message = req.body.message;
                        if (type === 'channel') {
                            peer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(accessHash)
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
                                accessHash: (0, big_integer_1["default"])(accessHash)
                            });
                        }
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.EditMessage({
                                id: Number(msgId),
                                peer: peer,
                                message: message
                            }))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.send({ message: result })];
                }
            });
        });
    };
    Messages.prototype["delete"] = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, id, msgId, accessHash, peer, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, type = _a.type, id = _a.id, msgId = _a.msgId;
                        accessHash = req.query.accessHash;
                        if (type === 'channel') {
                            peer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(id),
                                accessHash: (0, big_integer_1["default"])(accessHash)
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
                                accessHash: (0, big_integer_1["default"])(accessHash)
                            });
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.DeleteMessages({ id: [Number(msgId)], revoke: true }))];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_2 = _b.sent();
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.channels.DeleteMessages({ id: [Number(msgId)], channel: peer }))];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, res.status(202).send({ accepted: true })];
                }
            });
        });
    };
    Messages.prototype.forward = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var msgId, _a, from, to, fromPeer, toPeer, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        msgId = req.params.msgId;
                        _a = req.body, from = _a.from, to = _a.to;
                        if (!from) {
                            fromPeer = 'me';
                        }
                        else if (from.type === 'channel') {
                            fromPeer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(from.id),
                                accessHash: (0, big_integer_1["default"])(from.accessHash)
                            });
                        }
                        else if (from.type === 'chat') {
                            fromPeer = new teledrive_client_1.Api.InputPeerChat({
                                chatId: (0, big_integer_1["default"])(from.id)
                            });
                        }
                        else if (from.type === 'user') {
                            fromPeer = new teledrive_client_1.Api.InputPeerUser({
                                userId: (0, big_integer_1["default"])(from.id),
                                accessHash: (0, big_integer_1["default"])(from.accessHash)
                            });
                        }
                        if (typeof to === 'string') {
                            toPeer = to;
                        }
                        else if (to.type === 'channel') {
                            toPeer = new teledrive_client_1.Api.InputPeerChannel({
                                channelId: (0, big_integer_1["default"])(to.id),
                                accessHash: (0, big_integer_1["default"])(to.accessHash)
                            });
                        }
                        else if (to.type === 'chat') {
                            toPeer = new teledrive_client_1.Api.InputPeerChat({
                                chatId: (0, big_integer_1["default"])(to.id)
                            });
                        }
                        else if (to.type === 'user') {
                            toPeer = new teledrive_client_1.Api.InputPeerUser({
                                userId: (0, big_integer_1["default"])(to.id),
                                accessHash: (0, big_integer_1["default"])(to.accessHash)
                            });
                        }
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.ForwardMessages({
                                id: [Number(msgId)],
                                fromPeer: fromPeer,
                                toPeer: toPeer,
                                randomId: [big_integer_1["default"].randBetween('-1e100', '1e100')]
                            }))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.send({ message: result })];
                }
            });
        });
    };
    Messages.prototype.search = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, q, offset, limit, messages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, q = _a.q, offset = _a.offset, limit = _a.limit;
                        if (!q) {
                            throw { status: 400, body: { error: 'q is required' } };
                        }
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.Search({
                                q: q,
                                filter: new teledrive_client_1.Api.InputMessagesFilterEmpty(),
                                peer: new teledrive_client_1.Api.InputPeerEmpty(),
                                limit: Number(limit) || 0,
                                minDate: 0,
                                maxDate: 0,
                                offsetId: 0,
                                addOffset: Number(offset) || 0,
                                maxId: 0,
                                minId: 0,
                                hash: (0, big_integer_1["default"])(0)
                            }))];
                    case 1:
                        messages = _b.sent();
                        return [2 /*return*/, res.send({ messages: messages })];
                }
            });
        });
    };
    Messages.prototype.globalSearch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, q, limit, messages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, q = _a.q, limit = _a.limit;
                        if (!q) {
                            throw { status: 400, body: { error: 'q is required' } };
                        }
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.SearchGlobal({
                                q: q,
                                filter: new teledrive_client_1.Api.InputMessagesFilterEmpty(),
                                offsetPeer: new teledrive_client_1.Api.InputPeerEmpty(),
                                limit: Number(limit) || 0
                            }))];
                    case 1:
                        messages = _b.sent();
                        return [2 /*return*/, res.send({ messages: messages })];
                }
            });
        });
    };
    Messages.prototype.avatar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, id, peer, file, error_3;
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
                        error_3 = _b.sent();
                        return [2 /*return*/, res.redirect('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Endpoint_1.Endpoint.GET('/history/:type/:id', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "history");
    __decorate([
        Endpoint_1.Endpoint.GET('/sponsoredMessages/:type/:id', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "sponsoredMessages");
    __decorate([
        Endpoint_1.Endpoint.POST('/readSponsoredMessages/:type/:id', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "readSponsoredMessages");
    __decorate([
        Endpoint_1.Endpoint.POST('/read/:type/:id', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "read");
    __decorate([
        Endpoint_1.Endpoint.POST('/send/:type/:id', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "send");
    __decorate([
        Endpoint_1.Endpoint.PATCH('/:type/:id/:msgId', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "update");
    __decorate([
        Endpoint_1.Endpoint.DELETE('/:type/:id/:msgId', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "delete");
    __decorate([
        Endpoint_1.Endpoint.POST('/forward/:msgId', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "forward");
    __decorate([
        Endpoint_1.Endpoint.GET('/search', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "search");
    __decorate([
        Endpoint_1.Endpoint.GET('/globalSearch', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "globalSearch");
    __decorate([
        Endpoint_1.Endpoint.GET('/:type/:id/avatar.jpg', { middlewares: [Auth_1.Auth] })
    ], Messages.prototype, "avatar");
    Messages = __decorate([
        Endpoint_1.Endpoint.API()
    ], Messages);
    return Messages;
}());
exports.Messages = Messages;
