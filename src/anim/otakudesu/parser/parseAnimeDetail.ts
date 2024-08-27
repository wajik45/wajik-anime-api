import type { CheerioAPI } from "cheerio";
import getSlug from "../../../helpers/getSlug";
import getDetail from "../utils/getDetail";

export default function parseAnimeDetail($: CheerioAPI) {
  const sinopsis: any = {
    paragraphs: [],
    connections: [],
  };
  const episodeList: any[] = [];
  const batch: any = {};

  const gaskenAdikAdik = (element: any, tipe: "episode" | "batch") => {
    $(element)
      .find("ul li")
      .each((index, element) => {
        const judul = $(element).find("a").text();
        const otakudesuUrl = $(element).find("a").attr("href") || "Unknown";
        const slug = getSlug(otakudesuUrl);
        const href = `/otakudesu/${tipe}/` + slug;
        const tanggalRilis = $(element).find(".zeebr").text();

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

  const poster = $("#venkonten .fotoanime img").attr("src");
  const { detail, genres } = getDetail($, ".infozingle p");

  $(".sinopc p").each((index, element) => {
    if ($(element).text()) {
      if ($(element).find("a").length === 0) {
        const sinopsisText = $(element).text();

        sinopsis.paragraphs.push(sinopsisText);
      } else {
        $(element)
          .find("a")
          .each((index, element) => {
            const judul = $(element).text();
            const otakudesuUrl = $(element).attr("href") || "Unknown";
            const slug = getSlug(otakudesuUrl);
            const href = "/otakudesu/anime/" + slug;

            sinopsis.connections.push({
              judul,
              otakudesuUrl,
              slug,
              href,
            });
          });
      }
    }
  });

  $(".episodelist").each((index, element) => {
    if (index === 0) gaskenAdikAdik(element, "batch");
    if (index === 1) gaskenAdikAdik(element, "episode");
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
