import { Router } from "express";
import { serverCache } from "@middlewares/cache.js";
import kuramanimeController from "@controllers/kuramanime.controller.js";

const kuramanimeRouter = Router();

kuramanimeRouter.get("/", kuramanimeController.getRoot);
kuramanimeRouter.get("/home", serverCache(10), kuramanimeController.getHome);
kuramanimeRouter.get("/anime", serverCache(10), kuramanimeController.getAnimes);
kuramanimeRouter.get("/schedule", serverCache(10), kuramanimeController.getScheduledAnimes);
kuramanimeRouter.get(
  "/properties/:propertyType",
  serverCache(10),
  kuramanimeController.getProperties
);
kuramanimeRouter.get(
  "/properties/:propertyType/:propertyId",
  serverCache(10),
  kuramanimeController.getAnimesByProperty
);
kuramanimeRouter.get(
  "/anime/:animeId/:animeSlug",
  serverCache(10),
  kuramanimeController.getAnimeDetails
);
kuramanimeRouter.get(
  "/batch/:animeId/:animeSlug/:batchId",
  serverCache(10),
  kuramanimeController.getBatchDetails
);
kuramanimeRouter.get(
  "/episode/:animeId/:animeSlug/:episodeId",
  serverCache(10),
  kuramanimeController.getEpisodeDetails
);

export default kuramanimeRouter;
