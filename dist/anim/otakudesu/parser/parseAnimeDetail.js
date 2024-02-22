"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getSlug_1 = __importDefault(require("../../../helpers/getSlug"));
const getDetail_1 = __importDefault(require("../../../helpers/getDetail"));
function parseAnimeDetail($) {
    const sinopsis = [];
    const episodeList = [];
    const batchList = [];
    const gaskenAdikAdik = (element, tipe) => {
        $(element)
            .find("ul li")
            .each((index, element) => {
            const judul = $(element).find("a").text();
            const otakudesuUrl = $(element).find("a").attr("href") || "Unknown";
            const slug = (0, getSlug_1.default)(otakudesuUrl);
            const tanggalRilis = $(element).find(".zeebr").text();
            if (tipe === "episode") {
                episodeList.push({
                    judul,
                    slug,
                    otakudesuUrl,
                    tanggalRilis,
                });
            }
            else {
                batchList.push({
                    judul,
                    slug,
                    otakudesuUrl,
                    tanggalRilis,
                });
            }
        });
    };
    const poster = $("#venkonten .fotoanime img").attr("src");
    const { detail, genres } = (0, getDetail_1.default)($, ".infozingle p");
    $(".sinopc").each((index, element) => {
        const sinopsisText = $(element).find("p").text();
        sinopsis.push(sinopsisText);
    });
    $(".episodelist").each((index, element) => {
        if (index === 1)
            gaskenAdikAdik(element, "episode");
        if (index === 2)
            gaskenAdikAdik(element, "batch");
    });
    return {
        ...detail,
        poster,
        genres,
        sinopsis,
        episodeList,
        batchList,
    };
}
exports.default = parseAnimeDetail;
//# sourceMappingURL=parseAnimeDetail.js.map