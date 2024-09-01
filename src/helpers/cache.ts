import cache from "memory-cache";

export function getFromCache(key: any) {
  return cache.get(key);
}

export function putInCache(key: any, value: unknown, ttl: number) {
  cache.put(key, value, ttl);
}

export const defaultTTL = 1000 * 60 * 60 * 24;
