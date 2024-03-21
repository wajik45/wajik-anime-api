import type { CheerioAPI } from "cheerio";
import toCamelCase from "./toCamelCase";
import getSlug from "./getSlug";

export default function getDetail($: CheerioAPI, selectors: string) {
  const detail: any = {};
  const genres: {
    judul: string;
    slug: string;
    href: string;
    otakudesuUrl: string;
  }[] = [];

  $(selectors).each((index, element) => {
    let key = $(element).find("b").text();
    const value = $(element)
      .text()
      .replaceAll(key, "")
      .replaceAll(":", "")
      .trim();

    key = toCamelCase(key);

    if (!key.includes("genre")) detail[key] = value;

    if (key.includes("genre")) {
      $(element)
        .find("a")
        .each((index, element) => {
          const judul = $(element).text();
          const otakudesuUrl = $(element).attr("href") || "Unknown";
          const slug = getSlug(otakudesuUrl);
          const href = "/otakudesu/genres/" + slug;

          genres.push({
            judul,
            slug,
            href,
            otakudesuUrl,
          });
        });
    }
  });

  return {
    genres,
    detail,
  };
}
