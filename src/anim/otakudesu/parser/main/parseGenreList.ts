import type { CheerioAPI } from "cheerio";
import type { IGenreList } from "../../interfaces/IOtakudesu";
import getSlug from "../../../../helpers/getSlug";
import getOtakudesuUrl from "../../utils/getOtakudesuUrl";

export default function parseGenreList($: CheerioAPI) {
  const data: IGenreList[] = [];
  const animeElements = $(".genres li a").toArray();

  animeElements.forEach((animeElement) => {
    const judul = $(animeElement).text();
    const otakudesuUrl = getOtakudesuUrl($(animeElement).attr("href"));
    const slug = getSlug(otakudesuUrl);
    const href = "/otakudesu/genres/" + slug;

    data.push({
      judul,
      slug,
      href,
      otakudesuUrl,
    });
  });

  return data;
}
