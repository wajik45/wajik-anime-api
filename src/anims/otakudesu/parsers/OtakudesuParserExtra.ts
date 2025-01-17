import * as IOPE from "./interfaces/IOtakudesuParserExtra";
import type { CheerioAPI, Cheerio, Element } from "cheerio";
import type { Pagination } from "@helpers/payload";
import { getFinalUrl, getFinalUrls } from "@services/dataFetcher";
import AnimeScraper from "@scrapers/AnimeScraper";

export default class OtakudesuParserExtra extends AnimeScraper {
  protected parseAnimeCard1(el: Cheerio<Element>): IOPE.AnimeCard1 {
    const data: IOPE.AnimeCard1 = {
      title: "",
      poster: "",
      episodes: 0,
      score: "",
      lastReleaseDate: "",
      animeId: "",
      href: "",
      otakudesuUrl: "",
    };

    const oriUrl = el.find("a").attr("href");

    data.title = el.find(".jdlflm").text();
    data.poster = this.str(el.find("img").attr("src"));
    data.episodes = this.num(el.find(".epz").text().replace("Episode", "").trim());
    data.score = el.find(".epztipe").text().trim();
    data.lastReleaseDate = el.find(".newnime").text();
    data.otakudesuUrl = this.generateSourceUrl(oriUrl);
    data.animeId = this.generateSlug(oriUrl);
    data.href = this.generateHref("anime", data.animeId);

    return data;
  }

  protected parseAnimeCard2(el: Cheerio<Element>): IOPE.AnimeCard2 {
    const card = this.parseAnimeCard1(el);

    const data: IOPE.AnimeCard2 = {
      title: card.title,
      poster: card.poster,
      episodes: card.episodes,
      releaseDay: card.score,
      latestReleaseDate: card.lastReleaseDate,
      animeId: card.animeId,
      href: card.href,
      otakudesuUrl: card.otakudesuUrl,
    };

    return data;
  }

  protected parseAnimeCard3($: CheerioAPI, el: Cheerio<Element>): IOPE.AnimeCard3 {
    const info = el.find(".set");

    const data: IOPE.AnimeCard3 = {
      title: "",
      poster: "",
      status: "",
      score: "",
      animeId: "",
      href: "",
      otakudesuUrl: "",
      genreList: [],
    };

    const oriUrl = el.find("h2 a").attr("href");

    data.title = el.find("h2").text();
    data.poster = this.str(el.find("img").attr("src"));
    data.status = $(info[1]).text().replace("Status :", "").trim();
    data.score = $(info[2]).text().replace("Rating :", "").trim();
    data.otakudesuUrl = this.generateSourceUrl(oriUrl);
    data.animeId = this.generateSlug(oriUrl);
    data.href = this.generateHref("anime", data.animeId);

    const genreElements = $(info[0]).find("a").toArray();

    genreElements.forEach((genreElement) => {
      const card = this.parseLinkCard($(genreElement), "genres");

      data.genreList.push({
        title: card.title,
        genreId: card.slug,
        href: card.href,
        otakudesuUrl: card.otakudesuUrl,
      });
    });

    return data;
  }

  protected async parseAnimeCard4($: CheerioAPI, el: Cheerio<Element>): Promise<IOPE.AnimeCard4> {
    const data: IOPE.AnimeCard4 = {
      title: "",
      poster: "",
      studios: "",
      score: "",
      episodes: 0,
      season: "",
      animeId: "",
      href: "",
      otakudesuUrl: "",
      synopsis: { paragraphs: [] },
      genreList: [],
    };

    const s = ".col-anime-";
    const oriUrl = el.find(`${s}title a`).attr("href");

    data.title = el.find(`${s}title a`).text();
    data.poster = this.str(el.find(`${s}cover img`).attr("src"));
    data.studios = el.find(`${s}studio`).text();
    data.score = el.find(`${s}rating`).text();
    data.episodes = this.num(el.find(`${s}eps`).text().replace("Eps", "").trim());
    data.season = el.find(`${s}date`).text();
    data.otakudesuUrl = this.generateSourceUrl(oriUrl);
    data.animeId = this.generateSlug(oriUrl);
    data.href = this.generateHref("anime", data.animeId);
    data.synopsis = await this.parseSynopsis($, el.find(".col-synopsis p"), false);

    delete data.synopsis["connections"];

    const genreElements = el.find(".col-anime-genre a").toArray();

    genreElements.forEach((genreElement) => {
      const card = this.parseLinkCard($(genreElement), "genres");

      data.genreList.push({
        title: card.title,
        genreId: card.slug,
        href: card.href,
        otakudesuUrl: card.otakudesuUrl,
      });
    });

    return data;
  }

  protected parseAnimeCard5(el: Cheerio<Element>): IOPE.AnimeCard5 {
    const data: IOPE.AnimeCard5 = {
      title: "",
      poster: "",
      animeId: "",
      href: "",
      otakudesuUrl: "",
    };

    const oriUrl = el.find("a").attr("href");

    data.title = el.find(".judul-anime").text();
    data.poster = this.str(el.find("img").attr("src"));
    data.otakudesuUrl = this.generateSourceUrl(oriUrl);
    data.animeId = this.generateSlug(oriUrl);
    data.href = this.generateHref("anime", data.animeId);

    return data;
  }

