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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import bcrypt from "bcryptjs";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const errorGenerator_1 = __importDefault(require("../errors/errorGenerator"));
// import gravatar from 'gravatar';
const express_validator_1 = require("express-validator");
const services_1 = require("../services");
// const router = express.Router();
// import auth from "../api/middleware/auth";
// import User from "../models/User";
const join = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, express_validator_1.check)("username", "Name is required").not().isEmpty();
    (0, express_validator_1.check)("phone", "phone is required").not().isEmpty();
    (0, express_validator_1.check)("birth", "birth is required").not().isEmpty();
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail();
    (0, express_validator_1.check)("password", "Please enter a password with 8 or more characters").isLength({ min: 8 });
    const { username, email, password, birth, phone, address } = req.body;
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const foundUser = yield services_1.UserService.findEmail({ email });
        if (foundUser)
            (0, errorGenerator_1.default)({ statusCode: 409 }); // 이미 가입한 유저
        const createdUser = yield services_1.UserService.createUser({ username, email, password, phone, address, birth });
        const payload = {
            user: {
                email: createdUser.email,
            },
        };
        jsonwebtoken_1.default.join(payload, config_1.default.jwtSecret, { expiresIn: 36000 }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    alert('들어옴');
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail();
    (0, express_validator_1.check)("password", "password is required").exists();
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return (0, errorGenerator_1.default)({ statusCode: 400 });
        const { email } = req.body;
        const user = yield services_1.UserService.findEmail({ email });
        if (!user) {
            return (0, errorGenerator_1.default)({ statusCode: 401 });
        }
        const payload = {
            user: {
                email: user.email,
            },
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: 36000 }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    join,
    login
};
