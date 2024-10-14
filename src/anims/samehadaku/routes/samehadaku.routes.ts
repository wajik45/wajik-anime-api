import { cacheMiddleware } from "../../../middlewares/cacheMiddleware";
import express from "express";
import C from "../controllers/samehadaku.controller";

const SamehadakuRouter = express.Router();

SamehadakuRouter.get("/", C.getMainView);
SamehadakuRouter.get("/view-data", cacheMiddleware(), C.getMainViewData);
SamehadakuRouter.get("/home", cacheMiddleware(10), C.getHome);
SamehadakuRouter.get("/genres", cacheMiddleware(), C.getAllGenres);
SamehadakuRouter.get("/anime", cacheMiddleware(10), C.getAllAnimes);
SamehadakuRouter.get("/schedule", cacheMiddleware(10), C.getSchedule);
SamehadakuRouter.get("/recent", cacheMiddleware(10), C.getRecentEpisodes);
SamehadakuRouter.get("/ongoing", cacheMiddleware(10), C.getOngoingAnimes);
SamehadakuRouter.get("/completed", cacheMiddleware(10), C.getCompletedAnimes);
SamehadakuRouter.get("/popular", cacheMiddleware(10), C.getPopularAnimes);
SamehadakuRouter.get("/movies", cacheMiddleware(10), C.getMovies);
SamehadakuRouter.get("/batch", cacheMiddleware(60), C.getBatches);
SamehadakuRouter.get("/search", cacheMiddleware(10), C.getSearch);
SamehadakuRouter.get("/genres/:genreId", cacheMiddleware(10), C.getGenreAnimes);
SamehadakuRouter.get("/anime/:animeId", cacheMiddleware(), C.getAnimeDetails);
SamehadakuRouter.get("/episode/:episodeId", cacheMiddleware(), C.getAnimeEpisode);
SamehadakuRouter.get("/episode/:episodeId/servers", cacheMiddleware(), C.getAnimeServers);
SamehadakuRouter.get("/server/:serverId", cacheMiddleware(3), C.getServerUrl);
SamehadakuRouter.post("/server/:serverId", cacheMiddleware(3), C.getServerUrl);
SamehadakuRouter.get("/batch/:batchId", cacheMiddleware(), C.getAnimeBatch);

export default SamehadakuRouter;
