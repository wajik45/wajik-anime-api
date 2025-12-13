import * as T from "@interfaces/kuramanime.interface.js";
import type { HTMLElement } from "node-html-parser";
import mainParser from "@parsers/main/main.parser.js";

const { Text, Attr, Id, Num, Src, AnimeSrc } = mainParser;

const kuramanimeExtraParser = {
  parseAnimeId(el: HTMLElement | null | undefined): string {
    return (
      AnimeSrc(el)
        ?.match(/\/anime\/([^/]+)/)?.[0]
        .replace("/anime/", "") || ""
    );
  },

  parseEpisodeAnimeId(el: HTMLElement | null | undefined, animeId: string): string {
    return (
      AnimeSrc(el)
        ?.match(/\/anime\/[^/]+\/([^/]+)/)?.[0]
        .replace(`/anime/${animeId}/`, "") || ""
    );
  },

  parsePropertyId(el: HTMLElement | null | undefined): string {
    return AnimeSrc(el)?.match(/([^\/\?#]+)(?=\?|$)/)?.[0] || "";
  },

  parsePropertyType(el: HTMLElement | null | undefined): string {
    return AnimeSrc(el)?.match(/\/properties\/([^\/?]+)\/([^\/?]+)/i)?.[1] || "";
  },

  parseAnimeCard(el: HTMLElement): T.IAnimeCard {
    const title = Text(el.querySelector(".product__item__text h5"));
    const animeSlug = Id(el.querySelector(".product__item__text h5 a"));
    const poster = Attr(el.querySelector(".product__item__pic"), "data-setbg");
    const type = Text(el.querySelector(".product__item__text ul a:nth-child(1)"));
    const quality = Text(el.querySelector(".product__item__text ul a:nth-child(2)"));
    const highlight = Text(el.querySelector(".product__item__pic .ep"));
    const kuramanimeUrl = AnimeSrc(el.querySelector(".product__item__text h5 a"));
    const animeId = this.parseAnimeId(el.querySelector(".product__item__text h5 a"));

    return {
      title,
      animeId,
      animeSlug,
      poster,
      quality,
      type,
      highlight,
      kuramanimeUrl,
    };
  },

  parseScheduledAnimeCard(el: HTMLElement): T.IScheduledAnimeCard {
    const title = Text(el.querySelector(".product__item__text h5"));
    const animeSlug = Id(el.querySelector(".product__item__text h5 a"));
    const poster = Attr(el.querySelector(".product__item__pic"), "data-setbg");
    const type = Text(el.querySelector(".product__item__text ul a:nth-child(1)"));
    const quality = Text(el.querySelector(".product__item__text ul a:nth-child(2)"));
    const day = Text(el.querySelector(".view-end ul li:first-child"));
    const releaseTime = Text(el.querySelector(".view-end ul li:last-child"));
    const kuramanimeUrl = AnimeSrc(el.querySelector(".product__item__text h5 a"));
    const animeId = this.parseAnimeId(el.querySelector(".product__item__text h5 a"));

    return {
      title,
      animeId,
      animeSlug,
      poster,
      quality,
      type,
      day,
      releaseTime,
      kuramanimeUrl,
    };
  },

  parseEpisodeCard(el: HTMLElement): T.IEpisodeCard {
    const title = Text(el.querySelector(".product__item__text h5"));
    const episodeId = Id(el.querySelector(".product__item__text h5 a"));
    const poster = Attr(el.querySelector(".product__item__pic"), "data-setbg");
    const type = Text(el.querySelector(".product__item__text ul a:nth-child(1)"));
    const quality = Text(el.querySelector(".product__item__text ul a:nth-child(2)"));
    const episodes = Text(el.querySelector(".product__item__pic .ep"), /Ep\s*([^\s/]+)/);
    const totalEpisodes = Text(el.querySelector(".product__item__pic .ep"), /\/\s*([^\s]+)/);
    const kuramanimeUrl = AnimeSrc(el.querySelector(".product__item__text h5 a"));
    const animeId = this.parseAnimeId(el.querySelector(".product__item__text h5 a"));
    const animeSlug = this.parseEpisodeAnimeId(
      el.querySelector(".product__item__text h5 a"),
      animeId
    );

    return {
      title,
      animeId,
      animeSlug,
      episodeId,
      poster,
      quality,
      type,
      episodes,
      totalEpisodes,
      kuramanimeUrl,
    };
  },

  parseTextCard(el: HTMLElement): T.IMainCard & { id: string } {
    const title = Text(el);
    const id = this.parsePropertyId(el);
    const kuramanimeUrl = AnimeSrc(el)?.trim();

    return {
      title,
      id,
      kuramanimeUrl,
    };
  },

  parseInfo(elems: HTMLElement[]): (index: number) => string {
    function getInfo(index: number) {
      const info = Text(elems[index]);

      return info;
    }

    return getInfo;
  },

  parseInfoProperty(elems: HTMLElement[]): (index: number) => T.ITextPropertyTypeCard {
    const getPropertyInfo = (index: number) => {
      const aEl = elems[index]?.querySelector("a");
      const propertyInfo: T.ITextPropertyTypeCard = {
        title: Text(aEl),
        propertyType: this.parsePropertyType(aEl),
        propertyId: this.parsePropertyId(aEl),
        kuramanimeUrl: AnimeSrc(aEl),
      };

      return propertyInfo;
    };

    return getPropertyInfo;
  },

  parseInfoProperties(elems: HTMLElement[]): (index: number) => T.ITextPropertyTypeCard[] {
    const getPropertyInfo = (index: number) => {
      const aElems = elems[index]?.querySelectorAll("a");
      const properties: T.ITextPropertyTypeCard[] =
        aElems?.map((aEl) => {
          return {
            title: Text(aEl),
            propertyType: this.parsePropertyType(aEl),
            propertyId: this.parsePropertyId(aEl),
            kuramanimeUrl: AnimeSrc(aEl),
          };
        }) || [];

      return properties;
    };

    return getPropertyInfo;
  },
};

export default kuramanimeExtraParser;
