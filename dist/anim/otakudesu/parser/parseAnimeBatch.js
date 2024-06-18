"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
function parseAnimeBatch($) {
    const detailSelector = ".animeinfo .infos";
    const detail = {};
    const genres = [];
    const poster = $(".animeinfo img").attr("src");
    const batchList = [];
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
    $(detailSelector + " a").each((index, element) => {
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
    $(".batchlink h4").each((index, element) => {
        const qualityList = [];
        $(element)
            .next()
            .find("li")
            .each((index, element) => {
            const urls = [];
            $(element)
                .find("a")
                .each((index, element) => {
                urls.push({
                    judul: $(element).text(),
                    url: $(element).attr("href"),
                });
            });
            qualityList.push({
                judul: $(element).find("strong").text(),
                urls,
                size: $(element).find("i").text(),
            });
        });
        batchList.push({
            judul: $(element).text(),
            kualitas: qualityList,
        });
    });
    return {
        ...detail,
        poster,
        genres,
        batchList,
    };
}
exports.default = parseAnimeBatch;
//# sourceMappingURL=parseAnimeBatch.js.map