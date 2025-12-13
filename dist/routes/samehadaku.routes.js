import { Router } from "express";
import samehadakuController from "../controllers/samehadaku.controller.js";
const samehadakuRouter = Router();
samehadakuRouter.get("/", samehadakuController.getRoot);
export default samehadakuRouter;
