"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getHtmlData;
const cache_1 = require("./cache");
const axios_1 = __importDefault(require("axios"));
async function getHtmlData(url, cacheOptions, axiosOptions) {
    const cachedData = (0, cache_1.getFromCache)(url);
    if (cachedData && cacheOptions?.useCache === true) {
        console.log("hit");
        return typeof cachedData === "string" ? cachedData : url;
    }
    console.log("miss");
    const response = await axios_1.default.get(url, {
        ...axiosOptions,
        responseType: "text",
    });
    const htmlData = await response.data;
    if (cacheOptions?.useCache === true) {
        (0, cache_1.putInCache)(url, htmlData, cacheOptions?.TTL || cache_1.defaultTTL);
    }
    return htmlData;
}
