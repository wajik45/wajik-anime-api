"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFinalUrl;
const node_cache_1 = __importDefault(require("node-cache"));
const locationCache = new node_cache_1.default();
const defaultTTL = 60 * 60 * 24;
async function getFinalUrl(url, options) {
    const cachedData = locationCache.get(url);
    if (cachedData && options?.useCache === true) {
        return typeof cachedData === "string" ? cachedData : url;
    }
    const response = await fetch(url, {
        method: "HEAD",
        redirect: "manual",
    });
    const location = response.headers.get("location");
    if (location) {
        if (options?.useCache === true) {
            locationCache.set(url, location, options?.TTL || defaultTTL);
        }
        return location;
    }
    return url;
}
