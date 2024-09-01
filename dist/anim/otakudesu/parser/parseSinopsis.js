"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseSinopsis;
const getFinalUrl_1 = __importDefault(require("../../../helpers/getFinalUrl"));
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
const getOtakudesuUrl_1 = __importDefault(require("../utils/getOtakudesuUrl"));
const getFinalUrls_1 = __importDefault(require("../../../helpers/getFinalUrls"));
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
                const otakudesuUrls = [];
                for (let j = 0; j < connectionElements.length; j++) {
                    const connectionElement = connectionElements[j];
                    const judul = $(connectionElement).text();
                    const otakudesuUrl = $(connectionElement).attr("href") || (0, getOtakudesuUrl_1.default)();
                    sinopsis.connections.push({
                        judul,
                    });
                    if (otakudesuUrl.includes("otakudesu") &&
                        !otakudesuUrl.includes((0, getOtakudesuUrl_1.default)())) {
                        const query = (0, getSlug_1.default)(otakudesuUrl);
                        otakudesuUrls.push((0, getOtakudesuUrl_1.default)() + "?p=" + query);
                    }
                    else {
                        const originalUrl = await (0, getFinalUrl_1.default)(otakudesuUrl, {
                            useCache: true,
                        });
                        if (!originalUrl.includes((0, getOtakudesuUrl_1.default)())) {
                            const query = (0, getSlug_1.default)(originalUrl);
                            otakudesuUrls.push((0, getOtakudesuUrl_1.default)() + query);
                        }
                        else {
                            otakudesuUrls.push(originalUrl);
                        }
                    }
                }
                const originalUrls = await (0, getFinalUrls_1.default)(otakudesuUrls, {
                    useCache: true,
                }, {
                    timeout: 10000,
                }, {
                    delay: 100,
                    retries: 2,
                });
                const finalConnections = [];
                for (let k = 0; k < originalUrls.length; k++) {
                    const judul = sinopsis.connections[k].judul;
                    const originalUrl = originalUrls[k];
                    const slug = (0, getSlug_1.default)(originalUrl);
                    const href = "/otakudesu/anime/" + slug;
                    finalConnections.push({
                        judul,
                        slug,
                        href,
                        originalUrl,
                    });
                }
                sinopsis.connections = finalConnections;
            }
        }
    }
    return sinopsis;
}
