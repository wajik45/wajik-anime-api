import { LRUCache } from "lru-cache";
import getMinFromMs from "./getMinFromMs";

export const defaultTTL = getMinFromMs(60 * 12);

const cache = new LRUCache({
  max: 100,
  allowStale: false,
  updateAgeOnGet: false,
  updateAgeOnHas: false,
  ttl: defaultTTL,
});

export function getFromCache(key: any): any {
  return cache.get(key);
}

export function putInCache(key: any, value: any, ttl?: number): void {
  cache.set(key, value, { ttl });
}
