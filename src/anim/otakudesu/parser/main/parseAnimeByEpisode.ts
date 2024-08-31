import { CheerioAPI } from "cheerio";
import getSlug from "../../../../helpers/getSlug";
import parseDetail from "../parseDetail";
import getOtakudesuUrl from "../../utils/getOtakudesuUrl";

export default async function parseAnimeByEpisode($: CheerioAPI) {
  const downloadUrl: any = {};
  const episodeList: any[] = [];

  let episodeSebelumnya = null;
  let episodeSelanjutnya = null;

  const navigationElements = $(".flir a").toArray();

  navigationElements.forEach((navigationElement, index) => {
    const otakudesuUrl = getOtakudesuUrl($(navigationElement).attr("href"));
    const slug = getSlug(otakudesuUrl);
    const href = "/otakudesu/episode/" + slug;
    const navigationText = $(navigationElement).text();

    if (index === 0 && !navigationText.includes("See All Episodes")) {
      episodeSebelumnya = {
        slug,
        href,
        otakudesuUrl,
      };
    }

    if (
      (index === 1 && !navigationText.includes("See All Episodes")) ||
      (index === 2 && !navigationText.includes("See All Episodes"))
    ) {
      episodeSelanjutnya = {
        slug,
        href,
        otakudesuUrl,
      };
    }
  });

  const judulDownload = {
    _1: $(".subheading h2").first().text(),
    _2: $(".download h4").text(),
  };

  downloadUrl.judul = judulDownload;
  downloadUrl.qualities = [];

  const downloadElements = $(".download ul li").toArray();

  downloadElements.forEach((downloadElement) => {
    const urls: any[] = [];
    const judul = $(downloadElement)
      .find("strong")
      .text()
      .trim()
      .replace(/\ /g, "_");
    const size = $(downloadElement).find("i").text();
    const urlElements = $(downloadElement).find("a").toArray();

    urlElements.forEach(async (urlElement) => {
      const judul = $(urlElement).text();
      const url = $(urlElement).attr("href") || getOtakudesuUrl();

      urls.push({
        judul,
        url,
      });
    });

    downloadUrl.qualities.push({
      judul,
      size,
      urls,
    });
  });

  const episodeElements = $(".keyingpost li").toArray();

  episodeElements.forEach((episodeElement) => {
    const judul = $(episodeElement)
      .find("a")
      .text()
      .trim()
      .replace("Episode", "")
      .trim();
    const otakudesuUrl = getOtakudesuUrl(
      $(episodeElement).find("a").attr("href")
    );
    const slug = getSlug(otakudesuUrl);
    const href = "/otakudesu/episode/" + slug;

    episodeList.push({
      judul,
      slug,
      href,
      otakudesuUrl,
    });
  });

  const judul = $("#venkonten .posttl").text();
  const jamRilis = $("#venkonten .kategoz .fa.fa-clock-o").next().text();
  const defaultStreamingUrl = $(".responsive-embed-stream iframe").attr("src");
  const { detail, genres } = parseDetail($, $(".infozingle p"));

  return {
    judul,
    jamRilis,
    defaultStreamingUrl,
    episodeSebelumnya,
    episodeSelanjutnya,
    downloadUrl,
    info: {
      ...detail,
      genres,
      episodeList,
    },
  };
}
