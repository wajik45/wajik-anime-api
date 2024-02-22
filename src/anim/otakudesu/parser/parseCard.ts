import type { CheerioAPI } from "cheerio";
import getSlug from "../../../helpers/getSlug";

export default function parseCard($: CheerioAPI, element: any) {
  const episode = $(element)
    .find(".detpost .epz")
    .text()
    .replace("Episode", "")
    .trim();
  const ratingAtauHari = $(element).find(".detpost .epztipe").text().trim();
  const judul = $(element).find(".detpost .thumbz .jdlflm").text();
  const otakudesuUrl =
    $(element).find(".detpost .thumb a").attr("href") || "Unknown";
  const poster =
    $(element).find(".detpost .thumb .thumbz img").attr("src") || "Unknown";
  const slug = getSlug(otakudesuUrl);
  const tanggal = $(element).find(".detpost .newnime").text();

  return {
    judul,
    slug,
    episode,
    ratingAtauHari,
    otakudesuUrl,
    poster,
    tanggal,
  };
}
