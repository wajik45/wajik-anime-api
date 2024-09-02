import type { CheerioAPI, Cheerio, Element } from "cheerio";
import getFinalUrl from "../../../helpers/getFinalUrl";
import getSlug from "../../../helpers/getSlug";
import getOtakudesuUrl from "../utils/getOtakudesuUrl";
import getFinalUrls from "../../../helpers/getFinalUrls";

export default async function parseSinopsis(
  $: CheerioAPI,
  cheerioElement: Cheerio<Element>
) {
  const sinopsis: any = {
    paragraphs: [],
    connections: [],
  };
  const otakudesuUrls: string[] = [];
  const animeElements = cheerioElement.toArray();

  for (let i = 0; i < animeElements.length; i++) {
    const animeElement = animeElements[i];

    if ($(animeElement).text()) {
      if ($(animeElement).find("a").toArray().length === 0) {
        const sinopsisText = $(animeElement).text();

        sinopsis.paragraphs.push(sinopsisText);
      } else {
        const connectionElements = $(animeElement).find("a").toArray();

        for (let j = 0; j < connectionElements.length; j++) {
          const connectionElement = connectionElements[j];
          const judul = $(connectionElement).text();
          const otakudesuUrl =
            $(connectionElement).attr("href") || getOtakudesuUrl();

          sinopsis.connections.push({
            judul,
          });

          if (otakudesuUrl.includes("://otakudesu")) {
            const query = getSlug(otakudesuUrl);

            otakudesuUrls.push(getOtakudesuUrl() + "?p=" + query);
          } else {
            const originalUrl = await getFinalUrl(otakudesuUrl, {
              useCache: true,
            });

            if (originalUrl.includes("?p=")) {
              if (!originalUrl.includes(getOtakudesuUrl())) {
                const query = getSlug(originalUrl);

                otakudesuUrls.push(getOtakudesuUrl() + query);
              } else {
                otakudesuUrls.push(originalUrl);
              }
            }
          }
        }

        const originalUrls = await getFinalUrls(
          otakudesuUrls,
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
        const finalConnections: any[] = [];

        for (let k = 0; k < originalUrls.length; k++) {
          const judul = sinopsis.connections[k].judul;
          const originalUrl = originalUrls[k];
          const slug = getSlug(originalUrl);
          const href = "/otakudesu/anime/" + slug;

          finalConnections.push({
            judul,
            slug,
            href,
            originalUrl,
          });
        }

        sinopsis.connections = finalConnections;
      }
    }
  }

  return sinopsis;
}
