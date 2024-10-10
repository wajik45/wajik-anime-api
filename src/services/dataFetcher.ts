import axios, { type AxiosResponse, type AxiosRequestConfig } from "axios";
import { getFromCache, putInCache } from "../helpers/cache";
// import fs from "fs";
// import path from "path";

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

export interface CacheConfig {
  useCache?: boolean;
  key?: string;
  TTL?: number;
}

export interface RequestConfig {
  cacheConfig?: CacheConfig;
  axiosConfig?: AxiosRequestConfig<any>;
}

export interface RequestConfigArr extends RequestConfig {
  retryConfig?: {
    retries?: number;
    delay?: number;
  };
}

export async function wajikFetch(
  url: string,
  config?: RequestConfig,
  callback?: (response: AxiosResponse) => void
): Promise<any> {
  const axiosConfig = config?.axiosConfig;
  const cacheConfig = config?.cacheConfig;
  const cachedData = getFromCache(cacheConfig?.key || url);

  if (cachedData && cacheConfig?.useCache === true) {
    // HIT
    // await writeLog(cacheConfig.key || url, "hit");
    // console.log("hit");

    return cachedData;
  }

  // MISS
  // await writeLog(cacheConfig?.key || url, "miss");
  // console.log("miss");

  const response = await axios({
    url,
    headers: {
      ...axiosConfig?.headers,
      "User-Agent": userAgent,
    },
    ...axiosConfig,
  });

  if (callback) callback(response);

  const data = response.data;

  if (cacheConfig?.useCache === true && data) {
    putInCache(cacheConfig.key || url, data, cacheConfig?.TTL);
  }

  return data;
}

export async function getFinalUrl(url: string, config?: RequestConfig): Promise<any> {
  const axiosConfig = config?.axiosConfig;
  const cacheConfig = config?.cacheConfig;
  const cachedData = getFromCache(cacheConfig?.key || url);

  if (cachedData && cacheConfig?.useCache === true) {
    // HIT
    // await writeLog(cacheConfig.key || url, "hit");
    // console.log("hit");

    return typeof cachedData === "string" ? cachedData : url;
  }

  // MISS
  // await writeLog(cacheConfig?.key || url, "miss");
  // console.log("miss");

  const response = await axios.head(url, {
    ...axiosConfig,
    headers: {
      ...axiosConfig?.headers,
      "User-Agent": userAgent,
    },
    maxRedirects: 0,
    validateStatus: function (status) {
      return status >= 200 && status < 400;
    },
  });

  const location = response.headers["location"];

  if (location) {
    if (cacheConfig?.useCache === true) {
      putInCache(cacheConfig.key || url, location, cacheConfig?.TTL);
    }

    return location;
  }

  return url;
}

export async function getFinalUrls(urls: string[], config?: RequestConfigArr): Promise<any[]> {
  const axiosConfig = config?.axiosConfig;
  const cacheConfig = config?.cacheConfig;
  const retryConfig = config?.retryConfig;
  const { retries = 3, delay = 1000 } = retryConfig || {};

  const retryRequest = async (url: string): Promise<any> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await getFinalUrl(url, {
          axiosConfig,
          cacheConfig,
        });
      } catch (error) {
        if (attempt === retries) throw error;

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  const requests = urls.map((url) => retryRequest(url));
  const responses = await Promise.allSettled(requests);

  const results = responses.map((response) => {
    if (response.status === "fulfilled") {
      return response.value;
    }

    return "";
  });

  return results;
}

// GENERATE LOGS DATA FETCHER OTW KE PUBLIC LOGS.TXT
// export async function writeLog(message: string, cache: "hit" | "miss") {
//   function wajibDua(data: any) {
//     return `${data}`.length === 1 ? `0${data}` : `${data}`;
//   }

//   const fileName = "logs.txt";
//   const filePath = path.join(__dirname, "..", "..", "public", fileName);
//   const d = new Date();
//   const date = wajibDua(d.getDate());
//   const month = wajibDua(d.getMonth());
//   const year = d.getFullYear();
//   const hours = wajibDua(d.getHours());
//   const minutes = wajibDua(d.getMinutes());
//   const seconds = wajibDua(d.getSeconds());
//   const logMessage = `[${date}-${month}-${year}] [${hours}:${minutes}:${seconds}] [${cache}] [${message}]\n`;

//   if (!fs.existsSync(filePath)) {
//     await fs.promises.writeFile(filePath, logMessage);
//   } else {
//     await fs.promises.appendFile(filePath, logMessage);
//   }
// }
