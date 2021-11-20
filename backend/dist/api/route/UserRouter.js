"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const router = (0, express_1.Router)();
router.use('users/join', controllers_1.UserController.join);
router.use('/users/login', controllers_1.UserController.login);
exports.default = router;
