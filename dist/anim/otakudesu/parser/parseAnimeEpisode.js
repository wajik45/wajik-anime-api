"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
const getDetail_1 = __importDefault(require("../../../helpers/getDetail"));
function parseAnimeEpisode($) {
    const downloadUrl = {};
    let episodeSebelumnya = null;
    let episodeSelanjutnya = null;
    const judul = $("#venkonten .posttl").text();
    $(".flir a").each((index, element) => {
        const otakudesuUrl = $(element).attr("href") || "Unknown";
        if (index === 0 && !$(element).text().includes("See All Episodes")) {
            episodeSebelumnya = {
                slug: (0, getSlug_1.default)(otakudesuUrl),
                otakudesuUrl: otakudesuUrl,
            };
        }
        if ((index === 1 && !$(element).text().includes("See All Episodes")) ||
            (index === 2 && !$(element).text().includes("See All Episodes"))) {
            episodeSelanjutnya = {
                slug: (0, getSlug_1.default)(otakudesuUrl),
                otakudesuUrl: otakudesuUrl,
            };
        }
    });
    const streamingUrl = $(".responsive-embed-stream iframe").attr("src");
    $(".download ul li").each((index, element) => {
        const links = [];
        const kualitas = $(element).find("strong").text();
        $(element)
            .find("a")
            .each((index, element) => {
            const judul = $(element).text();
            const link = $(element).attr("href");
            links.push({
                judul,
                link,
            });
        });
        downloadUrl["_" + kualitas] = links;
    });
    const { detail, genres } = (0, getDetail_1.default)($, ".infozingle p");
    return {
        judul,
        streamingUrl,
        episodeSebelumnya,
        episodeSelanjutnya,
        downloadUrl,
        info: {
            ...detail,
            genres,
        },
    };
}
exports.default = parseAnimeEpisode;
//# sourceMappingURL=parseAnimeEpisode.js.map