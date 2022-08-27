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
require("source-map-support/register");
require('dotenv').config({ path: '.env' });
var axios_1 = require("axios");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
// import compression from 'compression'
var curly_express_1 = require("curly-express");
var express_1 = require("express");
var express_list_endpoints_1 = require("express-list-endpoints");
var morgan_1 = require("morgan");
var path_1 = require("path");
var serialize_error_1 = require("serialize-error");
var serverless_http_1 = require("serverless-http");
var api_1 = require("./api");
var Cache_1 = require("./service/Cache");
var StringParser_1 = require("./utils/StringParser");
BigInt.prototype.toJSON = function () {
    return this.toString();
};
Cache_1.Redis.connect();
var curl = (0, curly_express_1.cURL)({ attach: true });
var app = (0, express_1["default"])();
app.set('trust proxy', 1);
app.use((0, cors_1["default"])({
    credentials: true,
    origin: [
        /.*/
    ]
}));
// app.use(compression())
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, express_1.raw)());
app.use((0, cookie_parser_1["default"])());
if (process.env.ENV !== 'production') {
    app.use((0, morgan_1["default"])('tiny'));
}
app.use(curl);
app.get('/ping', function (_, res) { return res.send({ pong: true }); });
app.get('/security.txt', function (_, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Contact: security@teledriveapp.com\nPreferred-Languages: en, id');
});
app.use('/api', api_1.API);
// error handler
app.use(function (err, req, res, __) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (process.env.ENV !== 'production') {
                    console.error(err);
                }
                if (!((err.status || 500) >= 500)) return [3 /*break*/, 4];
                if (!(process.env.TG_BOT_TOKEN && (process.env.TG_BOT_ERROR_REPORT_ID || process.env.TG_BOT_OWNER_ID))) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1["default"].post("https://api.telegram.org/bot".concat(process.env.TG_BOT_TOKEN, "/sendMessage"), {
                        chat_id: process.env.TG_BOT_ERROR_REPORT_ID || process.env.TG_BOT_OWNER_ID,
                        parse_mode: 'Markdown',
                        text: "\uD83D\uDD25 *".concat((0, StringParser_1.markdownSafe)(err.body.error || err.message || 'Unknown error'), "*\n\n`[").concat(err.status || 500, "] ").concat((0, StringParser_1.markdownSafe)(req.protocol + '://' + req.get('host') + req.originalUrl), "`\n\n```\n").concat(JSON.stringify((0, serialize_error_1.serializeError)(err), null, 2), "\n```\n\n```\n").concat(req['_curl'], "\n```")
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                if (process.env.ENV !== 'production') {
                    console.error(error_1);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, res.status(err.status || 500).send(err.body || { error: 'Something error', details: (0, serialize_error_1.serializeError)(err) })];
        }
    });
}); });
// serve web
app.use((0, express_1.static)(path_1["default"].join(__dirname, '..', '..', 'web', 'build')));
app.use(function (req, res) {
    try {
        if (req.headers['accept'] !== 'application/json') {
            return res.sendFile(path_1["default"].join(__dirname, '..', '..', 'web', 'build', 'index.html'));
        }
        return res.status(404).send({ error: 'Not found' });
    }
    catch (error) {
        return res.send({ empty: true });
    }
});
app.listen(process.env.PORT || 4000, function () { return console.log("Running at :".concat(process.env.PORT || 4000, "...")); });
console.log((0, express_list_endpoints_1["default"])(app));
module.exports = app;
module.exports.handler = (0, serverless_http_1["default"])(app);
