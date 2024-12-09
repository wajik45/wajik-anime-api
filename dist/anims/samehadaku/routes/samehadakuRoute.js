"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("../../../middlewares/cache");
const samehadakuController_1 = __importDefault(require("../controllers/samehadakuController"));
const express_1 = __importDefault(require("express"));
const samehadakuRoute = express_1.default.Router();
samehadakuRoute
    .get("/", samehadakuController_1.default.getMainView)
    .get("/view-data", (0, cache_1.serverCache)(), samehadakuController_1.default.getMainViewData)
    .get("/home", (0, cache_1.serverCache)(10), samehadakuController_1.default.getHome)
    .get("/genres", (0, cache_1.serverCache)(), samehadakuController_1.default.getAllGenres)
    .get("/anime", (0, cache_1.serverCache)(10), samehadakuController_1.default.getAllAnimes)
    .get("/schedule", (0, cache_1.serverCache)(10), samehadakuController_1.default.getSchedule)
    .get("/recent", (0, cache_1.serverCache)(10), samehadakuController_1.default.getRecentEpisodes)
    .get("/ongoing", (0, cache_1.serverCache)(10), samehadakuController_1.default.getOngoingAnimes)
    .get("/completed", (0, cache_1.serverCache)(10), samehadakuController_1.default.getCompletedAnimes)
    .get("/popular", (0, cache_1.serverCache)(10), samehadakuController_1.default.getPopularAnimes)
    .get("/movies", (0, cache_1.serverCache)(10), samehadakuController_1.default.getMovies)
    .get("/batch", (0, cache_1.serverCache)(30), samehadakuController_1.default.getBatches)
    .get("/search", (0, cache_1.serverCache)(10), samehadakuController_1.default.getSearch)
    .get("/genres/:genreId", (0, cache_1.serverCache)(10), samehadakuController_1.default.getGenreAnimes)
    .get("/anime/:animeId", (0, cache_1.serverCache)(30), samehadakuController_1.default.getAnimeDetails)
    .get("/episode/:episodeId", (0, cache_1.serverCache)(30), samehadakuController_1.default.getAnimeEpisode)
    .get("/server/:serverId", (0, cache_1.serverCache)(3), samehadakuController_1.default.getServerUrl)
    .post("/server/:serverId", (0, cache_1.serverCache)(3), samehadakuController_1.default.getServerUrl)
    .get("/wibufile", (0, cache_1.serverCache)(3, "text"), samehadakuController_1.default.getWibuFile)
    .get("/batch/:batchId", (0, cache_1.serverCache)(30), samehadakuController_1.default.getAnimeBatch);
exports.default = samehadakuRoute;
