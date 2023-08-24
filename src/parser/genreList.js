import axios from "axios";
import * as cheerio from "cheerio";
import { BASEURL } from "../helpers/index.js";

const genreList = async () => {
  const response = await axios.get(`${BASEURL}/home`);
  const $ = cheerio.load(response.data);
  const list = [];

  $(".cbox ul li.nav-item").each((i, el) => {
    const url = $(el).find("a").attr("href");
    const slug = url.slice(26, url.length).replace(/\//g, "");
    const title = $(el).find("a").text();
    list.push({
      url,
      slug,
      title,
    });
  });

  const listFilter = list.filter((item) => {
    return (
      item.title !== "Ai" &&
      item.title !== "Boys Love" &&
      item.title !== "Yaoi" &&
      item.title !== "Gender Bender" &&
      item.title !== "Shounen Ai"
    );
  });

  const data = {
    statusCode: 200,
    list: listFilter,
  };

  return data;
};

export default genreList;
