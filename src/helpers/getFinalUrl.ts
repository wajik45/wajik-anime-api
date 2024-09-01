import type { AxiosRequestConfig } from "axios";
import { defaultTTL, getFromCache, putInCache } from "./cache";
import axios from "axios";

export default async function getFinalUrl(
  url: string,
  cacheOptions?: {
    useCache?: boolean;
    TTL?: number;
  },
  axiosOptions?: AxiosRequestConfig<any>
) {
  const cachedData = getFromCache(url);

  if (cachedData && cacheOptions?.useCache === true) {
    console.log("hit");

    return typeof cachedData === "string" ? cachedData : url;
  }

  console.log("miss");

  const response = await axios.head(url, {
    ...axiosOptions,
    maxRedirects: 0,
    validateStatus: function (status) {
      return status >= 200 && status < 400;
    },
  });

  const location = response.headers["location"];

  if (location) {
    if (cacheOptions?.useCache === true) {
      putInCache(url, location, cacheOptions?.TTL || defaultTTL);
    }

    return location;
  }

  return url;
}
