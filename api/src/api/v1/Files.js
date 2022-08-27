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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Files = void 0;
var big_integer_1 = require("big-integer");
var bcryptjs_1 = require("bcryptjs");
var check_disk_space_1 = require("check-disk-space");
var content_disposition_1 = require("content-disposition");
var crypto_js_1 = require("crypto-js");
var form_data_1 = require("form-data");
var fs_1 = require("fs");
var moment_1 = require("moment");
var multer_1 = require("multer");
var teledrive_client_1 = require("teledrive-client");
var Logger_1 = require("teledrive-client/extensions/Logger");
var sessions_1 = require("teledrive-client/sessions");
var model_1 = require("../../model");
var Cache_1 = require("../../service/Cache");
var Constant_1 = require("../../utils/Constant");
var FilterQuery_1 = require("../../utils/FilterQuery");
var Endpoint_1 = require("../base/Endpoint");
var Auth_1 = require("../middlewares/Auth");
var axios_1 = require("axios");
var CACHE_DIR = "".concat(__dirname, "/../../../../.cached");
var Files = /** @class */ (function () {
    function Files() {
    }
    Files_1 = Files;
    Files.prototype.find = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, sort, offset, limit, shared, excludeParts, fullProperties, noCache, _t, filters, parent, _d, getFiles, _e, files, length, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _c = req.query, sort = _c.sort, offset = _c.offset, limit = _c.limit, shared = _c.shared, excludeParts = _c.exclude_parts, fullProperties = _c.full_properties, noCache = _c.no_cache, _t = _c.t, filters = __rest(_c, ["sort", "offset", "limit", "shared", "exclude_parts", "full_properties", "no_cache", "t"]);
                        if (!((filters === null || filters === void 0 ? void 0 : filters.parent_id) && filters.parent_id !== 'null')) return [3 /*break*/, 2];
                        return [4 /*yield*/, model_1.prisma.files.findFirst({ where: { id: filters.parent_id } })];
                    case 1:
                        _d = _g.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _d = null;
                        _g.label = 3;
                    case 3:
                        parent = _d;
                        if ((filters === null || filters === void 0 ? void 0 : filters.parent_id) && filters.parent_id !== 'null' && !parent) {
                            throw { status: 404, body: { error: 'Parent not found' } };
                        }
                        if (!req.user && !((_a = parent === null || parent === void 0 ? void 0 : parent.sharing_options) === null || _a === void 0 ? void 0 : _a.includes('*'))) {
                            throw { status: 404, body: { error: 'Parent not found' } };
                        }
                        getFiles = function () { return __awaiter(_this, void 0, void 0, function () {
                            var where, select, whereQuery, _a;
                            var _b, _c, _d, _e, _f, _g;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        where = { user_id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id } // 'files.user_id = :user'
                                        ;
                                        if (shared) {
                                            if (((_c = parent === null || parent === void 0 ? void 0 : parent.sharing_options) === null || _c === void 0 ? void 0 : _c.includes((_d = req.user) === null || _d === void 0 ? void 0 : _d.username)) || ((_e = parent === null || parent === void 0 ? void 0 : parent.sharing_options) === null || _e === void 0 ? void 0 : _e.includes('*'))) {
                                                where = {};
                                            }
                                            else {
                                                // :user = any(files.sharing_options) and (files.parent_id is null or parent.sharing_options is null or cardinality(parent.sharing_options) = 0 or not :user = any(parent.sharing_options))
                                                where = {
                                                    AND: [
                                                        {
                                                            sharing_options: {
                                                                has: (_f = req.user) === null || _f === void 0 ? void 0 : _f.username
                                                            }
                                                        },
                                                        {
                                                            OR: [
                                                                { parent_id: null },
                                                                { parent: {
                                                                        sharing_options: undefined
                                                                    }
                                                                },
                                                                {
                                                                    parent: {
                                                                        sharing_options: {
                                                                            isEmpty: true
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    NOT: {
                                                                        parent: {
                                                                            sharing_options: {
                                                                                has: (_g = req.user) === null || _g === void 0 ? void 0 : _g.username
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                };
                                            }
                                        }
                                        select = null;
                                        if (fullProperties !== 'true' && fullProperties !== '1') {
                                            select = {
                                                id: true,
                                                name: true,
                                                type: true,
                                                size: true,
                                                sharing_options: true,
                                                upload_progress: true,
                                                link_id: true,
                                                user_id: true,
                                                parent_id: true,
                                                uploaded_at: true,
                                                created_at: true,
                                                password: true,
                                                thumbnail: true,
                                                duration: true,
                                                original_url: true
                                            };
                                        }
                                        if (shared && Object.keys(where).length) {
                                            select['parent'] = true;
                                        }
                                        whereQuery = {
                                            AND: __spreadArray(__spreadArray([
                                                where
                                            ], Object.keys(filters).reduce(function (res, k) {
                                                var _a, _b, _c;
                                                var obj = (_a = {}, _a[k] = filters[k], _a);
                                                if (filters[k] === 'null') {
                                                    obj = (_b = {}, _b[k] = null, _b);
                                                }
                                                if (/\.in$/.test(k)) {
                                                    obj = (_c = {}, _c[k.replace(/\.in$/, '')] = {
                                                        "in": filters[k]
                                                            .replace(/^\(/, '')
                                                            .replace(/\'/g, '')
                                                            .replace(/\)$/, '')
                                                            .split(',')
                                                    }, _c);
                                                }
                                                return __spreadArray(__spreadArray([], res, true), [obj], false);
                                            }, []), true), excludeParts === 'true' || excludeParts === '1' ? [
                                                {
                                                    OR: [
                                                        {
                                                            AND: [
                                                                { name: { contains: '.part0' } },
                                                                { name: { endsWith: '1' } },
                                                                { NOT: { name: { endsWith: '11' } } },
                                                                { NOT: { name: { endsWith: '111' } } },
                                                                { NOT: { name: { endsWith: '1111' } } },
                                                                { NOT: { name: { endsWith: '21' } } },
                                                                { NOT: { name: { endsWith: '31' } } },
                                                                { NOT: { name: { endsWith: '41' } } },
                                                                { NOT: { name: { endsWith: '51' } } },
                                                                { NOT: { name: { endsWith: '61' } } },
                                                                { NOT: { name: { endsWith: '71' } } },
                                                                { NOT: { name: { endsWith: '81' } } },
                                                                { NOT: { name: { endsWith: '91' } } },
                                                            ]
                                                        },
                                                        {
                                                            NOT: { name: { contains: '.part' } }
                                                        }
                                                    ]
                                                }
                                            ] : [], true)
                                        };
                                        return [4 /*yield*/, model_1.prisma.files.findMany(__assign(__assign({}, select ? { select: select } : {}), { where: whereQuery, skip: Number(offset) || 0, take: Number(limit) || 10, orderBy: (0, FilterQuery_1.buildSort)(sort) }))];
                                    case 1:
                                        _a = [
                                            _h.sent()
                                        ];
                                        return [4 /*yield*/, model_1.prisma.files.count({ where: where })];
                                    case 2: return [2 /*return*/, _a.concat([
                                            _h.sent()
                                        ])];
                                }
                            });
                        }); };
                        if (!(noCache === 'true' || noCache === '1')) return [3 /*break*/, 5];
                        return [4 /*yield*/, getFiles()];
                    case 4:
                        _f = _g.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, Cache_1.Redis.connect().getFromCacheFirst("files:".concat(((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) || 'null', ":").concat(JSON.stringify(req.query)), getFiles, 2)];
                    case 6:
                        _f = _g.sent();
                        _g.label = 7;
                    case 7:
                        _e = _f, files = _e[0], length = _e[1];
                        return [2 /*return*/, res.send({ files: files.map(function (file) { return (__assign(__assign({}, file), { password: file.password ? '[REDACTED]' : null })); }), length: length })];
                }
            });
        });
    };
    Files.prototype.stats = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var totalFilesSize, totalUserFilesSize, cachedSize, _a, _b;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, model_1.prisma.files.aggregate({
                            _sum: { size: true }
                        })];
                    case 1:
                        totalFilesSize = _e.sent();
                        return [4 /*yield*/, model_1.prisma.files.aggregate({
                                _sum: { size: true },
                                where: {
                                    user_id: req.user.id
                                }
                            })];
                    case 2:
                        totalUserFilesSize = _e.sent();
                        try {
                            (0, fs_1.mkdirSync)("".concat(CACHE_DIR), { recursive: true });
                        }
                        catch (error) {
                            // ignore
                        }
                        cachedSize = (0, fs_1.readdirSync)("".concat(CACHE_DIR))
                            .filter(function (filename) { return (0, fs_1.statSync)("".concat(CACHE_DIR, "/").concat(filename)).isFile(); })
                            .reduce(function (res, file) { return res + (0, fs_1.statSync)("".concat(CACHE_DIR, "/").concat(file)).size; }, 0);
                        _b = (_a = res).send;
                        _c = {};
                        _d = {};
                        return [4 /*yield*/, (0, check_disk_space_1["default"])(__dirname)];
                    case 3: return [2 /*return*/, _b.apply(_a, [(_c.stats = (_d.system = _e.sent(),
                                _d.totalFilesSize = totalFilesSize._sum.size,
                                _d.totalUserFilesSize = totalUserFilesSize._sum.size,
                                _d.cachedSize = cachedSize,
                                _d),
                                _c)])];
                }
            });
        });
    };
    Files.prototype.save = function (req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var messageId, file, message, chat, _j, type_1, peerId, _id, accessHash, peer, mimeType, name_1, getSizes, size, type, _k, _l;
            var _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        messageId = req.query.messageId;
                        file = req.body.file;
                        if (!file) {
                            throw { status: 400, body: { error: 'File is required in body.' } };
                        }
                        message = {};
                        if (!messageId) return [3 /*break*/, 6];
                        if (!file.forward_info) {
                            throw { status: 400, body: { error: 'Forward info is required in body.' } };
                        }
                        chat = void 0;
                        if (!(file.forward_info && file.forward_info.match(/^channel\//gi))) return [3 /*break*/, 3];
                        _j = file.forward_info.split('/'), type_1 = _j[0], peerId = _j[1], _id = _j[2], accessHash = _j[3];
                        peer = void 0;
                        if (!(type_1 === 'channel')) return [3 /*break*/, 2];
                        peer = new teledrive_client_1.Api.InputPeerChannel({
                            channelId: (0, big_integer_1["default"])(peerId),
                            accessHash: (0, big_integer_1["default"])(accessHash)
                        });
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.channels.GetMessages({
                                channel: peer,
                                id: [new teledrive_client_1.Api.InputMessageID({ id: Number(messageId) })]
                            }))];
                    case 1:
                        chat = _o.sent();
                        _o.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.GetMessages({
                            id: [new teledrive_client_1.Api.InputMessageID({ id: Number(messageId) })]
                        }))];
                    case 4:
                        chat = (_o.sent());
                        _o.label = 5;
                    case 5:
                        if (!((_a = chat === null || chat === void 0 ? void 0 : chat['messages']) === null || _a === void 0 ? void 0 : _a[0])) {
                            throw { status: 404, body: { error: 'Message not found' } };
                        }
                        mimeType = chat['messages'][0].media.photo ? 'image/jpeg' : chat['messages'][0].media.document.mimeType || 'unknown';
                        name_1 = chat['messages'][0].media.photo ? "".concat(chat['messages'][0].media.photo.id, ".jpg") : ((_c = (_b = chat['messages'][0].media.document.attributes) === null || _b === void 0 ? void 0 : _b.find(function (atr) { return atr.fileName; })) === null || _c === void 0 ? void 0 : _c.fileName) || "".concat((_d = chat['messages'][0].media) === null || _d === void 0 ? void 0 : _d.document.id, ".").concat(mimeType.split('/').pop());
                        getSizes = function (_a) {
                            var size = _a.size, sizes = _a.sizes;
                            return sizes ? sizes.pop() : size;
                        };
                        size = chat['messages'][0].media.photo ? getSizes(chat['messages'][0].media.photo.sizes.pop()) : (_e = chat['messages'][0].media.document) === null || _e === void 0 ? void 0 : _e.size;
                        type = chat['messages'][0].media.photo || mimeType.match(/^image/gi) ? 'image' : null;
                        if (((_f = chat['messages'][0].media.document) === null || _f === void 0 ? void 0 : _f.mimeType.match(/^video/gi)) || name_1.match(/\.mp4$/gi) || name_1.match(/\.mkv$/gi) || name_1.match(/\.mov$/gi)) {
                            type = 'video';
                        }
                        else if (((_g = chat['messages'][0].media.document) === null || _g === void 0 ? void 0 : _g.mimeType.match(/pdf$/gi)) || name_1.match(/\.doc$/gi) || name_1.match(/\.docx$/gi) || name_1.match(/\.xls$/gi) || name_1.match(/\.xlsx$/gi)) {
                            type = 'document';
                        }
                        else if (((_h = chat['messages'][0].media.document) === null || _h === void 0 ? void 0 : _h.mimeType.match(/audio$/gi)) || name_1.match(/\.mp3$/gi) || name_1.match(/\.ogg$/gi)) {
                            type = 'audio';
                        }
                        message = {
                            name: name_1,
                            message_id: chat['messages'][0].id.toString(),
                            mime_type: mimeType,
                            size: size,
                            user_id: req.user.id,
                            uploaded_at: new Date(chat['messages'][0].date * 1000),
                            type: type
                        };
                        _o.label = 6;
                    case 6:
                        _l = (_k = res).send;
                        _m = {};
                        return [4 /*yield*/, model_1.prisma.files.create({
                                data: __assign(__assign({}, file), message)
                            })];
                    case 7: return [2 /*return*/, _l.apply(_k, [(_m.file = _o.sent(), _m)])];
                }
            });
        });
    };
    Files.prototype.addFolder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, count, _a, parent, _b, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        data = req.body.file;
                        if (!(data === null || data === void 0 ? void 0 : data.name)) return [3 /*break*/, 1];
                        _a = null;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, model_1.prisma.files.count({
                            where: {
                                AND: [
                                    { type: 'folder' },
                                    { user_id: req.user.id },
                                    { name: { startsWith: 'New Folder' } },
                                    { parent_id: (data === null || data === void 0 ? void 0 : data.parent_id) || null }
                                ]
                            }
                        })];
                    case 2:
                        _a = _f.sent();
                        _f.label = 3;
                    case 3:
                        count = _a;
                        if (!(data === null || data === void 0 ? void 0 : data.parent_id)) return [3 /*break*/, 5];
                        return [4 /*yield*/, model_1.prisma.files.findUnique({
                                where: { id: data.parent_id }
                            })];
                    case 4:
                        _b = _f.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _b = null;
                        _f.label = 6;
                    case 6:
                        parent = _b;
                        _d = (_c = res).send;
                        _e = {};
                        return [4 /*yield*/, model_1.prisma.files.create({
                                data: __assign({ name: (data === null || data === void 0 ? void 0 : data.name) || "New Folder".concat(count ? " (".concat(count, ")") : ''), mime_type: 'teledrive/folder', user_id: req.user.id, type: 'folder', uploaded_at: new Date() }, parent ? {
                                    parent_id: parent.id,
                                    sharing_options: parent.sharing_options,
                                    signed_key: parent.signed_key
                                } : {})
                            })];
                    case 7: return [2 /*return*/, _d.apply(_c, [(_e.file = _f.sent(), _e)])];
                }
            });
        });
    };
    Files.prototype.retrieve = function (req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var id, password, file, parent, _k, files;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        id = req.params.id;
                        password = req.query.password;
                        return [4 /*yield*/, model_1.prisma.files.findUnique({
                                where: { id: id }
                            })];
                    case 1:
                        file = _l.sent();
                        if (!(file === null || file === void 0 ? void 0 : file.parent_id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, model_1.prisma.files.findUnique({
                                where: { id: file.parent_id }
                            })];
                    case 2:
                        _k = _l.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _k = null;
                        _l.label = 4;
                    case 4:
                        parent = _k;
                        if (!file || file.user_id !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) && !((_b = file.sharing_options) === null || _b === void 0 ? void 0 : _b.includes('*')) && !((_c = file.sharing_options) === null || _c === void 0 ? void 0 : _c.includes((_d = req.user) === null || _d === void 0 ? void 0 : _d.username))) {
                            if (!((_e = parent === null || parent === void 0 ? void 0 : parent.sharing_options) === null || _e === void 0 ? void 0 : _e.includes((_f = req.user) === null || _f === void 0 ? void 0 : _f.username)) && !((_g = parent === null || parent === void 0 ? void 0 : parent.sharing_options) === null || _g === void 0 ? void 0 : _g.includes('*'))) {
                                throw { status: 404, body: { error: 'File not found' } };
                            }
                        }
                        file.signed_key = file.signed_key || (parent === null || parent === void 0 ? void 0 : parent.signed_key);
                        if (file.password && ((_h = req.user) === null || _h === void 0 ? void 0 : _h.id) !== file.user_id) {
                            if (!password) {
                                throw { status: 400, body: { error: 'Unauthorized' } };
                            }
                            if (!(0, bcryptjs_1.compareSync)(password, file.password)) {
                                throw { status: 400, body: { error: 'Wrong passphrase' } };
                            }
                        }
                        files = [file];
                        if (!/.*\.part0*1$/gi.test(file === null || file === void 0 ? void 0 : file.name)) return [3 /*break*/, 6];
                        return [4 /*yield*/, model_1.prisma.files.findMany({
                                where: {
                                    AND: [
                                        {
                                            OR: [
                                                { id: id },
                                                { name: { startsWith: file.name.replace(/\.part0*1$/gi, '') } }
                                            ]
                                        },
                                        { user_id: file.user_id },
                                        { parent_id: file.parent_id || null }
                                    ]
                                }
                            })];
                    case 5:
                        // if (req.user?.plan !== 'premium') {
                        //   throw { status: 402, body: { error: 'Please upgrade your plan for view this file' } }
                        // }
                        files = _l.sent();
                        files[0].signed_key = file.signed_key = file.signed_key || (parent === null || parent === void 0 ? void 0 : parent.signed_key);
                        _l.label = 6;
                    case 6:
                        if (!(!req.user || file.user_id !== ((_j = req.user) === null || _j === void 0 ? void 0 : _j.id))) return [3 /*break*/, 9];
                        return [4 /*yield*/, Files_1.initiateSessionTG(req, files)];
                    case 7:
                        _l.sent();
                        return [4 /*yield*/, req.tg.connect()];
                    case 8:
                        _l.sent();
                        _l.label = 9;
                    case 9: return [4 /*yield*/, Files_1.download(req, res, files)];
                    case 10: return [2 /*return*/, _l.sent()];
                }
            });
        });
    };
    Files.prototype.remove = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteMessage, file, error_1, error_2, files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        deleteMessage = req.query.deleteMessage;
                        return [4 /*yield*/, model_1.prisma.files.findFirst({
                                where: {
                                    AND: [{ id: id }, { user_id: req.user.id }]
                                }
                            })];
                    case 1:
                        file = _a.sent();
                        if (!file) {
                            throw { status: 404, body: { error: 'File not found' } };
                        }
                        return [4 /*yield*/, model_1.prisma.files["delete"]({ where: { id: id } })];
                    case 2:
                        _a.sent();
                        if (!(deleteMessage && ['true', '1'].includes(deleteMessage) && !(file === null || file === void 0 ? void 0 : file.forward_info))) return [3 /*break*/, 10];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 10]);
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.DeleteMessages({ id: [Number(file.message_id)], revoke: true }))];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        error_1 = _a.sent();
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.channels.DeleteMessages({ id: [Number(file.message_id)], channel: 'me' }))];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _a.sent();
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 10];
                    case 10:
                        if (!/.*\.part0*1$/gi.test(file === null || file === void 0 ? void 0 : file.name)) return [3 /*break*/, 12];
                        return [4 /*yield*/, model_1.prisma.files.findMany({
                                where: {
                                    AND: [
                                        {
                                            OR: [
                                                { id: id },
                                                { name: { startsWith: file.name.replace(/\.part0*1$/gi, '') } }
                                            ]
                                        },
                                        { user_id: file.user_id },
                                        { parent_id: file.parent_id || null }
                                    ]
                                }
                            })];
                    case 11:
                        files = _a.sent();
                        files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var error_3, error_4;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, model_1.prisma.files["delete"]({ where: { id: file.id } })];
                                    case 1:
                                        _a.sent();
                                        if (!(deleteMessage && ['true', '1'].includes(deleteMessage) && !(file === null || file === void 0 ? void 0 : file.forward_info))) return [3 /*break*/, 9];
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 9]);
                                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.DeleteMessages({ id: [Number(file.message_id)], revoke: true }))];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 9];
                                    case 4:
                                        error_3 = _a.sent();
                                        _a.label = 5;
                                    case 5:
                                        _a.trys.push([5, 7, , 8]);
                                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.channels.DeleteMessages({ id: [Number(file.message_id)], channel: 'me' }))];
                                    case 6:
                                        _a.sent();
                                        return [3 /*break*/, 8];
                                    case 7:
                                        error_4 = _a.sent();
                                        return [3 /*break*/, 8];
                                    case 8: return [3 /*break*/, 9];
                                    case 9: return [2 /*return*/];
                                }
                            });
                        }); });
                        _a.label = 12;
                    case 12: return [2 /*return*/, res.send({ file: file })];
                }
            });
        });
    };
    Files.prototype.update = function (req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var id, file, currentFile, parent, _e, key, files, updateSharingOptions_1;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        id = req.params.id;
                        file = req.body.file;
                        if (!file) {
                            throw { status: 400, body: { error: 'File is required in body' } };
                        }
                        return [4 /*yield*/, model_1.prisma.files.findFirst({
                                where: {
                                    AND: [{ id: id }, { user_id: req.user.id }]
                                }
                            })];
                    case 1:
                        currentFile = _f.sent();
                        if (!currentFile) {
                            throw { status: 404, body: { error: 'File not found' } };
                        }
                        if (!file.parent_id) return [3 /*break*/, 3];
                        return [4 /*yield*/, model_1.prisma.files.findUnique({
                                where: { id: file.parent_id }
                            })];
                    case 2:
                        _e = _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _e = null;
                        _f.label = 4;
                    case 4:
                        parent = _e;
                        key = currentFile.signed_key || (parent === null || parent === void 0 ? void 0 : parent.signed_key);
                        if (((_a = file.sharing_options) === null || _a === void 0 ? void 0 : _a.length) && !key) {
                            key = crypto_js_1.AES.encrypt(JSON.stringify({ file: { id: file.id }, session: req.tg.session.save() }), Constant_1.FILES_JWT_SECRET).toString();
                        }
                        if (!((_b = file.sharing_options) === null || _b === void 0 ? void 0 : _b.length) && !((_c = currentFile.sharing_options) === null || _c === void 0 ? void 0 : _c.length) && !((_d = parent === null || parent === void 0 ? void 0 : parent.sharing_options) === null || _d === void 0 ? void 0 : _d.length)) {
                            key = null;
                        }
                        if (!/.*\.part0*1$/gi.test(currentFile === null || currentFile === void 0 ? void 0 : currentFile.name)) return [3 /*break*/, 7];
                        return [4 /*yield*/, model_1.prisma.files.findMany({
                                where: {
                                    AND: [
                                        {
                                            OR: [
                                                { id: id },
                                                { name: { startsWith: currentFile.name.replace(/\.part0*1$/gi, '') } }
                                            ]
                                        },
                                        { user_id: currentFile.user_id },
                                        { parent_id: currentFile.parent_id || null }
                                    ]
                                }
                            })];
                    case 5:
                        files = _f.sent();
                        return [4 /*yield*/, Promise.all(files.map(function (current) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, model_1.prisma.files.update({
                                                where: { id: current.id },
                                                data: __assign(__assign(__assign(__assign(__assign(__assign({}, file.name ? { name: current.name.replace(current.name.replace(/\.part0*\d+$/gi, ''), file.name) } : {}), file.sharing_options !== undefined ? { sharing_options: file.sharing_options } : {}), file.parent_id !== undefined ? { parent_id: file.parent_id } : {}), parent && current.type === 'folder' ? {
                                                    sharing_options: parent.sharing_options
                                                } : {}), { signed_key: key }), file.password !== undefined ? {
                                                    password: file.password !== null ? (0, bcryptjs_1.hashSync)(file.password, 10) : null
                                                } : {})
                                            })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 6:
                        _f.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, model_1.prisma.files.updateMany({
                            where: {
                                AND: [
                                    { id: id },
                                    { user_id: req.user.id }
                                ]
                            },
                            data: __assign(__assign(__assign(__assign(__assign(__assign({}, file.name ? { name: currentFile.name.replace(currentFile.name.replace(/\.part0*1$/gi, ''), file.name) } : {}), file.sharing_options !== undefined ? { sharing_options: file.sharing_options } : {}), file.parent_id !== undefined ? { parent_id: file.parent_id } : {}), parent && currentFile.type === 'folder' ? {
                                sharing_options: parent.sharing_options
                            } : {}), { signed_key: key }), file.password !== undefined ? {
                                password: file.password !== null ? (0, bcryptjs_1.hashSync)(file.password, 10) : null
                            } : {})
                        })];
                    case 8:
                        _f.sent();
                        _f.label = 9;
                    case 9:
                        if (!(file.sharing_options !== undefined && currentFile.type === 'folder')) return [3 /*break*/, 11];
                        updateSharingOptions_1 = function (currentFile) { return __awaiter(_this, void 0, void 0, function () {
                            var children, _i, children_1, child;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, model_1.prisma.files.findMany({
                                            where: {
                                                AND: [
                                                    { parent_id: currentFile.id },
                                                    { type: 'folder' }
                                                ]
                                            }
                                        })];
                                    case 1:
                                        children = _a.sent();
                                        _i = 0, children_1 = children;
                                        _a.label = 2;
                                    case 2:
                                        if (!(_i < children_1.length)) return [3 /*break*/, 6];
                                        child = children_1[_i];
                                        return [4 /*yield*/, model_1.prisma.files.updateMany({
                                                where: {
                                                    AND: [
                                                        { id: child.id },
                                                        { user_id: req.user.id }
                                                    ]
                                                },
                                                data: __assign({ sharing_options: file.sharing_options, signed_key: key || child.signed_key }, file.password !== undefined ? {
                                                    password: file.password !== null ? (0, bcryptjs_1.hashSync)(file.password, 10) : null
                                                } : {})
                                            })];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, updateSharingOptions_1(child)];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5:
                                        _i++;
                                        return [3 /*break*/, 2];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, updateSharingOptions_1(currentFile)];
                    case 10:
                        _f.sent();
                        _f.label = 11;
                    case 11: return [2 /*return*/, res.send({ file: { id: id } })];
                }
            });
        });
    };
    Files.prototype.uploadCover = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var file, form, requestConfig, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = req.file;
                        form = new form_data_1["default"]();
                        form.append('file', file.buffer, 'gato.jpg');
                        requestConfig = {
                            headers: __assign({}, form.getHeaders())
                        };
                        return [4 /*yield*/, axios_1["default"].post('https://telegra.ph/upload', form, requestConfig)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, res.status(202).send({ url: "https://telegra.ph".concat(data[0].src) })];
                }
            });
        });
    };
    Files.prototype.fileData = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var file, fileSaved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = req.body;
                        return [4 /*yield*/, model_1.prisma.files.create({ data: {
                                    name: file.name,
                                    mime_type: file.mime_type,
                                    size: Number(file.size),
                                    user_id: file.user_id,
                                    type: file.type,
                                    parent_id: file.currentParentId || null,
                                    upload_progress: 0,
                                    file_id: big_integer_1["default"].randBetween('-1e100', '1e100').toString(),
                                    thumbnail: file.thumbnail,
                                    duration: file.duration
                                } })];
                    case 1:
                        fileSaved = _a.sent();
                        return [2 /*return*/, res.status(202).send(fileSaved)];
                }
            });
        });
    };
    Files.prototype.upload = function (req, res) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var _h, name, size, mimetype, parentId, relativePath, totalPart, part, thumbnail, duration, file, model, type, currentParentId, paths, _j, _k, _i, i, path, findFolder, newFolder, uploadPartStatus, uploadPart, error_5, error_6, sendData, data, error_7, forwardInfo, _l, type, peerId, _, accessHash;
            var _this = this;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        _h = req.query, name = _h.name, size = _h.size, mimetype = _h.mime_type, parentId = _h.parent_id, relativePath = _h.relative_path, totalPart = _h.total_part, part = _h.part, thumbnail = _h.thumbnail, duration = _h.duration;
                        if (!name || !size || !mimetype || !part || !totalPart) {
                            throw { status: 400, body: { error: 'Name, size, mimetype, part, and total part are required' } };
                        }
                        file = req.file;
                        if (!file) {
                            throw { status: 400, body: { error: 'File upload is required' } };
                        }
                        if (file.size > 512 * 1024) {
                            throw { status: 400, body: { error: 'Maximum file part size is 500kB' } };
                        }
                        if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, model_1.prisma.files.findUnique({
                                where: { id: req.params.id }
                            })];
                    case 1:
                        model = _m.sent();
                        if (!model) {
                            throw { status: 404, body: { error: 'File not found' } };
                        }
                        return [3 /*break*/, 13];
                    case 2:
                        type = null;
                        if (mimetype.match(/^image/gi)) {
                            type = 'image';
                        }
                        else if (mimetype.match(/^video/gi) || name.match(/\.mp4$/gi) || name.match(/\.mkv$/gi) || name.match(/\.mov$/gi)) {
                            type = 'video';
                        }
                        else if (mimetype.match(/pdf$/gi) || name.match(/\.doc$/gi) || name.match(/\.docx$/gi) || name.match(/\.xls$/gi) || name.match(/\.xlsx$/gi)) {
                            type = 'document';
                        }
                        else if (mimetype.match(/audio$/gi) || name.match(/\.mp3$/gi) || name.match(/\.ogg$/gi)) {
                            type = 'audio';
                        }
                        else {
                            type = 'unknown';
                        }
                        currentParentId = parentId;
                        if (!relativePath) return [3 /*break*/, 8];
                        paths = relativePath.split('/').slice(0, -1) || [];
                        _j = [];
                        for (_k in paths)
                            _j.push(_k);
                        _i = 0;
                        _m.label = 3;
                    case 3:
                        if (!(_i < _j.length)) return [3 /*break*/, 8];
                        i = _j[_i];
                        path = paths[i];
                        return [4 /*yield*/, model_1.prisma.files.findFirst({
                                where: {
                                    AND: [
                                        { type: 'folder' },
                                        { name: path },
                                        { parent_id: currentParentId || null }
                                    ]
                                }
                            })];
                    case 4:
                        findFolder = _m.sent();
                        if (!findFolder) return [3 /*break*/, 5];
                        currentParentId = findFolder.id;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, model_1.prisma.files.create({
                            data: __assign({ name: path, type: 'folder', user_id: req.user.id, mime_type: 'teledrive/folder', uploaded_at: new Date() }, currentParentId ? { parent_id: currentParentId } : {})
                        })];
                    case 6:
                        newFolder = _m.sent();
                        currentParentId = newFolder.id;
                        _m.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 3];
                    case 8: return [4 /*yield*/, model_1.prisma.files.findFirst({
                            where: {
                                name: name,
                                mime_type: mimetype,
                                size: Number(size),
                                user_id: req.user.id,
                                type: type,
                                parent_id: currentParentId || null
                            }
                        })];
                    case 9:
                        model = _m.sent();
                        if (!model) return [3 /*break*/, 11];
                        return [4 /*yield*/, model_1.prisma.files.update({
                                data: {
                                    message_id: null,
                                    uploaded_at: null,
                                    upload_progress: 0
                                },
                                where: { id: model.id }
                            })];
                    case 10:
                        _m.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, model_1.prisma.files.create({
                            data: {
                                name: name,
                                mime_type: mimetype,
                                size: Number(size),
                                user_id: req.user.id,
                                type: type,
                                parent_id: currentParentId || null,
                                upload_progress: 0,
                                file_id: big_integer_1["default"].randBetween('-1e100', '1e100').toString(),
                                forward_info: ((_b = req.user.settings) === null || _b === void 0 ? void 0 : _b.saved_location) || null,
                                thumbnail: thumbnail,
                                duration: duration
                            }
                        })];
                    case 12:
                        model = _m.sent();
                        _m.label = 13;
                    case 13:
                        uploadPart = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.upload.SaveBigFilePart({
                                            fileId: (0, big_integer_1["default"])(model.file_id),
                                            filePart: Number(part),
                                            fileTotalParts: Number(totalPart),
                                            bytes: file.buffer
                                        }))];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); };
                        _m.label = 14;
                    case 14:
                        _m.trys.push([14, 16, , 26]);
                        return [4 /*yield*/, uploadPart()];
                    case 15:
                        uploadPartStatus = _m.sent();
                        return [3 /*break*/, 26];
                    case 16:
                        error_5 = _m.sent();
                        _m.label = 17;
                    case 17:
                        _m.trys.push([17, 21, , 25]);
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 18:
                        _m.sent();
                        return [4 /*yield*/, ((_c = req.tg) === null || _c === void 0 ? void 0 : _c.connect())];
                    case 19:
                        _m.sent();
                        return [4 /*yield*/, uploadPart()];
                    case 20:
                        uploadPartStatus = _m.sent();
                        return [3 /*break*/, 25];
                    case 21:
                        error_6 = _m.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 22:
                        _m.sent();
                        return [4 /*yield*/, ((_d = req.tg) === null || _d === void 0 ? void 0 : _d.connect())];
                    case 23:
                        _m.sent();
                        return [4 /*yield*/, uploadPart()];
                    case 24:
                        uploadPartStatus = _m.sent();
                        return [3 /*break*/, 25];
                    case 25: return [3 /*break*/, 26];
                    case 26: 
                    // model.size = bigInt(model.size).add(file.buffer.length).toString()
                    return [4 /*yield*/, model_1.prisma.files.update({
                            where: { id: model.id },
                            data: {
                                upload_progress: (Number(part) + 1) / Number(totalPart)
                            }
                        })];
                    case 27:
                        // model.size = bigInt(model.size).add(file.buffer.length).toString()
                        _m.sent();
                        if (Number(part) < Number(totalPart) - 1) {
                            return [2 /*return*/, res.status(202).send({ accepted: true, file: { id: model.id }, uploadPartStatus: uploadPartStatus })];
                        }
                        sendData = function (forceDocument) { return __awaiter(_this, void 0, void 0, function () {
                            var peer, _a, type, peerId, _, accessHash;
                            var _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if ((_b = req.user.settings) === null || _b === void 0 ? void 0 : _b.saved_location) {
                                            _a = req.user.settings.saved_location.split('/'), type = _a[0], peerId = _a[1], _ = _a[2], accessHash = _a[3];
                                            if (type === 'channel') {
                                                peer = new teledrive_client_1.Api.InputPeerChannel({
                                                    channelId: (0, big_integer_1["default"])(peerId),
                                                    accessHash: accessHash ? (0, big_integer_1["default"])(accessHash) : null
                                                });
                                            }
                                            else if (type === 'user') {
                                                peer = new teledrive_client_1.Api.InputPeerUser({
                                                    userId: (0, big_integer_1["default"])(peerId),
                                                    accessHash: (0, big_integer_1["default"])(accessHash)
                                                });
                                            }
                                            else if (type === 'chat') {
                                                peer = new teledrive_client_1.Api.InputPeerChat({
                                                    chatId: (0, big_integer_1["default"])(peerId)
                                                });
                                            }
                                        }
                                        return [4 /*yield*/, req.tg.sendFile(peer || 'me', {
                                                file: new teledrive_client_1.Api.InputFileBig({
                                                    id: (0, big_integer_1["default"])(model.file_id),
                                                    parts: Number(totalPart),
                                                    name: model.name
                                                }),
                                                forceDocument: forceDocument,
                                                caption: model.name,
                                                fileSize: Number(model.size),
                                                attributes: forceDocument ? [
                                                    new teledrive_client_1.Api.DocumentAttributeFilename({ fileName: model.name })
                                                ] : undefined,
                                                workers: 1
                                            })];
                                    case 1: return [2 /*return*/, _c.sent()];
                                }
                            });
                        }); };
                        _m.label = 28;
                    case 28:
                        _m.trys.push([28, 30, , 32]);
                        return [4 /*yield*/, sendData(false)];
                    case 29:
                        data = _m.sent();
                        return [3 /*break*/, 32];
                    case 30:
                        error_7 = _m.sent();
                        return [4 /*yield*/, sendData(true)];
                    case 31:
                        data = _m.sent();
                        return [3 /*break*/, 32];
                    case 32:
                        forwardInfo = null;
                        if ((_e = req.user.settings) === null || _e === void 0 ? void 0 : _e.saved_location) {
                            _l = req.user.settings.saved_location.split('/'), type = _l[0], peerId = _l[1], _ = _l[2], accessHash = _l[3];
                            forwardInfo = "".concat(type, "/").concat(peerId, "/").concat((_f = data.id) === null || _f === void 0 ? void 0 : _f.toString(), "/").concat(accessHash);
                        }
                        return [4 /*yield*/, model_1.prisma.files.update({
                                data: __assign({ message_id: (_g = data.id) === null || _g === void 0 ? void 0 : _g.toString(), uploaded_at: data.date ? new Date(data.date * 1000) : null, upload_progress: null }, forwardInfo ? { forward_info: forwardInfo } : {}),
                                where: { id: model.id }
                            })];
                    case 33:
                        _m.sent();
                        return [2 /*return*/, res.status(202).send({ accepted: true, file: { id: model.id } })];
                }
            });
        });
    };
    Files.prototype.uploadBeta = function (req, res) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var _f, name, size, mimetype, parentId, relativePath, totalPart, part, message, thumbnail, duration, model, type, currentParentId, paths, _g, _h, _i, i, path, findFolder, newFolder, forwardInfo, _j, type, peerId, _, accessHash;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _f = req.body, name = _f.name, size = _f.size, mimetype = _f.mime_type, parentId = _f.parent_id, relativePath = _f.relative_path, totalPart = _f.total_part, part = _f.part, message = _f.message, thumbnail = _f.thumbnail, duration = _f.duration;
                        if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, model_1.prisma.files.findUnique({
                                where: { id: req.params.id }
                            })];
                    case 1:
                        model = _k.sent();
                        if (!model) {
                            throw { status: 404, body: { error: 'File not found' } };
                        }
                        _k.label = 2;
                    case 2:
                        if (!!message) return [3 /*break*/, 15];
                        if (!!model) return [3 /*break*/, 13];
                        type = null;
                        if (mimetype.match(/^image/gi)) {
                            type = 'image';
                        }
                        else if (mimetype.match(/^video/gi) || name.match(/\.mp4$/gi) || name.match(/\.mkv$/gi) || name.match(/\.mov$/gi)) {
                            type = 'video';
                        }
                        else if (mimetype.match(/pdf$/gi) || name.match(/\.doc$/gi) || name.match(/\.docx$/gi) || name.match(/\.xls$/gi) || name.match(/\.xlsx$/gi)) {
                            type = 'document';
                        }
                        else if (mimetype.match(/audio$/gi) || name.match(/\.mp3$/gi) || name.match(/\.ogg$/gi)) {
                            type = 'audio';
                        }
                        else {
                            type = 'unknown';
                        }
                        currentParentId = parentId;
                        if (!relativePath) return [3 /*break*/, 8];
                        paths = relativePath.split('/').slice(0, -1) || [];
                        _g = [];
                        for (_h in paths)
                            _g.push(_h);
                        _i = 0;
                        _k.label = 3;
                    case 3:
                        if (!(_i < _g.length)) return [3 /*break*/, 8];
                        i = _g[_i];
                        path = paths[i];
                        return [4 /*yield*/, model_1.prisma.files.findFirst({
                                where: {
                                    AND: [
                                        { type: 'folder' },
                                        { name: path },
                                        { user_id: req.user.id },
                                        { parent_id: currentParentId || null }
                                    ]
                                }
                            })];
                    case 4:
                        findFolder = _k.sent();
                        if (!findFolder) return [3 /*break*/, 5];
                        currentParentId = findFolder.id;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, model_1.prisma.files.create({
                            data: __assign({ name: path, type: 'folder', user_id: req.user.id, mime_type: 'teledrive/folder' }, currentParentId ? { parent_id: currentParentId } : {})
                        })];
                    case 6:
                        newFolder = _k.sent();
                        currentParentId = newFolder.id;
                        _k.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 3];
                    case 8: return [4 /*yield*/, model_1.prisma.files.findFirst({
                            where: {
                                name: name,
                                mime_type: mimetype,
                                size: Number(size),
                                user_id: req.user.id,
                                type: type,
                                parent_id: currentParentId || null
                            }
                        })];
                    case 9:
                        model = _k.sent();
                        if (!model) return [3 /*break*/, 11];
                        return [4 /*yield*/, model_1.prisma.files.update({
                                data: {
                                    message_id: null,
                                    uploaded_at: null,
                                    upload_progress: 0
                                },
                                where: { id: model.id }
                            })];
                    case 10:
                        _k.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, model_1.prisma.files.create({
                            data: {
                                name: name,
                                mime_type: mimetype,
                                size: Number(size),
                                user_id: req.user.id,
                                type: type,
                                parent_id: currentParentId || null,
                                upload_progress: 0,
                                file_id: big_integer_1["default"].randBetween('-1e100', '1e100').toString(),
                                forward_info: ((_b = req.user.settings) === null || _b === void 0 ? void 0 : _b.saved_location) || null,
                                thumbnail: thumbnail,
                                duration: duration
                            }
                        })];
                    case 12:
                        model = _k.sent();
                        _k.label = 13;
                    case 13: 
                    // model.size = bigInt(model.size).add(file.buffer.length).toString()
                    return [4 /*yield*/, model_1.prisma.files.update({
                            data: {
                                upload_progress: (Number(part) + 1) / Number(totalPart)
                            },
                            where: { id: model.id }
                        })
                        // if (Number(part) < Number(totalPart) - 1) {
                    ];
                    case 14:
                        // model.size = bigInt(model.size).add(file.buffer.length).toString()
                        _k.sent();
                        // if (Number(part) < Number(totalPart) - 1) {
                        if (!message) {
                            return [2 /*return*/, res.status(202).send({ accepted: true, file: { id: model.id, file_id: model.file_id, name: model.name, size: model.size, type: model.type } })];
                        }
                        _k.label = 15;
                    case 15:
                        if ((_c = req.user.settings) === null || _c === void 0 ? void 0 : _c.saved_location) {
                            _j = req.user.settings.saved_location.split('/'), type = _j[0], peerId = _j[1], _ = _j[2], accessHash = _j[3];
                            forwardInfo = "".concat(type, "/").concat(peerId, "/").concat((_d = message.id) === null || _d === void 0 ? void 0 : _d.toString(), "/").concat(accessHash);
                        }
                        return [4 /*yield*/, model_1.prisma.files.update({
                                data: __assign({ message_id: (_e = message.id) === null || _e === void 0 ? void 0 : _e.toString(), uploaded_at: message.date ? new Date(message.date * 1000) : null, upload_progress: null }, forwardInfo ? { forward_info: forwardInfo } : {}),
                                where: { id: model.id }
                            })];
                    case 16:
                        _k.sent();
                        return [2 /*return*/, res.status(202).send({ accepted: true, file: { id: model.id, file_id: model.file_id, name: model.name, size: model.size, type: model.type } })];
                }
            });
        });
    };
    Files.prototype.breadcrumbs = function (req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var id, folder, breadcrumbs;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, model_1.prisma.files.findUnique({ where: { id: id } })];
                    case 1:
                        folder = _j.sent();
                        if (!folder) {
                            throw { status: 404, body: { error: 'File not found' } };
                        }
                        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== folder.user_id) {
                            if (!((_b = folder.sharing_options) === null || _b === void 0 ? void 0 : _b.includes('*')) && !((_c = folder.sharing_options) === null || _c === void 0 ? void 0 : _c.includes((_d = req.user) === null || _d === void 0 ? void 0 : _d.username))) {
                                throw { status: 404, body: { error: 'File not found' } };
                            }
                        }
                        breadcrumbs = [folder];
                        _j.label = 2;
                    case 2:
                        if (!folder.parent_id) return [3 /*break*/, 4];
                        return [4 /*yield*/, model_1.prisma.files.findUnique({ where: { id: folder.parent_id } })];
                    case 3:
                        folder = _j.sent();
                        if (!req.user && ((_e = folder.sharing_options) === null || _e === void 0 ? void 0 : _e.includes('*')) || ((_f = folder.sharing_options) === null || _f === void 0 ? void 0 : _f.includes((_g = req.user) === null || _g === void 0 ? void 0 : _g.username)) || folder.user_id === ((_h = req.user) === null || _h === void 0 ? void 0 : _h.id)) {
                            breadcrumbs.push(folder);
                        }
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, res.send({ breadcrumbs: breadcrumbs.reverse() })];
                }
            });
        });
    };
    Files.prototype.sync = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, parentId, limit, peer, _d, type, peerId, _, accessHash, files, found, offsetId, messages, existFiles_1, filesWantToSave;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _c = req.query, parentId = _c.parent_id, limit = _c.limit;
                        if ((_a = req.user.settings) === null || _a === void 0 ? void 0 : _a.saved_location) {
                            _d = req.user.settings.saved_location.split('/'), type = _d[0], peerId = _d[1], _ = _d[2], accessHash = _d[3];
                            if (type === 'channel') {
                                peer = new teledrive_client_1.Api.InputPeerChannel({
                                    channelId: (0, big_integer_1["default"])(peerId),
                                    accessHash: accessHash ? (0, big_integer_1["default"])(accessHash) : null
                                });
                            }
                            else if (type === 'user') {
                                peer = new teledrive_client_1.Api.InputPeerUser({
                                    userId: (0, big_integer_1["default"])(peerId),
                                    accessHash: (0, big_integer_1["default"])(accessHash)
                                });
                            }
                            else if (type === 'chat') {
                                peer = new teledrive_client_1.Api.InputPeerChat({
                                    chatId: (0, big_integer_1["default"])(peerId)
                                });
                            }
                        }
                        files = [];
                        found = true;
                        _e.label = 1;
                    case 1:
                        if (!(files.length < (Number(limit) || 10) && found)) return [3 /*break*/, 3];
                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.GetHistory({
                                peer: peer || 'me',
                                limit: Number(limit) || 10,
                                offsetId: offsetId || 0
                            }))];
                    case 2:
                        messages = _e.sent();
                        if ((_b = messages['messages']) === null || _b === void 0 ? void 0 : _b.length) {
                            offsetId = messages['messages'][messages['messages'].length - 1].id;
                            files = __spreadArray(__spreadArray([], files, true), messages['messages'].filter(function (msg) { var _a, _b; return ((_a = msg === null || msg === void 0 ? void 0 : msg.media) === null || _a === void 0 ? void 0 : _a.photo) || ((_b = msg === null || msg === void 0 ? void 0 : msg.media) === null || _b === void 0 ? void 0 : _b.document); }), true);
                        }
                        else {
                            found = false;
                        }
                        return [3 /*break*/, 1];
                    case 3:
                        files = files.slice(0, Number(limit) || 10);
                        if (!(files === null || files === void 0 ? void 0 : files.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, model_1.prisma.files.findMany({
                                where: {
                                    AND: [
                                        {
                                            message_id: {
                                                "in": files.map(function (file) { return file.id.toString(); })
                                            }
                                        },
                                        { parent_id: parentId || null },
                                        { forward_info: null }
                                    ]
                                }
                            })];
                    case 4:
                        existFiles_1 = _e.sent();
                        filesWantToSave = files.filter(function (file) { return !existFiles_1.find(function (e) { return e.message_id == file.id; }); });
                        if (!(filesWantToSave === null || filesWantToSave === void 0 ? void 0 : filesWantToSave.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, model_1.prisma.files.createMany({
                                data: filesWantToSave.map(function (file) {
                                    var _a, _b, _c, _d, _e, _f, _g;
                                    var mimeType = file.media.photo ? 'image/jpeg' : file.media.document.mimeType || 'unknown';
                                    var name = file.media.photo ? "".concat(file.media.photo.id, ".jpg") : ((_b = (_a = file.media.document.attributes) === null || _a === void 0 ? void 0 : _a.find(function (atr) { return atr.fileName; })) === null || _b === void 0 ? void 0 : _b.fileName) || "".concat((_c = file.media) === null || _c === void 0 ? void 0 : _c.document.id, ".").concat(mimeType.split('/').pop());
                                    var getSizes = function (_a) {
                                        var size = _a.size, sizes = _a.sizes;
                                        return sizes ? sizes.pop() : size;
                                    };
                                    var size = file.media.photo ? getSizes(file.media.photo.sizes.pop()) : (_d = file.media.document) === null || _d === void 0 ? void 0 : _d.size;
                                    var type = file.media.photo || mimeType.match(/^image/gi) ? 'image' : null;
                                    if (((_e = file.media.document) === null || _e === void 0 ? void 0 : _e.mimeType.match(/^video/gi)) || name.match(/\.mp4$/gi) || name.match(/\.mkv$/gi) || name.match(/\.mov$/gi)) {
                                        type = 'video';
                                    }
                                    else if (((_f = file.media.document) === null || _f === void 0 ? void 0 : _f.mimeType.match(/pdf$/gi)) || name.match(/\.doc$/gi) || name.match(/\.docx$/gi) || name.match(/\.xls$/gi) || name.match(/\.xlsx$/gi)) {
                                        type = 'document';
                                    }
                                    else if (((_g = file.media.document) === null || _g === void 0 ? void 0 : _g.mimeType.match(/audio$/gi)) || name.match(/\.mp3$/gi) || name.match(/\.ogg$/gi)) {
                                        type = 'audio';
                                    }
                                    return {
                                        name: name,
                                        message_id: file.id.toString(),
                                        mime_type: mimeType,
                                        size: size,
                                        user_id: req.user.id,
                                        uploaded_at: new Date(file.date * 1000),
                                        type: type,
                                        parent_id: parentId ? parentId.toString() : null
                                    };
                                })
                            })];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6: return [2 /*return*/, res.send({ files: files })];
                }
            });
        });
    };
    Files.prototype.filesSync = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var files, _i, files_1, file, existFile, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = req.body.files;
                        _i = 0, files_1 = files;
                        _a.label = 1;
                    case 1:
                        if (!(_i < files_1.length)) return [3 /*break*/, 7];
                        file = files_1[_i];
                        return [4 /*yield*/, model_1.prisma.files.findFirst({
                                where: {
                                    AND: [
                                        { name: file.name },
                                        { type: file.type },
                                        { size: Number(file.size) || null },
                                        {
                                            parent_id: file.parent_id ? { not: null } : null
                                        }
                                    ]
                                }
                            })];
                    case 2:
                        existFile = _a.sent();
                        if (!!existFile) return [3 /*break*/, 6];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, model_1.prisma.files.create({
                                data: __assign(__assign({}, file), { size: Number(file.size), user_id: req.user.id })
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_8 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, res.status(202).send({ accepted: true })];
                }
            });
        });
    };
    Files.download = function (req, res, files, onlyHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, raw, dl, thumb, asArray, usage, totalFileSize, _b, _, result, cancel, ranges, filename, cachedFiles, getCachedFilesSize, start, end, readStream, readStream_1, downloaded, _loop_1, _i, files_2, file;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.query, raw = _a.raw, dl = _a.dl, thumb = _a.thumb, asArray = _a.as_array;
                        return [4 /*yield*/, model_1.prisma.usages.findFirst({
                                where: {
                                    key: req.user ? "u:".concat(req.user.id) : "ip:".concat(req.headers['cf-connecting-ip'] || req.ip)
                                }
                            })];
                    case 1:
                        usage = _c.sent();
                        if (!!usage) return [3 /*break*/, 3];
                        return [4 /*yield*/, model_1.prisma.usages.create({
                                data: {
                                    key: req.user ? "u:".concat(req.user.id) : "ip:".concat(req.headers['cf-connecting-ip'] || req.ip),
                                    usage: 0,
                                    expire: (0, moment_1["default"])().add(1, 'day').toDate()
                                }
                            })];
                    case 2:
                        usage = _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!(new Date().getTime() - new Date(usage.expire).getTime() > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, model_1.prisma.usages.update({
                                data: {
                                    expire: (0, moment_1["default"])().add(1, 'day').toDate(),
                                    usage: 0
                                },
                                where: { key: usage.key }
                            })];
                    case 4:
                        usage = _c.sent();
                        _c.label = 5;
                    case 5:
                        totalFileSize = files.reduce(function (res, file) { return res.add(file.size || 0); }, (0, big_integer_1["default"])(0));
                        if (!raw || Number(raw) === 0) {
                            _b = files[0], _ = _b.signed_key, result = __rest(_b, ["signed_key"]);
                            return [2 /*return*/, res.send({ file: __assign(__assign({}, result), { password: result.password ? '[REDACTED]' : null }) })];
                        }
                        return [4 /*yield*/, model_1.prisma.usages.update({
                                data: {
                                    usage: (0, big_integer_1["default"])(totalFileSize).add((0, big_integer_1["default"])(usage.usage)).toJSNumber()
                                },
                                where: { key: usage.key }
                            })];
                    case 6:
                        usage = _c.sent();
                        if (asArray === '1') {
                            return [2 /*return*/, res.send({ files: files })];
                        }
                        console.log(req.headers.range);
                        cancel = false;
                        req.on('close', function () { return cancel = true; });
                        ranges = req.headers.range ? req.headers.range.replace(/bytes\=/gi, '').split('-').map(Number) : null;
                        if (onlyHeaders)
                            return [2 /*return*/, res.status(200)];
                        filename = function (prefix) {
                            if (prefix === void 0) { prefix = ''; }
                            return "".concat(CACHE_DIR, "/").concat(prefix).concat(totalFileSize.toString(), "_").concat(files[0].name);
                        };
                        try {
                            (0, fs_1.mkdirSync)("".concat(CACHE_DIR), { recursive: true });
                        }
                        catch (error) {
                            // ignore
                        }
                        cachedFiles = function () { return (0, fs_1.readdirSync)("".concat(CACHE_DIR))
                            .filter(function (filename) {
                            return (0, fs_1.statSync)("".concat(CACHE_DIR, "/").concat(filename)).isFile();
                        }).sort(function (a, b) {
                            return new Date((0, fs_1.statSync)("".concat(CACHE_DIR, "/").concat(a)).birthtime).getTime()
                                - new Date((0, fs_1.statSync)("".concat(CACHE_DIR, "/").concat(b)).birthtime).getTime();
                        }); };
                        getCachedFilesSize = function () { return cachedFiles().reduce(function (res, file) { return res + (0, fs_1.statSync)("".concat(CACHE_DIR, "/").concat(file)).size; }, 0); };
                        if ((0, fs_1.existsSync)(filename())) {
                            if (ranges) {
                                start = ranges[0];
                                end = ranges[1] ? ranges[1] : totalFileSize.toJSNumber() - 1;
                                readStream = (0, fs_1.createReadStream)(filename(), { start: start, end: end });
                                res.writeHead(206, {
                                    'Cache-Control': 'public, max-age=604800',
                                    'ETag': Buffer.from("".concat(files[0].id, ":").concat(files[0].message_id)).toString('base64'),
                                    'Content-Range': "bytes ".concat(start, "-").concat(end, "/").concat(totalFileSize),
                                    'Content-Disposition': (0, content_disposition_1["default"])(files[0].name.replace(/\.part\d+$/gi, ''), { type: Number(dl) === 1 ? 'attachment' : 'inline' }),
                                    'Content-Type': files[0].mime_type,
                                    'Content-Length': end - start + 1,
                                    'Accept-Ranges': 'bytes'
                                });
                                readStream.pipe(res);
                            }
                            else {
                                res.writeHead(206, {
                                    'Cache-Control': 'public, max-age=604800',
                                    'ETag': Buffer.from("".concat(files[0].id, ":").concat(files[0].message_id)).toString('base64'),
                                    'Content-Range': "bytes */".concat(totalFileSize),
                                    'Content-Disposition': (0, content_disposition_1["default"])(files[0].name.replace(/\.part\d+$/gi, ''), { type: Number(dl) === 1 ? 'attachment' : 'inline' }),
                                    'Content-Type': files[0].mime_type,
                                    'Content-Length': totalFileSize.toString(),
                                    'Accept-Ranges': 'bytes'
                                });
                                readStream_1 = (0, fs_1.createReadStream)(filename());
                                readStream_1
                                    .on('open', function () { return readStream_1.pipe(res); })
                                    .on('error', function (msg) { return res.end(msg); });
                            }
                            return [2 /*return*/];
                        }
                        // res.setHeader('Cache-Control', 'public, max-age=604800')
                        // res.setHeader('ETag', Buffer.from(`${files[0].id}:${files[0].message_id}`).toString('base64'))
                        res.setHeader('Content-Range', "bytes */".concat(totalFileSize));
                        res.setHeader('Content-Disposition', (0, content_disposition_1["default"])(files[0].name.replace(/\.part\d+$/gi, ''), { type: Number(dl) === 1 ? 'attachment' : 'inline' }));
                        res.setHeader('Content-Type', files[0].mime_type);
                        res.setHeader('Content-Length', totalFileSize.toString());
                        res.setHeader('Accept-Ranges', 'bytes');
                        downloaded = 0;
                        try {
                            (0, fs_1.writeFileSync)(filename('process-'), '');
                        }
                        catch (error) {
                            // ignore
                        }
                        _loop_1 = function (file) {
                            var chat, _e, type, peerId, id, accessHash, peer, getData, error_9;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        if (!(file.forward_info && file.forward_info.match(/^channel\//gi))) return [3 /*break*/, 3];
                                        _e = file.forward_info.split('/'), type = _e[0], peerId = _e[1], id = _e[2], accessHash = _e[3];
                                        peer = void 0;
                                        if (!(type === 'channel')) return [3 /*break*/, 2];
                                        peer = new teledrive_client_1.Api.InputPeerChannel({
                                            channelId: (0, big_integer_1["default"])(peerId),
                                            accessHash: (0, big_integer_1["default"])(accessHash)
                                        });
                                        return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.channels.GetMessages({
                                                channel: peer,
                                                id: [new teledrive_client_1.Api.InputMessageID({ id: Number(id) })]
                                            }))];
                                    case 1:
                                        chat = _f.sent();
                                        _f.label = 2;
                                    case 2: return [3 /*break*/, 5];
                                    case 3: return [4 /*yield*/, req.tg.invoke(new teledrive_client_1.Api.messages.GetMessages({
                                            id: [new teledrive_client_1.Api.InputMessageID({ id: Number(file.message_id) })]
                                        }))];
                                    case 4:
                                        chat = _f.sent();
                                        _f.label = 5;
                                    case 5:
                                        getData = function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, req.tg.downloadMedia(chat['messages'][0].media, __assign(__assign({}, thumb ? { thumb: 0 } : {}), { outputFile: {
                                                                write: function (buffer) {
                                                                    downloaded += buffer.length;
                                                                    if (cancel) {
                                                                        throw { status: 422, body: { error: 'canceled' } };
                                                                    }
                                                                    else {
                                                                        console.log("".concat(chat['messages'][0].id, " ").concat(downloaded, "/").concat(chat['messages'][0].media.document.size, " (").concat(downloaded / Number(chat['messages'][0].media.document.size), ")"));
                                                                        try {
                                                                            (0, fs_1.appendFileSync)(filename('process-'), buffer);
                                                                        }
                                                                        catch (error) {
                                                                            // ignore
                                                                        }
                                                                        res.write(buffer);
                                                                    }
                                                                },
                                                                close: function () {
                                                                    console.log("".concat(chat['messages'][0].id, " ").concat(downloaded, "/").concat(chat['messages'][0].media.document.size, " (").concat(downloaded / Number(chat['messages'][0].media.document.size), ")"), '-end-');
                                                                    try {
                                                                        var size = (0, fs_1.statSync)(filename('process-')).size;
                                                                        if (totalFileSize.gt((0, big_integer_1["default"])(size))) {
                                                                            (0, fs_1.rmSync)(filename('process-'));
                                                                        }
                                                                        else {
                                                                            (0, fs_1.renameSync)(filename('process-'), filename());
                                                                        }
                                                                    }
                                                                    catch (error) {
                                                                        // ignore
                                                                    }
                                                                    res.end();
                                                                }
                                                            } }))];
                                                    case 1: return [2 /*return*/, _a.sent()];
                                                }
                                            });
                                        }); };
                                        _f.label = 6;
                                    case 6:
                                        _f.trys.push([6, 8, , 9]);
                                        return [4 /*yield*/, getData()];
                                    case 7:
                                        _f.sent();
                                        return [3 /*break*/, 9];
                                    case 8:
                                        error_9 = _f.sent();
                                        console.log(error_9);
                                        return [3 /*break*/, 9];
                                    case 9: return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, files_2 = files;
                        _c.label = 7;
                    case 7:
                        if (!(_i < files_2.length)) return [3 /*break*/, 10];
                        file = files_2[_i];
                        return [5 /*yield**/, _loop_1(file)];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10: return [4 /*yield*/, model_1.prisma.usages.update({
                            data: {
                                usage: (0, big_integer_1["default"])(totalFileSize).add((0, big_integer_1["default"])(usage.usage)).toJSNumber()
                            },
                            where: { key: usage.key }
                        })];
                    case 11:
                        usage = _c.sent();
                        while (Constant_1.CACHE_FILES_LIMIT < getCachedFilesSize()) {
                            try {
                                (0, fs_1.rmSync)("".concat(CACHE_DIR, "/").concat(cachedFiles()[0]));
                            }
                            catch (_d) {
                                // ignore
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Files.initiateSessionTG = function (req, files) {
        return __awaiter(this, void 0, void 0, function () {
            var data, session;
            return __generator(this, function (_a) {
                if (!(files === null || files === void 0 ? void 0 : files.length)) {
                    throw { status: 404, body: { error: 'File not found' } };
                }
                try {
                    data = JSON.parse(crypto_js_1.AES.decrypt(files[0].signed_key, Constant_1.FILES_JWT_SECRET).toString(crypto_js_1.enc.Utf8));
                }
                catch (error) {
                    throw { status: 401, body: { error: 'Invalid token' } };
                }
                try {
                    session = new sessions_1.StringSession(data.session);
                    req.tg = new teledrive_client_1.TelegramClient(session, Constant_1.TG_CREDS.apiId, Constant_1.TG_CREDS.apiHash, __assign({ connectionRetries: Constant_1.CONNECTION_RETRIES, useWSS: false }, process.env.ENV === 'production' ? { baseLogger: new teledrive_client_1.Logger(Logger_1.LogLevel.NONE) } : {}));
                }
                catch (error) {
                    throw { status: 401, body: { error: 'Invalid key' } };
                }
                return [2 /*return*/, files];
            });
        });
    };
    var Files_1;
    __decorate([
        Endpoint_1.Endpoint.GET('/', { middlewares: [Auth_1.AuthMaybe] })
    ], Files.prototype, "find");
    __decorate([
        Endpoint_1.Endpoint.GET('/stats', { middlewares: [Auth_1.Auth] })
    ], Files.prototype, "stats");
    __decorate([
        Endpoint_1.Endpoint.POST('/', { middlewares: [Auth_1.Auth] })
    ], Files.prototype, "save");
    __decorate([
        Endpoint_1.Endpoint.POST({ middlewares: [Auth_1.Auth] })
    ], Files.prototype, "addFolder");
    __decorate([
        Endpoint_1.Endpoint.GET('/:id', { middlewares: [Auth_1.AuthMaybe] })
    ], Files.prototype, "retrieve");
    __decorate([
        Endpoint_1.Endpoint.DELETE('/:id', { middlewares: [Auth_1.Auth] })
    ], Files.prototype, "remove");
    __decorate([
        Endpoint_1.Endpoint.PATCH('/:id', { middlewares: [Auth_1.Auth] })
    ], Files.prototype, "update");
    __decorate([
        Endpoint_1.Endpoint.POST('/upload-cover', { middlewares: [Auth_1.Auth, (0, multer_1["default"])().single('file')] })
    ], Files.prototype, "uploadCover");
    __decorate([
        Endpoint_1.Endpoint.POST('/file-data')
    ], Files.prototype, "fileData");
    __decorate([
        Endpoint_1.Endpoint.POST('/upload/:id?', { middlewares: [Auth_1.Auth, (0, multer_1["default"])().single('upload')] })
    ], Files.prototype, "upload");
    __decorate([
        Endpoint_1.Endpoint.POST('/uploadBeta/:id?', { middlewares: [Auth_1.Auth] })
    ], Files.prototype, "uploadBeta");
    __decorate([
        Endpoint_1.Endpoint.GET('/breadcrumbs/:id', { middlewares: [Auth_1.AuthMaybe] })
    ], Files.prototype, "breadcrumbs");
    __decorate([
        Endpoint_1.Endpoint.POST('/sync', { middlewares: [Auth_1.Auth] })
    ], Files.prototype, "sync");
    __decorate([
        Endpoint_1.Endpoint.POST('/filesSync', { middlewares: [Auth_1.Auth] })
    ], Files.prototype, "filesSync");
    Files = Files_1 = __decorate([
        Endpoint_1.Endpoint.API()
    ], Files);
    return Files;
}());
exports.Files = Files;