  protected async parseSynopsis(
    $: CheerioAPI,
    el: Cheerio<Element>,
    withConnections: boolean
  ): Promise<IOPE.Synopsis> {
    interface TemporaryData {
      connections: { title: string }[];
    }

    const data: IOPE.Synopsis = { paragraphs: [], connections: [] };
    const temporaryData: TemporaryData = { connections: [] };
    const otakudesuUrls: string[] = [];
    const mainElements = el.toArray();

    for (let i = 0; i < mainElements.length; i++) {
      const mainElement = mainElements[i];
      const el = $(mainElement);
      const connectionElements = el.find("a").toArray();

      if (el.text()) {
        if (connectionElements.length === 0) {
          const synopsisText = el.text();

          data.paragraphs.push(synopsisText);
        } else {
          if (withConnections) {
            for (let j = 0; j < connectionElements.length; j++) {
              const el = $(connectionElements[j]);
              const title = el.text();
              const otakudesuUrl = el.attr("href") || this.baseUrl;

              temporaryData.connections.push({ title });

              const source = this.baseUrlPath;

              if (otakudesuUrl.includes(source)) {
                const query = this.generateSlug(otakudesuUrl);

                otakudesuUrls.push(this.baseUrl + "?p=" + query);
              } else {
                const originalUrl = await getFinalUrl(otakudesuUrl, this.baseUrl);

                if (originalUrl.includes("?p=")) {
                  if (!originalUrl.includes(this.baseUrl)) {
                    const query = this.generateSlug(originalUrl);

                    otakudesuUrls.push(this.baseUrl + query);
                  } else {
                    otakudesuUrls.push(originalUrl);
                  }
                }
              }
            }

            const originalUrls = await getFinalUrls(otakudesuUrls, this.baseUrl, {
              axiosConfig: { timeout: 10000 },
              retryConfig: { delay: 100, retries: 2 },
            });

            const finalConnections: IOPE.AnimeLinkCard[] = [];

            for (let k = 0; k < originalUrls.length; k++) {
              const title = temporaryData.connections[k].title;
              const oriUrl = originalUrls[k];
              const otakudesuUrl = this.generateSourceUrl(oriUrl);
              const animeId = this.generateSlug(oriUrl);
              const href = this.generateHref("anime", animeId);

              finalConnections.push({
                title,
                animeId,
                href,
                otakudesuUrl,
              });
            }

            data.connections = finalConnections;
          }
        }
      }
    }

    return data;
  }

  protected parseLinkCard(el: Cheerio<Element>, to: string): IOPE.LinkCard {
    const data: IOPE.LinkCard = {
      title: "",
      slug: "",
      href: "",
      otakudesuUrl: "",
    };

    const oriUrl = el.attr("href");

    data.title = el.text().trim();
    data.otakudesuUrl = this.generateSourceUrl(oriUrl);
    data.slug = this.generateSlug(oriUrl);
    data.href = this.generateHref(to, data.slug);

    return data;
  }

  protected parseDetails($: CheerioAPI, el: Cheerio<Element>): IOPE.Details {
    const data: IOPE.Details = { info: {}, genreList: [] };
    const infoElements = el.toArray();

    infoElements.forEach((infoElement) => {
      const el = $(infoElement);

      let key = el.find("b").text();

      const value = el.text().replaceAll(key, "").replaceAll(":", "").trim();

      key = this.toCamelCase(key);

      if (!key.includes("genre")) data.info[key] = value;

      if (key.includes("genre")) {
        const genreElements = el.find("a").toArray();

        genreElements.forEach((genreElement) => {
          const card = this.parseLinkCard($(genreElement), "genres");

          data.genreList.push({
            title: card.title,
            genreId: card.slug,
            href: card.href,
            otakudesuUrl: card.otakudesuUrl,
          });
        });
      }
    });

    return data;
  }

  protected parsePagination($: CheerioAPI): Pagination | undefined {
    const data: Pagination = {
      currentPage: 1,
      hasPrevPage: false,
      prevPage: null,
      hasNextPage: false,
      nextPage: null,
      totalPages: 1,
    };

    data.currentPage = this.num($('.pagination [aria-current="page"]').text()) || 1;

    const prevPage: string | number | boolean = this.str($(".pagination .prev").attr("href"));
    data.prevPage = this.num(prevPage.split("/")[prevPage.split("/").length - 2]);
    data.hasPrevPage = data.prevPage ? true : false;

    const nextPage: string | number | boolean = this.str($(".pagination .next").attr("href"));
    data.nextPage = this.num(nextPage.split("/")[nextPage.split("/").length - 2]);
    data.hasNextPage = data.nextPage ? true : false;

    data.totalPages =
      this.num($(".pagination .page-numbers:not(.prev,.next,.dots):last").text()) || 1;

    if (!data.currentPage && !data.prevPage && !data.nextPage && !data.totalPages) {
      return undefined;
    }

    return data;
  }
}
