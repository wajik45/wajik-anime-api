"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataFetcher_1 = require("../../../services/dataFetcher");
const lruCache_1 = require("../../../libs/lruCache");
const OtakudesuParserExtra_1 = __importDefault(require("./OtakudesuParserExtra"));
class OtakudesuParser extends OtakudesuParserExtra_1.default {
    parseHome() {
        return this.scrape({
            path: "/",
            initialData: {
                ongoing: { href: "", otakudesuUrl: "", animeList: [] },
                completed: { href: "", otakudesuUrl: "", animeList: [] },
            },
        }, async ($, data) => {
            data.ongoing.href = this.generateHref("ongoing");
            data.completed.href = this.generateHref("completed");
            const linkElements = $(".rapi > a").toArray();
            linkElements.forEach((linkElement, index) => {
                const listType = index === 0 ? "ongoing" : index === 1 ? "completed" : "error";
                const otakudesuUrl = this.generateSourceUrl($(linkElement).attr("href"));
                if (listType !== "error") {
                    if (listType === "ongoing") {
                        data.ongoing.otakudesuUrl = otakudesuUrl;
                    }
                    else {
                        data.completed.otakudesuUrl = otakudesuUrl;
                    }
                }
            });
            const homeElements = $(".venz").toArray();
            homeElements.forEach((homeElement, index) => {
                const animeElements = $(homeElement).find("ul li .detpost").toArray();
                animeElements.forEach((animeElement) => {
                    const listType = index === 0 ? "ongoing" : index === 1 ? "completed" : "error";
                    if (listType !== "error") {
                        if (listType === "ongoing") {
                            const card = this.parseAnimeCard2($(animeElement));
                            data.ongoing.animeList.push(card);
                        }
                        else {
                            const card = this.parseAnimeCard1($(animeElement));
                            data.completed.animeList.push(card);
                        }
                    }
                });
            });
            const isEmpty = data.ongoing.animeList.length === 0 && data.completed.animeList.length === 0;
            this.checkEmptyData(isEmpty);
            return data;
        });
    }
    parseSchedule() {
        return this.scrape({
            path: "/jadwal-rilis",
            initialData: { days: [] },
        }, async ($, data) => {
            const scheduleElements = $(".kglist321").toArray();
            scheduleElements.forEach((scheduleElement) => {
                const animeList = [];
                const day = $(scheduleElement).find("h2").text();
                const animeElements = $(scheduleElement).find("ul li a").toArray();
                animeElements.forEach((animeElement) => {
                    const card = this.parseLinkCard($(animeElement), "anime");
                    animeList.push({
                        title: card.title,
                        animeId: card.slug,
                        href: card.href,
                        otakudesuUrl: card.otakudesuUrl,
                    });
                });
                data.days.push({ day, animeList });
            });
            const isEmpty = data.days.length === 0;
            this.checkEmptyData(isEmpty);
            return data;
        });
    }
    parseAllAnimes() {
        return this.scrape({
            path: "/anime-list",
            initialData: { list: [] },
        }, async ($, data) => {
            const listElements = $(".bariskelom").toArray();
            listElements.forEach((listElement) => {
                const animeList = [];
                const startWith = $(listElement).find(".barispenz a").text();
                const animeElements = $(listElement).find(".jdlbar a").toArray();
                animeElements.forEach((animeElement) => {
                    const card = this.parseLinkCard($(animeElement), "anime");
                    animeList.push({
                        title: card.title,
                        animeId: card.slug,
                        href: card.href,
                        otakudesuUrl: card.otakudesuUrl,
                    });
                });
                data.list.push({ startWith, animeList });
            });
            const isEmpty = data.list.length === 0;
            this.checkEmptyData(isEmpty);
            return data;
        });
    }
    parseAllGenres() {
        return this.scrape({
            path: "/genre-list",
            initialData: { genreList: [] },
        }, async ($, data) => {
            const genreElements = $(".genres li a").toArray();
            genreElements.forEach((genreElement) => {
                const card = this.parseLinkCard($(genreElement), "genres");
                data.genreList.push({
                    title: card.title,
                    genreId: card.slug,
                    href: card.href,
                    otakudesuUrl: card.otakudesuUrl,
                });
            });
            const isEmpty = data.genreList.length === 0;
            this.checkEmptyData(isEmpty);
            return data;
        });
    }
    parseOngoingAnimes(page) {
        return this.scrape({
            path: `/ongoing-anime/page/${page}`,
            initialData: { data: { animeList: [] } },
        }, async ($, { data, pagination }) => {
            const animeElements = $(".venutama ul li").toArray();
            animeElements.forEach((animeElement) => {
                const card = this.parseAnimeCard2($(animeElement));
                data.animeList.push(card);
            });
            pagination = this.parsePagination($);
            const isEmpty = data.animeList.length === 0;
            this.checkEmptyData(isEmpty);
            return { data, pagination };
        });
    }
    parseCompletedAnimes(page) {
        return this.scrape({
            path: `/complete-anime/page/${page}`,
            initialData: { data: { animeList: [] } },
        }, async ($, { data, pagination }) => {
            const animeElements = $(".venutama ul li").toArray();
            animeElements.forEach((animeElement) => {
                const card = this.parseAnimeCard1($(animeElement));
                data.animeList.push(card);
            });
            pagination = this.parsePagination($);
            const isEmpty = data.animeList.length === 0;
            this.checkEmptyData(isEmpty);
            return { data, pagination };
        });
    }
    parseSearch(q) {
        return this.scrape({
            path: `?s=${q}&post_type=anime`,
            initialData: { animeList: [] },
        }, async ($, data) => {
            const animeElements = $("ul.chivsrc li").toArray();
            animeElements.forEach((animeElement) => {
                const card = this.parseAnimeCard3($, $(animeElement));
                data.animeList.push(card);
            });
            const isEmpty = data.animeList.length === 0;
            this.checkEmptyData(isEmpty);
            return data;
        });
    }
    parseGenreAnimes(genreId, page) {
        return this.scrape({
            path: `/genres/${genreId}/page/${page}`,
            initialData: { data: { animeList: [] } },
        }, async ($, { data, pagination }) => {
            const animeElements = $(".venser .col-anime").toArray();
            for (let i = 0; i < animeElements.length; i++) {
                const animeElement = animeElements[i];
                const card = await this.parseAnimeCard4($, $(animeElement));
                data.animeList.push(card);
            }
            pagination = this.parsePagination($);
            const isEmpty = data.animeList.length === 0;
            this.checkEmptyData(isEmpty);
            return { data, pagination };
        });
    }
    parseAnimeDetails(animeId) {
        return this.scrape({
            path: `/anime/${animeId}`,
            initialData: {
                title: "",
                poster: "",
                japanese: "",
                score: "",
                producers: "",
                type: "",
                status: "",
                episodes: 0,
                duration: "",
                aired: "",
                studios: "",
                batch: null,
                synopsis: { paragraphs: [], connections: [] },
                genreList: [],
                episodeList: [],
                recommendedAnimeList: [],
            },
        }, async ($, data) => {
            const { info, genreList } = this.parseDetails($, $(".infozingle p"));
            data.title = info.judul;
            data.japanese = info.japanese;
            data.score = info.skor;
            data.producers = info.produser;
            data.type = info.tIOPE;
            data.status = info.status;
            data.episodes = this.num(info.totalEpisode);
            data.duration = info.durasi;
            data.aired = info.tanggalRilis;
            data.studios = info.studio;
            data.poster = this.str($("#venkonten .fotoanime img").attr("src"));
            data.synopsis = await this.parseSynopsis($, $(".sinopc p"), true);
            data.genreList = genreList;
            const listHeaderElements = $(".episodelist").toArray();
            listHeaderElements.forEach((listHeaderElement, index) => {
                const listElements = $(listHeaderElement).find("ul li").toArray();
                listElements.forEach((listElement) => {
                    const title = $(listElement).find("a").text();
                    const oriUrl = $(listElement).find("a").attr("href");
                    const otakudesuUrl = this.generateSourceUrl(oriUrl);
                    const slug = this.generateSlug(oriUrl);
                    const listType = index === 0 ? "batch" : index === 1 ? "episode" : "error";
                    if (listType !== "error") {
                        if (listType === "batch") {
                            data.batch = {
                                title,
                                batchId: slug,
                                href: this.generateHref("batch", slug),
                                otakudesuUrl,
                            };
                        }
                        else {
                            data.episodeList.push({
                                title: this.num(title
                                    .toLowerCase()
                                    .split("episode")[1]
                                    .trim()
                                    .split(" ")
                                    .filter((str, index) => {
                                    if (!isNaN(Number(str)) && index === 0)
                                        return str;
                                })
                                    .join("")),
                                episodeId: slug,
                                href: this.generateHref("episode", slug),
                                otakudesuUrl,
                            });
                        }
                    }
                });
            });
            const animeElements = $(".isi-recommend-anime-series .isi-konten").toArray();
            animeElements.forEach((animeElement) => {
                const card = this.parseAnimeCard5($(animeElement));
                data.recommendedAnimeList.push(card);
            });
            const isEmpty = !data.title && data.episodeList.length === 0;
            this.checkEmptyData(isEmpty);
            return data;
        });
    }
    parseAnimeEpisode(episodeId) {
        return this.scrape({
            path: `/episode/${episodeId}`,
            initialData: {
                title: "",
                animeId: "",
                releaseTime: "",
                defaultStreamingUrl: "",
                hasPrevEpisode: false,
                prevEpisode: null,
                hasNextEpisode: false,
                nextEpisode: null,
                server: { qualities: [] },
                downloadUrl: { qualities: [] },
                info: {
                    credit: "",
                    encoder: "",
                    duration: "",
                    type: "",
                    genreList: [],
                    episodeList: [],
                },
            },
        }, async ($, data) => {
            const { info, genreList } = this.parseDetails($, $(".infozingle p"));
            data.title = $(".posttl").text();
            data.animeId = this.generateSlug($($(".prevnext .flir a")
                .toArray()
                .filter((item) => {
                if ($(item).text() === "See All Episodes") {
                    return item;
                }
            })[0]).attr("href"));
            data.releaseTime = $(".kategoz .fa.fa-clock-o").next().text();
            data.defaultStreamingUrl = this.str($(".responsive-embed-stream iframe").attr("src"));
            data.info.genreList = genreList;
            data.info.type = info.tipe;
            delete info["tipe"];
            const serverElements = $(".mirrorstream ul").toArray();
            const nonceCacheKey = "otakudesuNonce";
            if (!lruCache_1.cache.get(nonceCacheKey)) {
                const nonce = await (0, dataFetcher_1.wajikFetch)(`${this.baseUrl}/wp-admin/admin-ajax.php`, this.baseUrl, {
                    method: "POST",
                    responseType: "json",
                    data: new URLSearchParams({
                        action: this.derawr("ff675Di7Ck7Ehf895hE7hBBi6E7Bk68k"),
                    }),
                });
                if (nonce?.data)
                    lruCache_1.cache.set(nonceCacheKey, nonce.data);
            }
            serverElements.forEach((serverElement) => {
                const serverList = [];
                const title = $(serverElement)
                    .text()
                    .split(" ")
                    .join("")
                    .trim()
                    .replace($(serverElement).find("li").text().split(" ").join("").trim(), "")
                    .toLowerCase()
                    .replaceAll("mirror", "");
                const urlElements = $(serverElement).find("li a").toArray();
                urlElements.forEach((urlElement) => {
                    const title = $(urlElement).text();
                    const dataContent = this.str($(urlElement).attr("data-content"));
                    const data = JSON.parse(Buffer.from(dataContent, "base64").toString());
                    const serverId = this.enrawr(`${data.id}-${data.i}-${data.q}`);
                    const href = this.generateHref("server", serverId);
                    serverList.push({
                        title,
                        serverId,
                        href,
                    });
                });
                data.server.qualities.push({ title, serverList });
            });
            const navigationElements = $(".flir a").toArray();
            navigationElements.forEach((navigationElement, index) => {
                const card = this.parseLinkCard($(navigationElement), "episode");
                if (!card.title.includes("See All Episodes")) {
                    if (index === 0) {
                        data.prevEpisode = {
                            title: "Prev",
                            episodeId: card.slug,
                            href: card.href,
                            otakudesuUrl: card.otakudesuUrl,
                        };
                    }
                    else if (index === 1 || index === 2) {
                        data.nextEpisode = {
                            title: "Next",
                            episodeId: card.slug,
                            href: card.href,
                            otakudesuUrl: card.otakudesuUrl,
                        };
                    }
                }
            });
            data.hasPrevEpisode = data.prevEpisode ? true : false;
            data.hasNextEpisode = data.nextEpisode ? true : false;
            const downloadElements = $(".download ul li").toArray();
            downloadElements.forEach((downloadElement) => {
                const urls = [];
                const title = $(downloadElement).find("strong").text().trim().replace(/\ /g, "_");
                const size = $(downloadElement).find("i").text();
                const urlElements = $(downloadElement).find("a").toArray();
                urlElements.forEach((urlElement) => {
                    const title = $(urlElement).text();
                    const url = this.str($(urlElement).attr("href"));
                    urls.push({
                        title,
                        url,
                    });
                });
                data.downloadUrl.qualities.push({
                    title,
                    size,
                    urls,
                });
            });
            const episodeElements = $(".keyingpost li").toArray();
            episodeElements.forEach((episodeElement) => {
                const title = this.num($(episodeElement).find("a").text().trim().replace("Episode", "").trim());
                const oriUrl = $(episodeElement).find("a").attr("href");
                const otakudesuUrl = this.generateSourceUrl(oriUrl);
                const episodeId = this.generateSlug(oriUrl);
                const href = this.generateHref("episode", episodeId);
                data.info.episodeList.push({
                    title,
                    episodeId,
                    href,
                    otakudesuUrl,
                });
            });
            data.info = {
                ...data.info,
                ...info,
            };
            const isEmpty = !data.title &&
                !data.defaultStreamingUrl &&
                !data.prevEpisode &&
                !data.nextEpisode &&
                data.downloadUrl.qualities.length === 0;
            this.checkEmptyData(isEmpty);
            return data;
        });
    }
    async parseServerUrl(serverId) {
        const data = { url: "" };
        const nonceCacheKey = "otakudesuNonce";
        const serverIdArr = this.derawr(serverId).split("-");
        const getUrlData = async (nonce) => {
            return await (0, dataFetcher_1.wajikFetch)(`${this.baseUrl}/wp-admin/admin-ajax.php`, this.baseUrl, {
                method: "POST",
                responseType: "json",
                data: new URLSearchParams({
                    id: serverIdArr[0],
                    i: serverIdArr[1],
                    q: serverIdArr[2],
                    action: this.derawr("7f8A5AhE8g558Ai8k9AAikD7gkECBgD9"),
                    nonce: nonce,
                }),
            });
        };
        const getHtml = (base64) => {
            return Buffer.from(base64, "base64").toString();
        };
        const getUrl = (html) => this.generateSrcFromIframeTag(html);
        try {
            const nonce = lruCache_1.cache.get(nonceCacheKey);
            const url = await getUrlData(nonce);
            data.url = getUrl(getHtml(url.data));
        }
        catch (error) {
            if (error.status === 403) {
                const nonce = await (0, dataFetcher_1.wajikFetch)(`${this.baseUrl}/wp-admin/admin-ajax.php`, this.baseUrl, {
                    method: "POST",
                    responseType: "json",
                    data: new URLSearchParams({
                        action: this.derawr("ff675Di7Ck7Ehf895hE7hBBi6E7Bk68k"),
                    }),
                });
                if (nonce?.data) {
                    lruCache_1.cache.set(nonceCacheKey, nonce.data);
                    const response = await getUrlData(nonce.data);
                    data.url = getUrl(getHtml(response.data));
                }
            }
            else {
                throw error;
            }
        }
        const isEmpty = !data.url || data.url === "No iframe found";
        this.checkEmptyData(isEmpty);
        return data;
    }
    parseAnimeBatch(batchId) {
        return this.scrape({
            path: `/batch/${batchId}`,
            initialData: {
                title: "",
                animeId: "",
                poster: "",
                japanese: "",
                type: "",
                score: "",
                episodes: 0,
                duration: "",
                studios: "",
                producers: "",
                aired: "",
                credit: "",
                genreList: [],
                downloadUrl: { formats: [] },
            },
        }, async ($, data) => {
            const info = {};
            const infoElement = $(".animeinfo .infos");
            infoElement.toArray().forEach((infoElement) => {
                $(infoElement).find("br").after("break");
            });
            infoElement
                .text()
                .split("break")
                .forEach((item) => {
                if (item) {
                    const key = this.toCamelCase(item.split(":")[0].trim());
                    const value = item.split(":")[1].trim();
                    if (!key.includes("genre"))
                        info[key] = value;
                }
            });
            const genreElements = $(".animeinfo .infos a").toArray();
            genreElements.forEach((genreElement) => {
                const card = this.parseLinkCard($(genreElement), "genres");
                data.genreList.push({
                    title: card.title,
                    genreId: card.slug,
                    href: card.href,
                    otakudesuUrl: card.otakudesuUrl,
                });
            });
            const batchElements = $(".batchlink h4").toArray();
            batchElements.forEach((batchElement) => {
                const title = $(batchElement).text();
                const qualities = [];
                const qualityElements = $(batchElement).next().find("li").toArray();
                qualityElements.forEach((qualityElement) => {
                    const title = $(qualityElement).find("strong").text();
                    const size = $(qualityElement).find("i").text();
                    const urls = [];
                    const urlElements = $(qualityElement).find("a").toArray();
                    urlElements.forEach((urlElement) => {
                        const title = $(urlElement).text();
                        const url = $(urlElement).attr("href");
                        urls.push({
                            title,
                            url,
                        });
                    });
                    qualities.push({
                        title,
                        size,
                        urls,
                    });
                });
                data.downloadUrl.formats.push({
                    title,
                    qualities,
                });
            });
            data.title = info.judul;
            data.animeId = this.generateSlug($(".totalepisode h3 a").attr("href"));
            data.score = info.rating;
            data.episodes = this.num(info.episodes);
            delete info["judul"];
            delete info["rating"];
            delete info["episodes"];
            data.poster = this.str($(".animeinfo img").attr("src"));
            const result = {
                ...data,
                ...info,
            };
            const isEmpty = !data.title && data.genreList.length === 0 && data.downloadUrl.formats.length === 0;
            this.checkEmptyData(isEmpty);
            return result;
        });
    }
}
exports.default = OtakudesuParser;
