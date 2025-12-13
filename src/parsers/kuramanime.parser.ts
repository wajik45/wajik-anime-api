import * as T from "@interfaces/kuramanime.interface.js";
import * as v from "valibot";
import type { HTMLElement } from "node-html-parser";
import { parse } from "node-html-parser";
import mainParser from "./main/main.parser.js";
import kuramanimeExtraParser from "./extra/kuramanime.extra.parser.js";
import errorinCuy from "@helpers/errorinCuy.js";
import kuramanimeSchema from "@schemas/kuramanime.schema.js";
import kuramanimeConfig from "@configs/kuramanime.config.js";

const { Text, Attr, Id, Num, Src, AnimeSrc } = mainParser;
const { baseUrl } = kuramanimeConfig;

const kuramanimeParser = {
  parseHome(document: HTMLElement): T.IHome {
    const home: T.IHome = {
      ongoing: {
        kuramanimeUrl: "",
        episodeList: [],
      },
      completed: {
        kuramanimeUrl: "",
        animeList: [],
      },
      movie: {
        kuramanimeUrl: "",
        animeList: [],
      },
    };

    const homeElems = document.querySelectorAll(".product.spad .trending__product");

    homeElems.forEach((homeEl, index) => {
      const kuramanimeUrl = AnimeSrc(homeEl.querySelector(".btn__all a"));
      const animeElems = homeEl.querySelectorAll(".row .product__item");

      const animeList: T.IAnimeCard[] = animeElems.map((animeEl) => {
        const animeCard = kuramanimeExtraParser.parseAnimeCard(animeEl);

        return animeCard;
      });

      const episodeList: T.IEpisodeCard[] = animeElems.map((animeEl) => {
        const episodeCard = kuramanimeExtraParser.parseEpisodeCard(animeEl);

        return episodeCard;
      });

      const key = index === 0 ? "ongoing" : index === 1 ? "completed" : "movie";

      home[key].kuramanimeUrl = kuramanimeUrl;
      home[index === 1 ? "completed" : "movie"].animeList = animeList;

      if (index === 0) {
        home.ongoing.episodeList = episodeList;
      }
    });

    return home;
  },

  parseAnimes(document: HTMLElement): T.IAnimeCard[] {
    const animeElems = document.querySelectorAll("#animeList .product__item");

    const animeList: T.IAnimeCard[] = animeElems.map((animeEl) => {
      const animeCard = kuramanimeExtraParser.parseAnimeCard(animeEl);

      return animeCard;
    });

    if (animeList.length === 0) {
      throw errorinCuy(404);
    }

    return animeList;
  },

  parseScheduledAnimes(document: HTMLElement): T.IScheduledAnimeCard[] {
    const animeElems = document.querySelectorAll("#animeList .product__item");

    const animeList: T.IScheduledAnimeCard[] = animeElems.map((animeEl) => {
      const animeCard = kuramanimeExtraParser.parseScheduledAnimeCard(animeEl);

      return animeCard;
    });

    if (animeList.length === 0) {
      throw errorinCuy(404);
    }

    return animeList;
  },

  parseEpisodes(document: HTMLElement): T.IEpisodeCard[] {
    const episodeElems = document.querySelectorAll("#animeList .product__item");

    const episodeList: T.IEpisodeCard[] = episodeElems.map((animeEl) => {
      const episodeCard = kuramanimeExtraParser.parseEpisodeCard(animeEl);

      return episodeCard;
    });

    if (episodeList.length === 0) {
      throw errorinCuy(404);
    }

    return episodeList;
  },

  parseProperties(document: HTMLElement): T.ITextPropertyCard[] {
    const propertyElems = document.querySelectorAll("#animeList ul li a");
    const propertyList: T.ITextPropertyCard[] = propertyElems.map((propertyEl) => {
      const { id, title, kuramanimeUrl } = kuramanimeExtraParser.parseTextCard(propertyEl);

      return { title, propertyId: id, kuramanimeUrl };
    });

    if (propertyList.length === 0) {
      throw errorinCuy(404);
    }

    return propertyList;
  },

  parseAnimeDetails(
    document: HTMLElement,
    { animeId, animeSlug }: v.InferOutput<typeof kuramanimeSchema.param.animeDetails>
  ): T.IAnimeDetails {
    const title = Text(document.querySelector(".anime__details__title h3"));
    const alternativeTitle = Text(
      document.querySelector(".anime__details__title h3")?.nextElementSibling
    );
    const poster = Attr(document.querySelector(".anime__details__pic"), "data-setbg");
    const synopsis: ISynopsis = {
      paragraphList: document
        .querySelectorAll("#synopsisField br")
        .map((pEl) => {
          const paragraph = pEl.previousSibling?.text.trim();

          if (paragraph && paragraph !== "\n") {
            return paragraph;
          }

          return "";
        })
        .filter((p) => p !== ""),
    };

    synopsis.paragraphList.push(Text(document.querySelector("#synopsisField i")));

    const episodeListEl = parse(
      Attr(document.querySelector("#episodeLists"), "data-content").trim()
    );
    let firstEpisode: number | null = null;
    let lastEpisode: number | null = null;
    let firstEpisodeByIndex: number | null = null;
    let lastEpisodeByIndex: number | null = null;

    const episodeElems = episodeListEl.querySelectorAll("a");

    episodeElems.forEach((episodeEl, index) => {
      const text = Text(episodeEl);
      const match = text.match(/\b(\d+)\b/);
      const episode = match ? Number(match[1]) : null;

      if (text.includes("Terlama")) {
        firstEpisode = episode;
      } else if (text.includes("Terbaru")) {
        lastEpisode = episode;
      } else {
        if (index === 0) {
          firstEpisodeByIndex = episode;
        } else if (index === episodeElems.length - 1) {
          lastEpisodeByIndex = episode;
        }
      }
    });

    const infoElems = document.querySelectorAll(".anime__details__widget ul li .col-9");
    const getInfo = kuramanimeExtraParser.parseInfo(infoElems);
    const getInfoProperty = kuramanimeExtraParser.parseInfoProperty(infoElems);
    const getInfoProperties = kuramanimeExtraParser.parseInfoProperties(infoElems);
    const batchElems = parse(
      Attr(document.querySelector("#episodeBatchLists"), "data-content").trim()
    ).querySelectorAll("a");
    const batchList: T.ITextBatchCard[] = batchElems.map((batchEl) => {
      return {
        title: Text(batchEl),
        batchId: Id(batchEl),
        animeId,
        animeSlug,
        kuramanimeUrl: AnimeSrc(batchEl),
      };
    });

    const similarAnimeElems = document.querySelectorAll(".breadcrumb__links__v2 a");
    const similarAnimeList: T.ITextAnimeCard[] = similarAnimeElems.map((animeEl) => {
      return {
        title: Text(animeEl).replace("- ", ""),
        animeId: kuramanimeExtraParser.parseAnimeId(animeEl),
        animeSlug: Id(animeEl),
        kuramanimeUrl: AnimeSrc(animeEl),
      };
    });

    return {
      title,
      alternativeTitle,
      animeId,
      animeSlug,
      poster,
      synopsis,
      episode: {
        first: firstEpisode || firstEpisodeByIndex,
        last: lastEpisode || lastEpisodeByIndex || firstEpisodeByIndex,
      },
      episodes: getInfo(1),
      aired: getInfo(3).replace(/\s+/g, " ").trim(),
      duration: getInfo(5),
      explicit: getInfo(10),
      score: getInfo(14),
      fans: getInfo(15),
      rating: getInfo(16),
      credit: getInfo(17),
      type: getInfoProperty(0),
      status: getInfoProperty(2),
      season: getInfoProperty(4),
      quality: getInfoProperty(6),
      country: getInfoProperty(7),
      source: getInfoProperty(8),
      genreList: getInfoProperties(9),
      themeList: getInfoProperties(12),
      demographicList: getInfoProperties(11),
      studioList: getInfoProperties(13),
      batchList,
      similarAnimeList,
    };
  },

  parseBatchDetails(
    document: HTMLElement,
    { animeId, animeSlug }: v.InferOutput<typeof kuramanimeSchema.param.batchDetails>
  ): T.IBatchDetails {
    const batchTitleEl = document.querySelector(".breadcrumb__links #episodeTitle");
    const downloadQualityElems = document.querySelectorAll("#animeDownloadLink h6");
    const download: T.IBatchDetails["download"] = {
      qualityList: downloadQualityElems.map((downloadQualityEl) => {
        const title = Text(downloadQualityEl);
        const urlList: IUrl[] = [];

        let urlEl: HTMLElement | null | undefined = downloadQualityEl;

        while (urlEl) {
          if (urlEl.tagName === "A") {
            urlList.push({
              title: Text(urlEl),
              url: Attr(urlEl, "href"),
            });
          } else if (urlEl.tagName === "BR") {
            break;
          }

          urlEl = urlEl?.nextElementSibling;
        }

        return {
          title: title.split("—")[0]?.trim() || "",
          size: title.split("—")[1]?.trim().replace(/\(|\)/g, "") || "",
          urlList,
        };
      }),
    };

    return {
      title: Text(batchTitleEl?.previousElementSibling),
      batchTitle: Text(batchTitleEl),
      animeId,
      animeSlug,
      download,
    };
  },

  parseEpisodeDetails(
    document: HTMLElement,
    { animeId, animeSlug }: v.InferOutput<typeof kuramanimeSchema.param.episodeDetails>
  ): T.IEpisodeDetails {
    const episodeTitleEl = document.querySelector(".breadcrumb__links #episodeTitle");
    const prevEpisodeEl = document.querySelector(".episode__navigations a:first-child");
    const nextEpisodeEl = document.querySelector(".episode__navigations a:last-child");

    let prevEpisode: T.ITextEpisodeCard | null = null;
    let nextEpisode: T.ITextEpisodeCard | null = null;

    if (!prevEpisodeEl?.classList.contains("nav__disabled")) {
      prevEpisode = {
        title: "Prev episode",
        episodeId: Id(prevEpisodeEl),
        animeId,
        animeSlug,
        kuramanimeUrl: AnimeSrc(prevEpisodeEl, baseUrl),
      };
    }

    if (!nextEpisodeEl?.classList.contains("nav__disabled")) {
      nextEpisode = {
        title: "Next episode",
        episodeId: Id(nextEpisodeEl),
        animeId,
        animeSlug,
        kuramanimeUrl: AnimeSrc(nextEpisodeEl, baseUrl),
      };
    }

    const serverQualityElems = document.querySelectorAll("#player source");
    const server: T.IEpisodeDetails["server"] = {
      qualityList: serverQualityElems.map((serverQualityEl) => {
        const title = Attr(serverQualityEl, "size");
        const url = Attr(serverQualityEl, "src");

        return {
          title,
          urlList: [
            {
              title: "kuramadrive",
              url,
            },
          ],
        };
      }),
    };

    const downloadQualityElems = document.querySelectorAll("#animeDownloadLink h6");
    const download: T.IBatchDetails["download"] = {
      qualityList: downloadQualityElems.map((downloadQualityEl) => {
        const title = Text(downloadQualityEl);
        const urlList: IUrl[] = [];

        let urlEl: HTMLElement | null | undefined = downloadQualityEl;

        while (urlEl) {
          if (urlEl.tagName === "A") {
            urlList.push({
              title: Text(urlEl),
              url: Attr(urlEl, "href"),
            });
          } else if (urlEl.tagName === "BR") {
            break;
          }

          urlEl = urlEl?.nextElementSibling;
        }

        return {
          title: title.split("—")[0]?.trim() || "",
          size: title.split("—")[1]?.trim().replace(/\(|\)/g, "") || "",
          urlList,
        };
      }),
    };

    return {
      title: Text(episodeTitleEl?.previousElementSibling),
      episodeTitle: Text(episodeTitleEl),
      animeId,
      animeSlug,
      lastUpdated: Text(document.querySelector(".breadcrumb__links__v2 span:last-child"))
        .replace(/\s+/g, " ")
        .trim(),
      prevEpisode,
      hasPrevEpisode: prevEpisode ? true : false,
      nextEpisode,
      hasNextEpisode: nextEpisode ? true : false,
      episode: {
        first: 1,
        last: 1,
      },
      server,
      download,
    };
  },

  parsePagination(document: HTMLElement): IPagination | undefined {
    const paginationEl = document.querySelector(".product__pagination");

    if (paginationEl) {
      const pagination: IPagination = {
        currentPage: null,
        prevPage: null,
        hasPrevPage: false,
        nextPage: null,
        hasNextPage: false,
        totalPages: null,
      };

      const currentPageEl = paginationEl.querySelector(".current-page");
      const prevPageEl = paginationEl.querySelector(".page__link:first-child");
      const prevPageVal = prevPageEl?.getAttribute("href")?.match(/(?:\?|&)page=(\d+)/)?.[1];
      const nextPageEl = paginationEl.querySelector(".page__link:last-child");
      const nextPageVal = nextPageEl?.getAttribute("href")?.match(/(?:\?|&)page=(\d+)/)?.[1];
      const totalPagesEl = paginationEl.querySelector("a:last-child")?.previousElementSibling;

      pagination.currentPage = Number(Text(currentPageEl)) || null;
      pagination.prevPage =
        pagination.currentPage && Number(prevPageVal) < pagination.currentPage
          ? Number(prevPageVal) || null
          : null;
      pagination.hasPrevPage = pagination.prevPage ? true : false;
      pagination.nextPage =
        pagination.currentPage && Number(nextPageVal) > pagination.currentPage
          ? Number(nextPageVal) || null
          : null;
      pagination.hasNextPage = pagination.nextPage ? true : false;
      pagination.totalPages = Number(Text(totalPagesEl)) || null;

      return pagination;
    }

    return undefined;
  },
};

export default kuramanimeParser;
