import { Express, Request, Response } from "express";
import { Server } from "@zerio2/qbcore.js";

export function createPlayers(app: Express, qbcore: Server) {
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
}
