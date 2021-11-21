"use strict";
// import express from 'express'
// import UserRouter from "./api/route/UserRouter"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class Server {
// 	// app 타입 지정
// 	public app: express.Application
// 	// 생성자
// 	constructor() {
// 		this.app = express()
// 	}
// }
// const server = new Server().app
// server.use(UserRouter);
// server.set('port', 3001)
// server.listen(server.get('port'), ()=> {
// 	console.log(`${server.get('port')} server is Running`)
// }).on('error',err => {
//     console.log(`Error message ${err}`);
// })
// import router from "./api/route";
const UserRouter_1 = __importDefault(require("./api/route/UserRouter"));
// import connectDB from "./Loaders/db";
// connectDB();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); // CORS 미들웨어 등록
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(UserRouter_1.default); //라우터
// error handler
// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "production" ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
app.set("port", 3001);
app
    .listen(app.get("port"), () => {
    console.log(`${app.get("port")} server is Running`);
})
    .on("error", (err) => {
    console.log(`Error message ${err}`);
});
