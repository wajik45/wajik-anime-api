"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseAnimeEmbedByEpisode;
const getOtakudesuUrl_1 = __importDefault(require("../../utils/getOtakudesuUrl"));
const getFinalUrls_1 = __importDefault(require("../../../../helpers/getFinalUrls"));
const getSlug_1 = __importDefault(require("../../../../helpers/getSlug"));
async function parseAnimeEmbedByEpisode($) {
    const embedList = [];
    const embedElements = $(".download ul li").toArray();
    const mirrors = ["pdrain", "kfiles", "acefile", "vidhide", "mega", "megaup"];
    for (let i = 0; i < embedElements.length; i++) {
        const embedElement = embedElements[i];
        const urls = [];
        const urlsOnly = [];
        const judul = $(embedElement)
            .find("strong")
            .text()
            .trim()
            .replace(/\ /g, "_");
        const size = $(embedElement).find("i").text();
        const urlElements = $(embedElement).find("a").toArray();
        for (let j = 0; j < urlElements.length; j++) {
            const urlElement = urlElements[j];
            const judul = $(urlElement).text().trim();
            const url = $(urlElement).attr("href") || (0, getOtakudesuUrl_1.default)();
            if (mirrors.includes(judul.toLowerCase())) {
                urlsOnly.push(url);
                urls.push({
                    judul,
                });
            }
        }
        const originalUrls = await (0, getFinalUrls_1.default)(urlsOnly, {
            useCache: true,
        }, {
            timeout: 10000,
        }, {
            delay: 100,
            retries: 2,
        });
        const finalUrls = [];
        for (let k = 0; k < originalUrls.length; k++) {
            const judul = urls[k].judul;
            const originalUrl = originalUrls[k];
            const getEmbedUrl = (originalUrl) => {
                const lowerJudul = judul.toLowerCase();
                switch (lowerJudul) {
                    case "pdrain":
                        return originalUrl + "?embed";
                    case "kfiles":
                        return originalUrl
                            .replace("/view", "/embed-video")
                            .replace("file.html", "");
                    case "acefile":
                        const originalUrlArr = originalUrl
                            .split("/")
                            .filter((url) => url !== "");
                        let idIndex = 0;
                        originalUrlArr.forEach((url, index) => {
                            if (url === "f") {
                                idIndex = index;
                            }
                        });
                        const id = originalUrlArr[idIndex + 1];
                        return `${originalUrlArr[0]}//${originalUrlArr[1]}/player/${id}`;
                    case "vidhide":
                        return ("https://vidhidepro.com/embed/" +
                            (0, getSlug_1.default)(originalUrl).replace("?id=", ""));
                    case "mega":
                        return originalUrl.replace("/file", "/embed");
                    case "megaup":
                        return originalUrl;
                    default:
                        return "";
                }
            };
            const embedUrl = getEmbedUrl(originalUrl);
            finalUrls.push({
                judul,
                url: embedUrl,
            });
        }
        embedList.push({
            judul,
            size,
            urls: finalUrls,
        });
    }
    return embedList;
}
