import * as T from "@interfaces/oploverz.interface.js";
import type { HTMLElement } from "node-html-parser";
import mainParser from "@parsers/main/main.parser.js";

const { Text, Src, Attr } = mainParser;

const oploverzExtraParser = {
  parsePopularCard(el: HTMLElement): T.IPopularCard {
    const limitEl = el.querySelector(".limit");
    const poster = Src(limitEl?.querySelector("img")).split("?")[0] || "";
    const type = Text(limitEl?.querySelector(".typez"));
    const episode = Text(limitEl?.querySelector(".epx"));
    const href = Attr(el.querySelector("a.tip"), "href");
    const seriesName = Text(el.querySelector(".tt"));
    const title = Text(el.querySelector("h2[itemprop='headline']"));

    return {
      title,
      poster,
      type,
      episode,
      seriesName,
      href,
    };
  },

  getSpeInfo(elems: HTMLElement[], label: string): string {
    const span = elems.find((el) => Text(el.querySelector("b")).includes(label));
    if (!span) return "";
    return Text(span).replace(Text(span.querySelector("b")), "").replace(":", "").trim();
  },

  parseSynopsis(elems: HTMLElement[]): ISynopsis {
    return {
      paragraphList: elems
        .map((el) => el.text)
        .filter((p) => p.trim()),
    };
  },

  parseEpisodeItem(el: HTMLElement): T.IEpisodeItem {
    const link = el.querySelector("a");
    return {
      episode: Text(el.querySelector(".epl-num")),
      title: Text(el.querySelector(".epl-title")),
      date: Text(el.querySelector(".epl-date")),
      href: Attr(link, "href"),
    };
  },

  parseDownloadSection(el: HTMLElement): IFormat {
    const title = Text(el.querySelector(".sorattlx h3"));
    const qualityElems = el.querySelectorAll(".soraurlx");
    const qualityList: IQuality[] = qualityElems.map((qualityEl) => {
      const quality = Text(qualityEl.querySelector("strong"));
      const linkElems = qualityEl.querySelectorAll("a");
      const urlList: IUrl[] = linkElems.map((linkEl) => ({
        title: Text(linkEl),
        url: Attr(linkEl, "href"),
      }));

      return {
        title: quality,
        urlList,
      };
    });

    return {
      title,
      qualityList,
    };
  },

  parseScheduleCard(el: HTMLElement, day: string): T.IScheduleCard {
    const limitEl = el.querySelector(".limit");
    const poster = Src(limitEl?.querySelector("img")).split("?")[0] || "";
    const status = Text(limitEl?.querySelector(".epx"));
    const episode = Text(limitEl?.querySelector(".sb.Sub"));
    const href = Attr(el.querySelector("a"), "href");
    const slug = href.split("/anime/")[1]?.replace(/\/$/, "") || "";
    const title = Text(el.querySelector(".tt"));

    return {
      title,
      poster,
      slug,
      href,
      day,
      status,
      episode,
    };
  },

  parseListModeSection(el: HTMLElement): T.IListModeSection {
    const letter = el.querySelector("span")?.textContent || "";
    const items = el.querySelectorAll("ul li a");
    const animeList: T.IListModeItem[] = items.map((a) => {
      const href = Attr(a, "href");
      const slug = href.split("/anime/")[1]?.replace(/\/$/, "") || "";
      return {
        title: Text(a),
        slug,
        href,
      };
    });
    return { letter, animeList };
  },

  parseSearchCard(el: HTMLElement): T.ISearchCard {
    const limitEl = el.querySelector(".limit");
    const poster = Src(limitEl?.querySelector("img")).split("?")[0] || "";
    const type = Text(limitEl?.querySelector(".typez"));
    const status = Text(limitEl?.querySelector(".epx"));
    const href = Attr(el.querySelector("a.tip"), "href");
    const slug = href.split("/anime/")[1]?.replace(/\/$/, "") || "";
    const title = Text(el.querySelector("h2[itemprop='headline']"));

    return {
      title,
      poster,
      type,
      status,
      slug,
      href,
    };
  },

  parseLatestCard(el: HTMLElement): T.ILatestCard {
    const thumbEl = el.querySelector(".thumb");
    const poster = Src(thumbEl?.querySelector("img")).split("?")[0] || "";
    const type = Text(thumbEl?.querySelector(".typez"));
    const episode = Text(thumbEl?.querySelector(".epx"));
    const href = Attr(thumbEl?.querySelector("a"), "href");
    const title = Text(el.querySelector(".inf h2 a"));

    const infLis = el.querySelectorAll(".inf ul li");
    const infTexts = infLis.map((li) => Text(li));

    const status = infTexts.find((t) => t.startsWith("Status:"))?.replace("Status:", "").trim() || "";
    const releaseTime = infTexts.find((t) => t.startsWith("Released on:"))?.replace("Released on:", "").trim() || "";
    const seriesName = Text(infLis.find((li) => Text(li).startsWith("series:"))?.querySelector("a"));

    const genresEl = infLis.find((li) => Text(li).startsWith("Genres:"));
    const genreLinks = genresEl?.querySelectorAll("a") || [];
    const genres = genreLinks.map((a) => Text(a));

    const score = Text(el.querySelector(".upscore .scr"));

    return {
      title,
      poster,
      type,
      episode,
      status,
      score,
      genres,
      releaseTime,
      seriesName,
      href,
    };
  },
};

export default oploverzExtraParser;
