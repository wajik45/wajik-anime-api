"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnimeScraper_1 = __importDefault(require("../../../scrapers/AnimeScraper"));
class SamehadakuParserExtra extends AnimeScraper_1.default {
    parseAnimeCard1(el, to) {
        const data = {
            title: "",
            poster: "",
            episodes: "",
            releasedOn: "",
            animeId: undefined,
            batchId: undefined,
            href: "",
            samehadakuUrl: "",
        };
        const oriUrl = el.find(".thumb a").attr("href");
        data.title = el.find(".dtla .entry-title").text();
        data.poster = this.str(el.find(".thumb img").attr("src"));
        data.episodes = el.find(".dtla span:not(.author) [itemprop=name]").text();
        data.releasedOn = el
            .find(".dtla span:last")
            .text()
            .toLowerCase()
            .replace("released on:", "")
            .trim();
        data.samehadakuUrl = this.generateSourceUrl(oriUrl);
        if (to === "anime") {
            data.animeId = this.generateSlug(oriUrl);
            data.href = this.generateHref(to, data.animeId);
        }
        else {
            data.batchId = this.generateSlug(oriUrl);
            data.href = this.generateHref(to, data.batchId);
        }
        return data;
    }
    parseAnimeCard2($, el, to) {
        const data = {
            title: "",
            poster: "",
            type: "",
            score: "",
            status: "",
            animeId: undefined,
            batchId: undefined,
            href: "",
            samehadakuUrl: "",
            genreList: [],
        };
        const oriUrl = el.find(".animposx a").attr("href");
        data.title = el.find(".animposx .data .title").text();
        data.poster = this.str(el.find(".animposx .content-thumb img").attr("src"));
        data.type = el.find(".animposx .content-thumb .type").text();
        data.score = el.find(".animposx .content-thumb .score").text().trim();
        data.status = el.find(".animposx .data .type").text();
        data.samehadakuUrl = this.generateSourceUrl(oriUrl);
        if (to === "anime") {
            data.animeId = this.generateSlug(oriUrl);
            data.href = this.generateHref(to, data.animeId);
        }
        else {
            data.batchId = this.generateSlug(oriUrl);
            data.href = this.generateHref(to, data.batchId);
        }
        const genreElements = el.find(".stooltip .genres a").toArray();
        genreElements.forEach((genreElement) => {
            const card = this.parseLinkCard($(genreElement), "genres");
            data.genreList.push({
                title: card.title,
                genreId: card.slug,
                href: card.href,
                samehadakuUrl: card.samehadakuUrl,
            });
        });
        return data;
    }
    parseAnimeCard3($, el) {
        const data = {
            title: "",
            poster: "",
            releaseDate: "",
            animeId: "",
            href: "",
            samehadakuUrl: "",
            genreList: [],
        };
        const oriUrl = el.find(".lftinfo h2 a").attr("href");
        data.title = el.find(".lftinfo h2").text();
        data.poster = this.str(el.find(".imgseries img").attr("src"));
        data.releaseDate = el.find(".lftinfo span:last").text().trim();
        data.samehadakuUrl = this.generateSourceUrl(oriUrl);
        data.animeId = this.generateSlug(oriUrl);
        data.href = this.generateHref("anime", data.animeId);
        const genreElements = el.find(".lftinfo span:first a").toArray();
        genreElements.forEach((genreElement) => {
            const card = this.parseLinkCard($(genreElement), "genres");
            data.genreList.push({
                title: card.title,
                genreId: card.slug,
                href: card.href,
                samehadakuUrl: card.samehadakuUrl,
            });
        });
        return data;
    }
    parseAnimeCard4(el) {
        const data = {
            title: "",
            poster: "",
            type: "",
            score: "",
            estimation: "",
            genres: "",
            animeId: "",
            href: "",
            samehadakuUrl: "",
        };
        const oriUrl = el.find("a").attr("href");
        data.title = el.find(".data .title").text().trim();
        data.poster = this.str(el.find(".content-thumb img").attr("src"));
        data.type = el.find(".content-thumb .type").text();
        data.score = el.find(".content-thumb .score").text().trim().replace("x", "");
        data.estimation = el.find(".data_tw .ltseps").text().trim();
        data.samehadakuUrl = this.generateSourceUrl(oriUrl);
        data.animeId = this.generateSlug(oriUrl);
        data.href = this.generateHref("anime", data.animeId);
        data.genres = el.find(".data .type").text();
        return data;
    }
    parseLinkCard(el, to) {
        const data = {
            title: "",
            slug: "",
            href: "",
            samehadakuUrl: "",
        };
        const oriUrl = el.attr("href");
        data.title = el.text();
        data.samehadakuUrl = this.generateSourceUrl(oriUrl);
        data.slug = this.generateSlug(oriUrl);
        data.href = this.generateHref(to, data.slug);
        return data;
    }
    parseAnimeCard2List($, to) {
        const data = { animeList: [] };
        const animeElements = $(".animpost .animepost").toArray();
        animeElements.forEach((animeElement) => {
            const card = this.parseAnimeCard2($, $(animeElement), to);
            data.animeList.push(card);
        });
        const isEmpty = data.animeList.length === 0;
        this.checkEmptyData(isEmpty);
        return data;
    }
    parseDetails($) {
        const details = {};
        const detailElements = $(".infox .spe span").toArray();
        detailElements.forEach((detailElement) => {
            let key = $(detailElement).find("b").text();
            const value = $(detailElement).text().replace(key, "").trim();
            key = this.toCamelCase(key).replace(":", "");
            details[key] = value;
        });
        return details;
    }
    parseSynopsis($) {
        const synopsis = { paragraphs: [], connections: [] };
        const connectionElements = $(".desc a").toArray();
        connectionElements.forEach((connectionElement) => {
            const card = this.parseLinkCard($(connectionElement), "anime");
            synopsis.connections?.push({
                title: card.title,
                animeId: card.slug,
                href: card.href,
                samehadakuUrl: card.samehadakuUrl,
            });
        });
        $(".desc p a").remove();
        const paragraphElements = $(".desc p").toArray();
        paragraphElements.forEach((paragraphElement) => {
            synopsis.paragraphs.push($(paragraphElement).text().trim());
        });
        return synopsis;
    }
    parseDownloadUrl($) {
        const downloadUrl = { formats: [] };
        const downloadElements = $(".download-eps").toArray();
        downloadElements.forEach((downloadElement) => {
            const title = $(downloadElement).find("p").text();
            const qualities = [];
            const qualityElements = $(downloadElement).find("ul li").toArray();
            qualityElements.forEach((qualityElement) => {
                const title = $(qualityElement).find("strong").text();
                const urls = [];
                const urlElements = $(qualityElement).find("span a").toArray();
                urlElements.forEach((urlElement) => {
                    const title = $(urlElement).text();
                    const url = this.str($(urlElement).attr("href"));
                    urls.push({ title, url });
                });
                qualities.push({ title, urls });
            });
            downloadUrl.formats.push({ title, qualities });
        });
        return downloadUrl;
    }
    parsePagination($) {
        const data = {
            currentPage: 1,
            hasPrevPage: false,
            prevPage: null,
            hasNextPage: false,
            nextPage: null,
            totalPages: 1,
        };
        const firstSpanEl = $(".pagination span:first")
            .text()
            .toLowerCase()
            .split(" ")
            .filter((str) => str !== "" && !isNaN(Number(str.trim())));
        data.currentPage = Number(firstSpanEl[0]) || 1;
        data.totalPages = Number(firstSpanEl[1]) || 1;
        data.prevPage = data.currentPage - 1 || null;
        data.hasPrevPage = data.prevPage ? true : false;
        data.nextPage = data.currentPage + 1 <= data.totalPages ? data.currentPage + 1 : null;
        data.hasNextPage = data.nextPage ? true : false;
        if (!data.currentPage && !data.totalPages && !data.prevPage && !data.nextPage) {
            return undefined;
        }
        return data;
    }
}
exports.default = SamehadakuParserExtra;
