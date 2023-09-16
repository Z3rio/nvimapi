import { Express, Request, Response } from "express";
import { Resource } from "../../shared";

export function createResources(app: Express) {
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

  app.get("/resources/names", (req: Request, res: Response) => {
    res.status(200);
    const resources = [];

    if (req.query && req.query.states) {
      const states = req.query.states.toString().split(",");

      for (let i = 1; i < GetNumResources(); i++) {
        const resourceName = GetResourceByFindIndex(i);

        if (states.includes(GetResourceState(resourceName))) {
          resources.push(resourceName);
        }
      }
    } else {
      for (let i = 1; i < GetNumResources(); i++) {
        resources.push(GetResourceByFindIndex(i));
      }
    }

    res.json({
      list: resources,
    });
  });

  app.post("/resources/:name/restart", (req: Request, res: Response) => {
    if (req.params && req.params.name) {
      res.status(200);
      if (GetResourceState(req.params.name) !== "started") {
        res.json({
          err: "Resource is not started",
        });
      } else {
        ExecuteCommand(`restart ${req.params.name}`);
        res.json({});
      }
    }
  });

  app.post("/resources/:name/stop", (req: Request, res: Response) => {
    if (req.params && req.params.name) {
      res.status(200);
      if (GetResourceState(req.params.name) !== "started") {
        res.json({
          err: "Resource is not started",
        });
      } else {
        ExecuteCommand(`stop ${req.params.name}`);
        res.json({});
      }
    }
  });

  app.post("/resources/:name/ensure", (req: Request, res: Response) => {
    if (req.params && req.params.name) {
      ExecuteCommand(`ensure ${req.params.name}`);
      res.status(200);
      res.json({});
    }
  });

  app.post("/resources/:name/start", (req: Request, res: Response) => {
    if (req.params && req.params.name) {
      res.status(200);
      if (GetResourceState(req.params.name) !== "stopped") {
        res.json({
          err: "Resource is not stopped",
        });
      } else {
        ExecuteCommand(`start ${req.params.name}`);
        res.json({});
      }
    }
  });
}
