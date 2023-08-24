import axios from "axios";
import * as cheerio from "cheerio";
import { BASEURL } from "../helpers/index.js";

const streamingAnime = async (slug, eps) => {
  const episode =
      eps > 9999
        ? `00${eps}`.slice(-5)
        : eps > 999
        ? `00${eps}`.slice(-4)
        : `00${eps}`.slice(-3),
    url = `${BASEURL}/episode/${slug}-episode-${episode}`,
    response = await axios.get(url),
    $ = cheerio.load(response.data),
    title = $(".anis-watch-detail h2.film-name a").text(),
    description = $(".anis-watch-detail .film-description .text").text(),
    poster = $(".anis-watch-detail .anisc-poster .film-poster img").attr(
      "data-src"
    ),
    currentEpisodes = eps,
    currentTotalEpisodes = $(
      ".detail-infor-content #episodes-page-1 a.ssl-item.ep-item:first"
    )
      .text()
      .replace(/ |\n|\t/g, ""),
    item = $(".anis-watch-detail .film-stats .item")
      .append(",")
      .text()
      .split(","),
    videoPlayer = [],
    downloadLink = [];

  $(".player-servers:not(.download-servers) .ps_-block .ps__-list .item").each(
    (i, el) => {
      videoPlayer.push({
        url: $(el).find("a").attr("href") + "&autoplay=true",
        quality: $(el)
          .find("a")
          .text()
          .slice(-7)
          .trim()
          .replace(/[&\/\\#,+()$~%.'":*?<>{}!’]/g, ""),
        server: $(el)
          .find("a")
          .text()
          .slice(0, $(el).find("a").length - 8)
          .replaceAll(" ", ""),
      });
    }
  );

  $(
    ".player-servers.download-servers .ps_-block.ps_-block-sub.servers-mixed .ps__-list .item"
  ).each((i, el) => {
    downloadLink.push({
      url: $(el).find("a.btn").attr("href"),
      quality: $(el)
        .find("a")
        .text()
        .slice(-7)
        .trim()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}!’]/g, ""),
      server: $(el)
        .find("a.btn")
        .text()
        .slice(0, $(el).find("a.btn").length - 8),
    });
  });

  const data = {
    statusCode: 200,
    url,
    title,
    description,
    poster,
    currentEpisodes: ~~currentEpisodes,
    currentTotalEpisodes: ~~currentTotalEpisodes,
    status: item[0],
    year: ~~item[1],
    type: item[2],
    videoPlayer,
    downloadLink,
  };

  return data;
};

export default streamingAnime;
