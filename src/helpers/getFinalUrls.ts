import type { AxiosRequestConfig } from "axios";
import getFinalUrl from "./getFinalUrl";

export default async function getFinalUrls(
  urls: string[],
  cacheOptions?: {
    useCache?: boolean;
    TTL?: number;
  },
  axiosOptions?: AxiosRequestConfig<any>,
  retryOptions?: {
    retries?: number;
    delay?: number;
  }
) {
  const { retries = 3, delay = 1000 } = retryOptions || {};

  const retryRequest = async (url: string): Promise<any> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await getFinalUrl(url, cacheOptions, axiosOptions);
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  const requests = urls.map((url) => retryRequest(url));
  const responses = await Promise.allSettled(requests);

  const results = responses.map((response) => {
    if (response.status === "fulfilled") {
      return response.value;
    } else {
      return null;
    }
  });

  return results;
}
