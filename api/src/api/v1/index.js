"use strict";
exports.__esModule = true;
exports.V1 = void 0;
var express_1 = require("express");
var Endpoint_1 = require("../base/Endpoint");
var Auth_1 = require("./Auth");
var Config_1 = require("./Config");
var Dialogs_1 = require("./Dialogs");
var Files_1 = require("./Files");
var Messages_1 = require("./Messages");
var Users_1 = require("./Users");
var Utils_1 = require("./Utils");
exports.V1 = (0, express_1.Router)()
    .use(Endpoint_1.Endpoint.register(Auth_1.Auth, Users_1.Users, Files_1.Files, Dialogs_1.Dialogs, Messages_1.Messages, Utils_1.Utils, Config_1.Config));
