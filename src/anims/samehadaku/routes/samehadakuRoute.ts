import { serverCache } from "@middlewares/cache";
import controller from "@samehadaku/controllers/samehadakuController";
import express from "express";

const samehadakuRoute = express.Router();

samehadakuRoute
  .get("/", controller.getMainView)
  .get("/view-data", serverCache(), controller.getMainViewData)
  .get("/home", serverCache(10), controller.getHome)
  .get("/genres", serverCache(), controller.getAllGenres)
  .get("/anime", serverCache(10), controller.getAllAnimes)
  .get("/schedule", serverCache(10), controller.getSchedule)
  .get("/recent", serverCache(10), controller.getRecentEpisodes)
  .get("/ongoing", serverCache(10), controller.getOngoingAnimes)
  .get("/completed", serverCache(10), controller.getCompletedAnimes)
  .get("/popular", serverCache(10), controller.getPopularAnimes)
  .get("/movies", serverCache(10), controller.getMovies)
  .get("/batch", serverCache(30), controller.getBatches)
  .get("/search", serverCache(10), controller.getSearch)
  .get("/genres/:genreId", serverCache(10), controller.getGenreAnimes)
  .get("/anime/:animeId", serverCache(30), controller.getAnimeDetails)
  .get("/episode/:episodeId", serverCache(30), controller.getAnimeEpisode)
  .get("/server/:serverId", serverCache(3), controller.getServerUrl)
  .post("/server/:serverId", serverCache(3), controller.getServerUrl)
  .get("/wibufile", serverCache(3, "text"), controller.getWibuFile)
  .get("/batch/:batchId", serverCache(30), controller.getAnimeBatch);

export default samehadakuRoute;
