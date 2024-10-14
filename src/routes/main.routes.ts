import { cacheMiddleware } from "../middlewares/cacheMiddleware";
import express from "express";
import C from "../controllers/main.controller";

const MainRouter = express.Router();

MainRouter.get("/", C.getMainView);
MainRouter.get("/view-data", cacheMiddleware(), C.getMainViewData);
MainRouter.get("*", C._404);

export default MainRouter;
