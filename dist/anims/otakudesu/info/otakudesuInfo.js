"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const par = __importStar(require("../../../helpers/paramsView"));
const animeConfig_1 = __importDefault(require("../../../configs/animeConfig"));
const { baseUrl } = animeConfig_1.default;
const otakudesuInfo = {
    title: "Otakudesu",
    baseUrl: baseUrl.otakudesu,
    baseUrlPath: "/otakudesu",
    message: "di vercel ada beberapa rute yang 403 forbidden, di local aman, mungkin non serverless juga aman",
    ok: true,
    routesView: [
        {
            title: "Halaman home",
            route: "/home",
        },
        {
            title: "Jadwal rilis",
            route: "/schedule",
        },
        {
            title: "Semua anime",
            route: "/anime",
        },
        {
            title: "Semua genre",
            route: "/genres",
        },
        {
            title: "Anime sedang tayang",
            route: "/ongoing",
            queryParams: [par.pageQueryParam],
        },
        {
            title: "Anime sudah tamat",
            route: "/completed",
            queryParams: [par.pageQueryParam],
        },
        {
            title: "Pencarian anime",
            route: "/search",
            queryParams: [par.qQueryParam],
        },
        {
            title: "Anime berdasarkan genre",
            route: "/genres/{genreId}",
            queryParams: [par.pageQueryParam],
            routeParams: [par.genreIdRouteParam],
        },
        {
            title: "Detail lengkap anime",
            route: "/anime/{animeId}",
            routeParams: [par.animeIdRouteParam],
        },
        {
            title: "Nonton anime berdasarkan episode",
            route: "/episode/{episodeId}",
            routeParams: [par.episodeIdRouteParam],
        },
        {
            title: "Link server buat nonton",
            route: "/server/{serverId}",
            routeParams: [par.serverIdRouteParam],
        },
        {
            title: "Download batch anime lengkap",
            route: "/batch/{batchId}",
            routeParams: [par.batchIdRouteParam],
        },
    ],
};
exports.default = otakudesuInfo;
