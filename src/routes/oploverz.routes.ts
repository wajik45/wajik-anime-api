import { Router } from "express";
import { serverCache } from "@middlewares/cache.js";
import oploverzController from "@controllers/oploverz.controller.js";

const oploverzRouter = Router();

oploverzRouter.get("/", oploverzController.getRoot);
oploverzRouter.get("/home", serverCache(10), oploverzController.getHome);
oploverzRouter.get("/schedule", serverCache(10), oploverzController.getSchedule);
oploverzRouter.get("/anime", serverCache(10), oploverzController.getAnimeDirectory);
oploverzRouter.get("/anime/:animeId", serverCache(10), oploverzController.getAnimeDetails);
oploverzRouter.get("/episode/:episodeId", serverCache(10), oploverzController.getEpisodeDetails);
oploverzRouter.get("/search", serverCache(10), oploverzController.getSearchedAnimes);

export default oploverzRouter;
