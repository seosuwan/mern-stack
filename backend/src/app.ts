import * as express from "express";
// 타입스크립트.....타입스크립트
const app = express.default();

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("hello typescript express!");
  }
);

export default app;