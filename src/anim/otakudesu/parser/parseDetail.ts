import type { Cheerio, CheerioAPI, Element } from "cheerio";
import toCamelCase from "../../../helpers/toCamelCase";
import getSlug from "../../../helpers/getSlug";
import getOtakudesuUrl from "../utils/getOtakudesuUrl";

export default function parseDetail(
  $: CheerioAPI,
  cheerioElement: Cheerio<Element>
) {
  const detail: any = {};
  const genres: {
    judul: string;
    slug: string;
    href: string;
    otakudesuUrl: string;
  }[] = [];

  const detailElements = cheerioElement.toArray();

  detailElements.forEach((detailElement) => {
    let key = $(detailElement).find("b").text();
    const value = $(detailElement)
      .text()
      .replaceAll(key, "")
      .replaceAll(":", "")
      .trim();

    key = toCamelCase(key);

    if (!key.includes("genre")) {
      detail[key] = value;
    }

    if (key.includes("genre")) {
      const genreElements = $(detailElement).find("a").toArray();

      genreElements.forEach((genreElement) => {
        const judul = $(genreElement).text();
        const otakudesuUrl = getOtakudesuUrl($(genreElement).attr("href"));
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
    detail,
    genres,
  };
}
