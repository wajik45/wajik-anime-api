"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getHtmlData;
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default();
const defaultTTL = 60 * 60 * 24;
async function getHtmlData(url, options) {
    const cachedData = cache.get(url);
    if (cachedData && options?.useCache === true) {
        return typeof cachedData === "string" ? cachedData : url;
    }
    const response = await fetch(url);
    const htmlData = await response.text();
    if (options?.useCache === true) {
        cache.set(url, htmlData, options?.TTL || defaultTTL);
    }
    return htmlData;
}
