import * as IPE from "./interfaces/IParser.extra";
import type { CheerioAPI, Cheerio, Element } from "cheerio";
import type { Pagination } from "../../../helpers/responses";
import { getFinalUrl, getFinalUrls } from "../../../services/dataFetcher";
import Scraper from "../../../scrapers/Scraper";
import getMinFromMs from "../../../helpers/getMinFromMs";

export default class ExtraOtakudesuParser extends Scraper {
  protected parseAnimeCard1(el: Cheerio<Element>): IPE.AnimeCard1 {
    const data: IPE.AnimeCard1 = {
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
    data.poster = el.find("img").attr("src") || "";
    data.episodes = Number(el.find(".epz").text().replace("Episode", "").trim()) || null;
    data.score = el.find(".epztipe").text().trim();
    data.lastReleaseDate = el.find(".newnime").text();
    data.otakudesuUrl = this.getSourceUrl(oriUrl);
    data.animeId = this.getSlugFromUrl(oriUrl);
    data.href = this.generateHref("anime", data.animeId);

    return data;
  }

  protected parseAnimeCard2(el: Cheerio<Element>): IPE.AnimeCard2 {
    const card = this.parseAnimeCard1(el);

    const data: IPE.AnimeCard2 = {
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

  protected parseAnimeCard3($: CheerioAPI, el: Cheerio<Element>): IPE.AnimeCard3 {
    const info = el.find(".set");

    const data: IPE.AnimeCard3 = {
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
    data.poster = el.find("img").attr("src") || "";
    data.status = $(info[1]).text().replace("Status :", "").trim();
    data.score = $(info[2]).text().replace("Rating :", "").trim();
    data.otakudesuUrl = this.getSourceUrl(oriUrl);
    data.animeId = this.getSlugFromUrl(oriUrl);
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

  protected async parseAnimeCard4($: CheerioAPI, el: Cheerio<Element>): Promise<IPE.AnimeCard4> {
    const data: IPE.AnimeCard4 = {
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
    data.poster = el.find(`${s}cover img`).attr("src") || "";
    data.studios = el.find(`${s}studio`).text();
    data.score = el.find(`${s}rating`).text();
    data.episodes = Number(el.find(`${s}eps`).text().replace("Eps", "").trim()) || null;
    data.season = el.find(`${s}date`).text();
    data.otakudesuUrl = this.getSourceUrl(oriUrl);
    data.animeId = this.getSlugFromUrl(oriUrl);
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

  protected parseAnimeCard5(el: Cheerio<Element>): IPE.AnimeCard5 {
    const data: IPE.AnimeCard5 = {
      title: "",
      poster: "",
      animeId: "",
      href: "",
      otakudesuUrl: "",
    };

    const oriUrl = el.find("a").attr("href");

    data.title = el.find(".judul-anime").text();
    data.poster = el.find("img").attr("src") || "";
    data.otakudesuUrl = this.getSourceUrl(oriUrl);
    data.animeId = this.getSlugFromUrl(oriUrl);
    data.href = this.generateHref("anime", data.animeId);

    return data;
  }

  protected async parseSynopsis($: CheerioAPI, el: Cheerio<Element>, withConnections: boolean): Promise<IPE.Synopsis> {
    interface TemporaryData {
      connections: { title: string }[];
    }

    const data: IPE.Synopsis = { paragraphs: [], connections: [] };
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

              const source = this.baseRoute;

              if (otakudesuUrl.includes(source)) {
                const query = this.getSlugFromUrl(otakudesuUrl);

                otakudesuUrls.push(this.baseUrl + "?p=" + query);
              } else {
                const originalUrl = await getFinalUrl(otakudesuUrl, {
                  cacheConfig: { useCache: true, TTL: getMinFromMs(5) },
                });

                if (originalUrl.includes("?p=")) {
                  if (!originalUrl.includes(this.baseUrl)) {
                    const query = this.getSlugFromUrl(originalUrl);

                    otakudesuUrls.push(this.baseUrl + query);
                  } else {
                    otakudesuUrls.push(originalUrl);
                  }
                }
              }
            }

            const originalUrls = await getFinalUrls(otakudesuUrls, {
              axiosConfig: { timeout: 10000 },
              cacheConfig: { useCache: true, TTL: getMinFromMs(5) },
              retryConfig: { delay: 100, retries: 2 },
            });

            const finalConnections: IPE.AnimeLinkCard[] = [];

            for (let k = 0; k < originalUrls.length; k++) {
              const title = temporaryData.connections[k].title;
              const oriUrl = originalUrls[k];
              const otakudesuUrl = this.getSourceUrl(oriUrl);
              const animeId = this.getSlugFromUrl(oriUrl);
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

  protected parseLinkCard(el: Cheerio<Element>, to: string): IPE.LinkCard {
    const data: IPE.LinkCard = {
      title: "",
      slug: "",
      href: "",
      otakudesuUrl: "",
    };

    const oriUrl = el.attr("href");

    data.title = el.text();
    data.otakudesuUrl = this.getSourceUrl(oriUrl);
    data.slug = this.getSlugFromUrl(oriUrl);
    data.href = this.generateHref(to, data.slug);

    return data;
  }

  protected parseDetails($: CheerioAPI, el: Cheerio<Element>): IPE.Details {
    const data: IPE.Details = { info: {}, genreList: [] };
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

    data.currentPage = Number($('.pagination [aria-current="page"]').text()) || 1;

    const prevPage: string | number | boolean = $(".pagination .prev").attr("href") || "";
    data.prevPage = Number(prevPage.split("/")[prevPage.split("/").length - 2]) || null;
    data.hasPrevPage = data.prevPage ? true : false;

    const nextPage: string | number | boolean = $(".pagination .next").attr("href") || "";
    data.nextPage = Number(nextPage.split("/")[nextPage.split("/").length - 2]) || null;
    data.hasNextPage = data.nextPage ? true : false;

    data.totalPages = Number($(".pagination .page-numbers:not(.prev,.next,.dots):last").text()) || 1;

    if (!data.currentPage && !data.prevPage && !data.nextPage && !data.totalPages) {
      return undefined;
    }

    return data;
  }
}
