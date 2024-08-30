import type { CheerioAPI } from "cheerio";
import getSlug from "../../../../helpers/getSlug";
import parseSinopsis from "../parseSinopsis";
import parseDetail from "../parseDetail";
import getOtakudesuUrl from "../../utils/getOtakudesuUrl";

export default async function parseAnimeDetail($: CheerioAPI) {
  const episodeList: any[] = [];
  const batch: any = {};
  const sinopsis = await parseSinopsis($, $(".sinopc p"));
  const poster = $("#venkonten .fotoanime img").attr("src");
  const { detail, genres } = parseDetail($, $(".infozingle p"));
  const animeElements = $(".episodelist").toArray();

  const getList = (animeElement: any, tipe: "episode" | "batch") => {
    const listElements = $(animeElement).find("ul li").toArray();

    listElements.forEach((listElement) => {
      const judul = $(listElement).find("a").text();
      const otakudesuUrl = getOtakudesuUrl(
        $(listElement).find("a").attr("href")
      );
      const slug = getSlug(otakudesuUrl);
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
      } else {
        batch.judul = judul;
        batch.slug = slug;
        batch.href = href;
        batch.otakudesuUrl = otakudesuUrl;
        batch.tanggalRilis = tanggalRilis;
      }
    });
  };

  animeElements.forEach((animeElement, index) => {
    if (index === 0) getList(animeElement, "batch");
    if (index === 1) getList(animeElement, "episode");
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
