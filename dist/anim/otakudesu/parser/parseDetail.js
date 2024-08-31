"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseDetail;
const toCamelCase_1 = __importDefault(require("../../../helpers/toCamelCase"));
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
const getOtakudesuUrl_1 = __importDefault(require("../utils/getOtakudesuUrl"));
function parseDetail($, cheerioElement) {
    const detail = {};
    const genres = [];
    const detailElements = cheerioElement.toArray();
    detailElements.forEach((detailElement) => {
        let key = $(detailElement).find("b").text();
        const value = $(detailElement)
            .text()
            .replaceAll(key, "")
            .replaceAll(":", "")
            .trim();
        key = (0, toCamelCase_1.default)(key);
        if (!key.includes("genre")) {
            detail[key] = value;
        }
        if (key.includes("genre")) {
            const genreElements = $(detailElement).find("a").toArray();
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
        }
    });
    return {
        detail,
        genres,
    };
}
