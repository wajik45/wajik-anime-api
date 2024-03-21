import type { CheerioAPI } from "cheerio";
import type { ISearch } from "../interfaces/IOtakudesu";
import getSlug from "../../../helpers/getSlug";
import getDetail from "../../../helpers/getDetail";

export default function parseSearchCard($: CheerioAPI) {
  const data: ISearch[] = [];

  $(".venutama ul li").each((index, element) => {
    const judul = $(element).find("h2 a").text();
    const poster = $(element).find("img").attr("src") || "Unknown";
    const otakudesuUrl = $(element).find("h2 a").attr("href") || "Unknown";
    const slug = getSlug(otakudesuUrl);
    const href = "/otakudesu/anime/" + slug;

    const { detail, genres } = getDetail($, ".set");

    data.push({
      judul,
      poster,
      ...detail,
      slug,
      href,
      otakudesuUrl,
      genres,
    });
  });

  return data;
}
