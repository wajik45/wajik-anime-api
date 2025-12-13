import { Router } from "express";
import { serverCache } from "@middlewares/cache.js";
import otakudesuController from "@controllers/otakudesu.controller.js";

const otakudesuRouter = Router();

otakudesuRouter.get("/", otakudesuController.getRoot);
otakudesuRouter.get("/home", serverCache(10), otakudesuController.getHome);
otakudesuRouter.get("/schedule", serverCache(10), otakudesuController.getSchedule);
otakudesuRouter.get("/anime", serverCache(10), otakudesuController.getAllAnimes);
otakudesuRouter.get("/genre", serverCache(10), otakudesuController.getAllGenres);
otakudesuRouter.get("/ongoing", serverCache(10), otakudesuController.getOngoingAnimes);
otakudesuRouter.get("/completed", serverCache(10), otakudesuController.getCompletedAnimes);
otakudesuRouter.get("/search", serverCache(10), otakudesuController.getSearchedAnimes);
otakudesuRouter.get("/genre/:genreId", serverCache(10), otakudesuController.getAnimesByGenre);
otakudesuRouter.get("/batch/:batchId", serverCache(10), otakudesuController.getBatchDetails);
otakudesuRouter.get("/anime/:animeId", serverCache(10), otakudesuController.getAnimeDetails);
otakudesuRouter.get("/episode/:episodeId", serverCache(10), otakudesuController.getEpisodeDetails);
otakudesuRouter.get("/server/:serverId", serverCache(10), otakudesuController.getServerDetails);
otakudesuRouter.post("/server/:serverId", serverCache(10), otakudesuController.getServerDetails);

export default otakudesuRouter;
