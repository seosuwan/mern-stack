"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const port = Number(process.env.PORT) || 3000;
const server = (0, http_1.createServer)(app_1.default);
server.listen(port, () => {
    console.log(`${port}포트 서버 대기 중!`);
});
exports.default = server;
