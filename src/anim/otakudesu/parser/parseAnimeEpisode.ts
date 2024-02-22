import { CheerioAPI } from "cheerio";
import getSlug from "../../../helpers/getSlug";
import getDetail from "../../../helpers/getDetail";

export default function parseAnimeEpisode($: CheerioAPI) {
  const downloadUrl: any = {};

  let episodeSebelumnya = null;
  let episodeSelanjutnya = null;

  const judul = $("#venkonten .posttl").text();

  $(".flir a").each((index, element) => {
    const otakudesuUrl = $(element).attr("href") || "Unknown";

    if (index === 0 && !$(element).text().includes("See All Episodes")) {
      episodeSebelumnya = {
        slug: getSlug(otakudesuUrl),
        otakudesuUrl: otakudesuUrl,
      };
    }

    if (
      (index === 1 && !$(element).text().includes("See All Episodes")) ||
      (index === 2 && !$(element).text().includes("See All Episodes"))
    ) {
      episodeSelanjutnya = {
        slug: getSlug(otakudesuUrl),
        otakudesuUrl: otakudesuUrl,
      };
    }
  });

  const streamingUrl = $(".responsive-embed-stream iframe").attr("src");

  $(".download ul li").each((index, element) => {
    const links: any[] = [];
    const kualitas = $(element).find("strong").text();

    $(element)
      .find("a")
      .each((index, element) => {
        const judul = $(element).text();
        const link = $(element).attr("href");

        links.push({
          judul,
          link,
        });
      });

    downloadUrl["_" + kualitas] = links;
  });

  const { detail, genres } = getDetail($, ".infozingle p");

  return {
    judul,
    streamingUrl,
    episodeSebelumnya,
    episodeSelanjutnya,
    downloadUrl,
    info: {
      ...detail,
      genres,
    },
  };
}
