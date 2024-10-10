import express from "express";
import C from "../controllers/otakudesu.controller";

const OtakudesuRouter = express.Router();

OtakudesuRouter.get("/", C.getMainView);
OtakudesuRouter.get("/view-data", C.getMainViewData);
OtakudesuRouter.get("/home", C.getHome);
OtakudesuRouter.get("/schedule", C.getSchedule);
OtakudesuRouter.get("/anime", C.getAllAnimes);
OtakudesuRouter.get("/genres", C.getAllGenres);
OtakudesuRouter.get("/ongoing", C.getOngoingAnimes);
OtakudesuRouter.get("/completed", C.getCompletedAnimes);
OtakudesuRouter.get("/search", C.getSearch);
OtakudesuRouter.get("/genres/:genreId", C.getGenreAnimes);
OtakudesuRouter.get("/anime/:animeId", C.getAnimeDetails);
OtakudesuRouter.get("/episode/:episodeId", C.getAnimeEpisode);
OtakudesuRouter.get("/episode/:episodeId/servers", C.getAnimeServers);
OtakudesuRouter.get("/server/:serverId", C.getServerUrl);
OtakudesuRouter.post("/server/:serverId", C.getServerUrl);
OtakudesuRouter.get("/batch/:batchId", C.getAnimeBatch);

export default OtakudesuRouter;
