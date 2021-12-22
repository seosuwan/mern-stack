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
const errorGenerator_1 = __importDefault(require("../errors/errorGenerator"));
const express_validator_1 = require("express-validator");
const services_1 = require("../services");
// const router = express.Router();
// import auth from "../api/middleware/auth";
// import User from "../models/User";
// import token from "jsonwebtoken";
const modify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("서버 들어옴~~");
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return console.log("에러남"), (0, errorGenerator_1.default)({ statusCode: 400 });
        // console.log(`************${email}`)
        const { email, username, password, address, birth, job, phone, user_interests } = req.body;
        const modifyUser = yield services_1.UserService.modifyUser({ email, username, password, address, birth, job, phone, user_interests });
        if (!modifyUser) {
            return console.log("회원 수정 실패"), (0, errorGenerator_1.default)({ statusCode: 401 });
        }
        console.log(modifyUser);
        return res.status(201).json(modifyUser);
    }
    catch (err) {
        next(err);
    }
});
const exist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { email }: IUserInPutDTO = req.body;
    // console.log(req.url.substr(1))
    // console.log('email: ' + email)
    // console.log("중복체크와썹?")
    // console.log(check("email").isEmpty());
    try {
        // console.log(req)
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return console.log("에러남"), (0, errorGenerator_1.default)({ statusCode: 400 });
        const email = req.url.substring(1);
        // console.log(`************${email}`)
        const foundEmail = yield services_1.UserService.findEmail({ email });
        console.log(foundEmail);
        if (foundEmail) {
            return console.log("이메일 찾았음"), (0, errorGenerator_1.default)({ statusCode: 401 });
        }
        console.log(foundEmail);
        return res.status(201).json(foundEmail);
    }
    catch (err) {
        next(err);
    }
});
// const token = 'MySecretKey1$1$234';
const join = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("**********여기 회원가입");
    (0, express_validator_1.check)("username", "Name is required").not().isEmpty();
    (0, express_validator_1.check)("phone", "phone is required").not().isEmpty();
    (0, express_validator_1.check)("birth", "birth is required").not().isEmpty();
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail();
    (0, express_validator_1.check)("password", "Please enter a password with 8 or more characters").isLength({ min: 8 });
    const { username, email, password, birth, phone, address, user_interests, job } = req.body;
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            return console.log("비어서와씀?/"), res.status(400).json({ errors: errors.array() });
        }
        const foundUser = yield services_1.UserService.findLogin({ email, password });
        if (foundUser)
            (0, errorGenerator_1.default)({ statusCode: 409 }); // 이미 가입한 유저 //
        const createdUser = yield services_1.UserService.createUser({
            username, email, password, phone, address, birth, user_interests,
            job
        });
        res.status(201).json({ message: 'created', createdUserEmail: createdUser.email });
        // const payload = {
        //     user: {
        //         email: createdUser.email,
        //     },
        // };
        // console.log("jwt============================")
        // const token = jwt.sign(
        //     payload,
        //     config.jwtSecret,
        //     { expiresIn: "7d" },
        //     (err, token) => {
        //         if(err) throw err;
        //         res.json({ token });
        //     }
        // );
        // console.log(`=================${JSON.stringify(jwt.JsonWebTokenError)}`)
    }
    catch (err) {
        next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("로그인 들어와따 ");
    // console.log(req.body)
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail();
    (0, express_validator_1.check)("password", "password is required").exists();
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return (0, errorGenerator_1.default)({ statusCode: 400 });
        const { email, password } = req.body;
        const user = yield services_1.UserService.findLogin({ email, password });
        console.log(`user type: ${typeof user}`);
        console.log(user);
        if (!user) {
            return (0, errorGenerator_1.default)({ statusCode: 401 });
        }
        return res.status(201).json({ user });
        // else {
        //     console.log(`=========email========${user.email}`)
        //     const payload = {
        //         user: {
        //             email: user.email,
        //         },
        //     };
        //     jwt.sign(
        //         payload,
        //         config.jwtSecret,
        //         { expiresIn: 36000 },
        //         (err, token) => {
        //             if (err) {throw err};
        //             console.log(`==========token=======${JSON.stringify(token)}`)
        //             res.json({ token });
        //             console.log(`==========직전 user=======${JSON.stringify(user)}`)
        //         }
        //         );
        //         console.log(`========jwtSecret=========${JSON.stringify(config.jwtSecret)}`)
        //     console.log(`=======verify==========${JSON.stringify(jwt.verify)}`)
        // }
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    join,
    login,
    exist,
    modify
};
