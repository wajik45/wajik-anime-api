import type { CheerioAPI, Cheerio, Element } from "cheerio";
import getFinalUrl from "../../../helpers/getFinalUrl";
import getSlug from "../../../helpers/getSlug";
import getOtakudesuUrl from "../utils/getOtakudesuUrl";

export default async function parseSinopsis(
  $: CheerioAPI,
  cheerioElement: Cheerio<Element>
) {
  const sinopsis: any = {
    paragraphs: [],
    connections: [],
  };
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

          try {
            let originalUrl: string;

            if (otakudesuUrl.includes("otakudesu")) {
              const query = getSlug(otakudesuUrl);

              originalUrl = await getFinalUrl(
                getOtakudesuUrl() + "?p=" + query,
                { useCache: true }
              );
            } else {
              let originalUrl1 = await getFinalUrl(otakudesuUrl, {
                useCache: true,
              });

              if (!originalUrl1.includes(getOtakudesuUrl())) {
                const query = getSlug(originalUrl1);

                originalUrl1 = getOtakudesuUrl() + query;
              }

              const originalUrl2 = await getFinalUrl(originalUrl1, {
                useCache: true,
              });

              originalUrl = originalUrl2;
            }

            const slug = getSlug(originalUrl);
            const href = "/otakudesu/anime/" + slug;

            sinopsis.connections.push({
              judul,
              slug,
              href,
              otakudesuUrl: originalUrl,
            });
          } catch (error: any) {
            console.log(error.message);
          }
        }
      }
    }
  }

  return sinopsis;
}
