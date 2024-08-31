"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseSinopsis;
const getFinalUrl_1 = __importDefault(require("../../../helpers/getFinalUrl"));
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
const getOtakudesuUrl_1 = __importDefault(require("../utils/getOtakudesuUrl"));
async function parseSinopsis($, cheerioElement) {
    const sinopsis = {
        paragraphs: [],
        connections: [],
    };
    const animeElements = cheerioElement.toArray();
    for (let i = 0; i < animeElements.length; i++) {
        const animeElement = animeElements[i];
        if ($(animeElement).text()) {
            if ($(animeElement).find("a").toArray().length === 0) {
                const sinopsisText = $(animeElement).text();
                sinopsis.paragraphs.push(sinopsisText);
            }
            else {
                const connectionElements = $(animeElement).find("a").toArray();
                for (let j = 0; j < connectionElements.length; j++) {
                    const connectionElement = connectionElements[j];
                    const judul = $(connectionElement).text();
                    const otakudesuUrl = $(connectionElement).attr("href") || (0, getOtakudesuUrl_1.default)();
                    try {
                        let originalUrl;
                        if (otakudesuUrl.includes("otakudesu")) {
                            const query = (0, getSlug_1.default)(otakudesuUrl);
                            originalUrl = await (0, getFinalUrl_1.default)((0, getOtakudesuUrl_1.default)() + "?p=" + query, { useCache: true });
                        }
                        else {
                            let originalUrl1 = await (0, getFinalUrl_1.default)(otakudesuUrl, {
                                useCache: true,
                            });
                            if (!originalUrl1.includes((0, getOtakudesuUrl_1.default)())) {
                                const query = (0, getSlug_1.default)(originalUrl1);
                                originalUrl1 = (0, getOtakudesuUrl_1.default)() + query;
                            }
                            const originalUrl2 = await (0, getFinalUrl_1.default)(originalUrl1, {
                                useCache: true,
                            });
                            originalUrl = originalUrl2;
                        }
                        const slug = (0, getSlug_1.default)(originalUrl);
                        const href = "/otakudesu/anime/" + slug;
                        sinopsis.connections.push({
                            judul,
                            slug,
                            href,
                            otakudesuUrl: originalUrl,
                        });
                    }
                    catch (error) {
                        console.log(error.message);
                    }
                }
            }
        }
    }
    return sinopsis;
}
