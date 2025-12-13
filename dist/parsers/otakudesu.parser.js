import * as T from "../interfaces/otakudesu.interface.js";
import mainParser from "./main/main.parser.js";
import errorinCuy from "../helpers/errorinCuy.js";
import otakudesuExtraParser from "./extra/otakudesu.extra.parser.js";
import otakudesuConfig from "../configs/otakudesu.config.js";
import generateSrcFromIframeTag from "../helpers/generateSrcFromIframeTag.js";
import otakudesuScraper from "../scrapers/otakudesu.scraper.js";
const { baseUrl } = otakudesuConfig;
const { Text, Attr, Id, Num, Src, AnimeSrc } = mainParser;
const otakudesuParser = {
    parseHome(document) {
        const parentElems = document.querySelectorAll(".venz");
        const ongoingAnimeElems = parentElems[0]?.querySelectorAll("ul li");
        const completedAnimeElems = parentElems[1]?.querySelectorAll("ul li");
        function getSource(index) {
            return AnimeSrc(parentElems[index]?.previousElementSibling || null);
        }
        const ongoingUrl = getSource(0);
        const completedUrl = getSource(1);
        const ongoingAnimeList = ongoingAnimeElems?.map((animeEl) => {
            const animeCard = otakudesuExtraParser.parseOngoingCard(animeEl);
            return animeCard;
        }) || [];
        const completedAnimeList = completedAnimeElems?.map((animeEl) => {
            const animeCard = otakudesuExtraParser.parseCompletedCard(animeEl);
            return animeCard;
        }) || [];
        return {
            ongoing: {
                otakudesuUrl: ongoingUrl,
                animeList: ongoingAnimeList,
            },
            completed: {
                otakudesuUrl: completedUrl,
                animeList: completedAnimeList,
            },
        };
    },
    parseSchedules(document) {
        const scheduleElems = document.querySelectorAll(".kglist321");
        const scheduleList = scheduleElems.map((scheduleEl) => {
            const title = Text(scheduleEl.querySelector("h2"));
            const animeElems = scheduleEl.querySelectorAll("ul li a");
            const animeList = animeElems.map((animeEl) => {
                const { id, title, otakudesuUrl } = otakudesuExtraParser.parseTextCard(animeEl);
                return {
                    title,
                    animeId: id,
                    otakudesuUrl,
                };
            });
            return {
                title,
                animeList,
            };
        });
        if (scheduleList.length === 0) {
            throw errorinCuy(404);
        }
        return scheduleList;
    },
    parseAllAnimes(document) {
        const parentElems = document.querySelectorAll(".bariskelom");
        const list = parentElems.map((letterEl) => {
            const startWith = Text(letterEl.querySelector(".barispenz"));
            const animeElems = letterEl.querySelectorAll(".jdlbar");
            const animeList = animeElems.map((animeEl) => {
                const { id, title, otakudesuUrl } = otakudesuExtraParser.parseTextCard(animeEl.querySelector("a"));
                return {
                    title,
                    animeId: id,
                    otakudesuUrl,
                };
            });
            return {
                startWith,
                animeList,
            };
        });
        if (list.length === 0) {
            throw errorinCuy(404);
        }
        return list;
    },
    parseAllGenres(document) {
        const genreElems = document.querySelectorAll("ul.genres li a");
        const genreList = otakudesuExtraParser.parseTextGenreList(genreElems);
        if (genreList.length === 0) {
            throw errorinCuy(404);
        }
        return genreList;
    },
    parseOngoingAnimes(document) {
        const animeElems = document.querySelectorAll(".venz ul li");
        const animeList = animeElems.map((animeEl) => {
            const animeCard = otakudesuExtraParser.parseOngoingCard(animeEl);
            return animeCard;
        });
        if (animeList.length === 0) {
            throw errorinCuy(404);
        }
        return animeList;
    },
    parseCompletedAnimes(document) {
        const animeElems = document.querySelectorAll(".venz ul li");
        const animeList = animeElems.map((animeEl) => {
            const animeCard = otakudesuExtraParser.parseCompletedCard(animeEl);
            return animeCard;
        });
        if (animeList.length === 0) {
            throw errorinCuy(404);
        }
        return animeList;
    },
    parseSearchedAnimes(document) {
        const animeElems = document.querySelectorAll("ul.chivsrc li");
        const animeList = animeElems.map((animeEl) => {
            const genreElems = animeEl.lastElementChild?.previousElementSibling?.previousElementSibling?.querySelectorAll("a");
            const genreList = otakudesuExtraParser.parseTextGenreList(genreElems);
            return {
                title: Text(animeEl.querySelector("h2")),
                animeId: Id(animeEl.querySelector("a")),
                poster: Src(animeEl.querySelector("img")),
                score: Text(animeEl.lastElementChild),
                status: Text(animeEl.lastElementChild?.previousElementSibling),
                otakudesuUrl: AnimeSrc(animeEl.querySelector("a")),
                genreList,
            };
        });
        if (animeList.length === 0) {
            throw errorinCuy(404);
        }
        return animeList;
    },
    parseAnimesByGenre(document) {
        const animeElems = document.querySelectorAll(".page .col-anime");
        const animeList = animeElems.map((animeEl) => {
            const paragraphElems = animeEl.querySelectorAll(".col-synopsis p");
            const synopsis = {
                paragraphList: paragraphElems
                    .map((paragraphEl) => {
                    const paragraph = paragraphEl.text;
                    return paragraph;
                })
                    .filter((paragraph) => {
                    return paragraph;
                }),
            };
            const genreElems = animeEl.querySelectorAll(".col-anime-genre a");
            const genreList = otakudesuExtraParser.parseTextGenreList(genreElems);
            return {
                title: Text(animeEl.querySelector(".col-anime-title")),
                animeId: Id(animeEl.querySelector(".col-anime-title a")),
                poster: Src(animeEl.querySelector(".col-anime-cover img")),
                score: Text(animeEl.querySelector(".col-anime-rating")),
                episodes: Text(animeEl.querySelector(".col-anime-eps"), /(\S+) Eps/),
                season: Text(animeEl.querySelector(".col-anime-date")),
                studios: Text(animeEl.querySelector(".col-anime-studio")),
                otakudesuUrl: AnimeSrc(animeEl.querySelector(".col-anime-title a")),
                synopsis,
                genreList,
            };
        });
        if (animeList.length === 0) {
            throw errorinCuy(404);
        }
        return animeList;
    },
    parseBatchDetails(document) {
        const downloadElems = document.querySelectorAll(".batchlink ul");
        const formatList = downloadElems.map((downloadEl) => {
            const qualityElems = downloadEl.querySelectorAll("li");
            const qualityList = qualityElems.map((qualityEl) => {
                const urlElems = qualityEl.querySelectorAll("a");
                const urlList = urlElems.map((urlEl) => {
                    return {
                        title: Text(urlEl),
                        url: Attr(urlEl, "href"),
                    };
                });
                return {
                    title: Text(qualityEl.querySelector("strong")),
                    size: Text(qualityEl.querySelector("i")),
                    urlList,
                };
            });
            return {
                title: Text(downloadEl.previousElementSibling),
                qualityList,
            };
        });
        const genreElems = document.querySelectorAll(".infos a");
        const genreList = otakudesuExtraParser.parseTextGenreList(genreElems);
        const getInfo = otakudesuExtraParser.parseInfo(document.querySelectorAll(".infos b"));
        return {
            title: getInfo(0),
            animeId: Id(document.querySelector(".totalepisode a")),
            poster: Src(document.querySelector(".imganime img")),
            japanese: getInfo(1),
            type: getInfo(2),
            episodes: getInfo(3),
            score: getInfo(4),
            duration: getInfo(6),
            studios: getInfo(7),
            producers: getInfo(8),
            aired: getInfo(9),
            credit: getInfo(10),
            download: { formatList },
            genreList,
        };
    },
    parseAnimeDetails(document) {
        const paragraphElems = document.querySelectorAll(".sinopc p");
        const synopsis = otakudesuExtraParser.parseSynopsis(paragraphElems);
        const headerTitleElems = document.querySelectorAll(".smokelister");
        let batch = null;
        let episodeList = [];
        for (let i = 0; i < headerTitleElems.length; i++) {
            const headerTitleEl = headerTitleElems[i];
            if (headerTitleEl?.text.toLowerCase().includes("batch")) {
                const batchEl = headerTitleEl.nextElementSibling?.querySelector("a");
                if (batchEl) {
                    batch = {
                        title: Text(batchEl),
                        batchId: Id(batchEl),
                        otakudesuUrl: AnimeSrc(batchEl),
                    };
                    break;
                }
            }
        }
        for (let i = 0; i < headerTitleElems.length; i++) {
            const headerTitleEl = headerTitleElems[i];
            if (!headerTitleEl?.text.toLowerCase().includes("batch") &&
                headerTitleEl?.text.toLowerCase().includes("episode")) {
                const episodeElems = headerTitleEl.nextElementSibling?.querySelectorAll("li a");
                if (episodeElems) {
                    episodeList = otakudesuExtraParser.parseTextEpisodeList(episodeElems);
                    break;
                }
            }
        }
        const genreParEl = document.querySelector(".infozingle")?.lastElementChild;
        const genreElems = genreParEl.querySelectorAll("a");
        const genreList = otakudesuExtraParser.parseTextGenreList(genreElems);
        const animeElems = document.querySelectorAll(".isi-recommend-anime-series .isi-konten");
        const recommendedAnimeList = animeElems.map((animeEl) => {
            return {
                title: Text(animeEl.querySelector(".judul-anime")),
                animeId: Id(animeEl.querySelector(".isi-anime a")),
                poster: Src(animeEl.querySelector("img")),
                otakudesuUrl: AnimeSrc(animeEl.querySelector(".isi-anime a")),
            };
        });
        const getInfo = otakudesuExtraParser.parseInfo(document.querySelectorAll(".infozingle b"));
        return {
            title: getInfo(0),
            japanese: getInfo(1),
            score: getInfo(2),
            producers: getInfo(3),
            type: getInfo(4),
            status: getInfo(5),
            episodes: getInfo(6),
            duration: getInfo(7),
            aired: getInfo(8),
            studios: getInfo(9),
            poster: Src(document.querySelector(".fotoanime img")),
            synopsis: synopsis,
            batch,
            genreList,
            episodeList,
            recommendedAnimeList,
        };
    },
    async parseEpisodeDetails(document, url) {
        const navigationElems = document.querySelectorAll(".flir a");
        let prevEpisode = null;
        let nextEpisode = null;
        navigationElems.forEach((navigationEl) => {
            const navigationTitle = navigationEl.text;
            const navigationObj = {
                title: navigationTitle,
                episodeId: Id(navigationEl),
                otakudesuUrl: AnimeSrc(navigationEl),
            };
            if (navigationTitle.toLowerCase().includes("prev")) {
                prevEpisode = { ...navigationObj, title: "Prev" };
            }
            else if (navigationTitle.toLowerCase().includes("next")) {
                nextEpisode = { ...navigationObj, title: "Next" };
            }
        });
        const downloadElems = document.querySelectorAll(".download ul li");
        const download = {
            title: "Download",
            qualityList: downloadElems.map((downloadEl) => {
                const title = Text(downloadEl.querySelector("strong"));
                const size = Text(downloadEl.querySelector("i"));
                const urlElems = downloadEl.querySelectorAll("a");
                const urlList = urlElems.map((urlEl) => {
                    const title = Text(urlEl);
                    const url = Attr(urlEl, "href");
                    return { title, url };
                });
                return {
                    title,
                    size,
                    urlList,
                };
            }),
        };
        const credentials = [
            ...new Set([...document.innerText.matchAll(/action:"([^"]+)"/g)].map((m) => m[1])),
        ];
        const nonceBody = new URLSearchParams({
            action: credentials[1] || "",
        });
        const nonce = await otakudesuScraper.scrapeNonce(nonceBody.toString(), url);
        const serverElems = document.querySelectorAll(".mirrorstream > ul");
        const server = {
            title: "Server",
            qualityList: serverElems.map((serverEl) => {
                const title = serverEl.querySelector("li")?.previousSibling?.text || "";
                const serverElems = serverEl.querySelectorAll("li a[data-content]");
                const serverList = serverElems.map((serverEl) => {
                    const title = Text(serverEl);
                    const serverId = Attr(serverEl, "data-content");
                    const decodedServerId = {
                        ...JSON.parse(Buffer.from(serverId, "base64").toString()),
                        nonce: nonce.data || "",
                        action: credentials[0],
                        referer: url,
                    };
                    const encodedServerId = Buffer.from(JSON.stringify(decodedServerId), "utf-8").toString("base64url");
                    return {
                        title,
                        serverId: encodedServerId,
                    };
                });
                return {
                    title,
                    serverList,
                };
            }),
        };
        const title = Text(document.querySelector(".venutama h1.posttl"));
        const animeId = Id(document.querySelector(".alert-info")?.lastElementChild?.querySelector("a"));
        const releaseTime = Text(document.querySelector(".kategoz .fa-clock-o")?.nextElementSibling)
            .replace(/Release on /g, "")
            .toUpperCase();
        const defaultStreamingUrl = Src(document.querySelector(".player-embed iframe"));
        const hasPrevEpisode = prevEpisode ? true : false;
        const hasNextEpisode = nextEpisode ? true : false;
        const genreElems = document.querySelectorAll(".infozingle p")[2]?.querySelectorAll("a");
        const genreList = otakudesuExtraParser.parseTextGenreList(genreElems || []);
        const episodeElems = document.querySelectorAll(".keyingpost li a");
        const episodeList = otakudesuExtraParser.parseTextEpisodeList(episodeElems);
        const infoElems = document.querySelectorAll(".infozingle b");
        const getInfo = otakudesuExtraParser.parseInfo(infoElems);
        return {
            title,
            animeId,
            releaseTime,
            defaultStreamingUrl,
            hasPrevEpisode,
            prevEpisode,
            hasNextEpisode,
            nextEpisode,
            server,
            download,
            info: {
                credit: getInfo(0),
                encoder: getInfo(1),
                duration: getInfo(3),
                type: getInfo(4),
                genreList,
                episodeList,
            },
        };
    },
    async parseServerDetails(serverId) {
        const serverIdObj = JSON.parse(Buffer.from(serverId, "base64").toString());
        const referer = serverIdObj?.referer;
        delete serverIdObj["referer"];
        const serverBody = new URLSearchParams(serverIdObj);
        const server = await otakudesuScraper.scrapeServer(serverBody.toString(), referer);
        const url = generateSrcFromIframeTag(Buffer.from(server.data || "", "base64").toString());
        return { url };
    },
    parsePagination(document) {
        function generatePage(el) {
            const url = el?.getAttribute("href");
            const match = url?.match(/page\/(\d+)\//);
            if (match) {
                const page = Number(match[1]) || null;
                return page;
            }
            return Number(el?.text) || null;
        }
        const paginationEl = document.querySelector(".pagination .pagenavix");
        if (paginationEl) {
            const pagination = {
                currentPage: null,
                prevPage: null,
                hasPrevPage: false,
                nextPage: null,
                hasNextPage: false,
                totalPages: null,
            };
            const currentPageEl = paginationEl.querySelector(".page-numbers.current");
            const prevPageEl = paginationEl.querySelector(".page-numbers.prev");
            const nextPageEl = paginationEl.querySelector(".page-numbers.next");
            const lastPageEl = paginationEl.lastElementChild;
            pagination.currentPage = Num(currentPageEl);
            pagination.prevPage = pagination.currentPage === 2 ? 1 : generatePage(prevPageEl);
            pagination.nextPage = generatePage(nextPageEl);
            pagination.hasPrevPage = pagination.prevPage ? true : false;
            pagination.hasNextPage = pagination.nextPage ? true : false;
            if (lastPageEl) {
                if (lastPageEl === nextPageEl) {
                    pagination.totalPages = generatePage(lastPageEl.previousElementSibling);
                }
                else {
                    pagination.totalPages = Num(lastPageEl);
                }
            }
            return pagination;
        }
        return undefined;
    },
};
export default otakudesuParser;
