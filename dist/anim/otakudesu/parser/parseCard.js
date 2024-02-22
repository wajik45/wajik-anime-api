"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
function parseCard($, element) {
    const episode = $(element)
        .find(".detpost .epz")
        .text()
        .replace("Episode", "")
        .trim();
    const ratingAtauHari = $(element).find(".detpost .epztipe").text().trim();
    const judul = $(element).find(".detpost .thumbz .jdlflm").text();
    const otakudesuUrl = $(element).find(".detpost .thumb a").attr("href") || "Unknown";
    const poster = $(element).find(".detpost .thumb .thumbz img").attr("src") || "Unknown";
    const slug = (0, getSlug_1.default)(otakudesuUrl);
    const tanggal = $(element).find(".detpost .newnime").text();
    return {
        judul,
        slug,
        episode,
        ratingAtauHari,
        otakudesuUrl,
        poster,
        tanggal,
    };
}
exports.default = parseCard;
//# sourceMappingURL=parseCard.js.map