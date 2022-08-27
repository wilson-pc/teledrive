"use strict";
exports.__esModule = true;
exports.API = void 0;
var express_1 = require("express");
var v1_1 = require("./v1");
exports.API = (0, express_1.Router)()
    .use('/v1', v1_1.V1);
