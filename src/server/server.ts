import express, { Express, Request, Response } from "express";
import { Server } from "@zerio2/qbcore.js";
import { isPasswordValid, port, Resource } from "../shared";

const app: Express = express();
const qbcore: Server = global.exports["qb-core"].GetCoreObject();

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

app.get("/players/count", (_req: Request, res: Response) => {
  const players = qbcore.Functions.GetQBPlayers();

  if (Array.isArray(players)) {
    res.status(200);
    res.json({
      count: players.length,
    });
  } else {
    res.status(500);
    res.json({
      err: "Players was an object and not array",
    });
  }
});

app.get("/resources/list", (_req: Request, res: Response) => {
  const resources: Record<string, Resource> = {};

  for (let i = 1; i < GetNumResources(); i++) {
    const resourceName = GetResourceByFindIndex(i);

    resources[resourceName] = {
      name: resourceName,
      version: GetResourceMetadata(resourceName, "version", 0),
      status: GetResourceState(resourceName),
    };
  }

  res.status(200);
  res.json({
    list: resources,
  });
});

app.all("*", function (_req: Request, res: Response) {
  res.status(400);
  res.json({
    err: "Unknown route",
  });
});

app.listen(port, () => {
  console.log(`FiveM.nvim API is listening on port ${port}`);
});
