import { LRUCache } from "lru-cache";
import path from "path";
const defaultTTL = 1000 * 60 * 60 * 12;
const lruCache = new LRUCache({
    max: 100,
    allowStale: false,
    updateAgeOnGet: false,
    updateAgeOnHas: false,
    ttl: defaultTTL,
});
/**
 * @param ttl minutes, default = 720
 */
export function serverCache(ttl) {
    return (req, res, next) => {
        const newTTL = ttl ? 1000 * 60 * ttl : defaultTTL;
        const key = path.join(req.originalUrl, "/").replace(/\\/g, "/");
        const cachedData = lruCache.get(key);
        if (cachedData) {
            // console.log("hit");
            res.json(cachedData);
            return;
        }
        // console.log("miss");
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            if (res.statusCode < 399) {
                lruCache.set(key, body, { ttl: newTTL });
            }
            return originalJson(body);
        };
        next();
    };
}
/**
 * @param maxAge minutes, default = 1
 */
export function clientCache(maxAge) {
    return (req, res, next) => {
        res.setHeader("Cache-Control", `public, max-age=${maxAge ? maxAge * 60 : 60}`);
        next();
    };
}
