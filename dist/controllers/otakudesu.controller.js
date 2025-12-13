import otakudesuScraper from "../scrapers/otakudesu.scraper.js";
import otakudesuParser from "../parsers/otakudesu.parser.js";
import otakudesuConfig from "../configs/otakudesu.config.js";
import otakudesuSchema from "../schemas/otakudesu.schema.js";
import setPayload from "../helpers/setPayload.js";
import * as v from "valibot";
const { baseUrl } = otakudesuConfig;
const otakudesuController = {
    async getRoot(req, res, next) {
        const routes = [
            {
                method: "GET",
                path: "/otakudesu/home",
                description: "Halaman utama",
                pathParams: [],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/otakudesu/schedule",
                description: "Jadwal rilis",
                pathParams: [],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/otakudesu/anime",
                description: "Daftar semua anime",
                pathParams: [],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/otakudesu/genre",
                description: "Daftar semua genre",
                pathParams: [],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/otakudesu/ongoing",
                description: "Daftar anime sedang tayang",
                pathParams: [],
                queryParams: [
                    {
                        key: "page",
                        value: "string",
                        defaultValue: "1",
                        required: false,
                    },
                ],
            },
            {
                method: "GET",
                path: "/otakudesu/completed",
                description: "Daftar anime selesai",
                pathParams: [],
                queryParams: [
                    {
                        key: "page",
                        value: "string",
                        defaultValue: "1",
                        required: false,
                    },
                ],
            },
            {
                method: "GET",
                path: "/otakudesu/search",
                description: "Daftar anime berdasarkan pencarian",
                pathParams: [],
                queryParams: [
                    {
                        key: "q",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                ],
            },
            {
                method: "GET",
                path: "/otakudesu/genre/{genreId}",
                description: "Daftar anime berdasarkan genre",
                pathParams: [
                    {
                        key: "genreId",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                ],
                queryParams: [
                    {
                        key: "page",
                        value: "string",
                        defaultValue: "1",
                        required: false,
                    },
                ],
            },
            {
                method: "GET",
                path: "/otakudesu/batch/{batchId}",
                description: "Batch anime berdasarkan id batch",
                pathParams: [
                    {
                        key: "batchId",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                ],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/otakudesu/anime/{animeId}",
                description: "Detail anime berdasarkan id anime",
                pathParams: [
                    {
                        key: "animeId",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                ],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/otakudesu/episode/{episodeId}",
                description: "Detail episode berdasarkan id episode",
                pathParams: [
                    {
                        key: "episodeId",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                ],
                queryParams: [],
            },
            {
                method: "GET | POST",
                path: "/otakudesu/server/{serverId}",
                description: "Link video berdasarkan id server",
                pathParams: [
                    {
                        key: "serverId",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                ],
                queryParams: [],
            },
        ];
        res.json(setPayload(res, {
            message: "Status: OK 🚀",
            data: { routes },
        }));
    },
    async getHome(req, res, next) {
        try {
            const ref = "https://google.com/";
            const document = await otakudesuScraper.scrapeDOM("/", ref);
            const home = otakudesuParser.parseHome(document);
            const payload = setPayload(res, {
                data: home,
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getSchedule(req, res, next) {
        try {
            const pathname = "/jadwal-rilis/";
            const document = await otakudesuScraper.scrapeDOM(pathname, baseUrl);
            const scheduleList = otakudesuParser.parseSchedules(document);
            const payload = setPayload(res, {
                data: { scheduleList },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getAllAnimes(req, res, next) {
        try {
            const pathname = "/anime-list/";
            const document = await otakudesuScraper.scrapeDOM(pathname, baseUrl, true);
            const list = otakudesuParser.parseAllAnimes(document);
            const payload = setPayload(res, {
                data: { list },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getAllGenres(req, res, next) {
        try {
            const pathname = "/genre-list/";
            const document = await otakudesuScraper.scrapeDOM(pathname, baseUrl);
            const genreList = otakudesuParser.parseAllGenres(document);
            const payload = setPayload(res, {
                data: { genreList },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getOngoingAnimes(req, res, next) {
        try {
            const page = Number(v.parse(otakudesuSchema.query.animes, req.query)?.page);
            const pathname = page > 1 ? `/ongoing-anime/page/${page}/` : "/ongoing-anime/";
            const document = await otakudesuScraper.scrapeDOM(pathname, baseUrl);
            const animeList = otakudesuParser.parseOngoingAnimes(document);
            const pagination = otakudesuParser.parsePagination(document);
            const payload = setPayload(res, {
                data: { animeList },
                pagination,
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getCompletedAnimes(req, res, next) {
        try {
            const page = Number(v.parse(otakudesuSchema.query.animes, req.query)?.page);
            const pathname = page > 1 ? `/complete-anime/page/${page}/` : "/complete-anime/";
            const document = await otakudesuScraper.scrapeDOM(pathname, baseUrl);
            const animeList = otakudesuParser.parseCompletedAnimes(document);
            const pagination = otakudesuParser.parsePagination(document);
            const payload = setPayload(res, {
                data: { animeList },
                pagination,
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getSearchedAnimes(req, res, next) {
        try {
            const { q } = v.parse(otakudesuSchema.query.searchedAnimes, req.query);
            const pathname = `/?s=${q}&post_type=anime`;
            const document = await otakudesuScraper.scrapeDOM(pathname, baseUrl);
            const animeList = otakudesuParser.parseSearchedAnimes(document);
            const payload = setPayload(res, {
                data: { animeList },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getAnimesByGenre(req, res, next) {
        try {
            const genreId = req.params.genreId;
            const page = Number(v.parse(otakudesuSchema.query.animes, req.query)?.page);
            const pathname = page > 1 ? `/genres/${genreId}/page/${page}/` : `/genres/${genreId}/`;
            const document = await otakudesuScraper.scrapeDOM(pathname, baseUrl);
            const animeList = otakudesuParser.parseAnimesByGenre(document);
            const pagination = otakudesuParser.parsePagination(document);
            const payload = setPayload(res, {
                data: { animeList },
                pagination,
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getBatchDetails(req, res, next) {
        try {
            const batchId = req.params.batchId;
            const pathname = `/batch/${batchId}/`;
            const document = await otakudesuScraper.scrapeDOM(pathname, baseUrl);
            const details = otakudesuParser.parseBatchDetails(document);
            const payload = setPayload(res, {
                data: { details },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getAnimeDetails(req, res, next) {
        try {
            const animeId = req.params.animeId;
            const pathname = `/anime/${animeId}/`;
            const document = await otakudesuScraper.scrapeDOM(pathname, baseUrl);
            const details = otakudesuParser.parseAnimeDetails(document);
            const payload = setPayload(res, {
                data: { details },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getEpisodeDetails(req, res, next) {
        try {
            const episodeId = req.params.episodeId;
            const pathname = `/episode/${episodeId}/`;
            const document = await otakudesuScraper.scrapeDOM(pathname, baseUrl);
            const details = await otakudesuParser.parseEpisodeDetails(document, new URL(pathname, baseUrl).toString());
            const payload = setPayload(res, {
                data: { details },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getServerDetails(req, res, next) {
        try {
            const serverId = req.params.serverId || "";
            const details = await otakudesuParser.parseServerDetails(serverId);
            const payload = setPayload(res, {
                data: { details },
            });
            res.json(payload);
        }
        catch (error) {
            if (error.message.includes("is not valid JSON")) {
                res.status(400).json(setPayload(res));
                return;
            }
            next(error);
        }
    },
};
export default otakudesuController;
