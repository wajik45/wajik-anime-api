import { cacheMiddleware } from "../../../middlewares/cacheMiddleware";
import express from "express";
import C from "../controllers/otakudesu.controller";

const OtakudesuRouter = express.Router();

OtakudesuRouter.get("/", C.getMainView);
OtakudesuRouter.get("/view-data", cacheMiddleware(), C.getMainViewData);
OtakudesuRouter.get("/home", cacheMiddleware(10), C.getHome);
OtakudesuRouter.get("/schedule", cacheMiddleware(10), C.getSchedule);
OtakudesuRouter.get("/anime", cacheMiddleware(10), C.getAllAnimes);
OtakudesuRouter.get("/genres", cacheMiddleware(), C.getAllGenres);
OtakudesuRouter.get("/ongoing", cacheMiddleware(10), C.getOngoingAnimes);
OtakudesuRouter.get("/completed", cacheMiddleware(10), C.getCompletedAnimes);
OtakudesuRouter.get("/search", cacheMiddleware(10), C.getSearch);
OtakudesuRouter.get("/genres/:genreId", cacheMiddleware(10), C.getGenreAnimes);
OtakudesuRouter.get("/anime/:animeId", cacheMiddleware(), C.getAnimeDetails);
OtakudesuRouter.get("/episode/:episodeId", cacheMiddleware(), C.getAnimeEpisode);
OtakudesuRouter.get("/episode/:episodeId/servers", cacheMiddleware(), C.getAnimeServers);
OtakudesuRouter.get("/server/:serverId", cacheMiddleware(3), C.getServerUrl);
OtakudesuRouter.post("/server/:serverId", cacheMiddleware(3), C.getServerUrl);
OtakudesuRouter.get("/batch/:batchId", cacheMiddleware(), C.getAnimeBatch);

export default OtakudesuRouter;
