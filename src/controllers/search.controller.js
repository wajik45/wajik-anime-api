import axios from "axios";
import * as cheerio from "cheerio";
import { BASEURL } from "../helpers/base-url.js";

export const search = async (query, page = 1) => {
   const response = await axios.get(`${BASEURL}/page/${page}?s=${query}`);
   const $ = cheerio.load(response.data);
   const maxPage = $(".pagin .page-numbers:not(.prev,.next,.dots):last")
      .text()
      .replace(/,| /g, "");
   const list = [];
   $(".tab-content .flw-item").each((i, el) => {
      const url = $(el).find("a.film-poster-ahref").attr("href");
      const slug = url.split("/")[url.split("/").length - 2];
      const title = $(el).find("h3.film-name a").text();
      const poster = $(el).find(".film-poster img").attr("data-src");
      const star = $(el).find(".tick.ltr div").text().trim();
      const type = $(el).find(".tick.rtl div").text().trim();
      list.push({
         url,
         slug,
         title,
         poster,
         star,
         type,
      });
   });
   const data = {
      statusCode: 200,
      currentPage: ~~page,
      maxPage: ~~maxPage === 0 ? 1 : ~~maxPage,
      list: list,
   };
   return data;
};
