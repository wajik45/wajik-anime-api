import * as T from "@interfaces/oploverz.interface.js";
import type { HTMLElement } from "node-html-parser";
import mainParser from "@parsers/main/main.parser.js";
import oploverzExtraParser from "@parsers/extra/oploverz.extra.parser.js";
import errorinCuy from "@helpers/errorinCuy.js";

const { Text, Src, Attr } = mainParser;

type FilterResult = { animeList: T.ISearchCard[] } | T.IAnimeDirectory;

const oploverzParser = {
  parseHome(document: HTMLElement): T.IHome {
    const popularElems = document.querySelectorAll(".listupd.popularslider .popconslide article.bs");
    const popularAnimeList: T.IPopularCard[] = popularElems.map((el) =>
      oploverzExtraParser.parsePopularCard(el)
    );

    const latestElems = document.querySelectorAll(".listupd.normal .excstf article.stylesix");
    const latestAnimeList: T.ILatestCard[] = latestElems.map((el) =>
      oploverzExtraParser.parseLatestCard(el)
    );

    return {
      popularToday: {
        animeList: popularAnimeList,
      },
      latestRelease: {
        animeList: latestAnimeList,
      },
    };
  },

  parseSchedule(document: HTMLElement): T.ISchedule {
    const dayElems = document.querySelectorAll(".schedulepage");
    const scheduleList: T.IScheduleDay[] = dayElems.map((dayEl) => {
      const day = Text(dayEl.querySelector(".releases h3 span"));
      const cardElems = dayEl.querySelectorAll(".listupd .bs");
      const animeList: T.IScheduleCard[] = cardElems.map((cardEl) =>
        oploverzExtraParser.parseScheduleCard(cardEl, day)
      );
      return { day, animeList };
    });
    return { scheduleList };
  },

  parseAnimeDirectory(document: HTMLElement): T.IAnimeDirectory {
    const sectionElems = document.querySelectorAll(".bixboxarc .blix");
    const sectionList: T.IListModeSection[] = sectionElems.map((el) =>
      oploverzExtraParser.parseListModeSection(el)
    );
    return { sectionList };
  },

  parseSearchedAnimes(document: HTMLElement): T.ISearchCard[] {
    const animeElems = document.querySelectorAll(".listupd article.bs");
    const animeList: T.ISearchCard[] = animeElems.map((el) =>
      oploverzExtraParser.parseSearchCard(el)
    );

    if (animeList.length === 0) {
      throw errorinCuy(404);
    }

    return animeList;
  },

  parseAnimeDetails(document: HTMLElement): T.IAnimeDetails {
    const speElems = document.querySelectorAll(".spe span");
    const getInfo = (label: string) => oploverzExtraParser.getSpeInfo(speElems, label);
    const poster = Src(document.querySelector(".thumbook .thumb img")).split("?")[0] || "";
    const rating = Text(document.querySelector(".rating strong")).replace("Rating ", "").trim();

    const synopsisElems = document.querySelectorAll(".entry-content p");
    const synopsis = oploverzExtraParser.parseSynopsis(synopsisElems);

    const genreElems = document.querySelectorAll(".genxed a");
    const genres = genreElems.map((a) => Text(a));

    const episodeElems = document.querySelectorAll(".eplister ul li");
    const episodeList: T.IEpisodeItem[] = episodeElems.map((el) =>
      oploverzExtraParser.parseEpisodeItem(el)
    );

    return {
      title: Text(document.querySelector("h1.entry-title")),
      poster,
      status: getInfo("Status"),
      studio: getInfo("Studio"),
      duration: getInfo("Duration"),
      season: getInfo("Season"),
      type: getInfo("Type"),
      rating,
      releasedOn: getInfo("Released on"),
      updatedOn: getInfo("Updated on"),
      synopsis,
      genres,
      episodeList,
    };
  },

  parseEpisodeDetails(document: HTMLElement): T.IEpisodeDetails {
    const streamingUrl = Src(document.querySelector("#embed_holder iframe"));
    const episodeNumber = Attr(document.querySelector("meta[itemprop='episodeNumber']"), "content");
    const seriesLink = document.querySelector(".year a[href*='/anime/']");
    const seriesHref = Attr(seriesLink, "href");
    const seriesName = Text(seriesLink);
    const seriesSlug = seriesHref.split("/anime/")[1]?.replace(/\/$/, "") || "";

    const navElems = document.querySelectorAll(".naveps .nvs a");
    let prevEpisode: T.INavLink | null = null;
    let nextEpisode: T.INavLink | null = null;

    navElems.forEach((navEl) => {
      const title = Text(navEl).trim();
      const href = Attr(navEl, "href");
      if (title.toLowerCase().includes("prev")) {
        prevEpisode = { title, href };
      }
    });

    const downloadElems = document.querySelectorAll(".mctnx .soraddlx");
    const download: IFormat[] = downloadElems.map((el) =>
      oploverzExtraParser.parseDownloadSection(el)
    );

    return {
      title: Text(document.querySelector("h1.entry-title")),
      episodeNumber,
      seriesName,
      seriesSlug,
      seriesHref,
      streamingUrl,
      releasedOn: Text(document.querySelector(".year .updated")),
      hasPrevEpisode: prevEpisode !== null,
      prevEpisode,
      hasNextEpisode: false,
      nextEpisode: null,
      download,
    };
  },
};

export default oploverzParser;
