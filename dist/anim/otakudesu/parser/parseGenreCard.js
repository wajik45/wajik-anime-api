"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
function parseGenreCard($) {
    const data = [];
    $(".venser .col-anime").each((index, element) => {
        const judul = $(element).find(".col-anime-title a").text();
        const studio = $(element).find(".col-anime-studio").text();
        const jumlahEpisode = $(element)
            .find(".col-anime-eps")
            .text()
            .replace("Eps", "")
            .trim();
        const rating = $(element).find(".col-anime-rating").text();
        const musim = $(element).find(".col-anime-date").text();
        const poster = $(element).find(".col-anime-cover img").attr("src") || "Unknown";
        const sinopsis = [];
        const genres = [];
        const otakudesuUrl = $(element).find(".col-anime-title a").attr("href") || "Unknown";
        const slug = (0, getSlug_1.default)(otakudesuUrl);
        const href = "/otakudesu/anime/" + slug;
        $(element)
            .find(".col-synopsis p")
            .each((index, element) => {
            if ($(element).text()) {
                sinopsis.push($(element).text());
            }
        });
        $(element)
            .find(".col-anime-genre a")
            .each((index, element) => {
            const judul = $(element).text();
            const otakudesuUrl = $(element).attr("href") || "Unknown";
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
    });
    return data;
}
exports.default = parseGenreCard;
