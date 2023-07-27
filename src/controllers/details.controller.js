import axios from "axios";
import * as cheerio from "cheerio";
import { BASEURL } from "../helpers/base-url.js";

export const animeDetails = async (slug) => {
   const url = `${BASEURL}/anime/${slug}`;
   const response = await axios.get(url);
   const $ = cheerio.load(response.data);
   const slugPlayer = $(".film-buttons a.btn").attr("href");
   const slugPlayerSplit = slugPlayer
      .slice(28, slugPlayer.length)
      .replace(/\//g, "")
      .split("-");
   const slugPlayerFinal = slugPlayerSplit
      .splice(0, slugPlayerSplit.length - 2)
      .join("-");
   const title = $("h2.film-name.dynamic-name").text().trim();
   const poster = $(".film-poster img").attr("data-src");
   const description = $(".film-description .text").text().replace(/\n/g, " ");
   const episode = $(".film-stats .item").text();
   const episodeSlice = episode.slice(7, episode.length).trim().match(/\d+/g);
   const info = $("#ani_detail .item.item-title:not(.w-hide) .name")
      .append("|")
      .text()
      .split("|");
   const status = $(".anis-content .anisc-info .item.item-title:last:last")
      .text()
      .replace(/\ |\n/g, "")
      .split(":");
   const genres = $("#ani_detail .item.item-list a")
      .append(",")
      .text()
      .split(",");
   const data = {
      statusCode: 200,
      url,
      slugPlayer: slugPlayerFinal,
      title,
      poster,
      description,
      currentTotalEpisodes: ~~episodeSlice[0],
      totalEpisodes: ~~episodeSlice[1] === 0 ? "Unknown" : ~~episodeSlice[1],
      genres: genres.splice(0, genres.length - 1),
      detailsList: [
         {
            subTitle: "Alternative Title",
            title: info[0].trim(),
         },
         {
            subTitle: "Current Total Episodes",
            title: ~~episodeSlice[0],
         },
         {
            subTitle: "Total Episodes",
            title: ~~episodeSlice[1] === 0 ? "Unknown" : ~~episodeSlice[1],
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
