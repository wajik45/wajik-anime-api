"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseOnGoing;
const parseCard_1 = __importDefault(require("../parseCard"));
function parseOnGoing($) {
    const data = [];
    const animeElements = $(".venutama ul li").toArray();
    animeElements.forEach((animeElement) => {
        const card = (0, parseCard_1.default)($, $(animeElement));
        const judul = card.judul;
        const slug = card.slug;
        const href = "/otakudesu/anime/" + card.slug;
        const poster = card.poster;
        const episodeTerbaru = card.episode;
        const hariRilis = card.ratingAtauHari;
        const tanggalRilisTerbaru = card.tanggal;
        const otakudesuUrl = card.otakudesuUrl;
        data.push({
            judul,
            slug,
            href,
            poster,
            episodeTerbaru,
            hariRilis,
            tanggalRilisTerbaru,
            otakudesuUrl,
        });
    });
    return data;
}
