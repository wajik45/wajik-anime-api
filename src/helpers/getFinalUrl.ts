import NodeCache from "node-cache";

const locationCache = new NodeCache();
const defaultTTL = 60 * 60 * 24;

export default async function getFinalUrl(
  url: string,
  options?: {
    useCache?: boolean;
    TTL?: number;
  }
) {
  const cachedData = locationCache.get(url);

  if (cachedData && options?.useCache === true) {
    return typeof cachedData === "string" ? cachedData : url;
  }

  const response = await fetch(url, {
    method: "HEAD",
    redirect: "manual",
  });

  const location = response.headers.get("location");

  if (location) {
    if (options?.useCache === true) {
      locationCache.set(url, location, options?.TTL || defaultTTL);
    }

    return location;
  }

  return url;
}
