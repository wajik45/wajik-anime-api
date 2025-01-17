"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetcher_1 = require("../../../services/dataFetcher");
const AnimeScraper_1 = __importDefault(require("../../../scrapers/AnimeScraper"));
class OtakudesuParserExtra extends AnimeScraper_1.default {
    parseAnimeCard1(el) {
        const data = {
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
    parseAnimeCard2(el) {
        const card = this.parseAnimeCard1(el);
        const data = {
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
    parseAnimeCard3($, el) {
        const info = el.find(".set");
        const data = {
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
    async parseAnimeCard4($, el) {
        const data = {
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
    parseAnimeCard5(el) {
        const data = {
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
    async parseSynopsis($, el, withConnections) {
        const data = { paragraphs: [], connections: [] };
        const temporaryData = { connections: [] };
        const otakudesuUrls = [];
        const mainElements = el.toArray();
        for (let i = 0; i < mainElements.length; i++) {
            const mainElement = mainElements[i];
            const el = $(mainElement);
            const connectionElements = el.find("a").toArray();
            if (el.text()) {
                if (connectionElements.length === 0) {
                    const synopsisText = el.text();
                    data.paragraphs.push(synopsisText);
                }
                else {
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
                            }
                            else {
                                const originalUrl = await (0, dataFetcher_1.getFinalUrl)(otakudesuUrl, this.baseUrl);
                                if (originalUrl.includes("?p=")) {
                                    if (!originalUrl.includes(this.baseUrl)) {
                                        const query = this.generateSlug(originalUrl);
                                        otakudesuUrls.push(this.baseUrl + query);
                                    }
                                    else {
                                        otakudesuUrls.push(originalUrl);
                                    }
                                }
                            }
                        }
                        const originalUrls = await (0, dataFetcher_1.getFinalUrls)(otakudesuUrls, this.baseUrl, {
                            axiosConfig: { timeout: 10000 },
                            retryConfig: { delay: 100, retries: 2 },
                        });
                        const finalConnections = [];
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
    parseLinkCard(el, to) {
        const data = {
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
    parseDetails($, el) {
        const data = { info: {}, genreList: [] };
        const infoElements = el.toArray();
        infoElements.forEach((infoElement) => {
            const el = $(infoElement);
            let key = el.find("b").text();
            const value = el.text().replaceAll(key, "").replaceAll(":", "").trim();
            key = this.toCamelCase(key);
            if (!key.includes("genre"))
                data.info[key] = value;
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
    parsePagination($) {
        const data = {
            currentPage: 1,
            hasPrevPage: false,
            prevPage: null,
            hasNextPage: false,
            nextPage: null,
            totalPages: 1,
        };
        data.currentPage = this.num($('.pagination [aria-current="page"]').text()) || 1;
        const prevPage = this.str($(".pagination .prev").attr("href"));
        data.prevPage = this.num(prevPage.split("/")[prevPage.split("/").length - 2]);
        data.hasPrevPage = data.prevPage ? true : false;
        const nextPage = this.str($(".pagination .next").attr("href"));
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
exports.default = OtakudesuParserExtra;
