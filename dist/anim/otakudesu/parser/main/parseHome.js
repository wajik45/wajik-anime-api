"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseHome;
const parseCard_1 = __importDefault(require("../parseCard"));
function parseHome($) {
    const data = {};
    const animeElements = $(".venutama .venz").toArray();
    animeElements.forEach((animeElement, index) => {
        const key = index === 0 ? "onGoing" : "completed";
        const cards = $(animeElement)
            .find("ul li")
            .map((index, cardElement) => {
            const card = (0, parseCard_1.default)($, $(cardElement));
            const judul = card.judul;
            const slug = card.slug;
            const href = "/otakudesu/anime/" + card.slug;
            const poster = card.poster;
            const otakudesuUrl = card.otakudesuUrl;
            if (key === "onGoing") {
                const onGoing = {
                    judul,
                    slug,
                    href,
                    poster,
                    episodeTerbaru: card.episode,
                    hariRilis: card.ratingAtauHari,
                    tanggalRilisTerbaru: card.tanggal,
                    otakudesuUrl,
                };
                return onGoing;
            }
            const completed = {
                judul,
                slug,
                href,
                poster,
                jumlahEpisode: card.episode,
                rating: card.ratingAtauHari,
                tanggalRilisTerakhir: card.tanggal,
                otakudesuUrl,
            };
            return completed;
        })
            .get();
        data[key] = cards;
    });
    return data;
}
