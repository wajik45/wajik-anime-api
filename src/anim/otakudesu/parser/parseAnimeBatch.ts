import { CheerioAPI, text } from "cheerio";
import getSlug from "../../../helpers/getSlug";

export default function parseAnimeBatch($: CheerioAPI) {
  const detailSelector = ".animeinfo .infos";
  const detail: any = {};
  const genres: any[] = [];
  const poster = $(".animeinfo img").attr("src");
  const batchList: any[] = [];

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

  $(detailSelector + " a").each((index, element) => {
    const judul = $(element).text();
    const otakudesuUrl = $(element).attr("href") || "Unknown";
    const slug = getSlug(otakudesuUrl);
    const href = "/otakudesu/genres/" + slug;

    genres.push({
      judul,
      slug,
      href,
      otakudesuUrl,
    });
  });

  $(".batchlink h4").each((index, element) => {
    const qualityList: any[] = [];

    $(element)
      .next()
      .find("li")
      .each((index, element) => {
        const urls: any[] = [];

        $(element)
          .find("a")
          .each((index, element) => {
            urls.push({
              judul: $(element).text(),
              url: $(element).attr("href"),
            });
          });

        qualityList.push({
          judul: $(element).find("strong").text(),
          urls,
          size: $(element).find("i").text(),
        });
      });

    batchList.push({
      judul: $(element).text(),
      kualitas: qualityList,
    });
  });

  return {
    ...detail,
    poster,
    genres,
    batchList,
  };
}
