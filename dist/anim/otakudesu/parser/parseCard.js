"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseCard;
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
const getOtakudesuUrl_1 = __importDefault(require("../utils/getOtakudesuUrl"));
function parseCard($, cheerioElement) {
    const episode = cheerioElement
        .find(".detpost .epz")
        .text()
        .replace("Episode", "")
        .trim();
    const ratingAtauHari = cheerioElement.find(".detpost .epztipe").text().trim();
    const judul = cheerioElement.find(".detpost .thumbz .jdlflm").text();
    const otakudesuUrl = (0, getOtakudesuUrl_1.default)(cheerioElement.find(".detpost .thumb a").attr("href"));
    const poster = cheerioElement.find(".detpost .thumb .thumbz img").attr("src") || "";
    const slug = (0, getSlug_1.default)(otakudesuUrl);
    const tanggal = cheerioElement.find(".detpost .newnime").text();
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
