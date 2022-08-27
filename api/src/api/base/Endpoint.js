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
exports.Endpoint = void 0;
var express_1 = require("express");
var serialize_error_1 = require("serialize-error");
exports.Endpoint = {
    _handlers: [],
    register: function () {
        var _this = this;
        var _a;
        var _classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _classes[_i] = arguments[_i];
        }
        var router = (0, express_1.Router)();
        for (var _b = 0, _c = (_a = this._handlers) === null || _a === void 0 ? void 0 : _a.filter(function (handler) { return !!handler.basepath; }); _b < _c.length; _b++) {
            var route = _c[_b];
            router[route.method].apply(router, __spreadArray(__spreadArray(["".concat(route.basepath).concat(route.path)], (route.middlewares || []).map(function (middleware) { return _this.RequestWrapper(middleware); }), false), [route.handler], false));
        }
        return router;
    },
    API: function (basepath) {
        var _this = this;
        return function (cls) {
            _this._handlers = _this._handlers.map(function (handler) { return (__assign(__assign({}, handler), { basepath: handler.basepath || basepath || "/".concat(cls.name[0].toLowerCase()).concat(cls.name.slice(1)) })); });
        };
    },
    USE: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (_, method, descriptor) {
            _this._handlers.push(_this._buildRouteHandler.apply(_this, __spreadArray(['use', method, descriptor], args, false)));
        };
    },
    GET: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (_, method, descriptor) {
            _this._handlers.push(_this._buildRouteHandler.apply(_this, __spreadArray(['get', method, descriptor], args, false)));
        };
    },
    HEAD: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (_, method, descriptor) {
            _this._handlers.push(_this._buildRouteHandler.apply(_this, __spreadArray(['head', method, descriptor], args, false)));
        };
    },
    POST: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (_, method, descriptor) {
            _this._handlers.push(_this._buildRouteHandler.apply(_this, __spreadArray(['post', method, descriptor], args, false)));
        };
    },
    PATCH: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (_, method, descriptor) {
            _this._handlers.push(_this._buildRouteHandler.apply(_this, __spreadArray(['patch', method, descriptor], args, false)));
        };
    },
    PUT: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (_, method, descriptor) {
            _this._handlers.push(_this._buildRouteHandler.apply(_this, __spreadArray(['put', method, descriptor], args, false)));
        };
    },
    DELETE: function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (_, method, descriptor) {
            _this._handlers.push(_this._buildRouteHandler.apply(_this, __spreadArray(['delete', method, descriptor], args, false)));
        };
    },
    RequestWrapper: function (target) {
        return function (req, res, next) {
            return __awaiter(this, void 0, void 0, function () {
                var trial, execute;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            trial = 0;
                            execute = function () { return __awaiter(_this, void 0, void 0, function () {
                                var error_1, isValidCode;
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _c.trys.push([0, 2, , 6]);
                                            return [4 /*yield*/, target(req, res, next)];
                                        case 1: return [2 /*return*/, _c.sent()];
                                        case 2:
                                            error_1 = _c.sent();
                                            if (!(/.*You need to call \.connect\(\)/gi.test(error_1.message) && trial < 5)) return [3 /*break*/, 5];
                                            return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, ++trial * 1000); })];
                                        case 3:
                                            _c.sent();
                                            (_a = req.tg) === null || _a === void 0 ? void 0 : _a.connect();
                                            return [4 /*yield*/, execute()];
                                        case 4: return [2 /*return*/, _c.sent()];
                                        case 5:
                                            if (process.env.ENV !== 'production') {
                                                console.error('RequestWrapper', error_1);
                                            }
                                            (_b = req.tg) === null || _b === void 0 ? void 0 : _b.disconnect();
                                            isValidCode = error_1.code && Number(error_1.code) > 99 && Number(error_1.code) < 599;
                                            return [2 /*return*/, next(error_1.code ? {
                                                    status: isValidCode ? error_1.code : 500, body: {
                                                        error: error_1.message, details: (0, serialize_error_1.serializeError)(error_1)
                                                    }
                                                } : error_1)];
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); };
                            return [4 /*yield*/, execute()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
    },
    _buildRouteHandler: function (method, route, descriptor) {
        var _a, _b;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        // get path
        var path = "/".concat(route[0].toLowerCase()).concat(route.slice(1));
        if (args[0]) {
            if (typeof args[0] === 'string') {
                path = args[0];
            }
            else if ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.path) {
                path = args[0].path;
            }
        }
        else if ((_b = args[1]) === null || _b === void 0 ? void 0 : _b.path) {
            path = args[1].path;
        }
        // build opts
        var opts = {};
        if (args[0] && typeof args[0] === 'object') {
            opts = args[0];
        }
        else if (args[1]) {
            opts = args[1];
        }
        return __assign(__assign({}, opts), { method: method, basepath: null, path: path, handler: function (req, res, next) {
                return __awaiter(this, void 0, void 0, function () {
                    var trial, execute;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                trial = 0;
                                execute = function () { return __awaiter(_this, void 0, void 0, function () {
                                    var error_2, isValidCode;
                                    var _a, _b, _c;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                _d.trys.push([0, 2, , 6]);
                                                return [4 /*yield*/, descriptor.value(req, res, next)];
                                            case 1:
                                                _d.sent();
                                                (_a = req.tg) === null || _a === void 0 ? void 0 : _a.disconnect();
                                                return [3 /*break*/, 6];
                                            case 2:
                                                error_2 = _d.sent();
                                                if (!(/.*You need to call \.connect\(\)/gi.test(error_2.message) && trial < 5)) return [3 /*break*/, 5];
                                                return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, ++trial * 1000); })];
                                            case 3:
                                                _d.sent();
                                                (_b = req.tg) === null || _b === void 0 ? void 0 : _b.connect();
                                                return [4 /*yield*/, execute()];
                                            case 4: return [2 /*return*/, _d.sent()];
                                            case 5:
                                                if (process.env.ENV !== 'production') {
                                                    console.error('handler', error_2.message);
                                                }
                                                (_c = req.tg) === null || _c === void 0 ? void 0 : _c.disconnect();
                                                isValidCode = error_2.code && Number(error_2.code) > 99 && Number(error_2.code) < 599;
                                                return [2 /*return*/, next(error_2.code ? {
                                                        status: isValidCode ? error_2.code : 500, body: {
                                                            error: error_2.message, details: (0, serialize_error_1.serializeError)(error_2)
                                                        }
                                                    } : error_2)];
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); };
                                return [4 /*yield*/, execute()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            } });
    }
};
