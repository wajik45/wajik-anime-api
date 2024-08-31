"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseGenreList;
const getSlug_1 = __importDefault(require("../../../../helpers/getSlug"));
const getOtakudesuUrl_1 = __importDefault(require("../../utils/getOtakudesuUrl"));
function parseGenreList($) {
    const data = [];
    const animeElements = $(".genres li a").toArray();
    animeElements.forEach((animeElement) => {
        const judul = $(animeElement).text();
        const otakudesuUrl = (0, getOtakudesuUrl_1.default)($(animeElement).attr("href"));
        const slug = (0, getSlug_1.default)(otakudesuUrl);
        const href = "/otakudesu/genres/" + slug;
        data.push({
            judul,
            slug,
            href,
            otakudesuUrl,
        });
    });
    return data;
}
