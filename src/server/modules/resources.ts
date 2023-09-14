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

  app.post("/resources/:name/restart", (req: Request, res: Response) => {
    if (req.params && req.params.name) {
      ExecuteCommand(`restart ${req.params.name}`);
      res.status(200);
      res.json({});
    }
  });

  app.post("/resources/:name/stop", (req: Request, res: Response) => {
    if (req.params && req.params.name) {
      ExecuteCommand(`stop ${req.params.name}`);
      res.status(200);
      res.json({});
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
      ExecuteCommand(`start ${req.params.name}`);
      res.status(200);
      res.json({});
    }
  });
}
