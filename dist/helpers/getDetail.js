"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toCamelCase_1 = __importDefault(require("./toCamelCase"));
const getSlug_1 = __importDefault(require("./getSlug"));
function getDetail($, selectors) {
    const detail = {};
    const genres = [];
    $(selectors).each((index, element) => {
        let key = $(element).find("b").text();
        const value = $(element)
            .text()
            .replaceAll(key, "")
            .replaceAll(":", "")
            .trim();
        key = (0, toCamelCase_1.default)(key);
        if (!key.includes("genre"))
            detail[key] = value;
        if (key.includes("genre")) {
            $(element)
                .find("a")
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
        }
    });
    return {
        genres,
        detail,
    };
}
exports.default = getDetail;
//# sourceMappingURL=getDetail.js.map