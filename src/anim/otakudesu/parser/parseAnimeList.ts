import type { CheerioAPI } from "cheerio";
import type { IList } from "../interfaces/IOtakudesu";
import type { IAnimeList } from "../interfaces/IOtakudesu";
import getSlug from "../../../helpers/getSlug";

export default function parseAnimeList($: CheerioAPI) {
  const data: IAnimeList[] = [];

  $(".daftarkartun .bariskelom").each((index, element) => {
    const berdasarkan = $(element).find(".barispenz a").text();
    const animeList: IList[] = [];

    $(element)
      .find(".penzbar .jdlbar")
      .each((index, element) => {
        const judul = $(element).find("a").text().trim();
        const otakudesuUrl = $(element).find("a").attr("href") || "Unknown";
        const slug = getSlug(otakudesuUrl);
        const href = "/otakudesu/anime/" + slug;

        animeList.push({
          judul,
          slug,
          href,
          otakudesuUrl,
        });
      });

    data.push({
      berdasarkan,
      animeList,
    });
  });

  return data;
}
