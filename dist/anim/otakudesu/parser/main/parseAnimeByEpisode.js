"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseAnimeByEpisode;
const getSlug_1 = __importDefault(require("../../../../helpers/getSlug"));
const parseDetail_1 = __importDefault(require("../parseDetail"));
const getOtakudesuUrl_1 = __importDefault(require("../../utils/getOtakudesuUrl"));
async function parseAnimeByEpisode($) {
    const downloadUrl = {};
    const episodeList = [];
    let episodeSebelumnya = null;
    let episodeSelanjutnya = null;
    const navigationElements = $(".flir a").toArray();
    navigationElements.forEach((navigationElement, index) => {
        const otakudesuUrl = (0, getOtakudesuUrl_1.default)($(navigationElement).attr("href"));
        const slug = (0, getSlug_1.default)(otakudesuUrl);
        const href = "/otakudesu/episode/" + slug;
        const navigationText = $(navigationElement).text();
        if (index === 0 && !navigationText.includes("See All Episodes")) {
            episodeSebelumnya = {
                slug,
                href,
                otakudesuUrl,
            };
        }
        if ((index === 1 && !navigationText.includes("See All Episodes")) ||
            (index === 2 && !navigationText.includes("See All Episodes"))) {
            episodeSelanjutnya = {
                slug,
                href,
                otakudesuUrl,
            };
        }
    });
    const judulDownload = {
        _1: $(".subheading h2").first().text(),
        _2: $(".download h4").text(),
    };
    downloadUrl.judul = judulDownload;
    downloadUrl.qualities = [];
    const downloadElements = $(".download ul li").toArray();
    downloadElements.forEach((downloadElement) => {
        const urls = [];
        const judul = $(downloadElement)
            .find("strong")
            .text()
            .trim()
            .replace(/\ /g, "_");
        const size = $(downloadElement).find("i").text();
        const urlElements = $(downloadElement).find("a").toArray();
        urlElements.forEach(async (urlElement) => {
            const judul = $(urlElement).text();
            const url = $(urlElement).attr("href") || (0, getOtakudesuUrl_1.default)();
            urls.push({
                judul,
                url,
            });
        });
        downloadUrl.qualities.push({
            judul,
            size,
            urls,
        });
    });
    const episodeElements = $(".keyingpost li").toArray();
    episodeElements.forEach((episodeElement) => {
        const judul = $(episodeElement)
            .find("a")
            .text()
            .trim()
            .replace("Episode", "")
            .trim();
        const otakudesuUrl = (0, getOtakudesuUrl_1.default)($(episodeElement).find("a").attr("href"));
        const slug = (0, getSlug_1.default)(otakudesuUrl);
        const href = "/otakudesu/episode/" + slug;
        episodeList.push({
            judul,
            slug,
            href,
            otakudesuUrl,
        });
    });
    const judul = $("#venkonten .posttl").text();
    const jamRilis = $("#venkonten .kategoz .fa.fa-clock-o").next().text();
    const defaultStreamingUrl = $(".responsive-embed-stream iframe").attr("src");
    const { detail, genres } = (0, parseDetail_1.default)($, $(".infozingle p"));
    return {
        judul,
        jamRilis,
        defaultStreamingUrl,
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
