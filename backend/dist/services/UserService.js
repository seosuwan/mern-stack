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
const findEmail = (data) => {
    const { email } = data;
    return User_1.default.findOne({ email });
};
exports.default = {
    createUser,
    findEmail
};
