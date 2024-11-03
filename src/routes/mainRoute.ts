import { serverCache } from "@middlewares/cache";
import mainController from "@controllers/mainController";
import express from "express";

const mainRoute = express.Router();

mainRoute.get("/", mainController.getMainView);
mainRoute.get("/view-data", serverCache(), mainController.getMainViewData);
mainRoute.get("*", mainController._404);

export default mainRoute;
