"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    // 생성자
    constructor() {
        this.app = (0, express_1.default)();
    }
}
const server = new Server().app;
server.set('port', 3000); // 포트지정 바로 listen으로 지정해도 상관없음
server.listen(server.get('port'), () => {
    console.log(`${server.get('port')} server is Running`);
}).on('error', err => {
    console.log(`Error message ${err}`);
});
