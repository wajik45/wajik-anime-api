"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseSearch;
const getSlug_1 = __importDefault(require("../../../../helpers/getSlug"));
const parseDetail_1 = __importDefault(require("../parseDetail"));
const getOtakudesuUrl_1 = __importDefault(require("../../utils/getOtakudesuUrl"));
function parseSearch($) {
    const data = [];
    const animeElements = $(".venutama ul li").toArray();
    animeElements.forEach((animeElement) => {
        const judul = $(animeElement).find("h2 a").text();
        const poster = $(animeElement).find("img").attr("src") || "";
        const otakudesuUrl = (0, getOtakudesuUrl_1.default)($(animeElement).find("h2 a").attr("href"));
        const slug = (0, getSlug_1.default)(otakudesuUrl);
        const href = "/otakudesu/anime/" + slug;
        const { detail, genres } = (0, parseDetail_1.default)($, $(".set"));
        data.push({
            judul,
            poster,
            ...detail,
            slug,
            href,
            otakudesuUrl,
            genres,
        });
    });
    return data;
}
