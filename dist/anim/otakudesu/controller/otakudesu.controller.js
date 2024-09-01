"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const getHtmlData_1 = __importDefault(require("../../../helpers/getHtmlData"));
const setPayload_1 = __importDefault(require("../../../helpers/setPayload"));
const parsePagination_1 = __importDefault(require("../parser/main/parsePagination"));
const parseAnimeList_1 = __importDefault(require("../parser/main/parseAnimeList"));
const parseJadwalRilis_1 = __importDefault(require("../parser/main/parseJadwalRilis"));
const parseGenreList_1 = __importDefault(require("../parser/main/parseGenreList"));
const parseAnimeDetail_1 = __importDefault(require("../parser/main/parseAnimeDetail"));
const parseAnimeBatch_1 = __importDefault(require("../parser/main/parseAnimeBatch"));
const parseHome_1 = __importDefault(require("../parser/main/parseHome"));
const parseCompleted_1 = __importDefault(require("../parser/main/parseCompleted"));
const parseOnGoing_1 = __importDefault(require("../parser/main/parseOnGoing"));
const parseSearch_1 = __importDefault(require("../parser/main/parseSearch"));
const parseAnimeListByGenre_ts_1 = __importDefault(require("../parser/main/parseAnimeListByGenre.ts"));
const parseAnimeByEpisode_1 = __importDefault(require("../parser/main/parseAnimeByEpisode"));
const getOtakudesuUrl_1 = __importDefault(require("../utils/getOtakudesuUrl"));
const parseAnimeEmbedByEpisode_1 = __importDefault(require("../parser/main/parseAnimeEmbedByEpisode"));
const otakudesuUrl = (0, getOtakudesuUrl_1.default)();
const OtakudesuController = {
    getMessage(req, res) {
        res.status(200).json({
            message: "OTAKUDESU IS READY 🍌💦, MOHON IJIN BANG OTAKUDESU🙏🙏🙏",
            otakudesuUrl: otakudesuUrl,
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
                            value: "number",
                            defaultValue: 1,
                        },
                    },
                },
                completed: {
                    route: "/otakudesu/completed",
                    parameters: {
                        queryParam: {
                            parameter: "?page",
                            value: "number",
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
                            value: "number",
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
                animeByEpisode: {
                    route: "/otakudesu/episode/:slug",
                    parameters: {
                        routeParam: {
                            parameter: ":slug",
                            value: "string & required",
                            message: "dapatkan slug dari route /anime/:slug",
                        },
                    },
                },
                animeEmbedByEpisode: {
                    route: "/otakudesu/episode/embed/:slug",
                    parameters: {
                        routeParam: {
                            parameter: ":slug",
                            value: "string & required",
                            message: "dapatkan slug dari route /anime/:slug",
                        },
                    },
                },
                animeBatch: {
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
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl);
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseHome_1.default)($);
            if (Object.values(data).length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getCompleted(req, res) {
        const page = Number(req.query.page) || 1;
        const route = `/complete-anime/page/${page}`;
        if (page < 1) {
            return res.status(400).json((0, setPayload_1.default)(res));
        }
        if (isNaN(Number(req.query.page)) && req.query.page !== undefined) {
            return res.status(400).json((0, setPayload_1.default)(res));
        }
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route);
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseCompleted_1.default)($);
            const pagination = (0, parsePagination_1.default)($);
            if (data.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
                pagination,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getOnGoing(req, res) {
        const page = Number(req.query.page) || 1;
        const route = `/ongoing-anime/page/${page}`;
        if (page < 1) {
            return res.status(400).json((0, setPayload_1.default)(res));
        }
        if (isNaN(Number(req.query.page)) && req.query.page !== undefined) {
            return res.status(400).json((0, setPayload_1.default)(res));
        }
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route);
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseOnGoing_1.default)($);
            const pagination = (0, parsePagination_1.default)($);
            if (data.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
                pagination,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getSearch(req, res) {
        const q = req.query.q;
        if (q === undefined) {
            return res.status(400).json((0, setPayload_1.default)(res, {
                message: 'Tidak ada "q" di query parameter',
            }));
        }
        const route = `?s=${q}&post_type=anime`;
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route);
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseSearch_1.default)($);
            if (data.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getJadwalRilis(req, res) {
        const route = "/jadwal-rilis";
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route, {
                useCache: true,
                TTL: 1000 * 60 * 10,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseJadwalRilis_1.default)($);
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getGenreList(req, res) {
        const route = "/genre-list";
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route, {
                useCache: true,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseGenreList_1.default)($);
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getAnimeList(req, res) {
        const route = "/anime-list";
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route, {
                useCache: true,
                TTL: 1000 * 60 * 10,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseAnimeList_1.default)($);
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getAnimeListByGenre(req, res) {
        const { slug } = req.params;
        const page = Number(req.query.page) || 1;
        const route = `/genres/${slug}/page/${page}`;
        if (page < 1) {
            return res.status(400).json((0, setPayload_1.default)(res));
        }
        if (isNaN(Number(req.query.page)) && req.query.page !== undefined) {
            return res.status(400).json((0, setPayload_1.default)(res));
        }
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route, {
                useCache: true,
                TTL: 1000 * 60 * 10,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = await (0, parseAnimeListByGenre_ts_1.default)($);
            const pagination = (0, parsePagination_1.default)($);
            if (data.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
                pagination,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getAnimeDetail(req, res) {
        const { slug } = req.params;
        const route = `/anime/${slug}`;
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route, {
                useCache: true,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = await (0, parseAnimeDetail_1.default)($);
            if (data.episodeList.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getAnimeByEpisode(req, res) {
        const { slug } = req.params;
        const route = `/episode/${slug}`;
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route, {
                useCache: true,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseAnimeByEpisode_1.default)($);
            if (!data.judul &&
                !data.episodeSebelumnya &&
                !data.episodeSelanjutnya &&
                data.info.genres.length === 0 &&
                data.info.episodeList.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                data: {
                    streamingHref: "/otakudesu/episode/embed/" + slug,
                    ...data,
                },
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getAnimeEmbedByEpisode(req, res) {
        const { slug } = req.params;
        const route = `/episode/${slug}`;
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route, {
                useCache: true,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = await (0, parseAnimeEmbedByEpisode_1.default)($);
            if (data.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
    async getAnimeBatch(req, res) {
        const { slug } = req.params;
        const route = `/batch/${slug}`;
        try {
            const htmlData = await (0, getHtmlData_1.default)(otakudesuUrl + route, {
                useCache: true,
            });
            const $ = (0, cheerio_1.load)(htmlData);
            const data = (0, parseAnimeBatch_1.default)($);
            if (data.batchList.length === 0 && data.genres.length === 0) {
                return res.status(404).json((0, setPayload_1.default)(res));
            }
            res.status(200).json((0, setPayload_1.default)(res, {
                data: data,
            }));
        }
        catch (error) {
            res.status(500).json((0, setPayload_1.default)(res));
        }
    },
};
exports.default = OtakudesuController;
