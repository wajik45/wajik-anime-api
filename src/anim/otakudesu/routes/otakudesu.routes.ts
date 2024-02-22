import express from "express";
import OtakudesuController from "../controller/otakudesu.controller";

const OtakudesuRouter = express.Router();

OtakudesuRouter.get("/otakudesu", OtakudesuController.getMessage);
OtakudesuRouter.get("/otakudesu/home", OtakudesuController.getHome);
OtakudesuRouter.get("/otakudesu/completed", OtakudesuController.getCompleted);
OtakudesuRouter.get("/otakudesu/ongoing", OtakudesuController.getOnGoing);
OtakudesuRouter.get("/otakudesu/search", OtakudesuController.getSearch);
OtakudesuRouter.get("/otakudesu/jadwal", OtakudesuController.getJadwalRilis);
OtakudesuRouter.get("/otakudesu/genres", OtakudesuController.getGenreList);
OtakudesuRouter.get(
  "/otakudesu/genres/:slug",
  OtakudesuController.getAnimeListByGenre
);
OtakudesuRouter.get("/otakudesu/anime", OtakudesuController.getAnimeList);
OtakudesuRouter.get(
  "/otakudesu/anime/:slug",
  OtakudesuController.getAnimeDetail
);
OtakudesuRouter.get(
  "/otakudesu/episode/:slug",
  OtakudesuController.getAnimeByEpisode
);
OtakudesuRouter.get("/otakudesu/batch/:slug", OtakudesuController.getBatch);

export default OtakudesuRouter;
