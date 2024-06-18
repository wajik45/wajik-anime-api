"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
const getDetail_1 = __importDefault(require("../../../helpers/getDetail"));
function parseAnimeEpisode($) {
    const downloadUrl = [];
    const episodeList = [];
    let episodeSebelumnya = null;
    let episodeSelanjutnya = null;
    const judul = $("#venkonten .posttl").text();
    $(".flir a").each((index, element) => {
        const otakudesuUrl = $(element).attr("href") || "Unknown";
        const slug = (0, getSlug_1.default)(otakudesuUrl);
        if (index === 0 && !$(element).text().includes("See All Episodes")) {
            episodeSebelumnya = {
                slug: slug,
                href: "/otakudesu/episode/" + slug,
                otakudesuUrl: otakudesuUrl,
            };
        }
        if ((index === 1 && !$(element).text().includes("See All Episodes")) ||
            (index === 2 && !$(element).text().includes("See All Episodes"))) {
            episodeSelanjutnya = {
                slug: slug,
                href: "/otakudesu/episode/" + slug,
                otakudesuUrl: otakudesuUrl,
            };
        }
    });
    const streamingUrl = $(".responsive-embed-stream iframe").attr("src");
    $(".download ul li").each((index, element) => {
        const urls = [];
        const kualitas = $(element)
            .find("strong")
            .text()
            .trim()
            .replace(/\ /g, "_");
        const size = $(element).find("i").text();
        $(element)
            .find("a")
            .each((index, element) => {
            const judul = $(element).text();
            const url = $(element).attr("href");
            urls.push({
                judul,
                url,
            });
        });
        downloadUrl.push({
            kualitas,
            urls,
            size,
        });
    });
    const { detail, genres } = (0, getDetail_1.default)($, ".infozingle p");
    $(".keyingpost li").each((index, element) => {
        const judul = $(element)
            .find("a")
            .text()
            .trim()
            .replace("Episode", "")
            .trim();
        const otakudesuUrl = $(element).find("a").attr("href") || "Unknown";
        const slug = (0, getSlug_1.default)(otakudesuUrl);
        const href = "/otakudesu/episode/" + slug;
        episodeList.push({
            judul,
            slug,
            href,
            otakudesuUrl,
        });
    });
    return {
        judul,
        streamingUrl,
        episodeSebelumnya,
        episodeSelanjutnya,
        downloadUrl,
        info: {
            ...detail,
            genres,
            episodeList,
        },
    };
}
exports.default = parseAnimeEpisode;
