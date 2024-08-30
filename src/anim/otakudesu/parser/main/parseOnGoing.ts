import type { CheerioAPI } from "cheerio";
import type { IOnGoing } from "../../interfaces/IOtakudesu";
import parseCard from "../parseCard";

export default function parseOnGoing($: CheerioAPI) {
  const data: IOnGoing[] = [];
  const animeElements = $(".venutama ul li").toArray();

  animeElements.forEach((animeElement) => {
    const card = parseCard($, $(animeElement));
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
