import type { AxiosRequestConfig } from "axios";
import { defaultTTL, getFromCache, putInCache } from "./cache";
import axios from "axios";

export default async function getHtmlData(
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

  const response = await axios.get(url, {
    ...axiosOptions,
    responseType: "text",
  });
  const htmlData = await response.data;

  if (cacheOptions?.useCache === true) {
    putInCache(url, htmlData, cacheOptions?.TTL || defaultTTL);
  }

  return htmlData;
}
