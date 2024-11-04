"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("../middlewares/cache");
const mainController_1 = __importDefault(require("../controllers/mainController"));
const express_1 = __importDefault(require("express"));
const mainRoute = express_1.default.Router();
mainRoute.get("/", mainController_1.default.getMainView);
mainRoute.get("/view-data", (0, cache_1.serverCache)(), mainController_1.default.getMainViewData);
mainRoute.get("*", mainController_1.default._404);
exports.default = mainRoute;
