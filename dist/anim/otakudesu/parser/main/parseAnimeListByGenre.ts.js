"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseAnimeListByGenre;
const getSlug_1 = __importDefault(require("../../../../helpers/getSlug"));
const parseSinopsis_1 = __importDefault(require("../parseSinopsis"));
const getOtakudesuUrl_1 = __importDefault(require("../../utils/getOtakudesuUrl"));
async function parseAnimeListByGenre($) {
    const data = [];
    const animeElements = $(".venser .col-anime").toArray();
    for (let i = 0; i < animeElements.length; i++) {
        const animeElement = animeElements[i];
        const judul = $(animeElement).find(".col-anime-title a").text();
        const studio = $(animeElement).find(".col-anime-studio").text();
        const jumlahEpisode = $(animeElement)
            .find(".col-anime-eps")
            .text()
            .replace("Eps", "")
            .trim();
        const rating = $(animeElement).find(".col-anime-rating").text();
        const musim = $(animeElement).find(".col-anime-date").text();
        const poster = $(animeElement).find(".col-anime-cover img").attr("src") || "";
        const sinopsis = await (0, parseSinopsis_1.default)($, $(animeElement).find(".col-synopsis p"));
        const genres = [];
        const otakudesuUrl = (0, getOtakudesuUrl_1.default)($(animeElement).find(".col-anime-title a").attr("href"));
        const slug = (0, getSlug_1.default)(otakudesuUrl);
        const href = "/otakudesu/anime/" + slug;
        const genreElements = $(animeElement).find(".col-anime-genre a").toArray();
        genreElements.forEach((genreElement) => {
            const judul = $(genreElement).text();
            const otakudesuUrl = (0, getOtakudesuUrl_1.default)($(genreElement).attr("href"));
            const slug = (0, getSlug_1.default)(otakudesuUrl);
            const href = "/otakudesu/genres/" + slug;
            genres.push({
                judul,
                slug,
                href,
                otakudesuUrl,
            });
        });
        data.push({
            judul,
            slug,
            href,
            poster,
            rating,
            jumlahEpisode,
            studio,
            musim,
            otakudesuUrl,
            genres,
            sinopsis,
        });
    }
    return data;
}
