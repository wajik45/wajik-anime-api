import type { CheerioAPI } from "cheerio";
import type { IGenreList } from "../interfaces/IOtakudesu";
import animeUrl from "../../../helpers/animeUrl";
import getSlug from "../../../helpers/getSlug";

export default function parseGenreList($: CheerioAPI) {
  const data: IGenreList[] = [];

  $(".genres li a").each((index, element) => {
    const judul = $(element).text();
    const otakudesuUrl = animeUrl.otakudesu + $(element).attr("href");
    const slug = getSlug(otakudesuUrl);

    data.push({
      judul,
      slug,
      otakudesuUrl,
    });
  });

  return data;
}
