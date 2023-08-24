import axios from "axios";
import * as cheerio from "cheerio";
import { BASEURL } from "../helpers/index.js";

const animeDetails = async (slug) => {
  const url = `${BASEURL}/anime/${slug}`,
    response = await axios.get(url),
    $ = cheerio.load(response.data),
    slugPlayer = $(".film-buttons a.btn").attr("href"),
    slugPlayerSplit = slugPlayer
      .slice(28, slugPlayer.length)
      .replace(/\//g, "")
      .split("-"),
    slugPlayerFinal = slugPlayerSplit
      .splice(0, slugPlayerSplit.length - 2)
      .join("-"),
    title = $("h2.film-name.dynamic-name").text().trim(),
    poster = $(".film-poster img").attr("data-src"),
    description = $(".film-description .text").text().replace(/\n/g, " "),
    episode = $(".film-stats .item:last").text().match(/\d+/g),
    info = $("#ani_detail .item.item-title:not(.w-hide) .name")
      .append("|")
      .text()
      .split("|"),
    status = $(".anis-content .anisc-info .item.item-title:last:last")
      .text()
      .replace(/\ |\n/g, "")
      .split(":"),
    genres = $("#ani_detail .item.item-list a").append(",").text().split(","),
    data = {
      statusCode: 200,
      url: url,
      slugPlayer: slugPlayerFinal,
      title: title,
      poster: poster,
      description: description,
      currentTotalEpisodes: ~~episode[0],
      totalEpisodes: ~~episode[1] || "Unknown",
      genres: genres.splice(0, genres.length - 1),
      detailsList: [
        {
          subTitle: "Alternative Title",
          title: info[0].trim(),
        },
        {
          subTitle: "Current Total Episodes",
          title: ~~episode[0],
        },
        {
          subTitle: "Total Episodes",
          title: ~~episode[1] === 0 ? "Unknown" : ~~episode[1],
        },
        {
          subTitle: "Mal Score",
          title: info[1].trim(),
        },
        {
          subTitle: "Rating",
          title: info[2].trim(),
        },
        {
          subTitle: "Premiered",
          title: info[3],
        },
        {
          subTitle: "Aired",
          title: info[4],
        },
        {
          subTitle: "Type",
          title: info[5],
        },
        {
          subTitle: "Status",
          title: status[status.length - 1],
        },
      ],
    };

  return data;
};

export default animeDetails;
