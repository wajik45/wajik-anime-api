import oploverzScraper from "../scrapers/oploverz.scraper.js";
import oploverzParser from "../parsers/oploverz.parser.js";
import oploverzConfig from "../configs/oploverz.config.js";
import oploverzSchema from "../schemas/oploverz.schema.js";
import setPayload from "../helpers/setPayload.js";
import * as v from "valibot";
const { baseUrl } = oploverzConfig;
const oploverzController = {
    async getRoot(req, res, next) {
        const routes = [
            {
                method: "GET",
                path: "/oploverz",
                description: "Oploverz",
                pathParams: [],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/oploverz/home",
                description: "Halaman utama",
                pathParams: [],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/oploverz/anime/{animeId}",
                description: "Detail anime berdasarkan slug",
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
                path: "/oploverz/episode/{episodeId}",
                description: "Detail episode berdasarkan slug",
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
                method: "GET",
                path: "/oploverz/schedule",
                description: "Jadwal rilis anime per hari",
                pathParams: [],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/oploverz/anime",
                description: "Daftar semua anime (A-Z) dengan filter",
                pathParams: [],
                queryParams: [
                    {
                        key: "genre",
                        value: "string (comma-separated)",
                        defaultValue: null,
                        required: false,
                    },
                    {
                        key: "season",
                        value: "string (comma-separated)",
                        defaultValue: null,
                        required: false,
                    },
                    {
                        key: "studio",
                        value: "string (comma-separated)",
                        defaultValue: null,
                        required: false,
                    },
                    {
                        key: "status",
                        value: '"ongoing" | "completed" | "upcoming" | "hiatus"',
                        defaultValue: null,
                        required: false,
                    },
                    {
                        key: "type",
                        value: '"tv" | "movie" | "ova" | "ona" | "special" | "bd" | "music" | "live action"',
                        defaultValue: null,
                        required: false,
                    },
                    {
                        key: "order",
                        value: '"title" | "titlereverse" | "update" | "latest" | "popular" | "rating"',
                        defaultValue: null,
                        required: false,
                    },
                ],
            },
            {
                method: "GET",
                path: "/oploverz/search",
                description: "Pencarian anime",
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
        ];
        res.json(setPayload(res, {
            message: "Status: OK 🚀",
            data: { routes },
        }));
    },
    async getSchedule(req, res, next) {
        try {
            const document = await oploverzScraper.scrapeDOM("/jadwal-rilis/", baseUrl);
            const schedule = oploverzParser.parseSchedule(document);
            const payload = setPayload(res, {
                data: schedule,
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getAnimeDirectory(req, res, next) {
        try {
            const query = v.parse(oploverzSchema.query.filteredAnimes, req.query);
            const hasFilters = query.genre || query.season || query.studio || query.status || query.type || query.order;
            if (hasFilters) {
                const params = new URLSearchParams();
                if (query.genre)
                    query.genre.split(",").forEach((g) => params.append("genre[]", g));
                if (query.season)
                    query.season.split(",").forEach((s) => params.append("season[]", s));
                if (query.studio)
                    query.studio.split(",").forEach((s) => params.append("studio[]", s));
                if (query.status)
                    params.set("status", query.status);
                if (query.type)
                    params.set("type", query.type);
                if (query.order)
                    params.set("order", query.order);
                const qs = params.toString();
                const document = await oploverzScraper.scrapeDOM(`/anime${qs ? `?${qs}` : ""}`, baseUrl);
                const animeList = oploverzParser.parseSearchedAnimes(document);
                const payload = setPayload(res, { data: { animeList } });
                res.json(payload);
            }
            else {
                const document = await oploverzScraper.scrapeDOM("/anime/list-mode/", baseUrl);
                const directory = oploverzParser.parseAnimeDirectory(document);
                const payload = setPayload(res, { data: directory });
                res.json(payload);
            }
        }
        catch (error) {
            next(error);
        }
    },
    async getSearchedAnimes(req, res, next) {
        try {
            const { q } = v.parse(oploverzSchema.query.searchedAnimes, req.query);
            const pathname = `/?s=${q}`;
            const document = await oploverzScraper.scrapeDOM(pathname, baseUrl);
            const animeList = oploverzParser.parseSearchedAnimes(document);
            const payload = setPayload(res, {
                data: { animeList },
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
            const document = await oploverzScraper.scrapeDOM(pathname, baseUrl);
            const details = oploverzParser.parseAnimeDetails(document);
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
            const pathname = `/${episodeId}/`;
            const document = await oploverzScraper.scrapeDOM(pathname, baseUrl);
            const details = oploverzParser.parseEpisodeDetails(document);
            const payload = setPayload(res, {
                data: { details },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getHome(req, res, next) {
        try {
            const ref = "https://google.com/";
            const document = await oploverzScraper.scrapeDOM("/", ref);
            const home = oploverzParser.parseHome(document);
            const payload = setPayload(res, {
                data: home,
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
};
export default oploverzController;
