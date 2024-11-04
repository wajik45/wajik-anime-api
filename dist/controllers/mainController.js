"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../helpers/error");
const index_1 = require("../anims/otakudesu/index");
const index_2 = require("../anims/samehadaku/index");
const payload_1 = __importDefault(require("../helpers/payload"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mainController = {
    getMainView(req, res, next) {
        try {
            const getViewFile = (filePath) => {
                return path_1.default.join(__dirname, "..", "public", "views", filePath);
            };
            res.sendFile(getViewFile("home.html"));
        }
        catch (error) {
            next(error);
        }
    },
    getMainViewData(req, res, next) {
        try {
            function getData() {
                const animeSources = {
                    otakudesu: index_1.otakudesuInfo,
                    samehadaku: index_2.samehadakuInfo,
                };
                const data = {
                    message: "WAJIK ANIME API IS READY 🔥🔥🔥",
                    sources: Object.values(animeSources),
                };
                const newData = {
                    message: data.message,
                    sources: [],
                };
                data.sources.forEach((source) => {
                    const exist = fs_1.default.existsSync(path_1.default.join(__dirname, "..", "anims", source.baseUrlPath));
                    if (exist) {
                        newData.sources.push({
                            title: source.title,
                            route: source.baseUrlPath,
                        });
                    }
                });
                return newData;
            }
            const data = getData();
            res.json((0, payload_1.default)(res, { data }));
        }
        catch (error) {
            next(error);
        }
    },
    _404(req, res, next) {
        next((0, error_1.setResponseError)(404, "halaman tidak ditemukan"));
    },
};
exports.default = mainController;
