"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
const getDetail_1 = __importDefault(require("../../../helpers/getDetail"));
function parseSearchCard($) {
    const data = [];
    $(".venutama ul li").each((index, element) => {
        const judul = $(element).find("h2 a").text();
        const poster = $(element).find("img").attr("src") || "Unknown";
        const otakudesuUrl = $(element).find("h2 a").attr("href") || "Unknown";
        const slug = (0, getSlug_1.default)(otakudesuUrl);
        const { detail, genres } = (0, getDetail_1.default)($, ".set");
        data.push({
            judul,
            poster,
            ...detail,
            slug,
            otakudesuUrl,
            genres,
        });
    });
    return data;
}
exports.default = parseSearchCard;
//# sourceMappingURL=parseSearchCard.js.map