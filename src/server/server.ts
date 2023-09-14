import express, { Express, Request, Response } from "express";
import { Server } from "@zerio2/qbcore.js";
import { isPasswordValid } from "../shared";
import { config } from "dotenv";
import { setup as setupModules } from "./modules";

config({
  path: `${GetResourcePath(GetCurrentResourceName())}/.env`,
});
const app: Express = express();
const qbcore: Server = global.exports["qb-core"].GetCoreObject();

if (process.env.DEBUG == "true") {
  app.use((req, _res, next) => {
    console.log(`Path triggered: ${req.url}`);
    next();
  });
}

app.use((req, res, next) => {
  if (req.query && req.query.password) {
    if (isPasswordValid(req.query.password.toString())) {
      next();
    } else {
      res.status(401);
      res.json({
        err: "Incorrect password",
      });
    }
  } else {
    res.status(400);
    res.json({
      err: "Invalid body",
    });
  }
});

setupModules(app, qbcore);

app.all("*", function (_req: Request, res: Response) {
  res.status(400);
  res.json({
    err: "Unknown route",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`FiveM.nvim API is listening on port ${process.env.PORT}`);
});
