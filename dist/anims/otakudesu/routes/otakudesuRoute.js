"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("../../../middlewares/cache");
const otakudesuController_1 = __importDefault(require("../controllers/otakudesuController"));
const express_1 = __importDefault(require("express"));
const otakudesuRoute = express_1.default.Router();
otakudesuRoute
    .get("/", otakudesuController_1.default.getMainView)
    .get("/view-data", (0, cache_1.serverCache)(), otakudesuController_1.default.getMainViewData)
    .get("/home", (0, cache_1.serverCache)(10), otakudesuController_1.default.getHome)
    .get("/schedule", (0, cache_1.serverCache)(10), otakudesuController_1.default.getSchedule)
    .get("/anime", (0, cache_1.serverCache)(10), otakudesuController_1.default.getAllAnimes)
    .get("/genres", (0, cache_1.serverCache)(), otakudesuController_1.default.getAllGenres)
    .get("/ongoing", (0, cache_1.serverCache)(10), otakudesuController_1.default.getOngoingAnimes)
    .get("/completed", (0, cache_1.serverCache)(10), otakudesuController_1.default.getCompletedAnimes)
    .get("/search", (0, cache_1.serverCache)(10), otakudesuController_1.default.getSearch)
    .get("/genres/:genreId", (0, cache_1.serverCache)(10), otakudesuController_1.default.getGenreAnimes)
    .get("/anime/:animeId", (0, cache_1.serverCache)(30), otakudesuController_1.default.getAnimeDetails)
    .get("/episode/:episodeId", (0, cache_1.serverCache)(30), otakudesuController_1.default.getAnimeEpisode)
    .get("/server/:serverId", (0, cache_1.serverCache)(3), otakudesuController_1.default.getServerUrl)
    .post("/server/:serverId", (0, cache_1.serverCache)(3), otakudesuController_1.default.getServerUrl)
    .get("/batch/:batchId", (0, cache_1.serverCache)(30), otakudesuController_1.default.getAnimeBatch);
exports.default = otakudesuRoute;
