import type { CheerioAPI } from "cheerio";
import getOtakudesuUrl from "../../utils/getOtakudesuUrl";
import getFinalUrls from "../../../../helpers/getFinalUrls";
import getSlug from "../../../../helpers/getSlug";

export default async function parseAnimeEmbedByEpisode($: CheerioAPI) {
  const embedList = [];
  const embedElements = $(".download ul li").toArray();
  const mirrors = ["pdrain", "kfiles", "acefile", "vidhide", "mega", "megaup"];

  for (let i = 0; i < embedElements.length; i++) {
    const embedElement = embedElements[i];
    const urls: any[] = [];
    const urlsOnly: string[] = [];
    const judul = $(embedElement)
      .find("strong")
      .text()
      .trim()
      .replace(/\ /g, "_");
    const size = $(embedElement).find("i").text();
    const urlElements = $(embedElement).find("a").toArray();

    for (let j = 0; j < urlElements.length; j++) {
      const urlElement = urlElements[j];
      const judul = $(urlElement).text().trim();
      const url = $(urlElement).attr("href") || getOtakudesuUrl();

      if (mirrors.includes(judul.toLowerCase())) {
        urlsOnly.push(url);

        urls.push({
          judul,
        });
      }
    }

    const originalUrls = await getFinalUrls(
      urlsOnly,
      {
        useCache: true,
      },
      {
        timeout: 10000,
      },
      {
        delay: 100,
        retries: 2,
      }
    );
    const finalUrls: any[] = [];

    for (let k = 0; k < originalUrls.length; k++) {
      const judul = urls[k].judul;
      const originalUrl = originalUrls[k];
      const getEmbedUrl = (originalUrl: string) => {
        const lowerJudul = judul.toLowerCase();

        switch (lowerJudul) {
          case "pdrain":
            return originalUrl + "?embed";
          case "kfiles":
            return originalUrl
              .replace("/view", "/embed-video")
              .replace("file.html", "");
          case "acefile":
            const originalUrlArr = originalUrl
              .split("/")
              .filter((url: string) => url !== "");

            let idIndex = 0;

            originalUrlArr.forEach((url: string, index: number) => {
              if (url === "f") {
                idIndex = index;
              }
            });

            const id = originalUrlArr[idIndex + 1];

            return `${originalUrlArr[0]}//${originalUrlArr[1]}/player/${id}`;
          case "vidhide":
            return (
              "https://vidhidepro.com/embed/" +
              getSlug(originalUrl).replace("?id=", "")
            );
          case "mega":
            return originalUrl.replace("/file", "/embed");
          case "megaup":
            return originalUrl;
          default:
            return "";
        }
      };
      const embedUrl = getEmbedUrl(originalUrl);

      finalUrls.push({
        judul,
        url: embedUrl,
      });
    }

    embedList.push({
      judul,
      size,
      urls: finalUrls,
    });
  }

  return embedList;
}
