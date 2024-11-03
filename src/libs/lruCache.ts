import { LRUCache } from "lru-cache";

export const defaultTTL = 1000 * 60 * 60 * 12;

export const cache = new LRUCache({
  max: 100,
  allowStale: false,
  updateAgeOnGet: false,
  updateAgeOnHas: false,
  ttl: defaultTTL,
});
