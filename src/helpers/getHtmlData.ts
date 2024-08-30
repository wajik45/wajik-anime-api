import NodeCache from "node-cache";

const cache = new NodeCache();
const defaultTTL = 60 * 60 * 24;

export default async function getHtmlData(
  url: string,
  options?: {
    useCache?: boolean;
    TTL?: number;
  }
) {
  const cachedData = cache.get(url);

  if (cachedData && options?.useCache === true) {
    return typeof cachedData === "string" ? cachedData : url;
  }

  const response = await fetch(url);
  const htmlData = await response.text();

  if (options?.useCache === true) {
    cache.set(url, htmlData, options?.TTL || defaultTTL);
  }

  return htmlData;
}
