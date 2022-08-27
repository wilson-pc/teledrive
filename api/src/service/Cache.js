"use strict";
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
exports.Redis = void 0;
var ioredis_1 = require("ioredis");
var Redis = /** @class */ (function () {
    function Redis() {
        this.redis = process.env.REDIS_URI ? new ioredis_1["default"](process.env.REDIS_URI) : null;
    }
    Redis.connect = function () {
        var _a, _b, _c;
        if (!this.client) {
            this.client = new Redis();
        }
        (_a = this.client.redis) === null || _a === void 0 ? void 0 : _a.on('connect', function () { return console.log('redis: connected'); });
        (_b = this.client.redis) === null || _b === void 0 ? void 0 : _b.on('ready', function () { return console.log('redis: ready'); });
        (_c = this.client.redis) === null || _c === void 0 ? void 0 : _c.on('error', console.error);
        return this.client;
    };
    Redis.prototype.get = function (key) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.redis) === null || _a === void 0 ? void 0 : _a.get(key))];
                    case 1:
                        result = _b.sent();
                        if (!result)
                            return [2 /*return*/, null];
                        try {
                            return [2 /*return*/, JSON.parse(result)];
                        }
                        catch (error) {
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Redis.prototype.set = function (key, data, ex) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 5, , 10]);
                        if (!ex) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_a = this.redis) === null || _a === void 0 ? void 0 : _a.set(key, JSON.stringify(data), 'EX', ex))];
                    case 1: return [2 /*return*/, (_e.sent()) === 'OK'];
                    case 2: return [4 /*yield*/, ((_b = this.redis) === null || _b === void 0 ? void 0 : _b.set(key, JSON.stringify(data)))];
                    case 3: return [2 /*return*/, (_e.sent()) === 'OK'];
                    case 4: return [3 /*break*/, 10];
                    case 5:
                        error_1 = _e.sent();
                        if (!ex) return [3 /*break*/, 7];
                        return [4 /*yield*/, ((_c = this.redis) === null || _c === void 0 ? void 0 : _c.set(key, data, 'EX', ex))];
                    case 6: return [2 /*return*/, (_e.sent()) === 'OK'];
                    case 7: return [4 /*yield*/, ((_d = this.redis) === null || _d === void 0 ? void 0 : _d.set(key, data))];
                    case 8: return [2 /*return*/, (_e.sent()) === 'OK'];
                    case 9: return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Redis.prototype.del = function (key) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.redis) === null || _a === void 0 ? void 0 : _a.del(key))];
                    case 1: return [2 /*return*/, (_b.sent()) === 1];
                }
            });
        });
    };
    Redis.prototype.getFromCacheFirst = function (key, fn, ex) {
        return __awaiter(this, void 0, void 0, function () {
            var result, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 6]);
                        return [4 /*yield*/, this.get(key)];
                    case 1:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, result];
                        return [4 /*yield*/, fn()];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, this.set(key, data, ex)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, data];
                    case 4:
                        error_2 = _a.sent();
                        return [4 /*yield*/, fn()];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Redis;
}());
exports.Redis = Redis;
