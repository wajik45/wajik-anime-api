import type { Request, Response, NextFunction } from "express";
import { type Payload } from "@helpers/payload";
import { defaultTTL, cache } from "@libs/lruCache";
import path from "path";

/**
 * @param ttl minutes
 */
export function serverCache(ttl?: number, responseType: "json" | "text" = "json") {
  return (req: Request, res: Response, next: NextFunction) => {
    const newTTL = ttl ? 1000 * 60 * ttl : defaultTTL;
    const key = path.join(req.originalUrl, "/").replace(/\\/g, "/");
    const cachedData = cache.get(key);

    if (cachedData) {
      // console.log("hit");

      if (typeof cachedData === "object") {
        // console.log("ini object");

        return res.json(cachedData);
      }

      if (typeof cachedData === "string") {
        // console.log("ini string");

        return res.send(cachedData);
      }

      // console.log("ini bukan object / string");

      return res.send(String(cachedData));
    }

    // console.log("miss");

    if (responseType === "json") {
      const originalJson = res.json.bind(res);

      res.json = (body: Payload) => {
        if (res.statusCode < 399 && body.ok) {
          cache.set(key, body, { ttl: newTTL });
        }

        return originalJson(body);
      };
    } else {
      const originalSend = res.send.bind(res);

      res.send = (body: any) => {
        if (res.statusCode < 399) {
          cache.set(key, body, { ttl: newTTL });
        }

        return originalSend(body);
      };
    }

    next();
  };
}

/**
 * @param maxAge minutes
 */
export function clientCache(maxAge?: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Cache-Control", `public, max-age=${maxAge ? maxAge * 60 : 60}`);

    next();
  };
}
