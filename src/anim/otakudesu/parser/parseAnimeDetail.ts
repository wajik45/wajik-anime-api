import type { CheerioAPI } from "cheerio";
import getSlug from "../../../helpers/getSlug";
import getDetail from "../../../helpers/getDetail";

export default function parseAnimeDetail($: CheerioAPI) {
  const sinopsis: any[] = [];
  const episodeList: any[] = [];
  const batchList: any[] = [];

  const gaskenAdikAdik = (element: any, tipe: "episode" | "batch") => {
    $(element)
      .find("ul li")
      .each((index, element) => {
        const judul = $(element).find("a").text();
        const otakudesuUrl = $(element).find("a").attr("href") || "Unknown";
        const slug = getSlug(otakudesuUrl);
        const tanggalRilis = $(element).find(".zeebr").text();

        if (tipe === "episode") {
          episodeList.push({
            judul,
            slug,
            otakudesuUrl,
            tanggalRilis,
          });
        } else {
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
  const { detail, genres } = getDetail($, ".infozingle p");

  $(".sinopc").each((index, element) => {
    const sinopsisText = $(element).find("p").text();

    sinopsis.push(sinopsisText);
  });

  $(".episodelist").each((index, element) => {
    if (index === 1) gaskenAdikAdik(element, "episode");
    if (index === 2) gaskenAdikAdik(element, "batch");
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
