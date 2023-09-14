import { Express } from "express";
import { Server } from "@zerio2/qbcore.js";

import { createResources } from "./resources";
import { createPlayers } from "./players";
import { createMisc } from "./misc";

export function setup(app: Express, qbcore: Server) {
  createResources(app);
  createPlayers(app, qbcore);
  createMisc(app, qbcore);
}
