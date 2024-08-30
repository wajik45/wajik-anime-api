import type { CheerioAPI } from "cheerio";
import type { IAnimeListByGenre, IList } from "../../interfaces/IOtakudesu";
import getSlug from "../../../../helpers/getSlug";
import parseSinopsis from "../parseSinopsis";
import getOtakudesuUrl from "../../utils/getOtakudesuUrl";

export default async function parseAnimeListByGenre($: CheerioAPI) {
  const data: IAnimeListByGenre[] = [];
  const animeElements = $(".venser .col-anime").toArray();

  for (let i = 0; i < animeElements.length; i++) {
    const animeElement = animeElements[i];

    const judul = $(animeElement).find(".col-anime-title a").text();
    const studio = $(animeElement).find(".col-anime-studio").text();
    const jumlahEpisode = $(animeElement)
      .find(".col-anime-eps")
      .text()
      .replace("Eps", "")
      .trim();
    const rating = $(animeElement).find(".col-anime-rating").text();
    const musim = $(animeElement).find(".col-anime-date").text();
    const poster =
      $(animeElement).find(".col-anime-cover img").attr("src") || "";
    const sinopsis = await parseSinopsis(
      $,
      $(animeElement).find(".col-synopsis p")
    );
    const genres: IList[] = [];
    const otakudesuUrl = getOtakudesuUrl(
      $(animeElement).find(".col-anime-title a").attr("href")
    );
    const slug = getSlug(otakudesuUrl);
    const href = "/otakudesu/anime/" + slug;
    const genreElements = $(animeElement).find(".col-anime-genre a").toArray();

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
  }

  return data;
}
