import * as T from "@interfaces/otakudesu.interface.js";
import type { HTMLElement } from "node-html-parser";
import mainParser from "@parsers/main/main.parser.js";
import otakudesuConfig from "@configs/otakudesu.config.js";

const { Text, Attr, Id, Num, Src, AnimeSrc } = mainParser;
const { baseUrl } = otakudesuConfig;

const otakudesuExtraParser = {
  parseOngoingCard(el: HTMLElement): T.IOngoingAnimeCard {
    const title = Text(el.querySelector("h2.jdlflm"));
    const poster = Src(el.querySelector(".thumbz img"));
    const episodes = Text(el.querySelector(".epz"), /Episode (\S+)/);
    const otakudesuUrl = AnimeSrc(el.querySelector(".thumb a"));
    const animeId = Id(el.querySelector(".thumb a"));
    const latestReleaseDate = Text(el.querySelector(".newnime"));
    const releaseDay = Text(el.querySelector(".epztipe"));

    return {
      title,
      poster,
      episodes,
      animeId,
      latestReleaseDate,
      releaseDay,
      otakudesuUrl,
    };
  },

  parseCompletedCard(el: HTMLElement): T.ICompletedAnimeCard {
    const title = Text(el.querySelector("h2.jdlflm"));
    const poster = Src(el.querySelector(".thumbz img"));
    const episodes = Text(el.querySelector(".epz"), /(\S+) Episode/);
    const otakudesuUrl = AnimeSrc(el.querySelector(".thumb a"));
    const animeId = Id(el.querySelector(".thumb a"));
    const score = Text(el.querySelector(".epztipe"));
    const lastReleaseDate = Text(el.querySelector(".newnime"));

    return {
      title,
      poster,
      episodes,
      animeId,
      score,
      lastReleaseDate,
      otakudesuUrl,
    };
  },

  parseTextCard(el: HTMLElement): T.IMainCard & { id: string } {
    const title = Text(el);
    const id = Id(el);
    const otakudesuUrl = AnimeSrc(el, baseUrl);

    return {
      title,
      id,
      otakudesuUrl,
    };
  },

  parseInfo(elems: HTMLElement[]): (index: number) => string {
    function getInfo(index: number) {
      const info = Text(elems[index]?.nextSibling as HTMLElement, /:\s*(.+)/);

      return info;
    }

    return getInfo;
  },

  parseTextGenreList(elems: HTMLElement[]): T.ITextGenreCard[] {
    const genreList: T.ITextGenreCard[] = elems.map((el) => {
      const { id, title, otakudesuUrl } = this.parseTextCard(el);

      return {
        title,
        genreId: id,
        otakudesuUrl,
      };
    });

    return genreList;
  },

  parseTextEpisodeList(elems: HTMLElement[]): T.ITextEpisodeCard[] {
    const episodeList = elems.map((el) => {
      const { id, title, otakudesuUrl } = otakudesuExtraParser.parseTextCard(el);
      const match = title.match(/Episode\s+(\d+)/);

      return {
        title: match ? match[1] || "0" : title,
        episodeId: id,
        otakudesuUrl,
      };
    });

    return episodeList;
  },

  parseSynopsis(elems: HTMLElement[]): ISynopsis {
    return {
      paragraphList: elems
        .map((el) => {
          const paragraph = el.text;

          return paragraph;
        })
        .filter((paragraph) => {
          return paragraph;
        }),
    };
  },
};

export default otakudesuExtraParser;
