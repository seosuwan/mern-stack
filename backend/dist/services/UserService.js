"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const createUser = (data) => {
    const user = new User_1.default(data);
    return user.save();
};
const findLogin = (data) => {
    const { email, password } = data;
    return User_1.default.findOne({ email, password });
};
const findEmail = (data) => {
    const { email } = data;
    // console.log(`여기는 파인드 이메일}`)
    // console.log(User.findOne({email}))
    return User_1.default.findOne({ email });
};
exports.default = {
    createUser,
    findLogin,
    findEmail,
};
