import type { CheerioAPI } from "cheerio";
import type { IGenre, IList } from "../interfaces/IOtakudesu";
import getSlug from "../../../helpers/getSlug";

export default function parseGenreCard($: CheerioAPI) {
  const data: IGenre[] = [];

  $(".venser .col-anime").each((index, element) => {
    const judul = $(element).find(".col-anime-title a").text();
    const studio = $(element).find(".col-anime-studio").text();
    const jumlahEpisode = $(element)
      .find(".col-anime-eps")
      .text()
      .replace("Eps", "")
      .trim();
    const rating = $(element).find(".col-anime-rating").text();
    const musim = $(element).find(".col-anime-date").text();
    const poster =
      $(element).find(".col-anime-cover img").attr("src") || "Unknown";
    const sinopsis: string[] = [];
    const genres: IList[] = [];
    const otakudesuUrl =
      $(element).find(".col-anime-title a").attr("href") || "Unknown";
    const slug = getSlug(otakudesuUrl);
    const href = "/otakudesu/anime/" + slug;

    $(element)
      .find(".col-synopsis p")
      .each((index, element) => {
        if ($(element).text()) {
          sinopsis.push($(element).text());
        }
      });

    $(element)
      .find(".col-anime-genre a")
      .each((index, element) => {
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

    data.push({
      judul,
      slug,
      href,
      poster,
      rating,
      jumlahEpisode,
      studio,
      musim,
      otakudesuUrl,
      genres,
      sinopsis,
    });
  });

  return data;
}
