"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const animeUrl_1 = __importDefault(require("../../../helpers/animeUrl"));
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
function parseGenreList($) {
    const data = [];
    $(".genres li a").each((index, element) => {
        const judul = $(element).text();
        const otakudesuUrl = animeUrl_1.default.otakudesu + $(element).attr("href");
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
exports.default = parseGenreList;
