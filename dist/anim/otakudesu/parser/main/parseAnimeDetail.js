"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseAnimeDetail;
const getSlug_1 = __importDefault(require("../../../../helpers/getSlug"));
const parseSinopsis_1 = __importDefault(require("../parseSinopsis"));
const parseDetail_1 = __importDefault(require("../parseDetail"));
const getOtakudesuUrl_1 = __importDefault(require("../../utils/getOtakudesuUrl"));
async function parseAnimeDetail($) {
    const episodeList = [];
    const batch = {};
    const sinopsis = await (0, parseSinopsis_1.default)($, $(".sinopc p"));
    const poster = $("#venkonten .fotoanime img").attr("src");
    const { detail, genres } = (0, parseDetail_1.default)($, $(".infozingle p"));
    const animeElements = $(".episodelist").toArray();
    const getList = (animeElement, tipe) => {
        const listElements = $(animeElement).find("ul li").toArray();
        listElements.forEach((listElement) => {
            const judul = $(listElement).find("a").text();
            const otakudesuUrl = (0, getOtakudesuUrl_1.default)($(listElement).find("a").attr("href"));
            const slug = (0, getSlug_1.default)(otakudesuUrl);
            const href = `/otakudesu/${tipe}/` + slug;
            const tanggalRilis = $(listElement).find(".zeebr").text();
            if (tipe === "episode") {
                episodeList.push({
                    judul,
                    slug,
                    href,
                    otakudesuUrl,
                    tanggalRilis,
                });
            }
            else {
                batch.judul = judul;
                batch.slug = slug;
                batch.href = href;
                batch.otakudesuUrl = otakudesuUrl;
                batch.tanggalRilis = tanggalRilis;
            }
        });
    };
    animeElements.forEach((animeElement, index) => {
        if (index === 0)
            getList(animeElement, "batch");
        if (index === 1)
            getList(animeElement, "episode");
    });
    return {
        ...detail,
        poster,
        genres,
        sinopsis,
        batch,
        episodeList,
    };
}
