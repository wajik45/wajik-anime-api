"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseAnimeList;
const getSlug_1 = __importDefault(require("../../../../helpers/getSlug"));
const getOtakudesuUrl_1 = __importDefault(require("../../utils/getOtakudesuUrl"));
function parseAnimeList($) {
    const data = [];
    const animeElements = $(".daftarkartun .bariskelom").toArray();
    animeElements.forEach((animeElement) => {
        const berdasarkan = $(animeElement).find(".barispenz a").text();
        const animeList = [];
        const cardElements = $(animeElement).find(".penzbar .jdlbar").toArray();
        cardElements.forEach((cardElement) => {
            const judul = $(cardElement).find("a").text().trim();
            const otakudesuUrl = (0, getOtakudesuUrl_1.default)($(cardElement).find("a").attr("href"));
            const slug = (0, getSlug_1.default)(otakudesuUrl);
            const href = "/otakudesu/anime/" + slug;
            animeList.push({
                judul,
                slug,
                href,
                otakudesuUrl,
            });
        });
        data.push({
            berdasarkan,
            animeList,
        });
    });
    return data;
}
