import type { Request, Response, NextFunction } from "express";
import generatePayload, { type Payload } from "@helpers/payload";
import { defaultTTL, cache } from "@libs/lruCache";
import path from "path";

/**
 * @param ttl minutes
 */
export function serverCache(ttl?: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const newTTL = ttl ? 1000 * 60 * ttl : defaultTTL;

    const key = path.join(req.originalUrl, "/").replace(/\\/g, "/");
    const cachedData = cache.get(key);

    if (cachedData) {
      // console.log("hit");

      return res.json(generatePayload(res, cachedData));
    }

    // console.log("miss");

    const originalJson = res.json.bind(res);

    res.json = (body: Payload) => {
      if (res.statusCode < 399 && body.ok) {
        cache.set(key, body, { ttl: newTTL });
      }

      return originalJson(body);
    };

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
