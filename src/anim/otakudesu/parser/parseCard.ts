import type { CheerioAPI, Cheerio, Element } from "cheerio";
import getSlug from "../../../helpers/getSlug";
import getOtakudesuUrl from "../utils/getOtakudesuUrl";

export default function parseCard(
  $: CheerioAPI,
  cheerioElement: Cheerio<Element>
) {
  const episode = cheerioElement
    .find(".detpost .epz")
    .text()
    .replace("Episode", "")
    .trim();
  const ratingAtauHari = cheerioElement.find(".detpost .epztipe").text().trim();
  const judul = cheerioElement.find(".detpost .thumbz .jdlflm").text();
  const otakudesuUrl = getOtakudesuUrl(
    cheerioElement.find(".detpost .thumb a").attr("href")
  );
  const poster =
    cheerioElement.find(".detpost .thumb .thumbz img").attr("src") || "";
  const slug = getSlug(otakudesuUrl);
  const tanggal = cheerioElement.find(".detpost .newnime").text();

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
