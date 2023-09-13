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
}
