import type { CheerioAPI } from "cheerio";
import type { ICompleted, IOnGoing } from "../../interfaces/IOtakudesu";
import parseCard from "../parseCard";

export default function parseHome($: CheerioAPI) {
  const data: any = {};
  const animeElements = $(".venutama .venz").toArray();

  animeElements.forEach((animeElement, index) => {
    const key = index === 0 ? "onGoing" : "completed";
    const cards = $(animeElement)
      .find("ul li")
      .map((index, cardElement) => {
        const card = parseCard($, $(cardElement));
        const judul = card.judul;
        const slug = card.slug;
        const href = "/otakudesu/anime/" + card.slug;
        const poster = card.poster;
        const otakudesuUrl = card.otakudesuUrl;

        if (key === "onGoing") {
          const onGoing: IOnGoing = {
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

        const completed: ICompleted = {
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
