"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
// 타입스크립트.....타입스크립트
const app = express.default();
app.get("/", (req, res, next) => {
    require('dotenv').config();
    var mongoose = require('mongoose');
    var port = process.env.PORT || 3000;
    mongoose.connect(process.env.MONGO_URI);
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function () {
        // 몽고디비 서버에 연결
        console.log("Connected to mongod server");
    });
    ;
});
exports.default = app;
