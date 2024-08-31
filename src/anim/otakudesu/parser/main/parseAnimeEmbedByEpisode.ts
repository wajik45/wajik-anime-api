import type { CheerioAPI } from "cheerio";
import getFinalUrl from "../../../../helpers/getFinalUrl";
import getOtakudesuUrl from "../../utils/getOtakudesuUrl";

export default async function parseAnimeEmbedByEpisode($: CheerioAPI) {
  const embedList = [];
  const embedElements = $(".download ul li").toArray();

  for (let i = 0; i < embedElements.length; i++) {
    const embedElement = embedElements[i];
    const urls = [];
    const judul = $(embedElement)
      .find("strong")
      .text()
      .trim()
      .replace(/\ /g, "_");
    const size = $(embedElement).find("i").text();
    const urlElements = $(embedElement).find("a").toArray();

    for (let j = 0; j < urlElements.length; j++) {
      const urlElement = urlElements[j];
      const judul = $(urlElement).text();
      const url = $(urlElement).attr("href") || getOtakudesuUrl();

      let originalUrl = await getFinalUrl(url, {
        useCache: true,
      });

      if (originalUrl.includes("://pixeldrain")) {
        originalUrl = originalUrl + "?embed";
      } else if (originalUrl.includes("://krakenfiles")) {
        originalUrl = originalUrl
          .replace("/view", "/embed-video")
          .replace("file.html", "");
      } else if (originalUrl.includes("://mega")) {
        originalUrl = originalUrl.replace("/file", "/embed");
      } else if (originalUrl.includes("://acefile")) {
        const originalUrlArr = originalUrl
          .split("/")
          .filter((url) => url !== "");

        let idIndex = 0;

        originalUrlArr.forEach((url, index) => {
          if (url === "f") {
            idIndex = index;
          }
        });

        const id = originalUrlArr[idIndex + 1];

        originalUrl = `${originalUrlArr[0]}//${originalUrlArr[1]}/player/${id}`;
      } else {
        originalUrl = "";
      }

      if (originalUrl) {
        urls.push({
          judul,
          url: originalUrl,
        });
      }
    }

    embedList.push({
      judul,
      size,
      urls,
    });
  }

  return embedList;
}
