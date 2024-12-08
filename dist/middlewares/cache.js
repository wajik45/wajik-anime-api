"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverCache = serverCache;
exports.clientCache = clientCache;
const payload_1 = __importDefault(require("../helpers/payload"));
const lruCache_1 = require("../libs/lruCache");
const path_1 = __importDefault(require("path"));
function serverCache(ttl) {
    return (req, res, next) => {
        const newTTL = ttl ? 1000 * 60 * ttl : lruCache_1.defaultTTL;
        const key = path_1.default.join(req.originalUrl, "/").replace(/\\/g, "/");
        const cachedData = lruCache_1.cache.get(key);
        if (cachedData) {
            if (typeof cachedData === "string") {
                return res.send(cachedData);
            }
            return res.json((0, payload_1.default)(res, cachedData));
        }
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            if (res.statusCode < 399 && body.ok) {
                lruCache_1.cache.set(key, body, { ttl: newTTL });
            }
            return originalJson(body);
        };
        const originalBody = res.send.bind(res);
        res.send = (body) => {
            if (res.statusCode < 399) {
                lruCache_1.cache.set(key, body, { ttl: newTTL });
            }
            return originalBody(body);
        };
        next();
    };
}
function clientCache(maxAge) {
    return (req, res, next) => {
        res.setHeader("Cache-Control", `public, max-age=${maxAge ? maxAge * 60 : 60}`);
        next();
    };
}
