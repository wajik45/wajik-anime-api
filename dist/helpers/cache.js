"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTTL = void 0;
exports.getFromCache = getFromCache;
exports.putInCache = putInCache;
const memory_cache_1 = __importDefault(require("memory-cache"));
function getFromCache(key) {
    return memory_cache_1.default.get(key);
}
function putInCache(key, value, ttl) {
    memory_cache_1.default.put(key, value, ttl);
}
exports.defaultTTL = 1000 * 60 * 60 * 24;
