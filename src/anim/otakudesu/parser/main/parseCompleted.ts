import type { CheerioAPI } from "cheerio";
import type { ICompleted } from "../../interfaces/IOtakudesu";
import parseCard from "../parseCard";

export default function parseCompleted($: CheerioAPI) {
  const data: ICompleted[] = [];
  const animeElements = $(".venutama ul li").toArray();

  animeElements.forEach((animeElement) => {
    const card = parseCard($, $(animeElement));
    const judul = card.judul;
    const slug = card.slug;
    const href = "/otakudesu/anime/" + card.slug;
    const poster = card.poster;
    const jumlahEpisode = card.episode;
    const rating = card.ratingAtauHari;
    const tanggalRilisTerakhir = card.tanggal;
    const otakudesuUrl = card.otakudesuUrl;

    data.push({
      judul,
      slug,
      href,
      poster,
      jumlahEpisode,
      rating,
      tanggalRilisTerakhir,
      otakudesuUrl,
    });
  });

  return data;
}
