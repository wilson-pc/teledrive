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
exports.buildSort = exports.buildWhereQuery = exports.filterQuery = void 0;
var querystring_1 = require("querystring");
function filterQuery(base, query) {
    return __awaiter(this, void 0, void 0, function () {
        var page, size, filters, _i, _a, param, _b, column, op, col, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    page = query.page, size = query.size, filters = __rest(query, ["page", "size"]);
                    for (_i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
                        param = _a[_i];
                        _b = param.split(/(.+)\./).slice(1), column = _b[0], op = _b[1];
                        if (param.match(/^sort\./gi)) {
                            col = param.replace(/^sort\./gi, '');
                            base = base.order(col, {
                                ascending: filters[param].toLowerCase() === 'asc' || filters[param].toLowerCase() === 'ascending'
                            });
                        }
                        else {
                            base = base.filter(column, op || 'eq', filters[param]);
                        }
                    }
                    if (page && size) {
                        base = base.range(Number(size) * Number(page), Number(size) * Number(page) + Number(size) - 1);
                    }
                    return [4 /*yield*/, base];
                case 1:
                    result = _c.sent();
                    if (result.error) {
                        throw { status: result.status, body: { error: result.error.message, details: result } };
                    }
                    return [2 /*return*/, result.data];
            }
        });
    });
}
exports.filterQuery = filterQuery;
function buildWhereQuery(data, prefix, join) {
    if (prefix === void 0) { prefix = ''; }
    if (join === void 0) { join = 'and'; }
    var res = Object.keys(data).reduce(function (res, key) {
        var item = '';
        var _a = key.split(/(.+)\./).filter(Boolean), column = _a[0], op = _a[1];
        var value = data[key];
        try {
            value = value ? (0, querystring_1.unescape)(value) : value;
        }
        catch (error) {
            // ignore
        }
        if (!op) {
            item = "".concat(prefix).concat(column, " = '").concat(value.trim(), "'");
        }
        else if (op === 'lt') {
            item = "".concat(prefix).concat(column, " < '").concat(value.trim(), "'");
        }
        else if (op === 'lte') {
            item = "".concat(prefix).concat(column, " <= '").concat(value.trim(), "'");
        }
        else if (op === 'gt') {
            item = "".concat(prefix).concat(column, " > '").concat(value.trim(), "'");
        }
        else if (op === 'gte') {
            item = "".concat(prefix).concat(column, " >= '").concat(value.trim(), "'");
        }
        else if (op === 'between') {
            var _b = value.trim().split('_'), from = _b[0], to = _b[1];
            item = "".concat(prefix).concat(column, " between '").concat(from.trim(), "' and '").concat(to.trim(), "'");
        }
        else if (op === 'match') {
            item = "".concat(prefix).concat(column, " ~ '").concat(value.trim(), "'");
        }
        else if (op === 'notmatch') {
            item = "".concat(prefix).concat(column, " !~ '").concat(value.trim(), "'");
        }
        else if (op === 'like') {
            item = "".concat(prefix).concat(column, " like '").concat(value.trim(), "'");
        }
        else if (op === 'ilike') {
            item = "".concat(prefix).concat(column, " ilike '").concat(value.trim(), "'");
        }
        else {
            item = "".concat(prefix).concat(column, " ").concat(op, " ").concat(value.trim());
        }
        return __spreadArray(__spreadArray([], res, true), [item], false);
    }, []).join(" ".concat(join, " "));
    return res;
}
exports.buildWhereQuery = buildWhereQuery;
function buildSort(sort, prefix) {
    if (prefix === void 0) { prefix = ''; }
    return (sort === null || sort === void 0 ? void 0 : sort.split(',').reduce(function (res, data) {
        var _a;
        var _b = data.split(':'), column = _b[0], order = _b[1];
        return __assign(__assign({}, res), (_a = {}, _a["".concat(prefix).concat(column)] = (order === null || order === void 0 ? void 0 : order.toLowerCase()) || 'asc', _a));
    }, {})) || {};
}
exports.buildSort = buildSort;
