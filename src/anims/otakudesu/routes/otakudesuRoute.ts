import { serverCache } from "@middlewares/cache";
import controller from "@otakudesu/controllers/otakudesuController";
import express from "express";

const otakudesuRoute = express.Router();

otakudesuRoute
  .get("/", controller.getMainView)
  .get("/view-data", serverCache(), controller.getMainViewData)
  .get("/home", serverCache(10), controller.getHome)
  .get("/schedule", serverCache(10), controller.getSchedule)
  .get("/anime", serverCache(10), controller.getAllAnimes)
  .get("/genres", serverCache(), controller.getAllGenres)
  .get("/ongoing", serverCache(10), controller.getOngoingAnimes)
  .get("/completed", serverCache(10), controller.getCompletedAnimes)
  .get("/search", serverCache(10), controller.getSearch)
  .get("/genres/:genreId", serverCache(10), controller.getGenreAnimes)
  .get("/anime/:animeId", serverCache(30), controller.getAnimeDetails)
  .get("/episode/:episodeId", serverCache(30), controller.getAnimeEpisode)
  .get("/server/:serverId", serverCache(3), controller.getServerUrl)
  .post("/server/:serverId", serverCache(3), controller.getServerUrl)
  .get("/batch/:batchId", serverCache(30), controller.getAnimeBatch);

export default otakudesuRoute;
