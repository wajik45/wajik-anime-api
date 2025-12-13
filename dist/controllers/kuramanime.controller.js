import setPayload from "../helpers/setPayload.js";
import kuramanimeConfig from "../configs/kuramanime.config.js";
import kuramanimeScraper from "../scrapers/kuramanime.scraper.js";
import kuramanimeParser from "../parsers/kuramanime.parser.js";
import kuramanimeSchema from "../schemas/kuramanime.schema.js";
import * as v from "valibot";
const { baseUrl } = kuramanimeConfig;
const kuramanimeController = {
    async getRoot(req, res, next) {
        const routes = [
            {
                method: "GET",
                path: "/kuramanime/home",
                description: "Halaman utama",
                pathParams: [],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/kuramanime/anime",
                description: "Daftar anime",
                pathParams: [],
                queryParams: [
                    {
                        key: "search",
                        value: "string",
                        defaultValue: null,
                        required: false,
                    },
                    {
                        key: "status",
                        value: '"ongoing" | "completed" | "upcoming" | "movie"',
                        defaultValue: null,
                        required: false,
                    },
                    {
                        key: "sort",
                        value: '"a-z" | "z-a" | "oldest" | "latest" | "popular" | "most_viewed" | "updated"',
                        defaultValue: '"latest" | "updated"',
                        required: false,
                    },
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
                path: "/kuramanime/schedule",
                description: "Jadwal rilis",
                pathParams: [],
                queryParams: [
                    {
                        key: "day",
                        value: '"all" | "random" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"',
                        defaultValue: "all",
                        required: false,
                    },
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
                path: "/kuramanime/properties/{propertyType}",
                description: "Daftar properti berdasarkan tipe properti",
                pathParams: [
                    {
                        key: "propertyType",
                        value: '"genre" | "season" | "studio" | "type" | "quality" | "source" | "country"',
                        defaultValue: null,
                        required: true,
                    },
                ],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/kuramanime/properties/{propertyType}/{propertyId}",
                description: "Daftar anime berdasarkan id properti",
                pathParams: [
                    {
                        key: "propertyType",
                        value: '"genre" | "season" | "studio" | "type" | "quality" | "source" | "country"',
                        defaultValue: null,
                        required: true,
                    },
                    {
                        key: "propertyId",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                ],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/kuramanime/anime/{animeId}/{animeSlug}",
                description: "Detail anime berdasarkan id anime",
                pathParams: [
                    {
                        key: "animeId",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                    {
                        key: "animeSlug",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                ],
                queryParams: [],
            },
            {
                method: "GET",
                path: "/kuramanime/batch/{animeId}/{animeSlug}/{batchId}",
                description: "Batch anime berdasarkan id batch",
                pathParams: [
                    {
                        key: "animeId",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                    {
                        key: "animeSlug",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
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
                path: "/kuramanime/episode/{animeId}/{animeSlug}/{episodeId}",
                description: "Detail episode berdasarkan id episode",
                pathParams: [
                    {
                        key: "animeId",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                    {
                        key: "animeSlug",
                        value: "string",
                        defaultValue: null,
                        required: true,
                    },
                    {
                        key: "episodeId",
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
            const document = await kuramanimeScraper.scrapeDOM("/", "https://google.com");
            const home = kuramanimeParser.parseHome(document);
            const payload = setPayload(res, {
                data: home,
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getAnimes(req, res, next) {
        try {
            const query = v.parse(kuramanimeSchema.query.animes, req.query);
            const status = query?.status;
            const search = query?.search || "";
            const page = Number(query?.page) || 1;
            const sort = (query?.sort === "a-z"
                ? "ascending"
                : query?.sort === "z-a"
                    ? "descending"
                    : query?.sort) || (status === "ongoing" ? "updated" : "latest");
            function getPathname() {
                if (status) {
                    return `/quick/${status === "completed" ? "finished" : status}?order_by=${sort}&page=${page}`;
                }
                if (search) {
                    return `/anime?order_by=${sort}&page=${page}&search=${search}`;
                }
                return `/anime?order_by=${sort}&page=${page}`;
            }
            const pathname = getPathname();
            const document = await kuramanimeScraper.scrapeDOM(pathname, baseUrl);
            const pagination = kuramanimeParser.parsePagination(document);
            const payload = setPayload(res, {
                data: {
                    animeList: status !== "ongoing" ? kuramanimeParser.parseAnimes(document) : undefined,
                    episodeList: status === "ongoing" ? kuramanimeParser.parseEpisodes(document) : undefined,
                },
                pagination,
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getProperties(req, res, next) {
        try {
            const { propertyType } = v.parse(kuramanimeSchema.param.properties, req.params);
            const pathname = `/properties/${propertyType}`;
            const document = await kuramanimeScraper.scrapeDOM(pathname, baseUrl);
            const propertyList = kuramanimeParser.parseProperties(document);
            const payload = setPayload(res, {
                data: {
                    propertyType,
                    propertyList,
                },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getAnimesByProperty(req, res, next) {
        try {
            const { propertyType, propertyId } = v.parse(kuramanimeSchema.param.animesByPropertyId, req.params);
            const query = v.parse(kuramanimeSchema.query.animesByPropertyId, req.query);
            const page = Number(query?.page) || 1;
            const sort = (query?.sort === "a-z"
                ? "ascending"
                : query?.sort === "z-a"
                    ? "descending"
                    : query?.sort) || "latest";
            const pathname = `/properties/${propertyType}/${propertyId}?order_by=${sort}&page=${page}`;
            const document = await kuramanimeScraper.scrapeDOM(pathname, baseUrl);
            const animeList = kuramanimeParser.parseAnimes(document);
            const pagination = kuramanimeParser.parsePagination(document);
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
    async getScheduledAnimes(req, res, next) {
        try {
            const query = v.parse(kuramanimeSchema.query.scheduledAnimes, req.query);
            const page = Number(query?.page) || 1;
            const day = query?.day || "all";
            const pathname = `/schedule?scheduled_day=${day}&page=${page}`;
            const document = await kuramanimeScraper.scrapeDOM(pathname, baseUrl);
            const animeList = kuramanimeParser.parseScheduledAnimes(document);
            const pagination = kuramanimeParser.parsePagination(document);
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
    async getAnimeDetails(req, res, next) {
        try {
            const params = v.parse(kuramanimeSchema.param.animeDetails, req.params);
            const pathname = `/anime/${params.animeId}/${params.animeSlug}`;
            const document = await kuramanimeScraper.scrapeDOM(pathname, baseUrl);
            const details = kuramanimeParser.parseAnimeDetails(document, params);
            const payload = setPayload(res, {
                data: { details },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
    async getBatchDetails(req, res, next) {
        try {
            const params = v.parse(kuramanimeSchema.param.batchDetails, req.params);
            const mainPathname = `/anime/${params.animeId}/${params.animeSlug}/batch/${params.batchId}`;
            const secret = await kuramanimeScraper.scrapeSecret(`${baseUrl}/${mainPathname}`);
            const pathname = `${mainPathname}?Ub3BzhijicHXZdv=${secret}&C2XAPerzX1BM7V9=kuramadrive&page=1`;
            const document = await kuramanimeScraper.scrapeDOM(pathname, baseUrl);
            const details = kuramanimeParser.parseBatchDetails(document, params);
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
            const params = v.parse(kuramanimeSchema.param.episodeDetails, req.params);
            const mainPathname = `anime/${params.animeId}/${params.animeSlug}/episode/${params.episodeId}`;
            const secret = await kuramanimeScraper.scrapeSecret(`${baseUrl}/${mainPathname}`);
            const pathname = `${mainPathname}?Ub3BzhijicHXZdv=${secret}&C2XAPerzX1BM7V9=kuramadrive&page=1`;
            const document = await kuramanimeScraper.scrapeDOM(pathname, baseUrl);
            const details = kuramanimeParser.parseEpisodeDetails(document, params);
            const payload = setPayload(res, {
                data: { details },
            });
            res.json(payload);
        }
        catch (error) {
            next(error);
        }
    },
};
export default kuramanimeController;
