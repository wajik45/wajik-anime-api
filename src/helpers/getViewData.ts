import { getFromCache, putInCache, defaultTTL } from "../helpers/cache";

export default function getViewData(mainData: any, key: any): any {
  const cachedData = getFromCache(key);

  if (cachedData) {
    // HIT
    return cachedData;
  }

  // MISS
  putInCache(key, mainData, defaultTTL);

  return mainData;
}
