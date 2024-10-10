import express from "express";
import C from "../controllers/samehadaku.controller";

const SamehadakuRouter = express.Router();

SamehadakuRouter.get("/", C.getMainView);
SamehadakuRouter.get("/view-data", C.getMainViewData);
SamehadakuRouter.get("/home", C.getHome);
SamehadakuRouter.get("/genres", C.getAllGenres);
SamehadakuRouter.get("/anime", C.getAllAnimes);
SamehadakuRouter.get("/schedule", C.getSchedule);
SamehadakuRouter.get("/recent", C.getRecentEpisodes);
SamehadakuRouter.get("/ongoing", C.getOngoingAnimes);
SamehadakuRouter.get("/completed", C.getCompletedAnimes);
SamehadakuRouter.get("/popular", C.getPopularAnimes);
SamehadakuRouter.get("/movies", C.getMovies);
SamehadakuRouter.get("/batch", C.getBatches);
SamehadakuRouter.get("/search", C.getSearch);
SamehadakuRouter.get("/genres/:genreId", C.getGenreAnimes);
SamehadakuRouter.get("/anime/:animeId", C.getAnimeDetails);
SamehadakuRouter.get("/episode/:episodeId", C.getAnimeEpisode);
SamehadakuRouter.get("/episode/:episodeId/servers", C.getAnimeServers);
SamehadakuRouter.get("/server/:serverId", C.getServerUrl);
SamehadakuRouter.post("/server/:serverId", C.getServerUrl);
SamehadakuRouter.get("/batch/:batchId", C.getAnimeBatch);

export default SamehadakuRouter;
