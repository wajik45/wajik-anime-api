"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queryParams_1 = require("../../../helpers/queryParams");
const SamehadakuParser_1 = __importDefault(require("../parsers/SamehadakuParser"));
const samehadakuInfo_1 = __importDefault(require("../info/samehadakuInfo"));
const payload_1 = __importDefault(require("../../../helpers/payload"));
const path_1 = __importDefault(require("path"));
const { baseUrl, baseUrlPath } = samehadakuInfo_1.default;
const parser = new SamehadakuParser_1.default(baseUrl, baseUrlPath);
const samehadakuController = {
    getMainView(req, res, next) {
        try {
            const getViewFile = (filePath) => {
                return path_1.default.join(__dirname, "..", "..", "..", "public", "views", filePath);
            };
            res.sendFile(getViewFile("anime-source.html"));
        }
        catch (error) {
            next(error);
        }
    },
    getMainViewData(req, res, next) {
        try {
            const data = samehadakuInfo_1.default;
            res.json((0, payload_1.default)(res, { data }));
        }
        catch (error) {
            next(error);
        }
    },
    async getHome(req, res, next) {
        try {
            const data = await parser.parseHome();
            res.json((0, payload_1.default)(res, { data }));
        }
        catch (error) {
            next(error);
        }
    },
    async getAllGenres(req, res, next) {
        try {
            const data = await parser.parseAllGenres();
            res.json((0, payload_1.default)(res, { data }));
        }
        catch (error) {
            next(error);
        }
    },
    async getAllAnimes(req, res, next) {
        try {
            const data = await parser.parseAllAnimes();
            res.json((0, payload_1.default)(res, { data }));
        }
        catch (error) {
            next(error);
        }
    },
    async getSchedule(req, res, next) {
        try {
            const data = await parser.parseSchedule();
            res.json((0, payload_1.default)(res, { data }));
        }
        catch (error) {
            next(error);
        }
    },
    async getRecentEpisodes(req, res, next) {
        try {
            const page = (0, queryParams_1.getPageParam)(req);
            const { data, pagination } = await parser.parseRecentAnime(page);
            res.json((0, payload_1.default)(res, { data, pagination }));
        }
        catch (error) {
            next(error);
        }
    },
    async getOngoingAnimes(req, res, next) {
        try {
            const page = (0, queryParams_1.getPageParam)(req);
            const order = (0, queryParams_1.getOrderParam)(req);
            const { data, pagination } = await parser.parseOngoingAnimes(page, order);
            res.json((0, payload_1.default)(res, { data, pagination }));
        }
        catch (error) {
            next(error);
        }
    },
    async getCompletedAnimes(req, res, next) {
        try {
            const page = (0, queryParams_1.getPageParam)(req);
            const order = (0, queryParams_1.getOrderParam)(req);
            const { data, pagination } = await parser.parseCompletedAnimes(page, order);
            res.json((0, payload_1.default)(res, { data, pagination }));
        }
        catch (error) {
            next(error);
        }
    },
    async getPopularAnimes(req, res, next) {
        try {
            const page = (0, queryParams_1.getPageParam)(req);
            const { data, pagination } = await parser.parsePopularAnimes(page);
            res.json((0, payload_1.default)(res, { data, pagination }));
        }
        catch (error) {
            next(error);
        }
    },
    async getMovies(req, res, next) {
        try {
            const page = (0, queryParams_1.getPageParam)(req);
            const { data, pagination } = await parser.parseMovies(page);
            res.json((0, payload_1.default)(res, { data, pagination }));
        }
        catch (error) {
            next(error);
        }
    },
    async getBatches(req, res, next) {
        try {
            const page = (0, queryParams_1.getPageParam)(req);
            const { data, pagination } = await parser.parseBatches(page);
            res.json((0, payload_1.default)(res, { data, pagination }));
        }
        catch (error) {
            next(error);
        }
    },
    async getSearch(req, res, next) {
        try {
            const q = (0, queryParams_1.getQParam)(req);
            const page = (0, queryParams_1.getPageParam)(req);
            const { data, pagination } = await parser.parseSearch(q, page);
            res.json((0, payload_1.default)(res, { data, pagination }));
        }
        catch (error) {
            next(error);
        }
    },
    async getGenreAnimes(req, res, next) {
        try {
            const { genreId } = req.params;
            const page = (0, queryParams_1.getPageParam)(req);
            const { data, pagination } = await parser.parseGenreAnimes(genreId, page);
            res.json((0, payload_1.default)(res, { data, pagination }));
        }
        catch (error) {
            next(error);
        }
    },
    async getAnimeDetails(req, res, next) {
        try {
            const { animeId } = req.params;
            const data = await parser.parseAnimeDetails(animeId);
            res.json((0, payload_1.default)(res, { data }));
        }
        catch (error) {
            next(error);
        }
    },
    async getAnimeEpisode(req, res, next) {
        try {
            const { episodeId } = req.params;
            const originUrl = `${req.headers["x-forwarded-proto"] || req.protocol}://${req.get("host")}`;
            const data = await parser.parseAnimeEpisode(episodeId, originUrl);
            res.json((0, payload_1.default)(res, { data }));
        }
        catch (error) {
            next(error);
        }
    },
    async getServerUrl(req, res, next) {
        try {
            const { serverId } = req.params;
            const originUrl = `${req.headers["x-forwarded-proto"] || req.protocol}://${req.get("host")}`;
            const data = await parser.parseServerUrl(serverId, originUrl);
            res.json((0, payload_1.default)(res, { data }));
        }
        catch (error) {
            next(error);
        }
    },
    async getAnimeBatch(req, res, next) {
        try {
            const { batchId } = req.params;
            const data = await parser.parseAnimeBatch(batchId);
            res.json((0, payload_1.default)(res, { data }));
        }
        catch (error) {
            next(error);
        }
    },
    async getWibuFile(req, res, next) {
        try {
            const url = (0, queryParams_1.getUrlParam)(req);
            const wibuFile = await parser.parseWibuFile(url);
            res.send(wibuFile);
        }
        catch (error) {
            next(error);
        }
    },
};
exports.default = samehadakuController;
