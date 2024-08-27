import type { CheerioAPI } from "cheerio";
import type { IJadwalRilis, IList } from "../interfaces/IOtakudesu";
import getSlug from "../../../helpers/getSlug";

export default function parseJadwalRilis($: CheerioAPI) {
  const data: IJadwalRilis[] = [];

  $(".venutama .kglist321").each((index, element) => {
    const hari = $(element).find("h2").text();
    const animeList: IList[] = [];

    $(element)
      .find("ul li")
      .each((index, element) => {
        const judul = $(element).find("a").text();
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
      hari,
      animeList,
    });
  });

  return data;
}
