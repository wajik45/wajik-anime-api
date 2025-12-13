import * as T from "../../interfaces/kuramanime.interface.js";
import mainParser from "../main/main.parser.js";
const { Text, Attr, Id, Num, Src, AnimeSrc } = mainParser;
const kuramanimeExtraParser = {
    parseAnimeId(el) {
        return (AnimeSrc(el)
            ?.match(/\/anime\/([^/]+)/)?.[0]
            .replace("/anime/", "") || "");
    },
    parseEpisodeAnimeId(el, animeId) {
        return (AnimeSrc(el)
            ?.match(/\/anime\/[^/]+\/([^/]+)/)?.[0]
            .replace(`/anime/${animeId}/`, "") || "");
    },
    parsePropertyId(el) {
        return AnimeSrc(el)?.match(/([^\/\?#]+)(?=\?|$)/)?.[0] || "";
    },
    parsePropertyType(el) {
        return AnimeSrc(el)?.match(/\/properties\/([^\/?]+)\/([^\/?]+)/i)?.[1] || "";
    },
    parseAnimeCard(el) {
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
    parseScheduledAnimeCard(el) {
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
    parseEpisodeCard(el) {
        const title = Text(el.querySelector(".product__item__text h5"));
        const episodeId = Id(el.querySelector(".product__item__text h5 a"));
        const poster = Attr(el.querySelector(".product__item__pic"), "data-setbg");
        const type = Text(el.querySelector(".product__item__text ul a:nth-child(1)"));
        const quality = Text(el.querySelector(".product__item__text ul a:nth-child(2)"));
        const episodes = Text(el.querySelector(".product__item__pic .ep"), /Ep\s*([^\s/]+)/);
        const totalEpisodes = Text(el.querySelector(".product__item__pic .ep"), /\/\s*([^\s]+)/);
        const kuramanimeUrl = AnimeSrc(el.querySelector(".product__item__text h5 a"));
        const animeId = this.parseAnimeId(el.querySelector(".product__item__text h5 a"));
        const animeSlug = this.parseEpisodeAnimeId(el.querySelector(".product__item__text h5 a"), animeId);
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
    parseTextCard(el) {
        const title = Text(el);
        const id = this.parsePropertyId(el);
        const kuramanimeUrl = AnimeSrc(el)?.trim();
        return {
            title,
            id,
            kuramanimeUrl,
        };
    },
    parseInfo(elems) {
        function getInfo(index) {
            const info = Text(elems[index]);
            return info;
        }
        return getInfo;
    },
    parseInfoProperty(elems) {
        const getPropertyInfo = (index) => {
            const aEl = elems[index]?.querySelector("a");
            const propertyInfo = {
                title: Text(aEl),
                propertyType: this.parsePropertyType(aEl),
                propertyId: this.parsePropertyId(aEl),
                kuramanimeUrl: AnimeSrc(aEl),
            };
            return propertyInfo;
        };
        return getPropertyInfo;
    },
    parseInfoProperties(elems) {
        const getPropertyInfo = (index) => {
            const aElems = elems[index]?.querySelectorAll("a");
            const properties = aElems?.map((aEl) => {
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
