import { Express, Request, Response } from "express";
import { getFrameworkStatus, getOnesyncStatus } from "../../shared/";
import { Server } from "@zerio2/qbcore.js";

export function createMisc(app: Express, qbcore: Server) {
  app.get("/misc/serverInfo", (_req: Request, res: Response) => {
    const players = qbcore.Functions.GetQBPlayers();

    if (Array.isArray(players)) {
      res.status(200);
      res.json({
        framework: getFrameworkStatus(),

        playerCount: players.length,
        maxPlayerCount: GetConvarInt("sv_maxClients", 64),

        gameBuild: GetConvar("sv_enforceGameBuild", "unknown"),

        onesync: getOnesyncStatus(),
      });
    }
  });

  app.get("/misc/healthCheck", (_req: Request, res: Response) => {
    res.status(200);
    res.json({});
  });
}
