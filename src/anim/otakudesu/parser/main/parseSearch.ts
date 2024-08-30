import type { CheerioAPI } from "cheerio";
import type { ISearch } from "../../interfaces/IOtakudesu";
import getSlug from "../../../../helpers/getSlug";
import parseDetail from "../parseDetail";
import getOtakudesuUrl from "../../utils/getOtakudesuUrl";

export default function parseSearch($: CheerioAPI) {
  const data: ISearch[] = [];
  const animeElements = $(".venutama ul li").toArray();

  animeElements.forEach((animeElement) => {
    const judul = $(animeElement).find("h2 a").text();
    const poster = $(animeElement).find("img").attr("src") || "";
    const otakudesuUrl = getOtakudesuUrl(
      $(animeElement).find("h2 a").attr("href")
    );
    const slug = getSlug(otakudesuUrl);
    const href = "/otakudesu/anime/" + slug;
    const { detail, genres } = parseDetail($, $(".set"));

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
