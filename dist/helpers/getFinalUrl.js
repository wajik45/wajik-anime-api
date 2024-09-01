"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFinalUrl;
const cache_1 = require("./cache");
const axios_1 = __importDefault(require("axios"));
async function getFinalUrl(url, cacheOptions, axiosOptions) {
    const cachedData = (0, cache_1.getFromCache)(url);
    if (cachedData && cacheOptions?.useCache === true) {
        console.log("hit");
        return typeof cachedData === "string" ? cachedData : url;
    }
    console.log("miss");
    const response = await axios_1.default.head(url, {
        ...axiosOptions,
        maxRedirects: 0,
        validateStatus: function (status) {
            return status >= 200 && status < 400;
        },
    });
    const location = response.headers["location"];
    if (location) {
        if (cacheOptions?.useCache === true) {
            (0, cache_1.putInCache)(url, location, cacheOptions?.TTL || cache_1.defaultTTL);
        }
        return location;
    }
    return url;
}
