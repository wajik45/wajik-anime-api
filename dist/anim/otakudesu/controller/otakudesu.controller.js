"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const getHtmlData_1 = __importDefault(require("../../../helpers/getHtmlData"));
const animeUrl_1 = __importDefault(require("../../../helpers/animeUrl"));
const setPayload_1 = __importDefault(require("../../../helpers/setPayload"));
const parseCard_1 = __importDefault(require("../parser/parseCard"));
const parseSearchCard_1 = __importDefault(require("../parser/parseSearchCard"));
const parsePagination_1 = __importDefault(require("../parser/parsePagination"));
const parseAnimeList_1 = __importDefault(require("../parser/parseAnimeList"));
const parseJadwalRilis_1 = __importDefault(require("../parser/parseJadwalRilis"));
const parseGenreList_1 = __importDefault(require("../parser/parseGenreList"));
const parseGenreCard_1 = __importDefault(require("../parser/parseGenreCard"));
const parseAnimeDetail_1 = __importDefault(require("../parser/parseAnimeDetail"));
const parseAnimeEpisode_1 = __importDefault(require("../parser/parseAnimeEpisode"));
const OtakudesuController = {
    getMessage(req, res) {
        res.status(200).json({
            message: "OTAKUDESU IS READY 🍌💦, IJIN BANG OTAKUDESU🙏🙏🙏, SERING PANTAU BOSKUU DOMAIN SERING BERUBAH BISA EDIT DI src/helpers/animeUrl.ts",
            otakudesuUrl: animeUrl_1.default.otakudesu,
            method: "methodnya get semua ya broo",
            routes: {
                home: {
                    route: "/otakudesu/home",
                },
                jadwalRilis: {
                    route: "/otakudesu/jadwal",
                },
                animeList: {
                    route: "/otakudesu/anime",
                },
                genreList: {
                    route: "/otakudesu/genres",
                },
                ongoing: {
                    route: "/otakudesu/ongoing",
                    parameters: {
                        queryParam: {
                            parameter: "?page",
                            value: "number | string",
                            defaultValue: 1,
                        },
                    },
                },
                completed: {
                    route: "/otakudesu/completed",
                    parameters: {
                        queryParam: {
                            parameter: "?page",
                            value: "number | string",
                            defaultValue: 1,
                        },
                    },
                },
                search: {
                    route: "/otakudesu/search",
                    parameters: {
                        queryParam: {
                            parameter: "?q",
                            value: "string & required",
                            defaultValue: undefined,
                        },
                    },
                },
                animeByGenre: {
                    route: "/otakudesu/genres/:slug",
                    parameters: {
                        routeParam: {
                            parameter: ":slug",
                            value: "string & required",
                            message: "dapatkan slug di route /genres",
                        },
                        queryParam: {
                            parameter: "?page",
                            value: "number | string",
                            defaultValue: 1,
                        },
                    },
                },
                animeDetail: {
                    route: "/otakudesu/anime/:slug",
                    parameters: {
                        routeParam: {
                            parameter: ":slug",
                            value: "string & required",
                            message: "dapatkan slug dari route /home /jadwal /anime /ongoing /completed /search /genres/:slug",
                        },
                    },
                },
                animeEpisode: {
                    route: "/otakudesu/episode/:slug",
                    parameters: {
                        routeParam: {
                            parameter: ":slug",
                            value: "string & required",
                            message: "dapatkan slug dari route /anime/:slug",
                        },
                    },
                },
                batchUrl: {
                    route: "/otakudesu/batch/:slug",
                    parameters: {
                        routeParam: {
                            parameter: ":slug",
                            value: "string & required",
                            message: "dapatkan slug dari route /anime/:slug",
                        },
                    },
                },
            },
        });
    },
    async getHome(req, res) {
        try {
            const htmlData = await (0, getHtmlData_1.default)({ url: animeUrl_1.default.otakudesu });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = {};
            $(".venutama .venz").each((index, element) => {
                const key = index === 0 ? "onGoing" : "completed";
                const dataCard = $(element)
                    .find("ul li")
                    .map((index, element) => {
                    const card = (0, parseCard_1.default)($, element);
                    if (key === "onGoing") {
                        const onGoing = {
                            judul: card.judul,
                            slug: card.slug,
                            href: "/otakudesu/anime/" + card.slug,
                            poster: card.poster,
                            episodeTerbaru: card.episode,
                            hariRilis: card.ratingAtauHari,
                            tanggalRilisTerbaru: card.tanggal,
                            otakudesuUrl: card.otakudesuUrl,
                        };
                        return onGoing;
                    }
                    const completed = {
                        judul: card.judul,
                        slug: card.slug,
                        href: "/otakudesu/anime/" + card.slug,
                        poster: card.poster,
                        jumlahEpisode: card.episode,
                        rating: card.ratingAtauHari,
                        tanggalRilisTerakhir: card.tanggal,
                        otakudesuUrl: card.otakudesuUrl,
                    };
                    return completed;
                })
                    .get();
                data[key] = dataCard;
            });
            if (Object.values(data).length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res, {
                    message: "Not Found",
                    error: true,
                }));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "Ok",
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
                error: true,
            }));
        }
    },
    async getCompleted(req, res) {
        const page = Number(req.query.page) || 1;
        const route = `/complete-anime/page/${page}`;
        try {
            const htmlData = await (0, getHtmlData_1.default)({
                url: animeUrl_1.default.otakudesu + route,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = [];
            $(".venutama ul li").each((index, element) => {
                const card = (0, parseCard_1.default)($, element);
                data.push({
                    judul: card.judul,
                    slug: card.slug,
                    href: "/otakudesu/anime/" + card.slug,
                    poster: card.poster,
                    jumlahEpisode: card.episode,
                    rating: card.ratingAtauHari,
                    tanggalRilisTerakhir: card.tanggal,
                    otakudesuUrl: card.otakudesuUrl,
                });
            });
            const pagination = (0, parsePagination_1.default)($);
            if (data.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res, {
                    message: "Not Found",
                    error: true,
                }));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "Ok",
                data: data,
                pagination,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
                error: true,
            }));
        }
    },
    async getOnGoing(req, res) {
        const page = Number(req.query.page) || 1;
        const route = `/ongoing-anime/page/${page}`;
        try {
            const htmlData = await (0, getHtmlData_1.default)({
                url: animeUrl_1.default.otakudesu + route,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = [];
            $(".venutama ul li").each((index, element) => {
                const card = (0, parseCard_1.default)($, element);
                data.push({
                    judul: card.judul,
                    slug: card.slug,
                    href: "/otakudesu/anime/" + card.slug,
                    poster: card.poster,
                    episodeTerbaru: card.episode,
                    hariRilis: card.ratingAtauHari,
                    tanggalRilisTerbaru: card.tanggal,
                    otakudesuUrl: card.otakudesuUrl,
                });
            });
            const pagination = (0, parsePagination_1.default)($);
            if (data.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res, {
                    message: "Not Found",
                    error: true,
                }));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "Ok",
                data: data,
                pagination,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
                error: true,
            }));
        }
    },
    async getSearch(req, res) {
        const q = req.query.q;
        if (!q) {
            return res.status(400).json((0, setPayload_1.default)(res, {
                message: 'Tidak ada "q" di query parameter',
                error: true,
            }));
        }
        const route = `?s=${q}&post_type=anime`;
        try {
            const htmlData = await (0, getHtmlData_1.default)({
                url: animeUrl_1.default.otakudesu + route,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseSearchCard_1.default)($);
            if (data.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res, {
                    message: "Not Found",
                    error: true,
                }));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "Ok",
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
                error: true,
            }));
        }
    },
    async getJadwalRilis(req, res) {
        const route = "/jadwal-rilis";
        try {
            const htmlData = await (0, getHtmlData_1.default)({ url: animeUrl_1.default.otakudesu + route });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseJadwalRilis_1.default)($);
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "Ok",
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
                error: true,
            }));
        }
    },
    async getGenreList(req, res) {
        const route = "/genre-list";
        try {
            const htmlData = await (0, getHtmlData_1.default)({ url: animeUrl_1.default.otakudesu + route });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseGenreList_1.default)($);
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "Ok",
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
                error: true,
            }));
        }
    },
    async getAnimeList(req, res) {
        const route = "/anime-list";
        try {
            const htmlData = await (0, getHtmlData_1.default)({ url: animeUrl_1.default.otakudesu + route });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseAnimeList_1.default)($);
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "Ok",
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
                error: true,
            }));
        }
    },
    async getAnimeListByGenre(req, res) {
        const { slug } = req.params;
        const page = Number(req.query.page) || 1;
        const route = `/genres/${slug}/page/${page}`;
        try {
            const htmlData = await (0, getHtmlData_1.default)({ url: animeUrl_1.default.otakudesu + route });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseGenreCard_1.default)($);
            const pagination = (0, parsePagination_1.default)($);
            if (data.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res, {
                    message: "Not Found",
                    error: true,
                }));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "Ok",
                data: data,
                pagination,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
                error: true,
            }));
        }
    },
    async getAnimeDetail(req, res) {
        const { slug } = req.params;
        const route = `/anime/${slug}`;
        try {
            const htmlData = await (0, getHtmlData_1.default)({ url: animeUrl_1.default.otakudesu + route });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseAnimeDetail_1.default)($);
            if (data.episodeList.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res, {
                    message: "Not Found",
                    error: true,
                }));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "Ok",
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
            }));
        }
    },
    async getAnimeByEpisode(req, res) {
        const { slug } = req.params;
        const route = `/episode/${slug}`;
        try {
            const htmlData = await (0, getHtmlData_1.default)({ url: animeUrl_1.default.otakudesu + route });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseAnimeEpisode_1.default)($);
            if (!data.judul &&
                !data.episodeSebelumnya &&
                !data.episodeSelanjutnya &&
                Object.values(data.downloadUrl).length === 0 &&
                data.info.genres.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res, {
                    message: "Not Found",
                    error: true,
                }));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "Ok",
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
            }));
        }
    },
    // PARSERNYA CUYY
    async getBatch(req, res) {
        try {
            res.status(200).json((0, setPayload_1.default)(res, {
                message: "TES 123 SABAR BOSKUUH NGASOH DULU",
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res, {
                message: "Internal Server Error",
            }));
        }
    },
};
exports.default = OtakudesuController;
//# sourceMappingURL=otakudesu.controller.js.map