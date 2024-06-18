"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
function parseJadwalRilis($) {
    const data = [];
    $(".venutama .kglist321").each((index, element) => {
        const hari = $(element).find("h2").text();
        const anime = [];
        $(element)
            .find("ul li")
            .each((index, element) => {
            const judul = $(element).find("a").text();
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
            hari,
            anime,
        });
    });
    return data;
}
exports.default = parseJadwalRilis;
