import { CheerioAPI } from "cheerio";
import getSlug from "../../../../helpers/getSlug";
import getOtakudesuUrl from "../../utils/getOtakudesuUrl";

export default async function parseAnimeBatch($: CheerioAPI) {
  const detailSelector = ".animeinfo .infos";
  const detail: any = {};
  const genres: any[] = [];
  const batchList: any[] = [];
  const poster = $(".animeinfo img").attr("src");

  $(detailSelector).each((index, element) => {
    $(element).find("br").after("break");
  });

  $(detailSelector)
    .text()
    .split("break")
    .forEach((item) => {
      if (item) {
        const key = item.split(":")[0].trim().toLowerCase();
        const value = item.split(":")[1].trim();

        if (!key.includes("genre")) detail[key] = value;
      }
    });

  const genreElements = $(detailSelector + " a").toArray();

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

  const batchElements = $(".batchlink h4").toArray();

  batchElements.forEach((batchElement) => {
    const judul = $(batchElement).text();
    const qualities: any[] = [];
    const qualityElements = $(batchElement).next().find("li").toArray();

    qualityElements.forEach((qualityElement) => {
      const judul = $(qualityElement).find("strong").text();
      const size = $(qualityElement).find("i").text();
      const urls: any[] = [];
      const urlElements = $(qualityElement).find("a").toArray();

      urlElements.forEach((urlElement) => {
        const judul = $(urlElement).text();
        const url = $(urlElement).attr("href");

        urls.push({
          judul,
          url,
        });
      });

      qualities.push({
        judul,
        size,
        urls,
      });
    });

    batchList.push({
      judul,
      qualities,
    });
  });

  return {
    ...detail,
    poster,
    genres,
    batchList,
  };
}
