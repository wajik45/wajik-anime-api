"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
function parseAnimeList($) {
    const data = [];
    $(".daftarkartun .bariskelom").each((index, element) => {
        const berdasarkan = $(element).find(".barispenz a").text();
        const anime = [];
        $(element)
            .find(".penzbar .jdlbar")
            .each((index, element) => {
            const judul = $(element).find("a").text().trim();
            const otakudesuUrl = $(element).find("a").attr("href") || "Unknown";
            const slug = (0, getSlug_1.default)(otakudesuUrl);
            const href = "/otakudesu/anime/" + slug;
            anime.push({
                judul,
                slug,
                href,
                otakudesuUrl,
            });
        });
        data.push({
            berdasarkan,
            anime,
        });
    });
    return data;
}
exports.default = parseAnimeList;
//# sourceMappingURL=parseAnimeList.js.map