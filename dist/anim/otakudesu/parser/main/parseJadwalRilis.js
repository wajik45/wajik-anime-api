"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseJadwalRilis;
const getSlug_1 = __importDefault(require("../../../../helpers/getSlug"));
const getOtakudesuUrl_1 = __importDefault(require("../../utils/getOtakudesuUrl"));
function parseJadwalRilis($) {
    const data = [];
    const animeElements = $(".venutama .kglist321").toArray();
    animeElements.forEach((animeElement) => {
        const hari = $(animeElement).find("h2").text();
        const animeList = [];
        const jadwalElements = $(animeElement).find("ul li").toArray();
        jadwalElements.forEach((jadwalElement) => {
            const judul = $(jadwalElement).find("a").text();
            const otakudesuUrl = (0, getOtakudesuUrl_1.default)($(jadwalElement).find("a").attr("href"));
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
            hari,
            animeList,
        });
    });
    return data;
}
