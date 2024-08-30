import type { CheerioAPI } from "cheerio";
import type { IList, IAnimeList } from "../../interfaces/IOtakudesu";
import getSlug from "../../../../helpers/getSlug";
import getOtakudesuUrl from "../../utils/getOtakudesuUrl";

export default function parseAnimeList($: CheerioAPI) {
  const data: IAnimeList[] = [];
  const animeElements = $(".daftarkartun .bariskelom").toArray();

  animeElements.forEach((animeElement) => {
    const berdasarkan = $(animeElement).find(".barispenz a").text();
    const animeList: IList[] = [];
    const cardElements = $(animeElement).find(".penzbar .jdlbar").toArray();

    cardElements.forEach((cardElement) => {
      const judul = $(cardElement).find("a").text().trim();
      const otakudesuUrl = getOtakudesuUrl(
        $(cardElement).find("a").attr("href")
      );
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
