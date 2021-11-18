import * as express from "express";
// 타입스크립트.....타입스크립트
const app = express.default();

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    require('dotenv').config();
    var mongoose = require('mongoose');

    var port = process.env.PORT || 3000;

    mongoose.connect(process.env.MONGO_URI);
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function () {
      // 몽고디비 서버에 연결
      console.log("Connected to mongod server");
    });;
  }
);

export default app;