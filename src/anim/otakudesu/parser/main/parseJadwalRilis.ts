import type { CheerioAPI } from "cheerio";
import type { IJadwalRilis, IList } from "../../interfaces/IOtakudesu";
import getSlug from "../../../../helpers/getSlug";
import getOtakudesuUrl from "../../utils/getOtakudesuUrl";

export default function parseJadwalRilis($: CheerioAPI) {
  const data: IJadwalRilis[] = [];
  const animeElements = $(".venutama .kglist321").toArray();

  animeElements.forEach((animeElement) => {
    const hari = $(animeElement).find("h2").text();
    const animeList: IList[] = [];
    const jadwalElements = $(animeElement).find("ul li").toArray();

    jadwalElements.forEach((jadwalElement) => {
      const judul = $(jadwalElement).find("a").text();
      const otakudesuUrl = getOtakudesuUrl(
        $(jadwalElement).find("a").attr("href")
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
      hari,
      animeList,
    });
  });

  return data;
}
