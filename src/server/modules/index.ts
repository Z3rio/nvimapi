import { Express } from "express";
import { Server } from "@zerio2/qbcore.js";

import { createResources } from "./resources";
import { createPlayers } from "./players";

export function setup(app: Express, qbcore: Server) {
  createResources(app);
  createPlayers(app, qbcore);
}
