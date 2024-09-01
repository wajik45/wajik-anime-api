"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseAnimeBatch;
const getSlug_1 = __importDefault(require("../../../../helpers/getSlug"));
const getOtakudesuUrl_1 = __importDefault(require("../../utils/getOtakudesuUrl"));
function parseAnimeBatch($) {
    const detailSelector = ".animeinfo .infos";
    const detail = {};
    const genres = [];
    const batchList = [];
    const poster = $(".animeinfo img").attr("src");
    $(detailSelector).each((index, element) => {
        $(element).find("br").after("break");
    });
    $(detailSelector)
        .text()
        .split("break")
        .forEach((item) => {
        if (item) {
            const key = item.split(":")[0].trim().toLowerCase();
            const value = item.split(":")[1].trim();
            if (!key.includes("genre"))
                detail[key] = value;
        }
    });
    const genreElements = $(detailSelector + " a").toArray();
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
    const batchElements = $(".batchlink h4").toArray();
    batchElements.forEach((batchElement) => {
        const judul = $(batchElement).text();
        const qualities = [];
        const qualityElements = $(batchElement).next().find("li").toArray();
        qualityElements.forEach((qualityElement) => {
            const judul = $(qualityElement).find("strong").text();
            const size = $(qualityElement).find("i").text();
            const urls = [];
            const urlElements = $(qualityElement).find("a").toArray();
            urlElements.forEach((urlElement) => {
                const judul = $(urlElement).text();
                const url = $(urlElement).attr("href");
                urls.push({
                    judul,
                    url,
                });
            });
            qualities.push({
                judul,
                size,
                urls,
            });
        });
        batchList.push({
            judul,
            qualities,
        });
    });
    return {
        ...detail,
        poster,
        genres,
        batchList,
    };
}
