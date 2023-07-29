import * as parser from "../parser/index.js";
import { BASEURL, errorHandler } from "../helpers/index.js";

export const wajikAnimeApi = (req, res) => {
  return res.json({
    source: BASEURL,
    author: "wajik45",
    message: "Ngopiiii.. ☕",
    alert: "kemungkinan masih ada bug",
    routes: {
      home: "/home",
      anime: "/anime",
      movie: "/movie",
      ongoing: "/ongoing",
      complete: "/complete",
      genreList: "/genre",
      genre: "/genre/:slug",
      search: "/search?query",
      animeDetails: "/anime/:slug",
      streamingAnime: "/anime/:slug/:episode",
      streamingMovie: "/movie/:slug",
      more: "https://github.com/wajik45/wajik-anime-api",
    },
  });
};
export const getHome = async (req, res) => {
  const { page } = req.query;
  try {
    const data = await parser.mainPage("/home/page/", page);
    res.status(200).json(data);
  } catch (error) {
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
export const getAnime = async (req, res) => {
  const { page } = req.query;
  try {
    const data = await parser.mainPage("/anime/page/", page);
    res.status(200).json(data);
  } catch (error) {
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
export const getMovie = async (req, res) => {
  const { page } = req.query;
  try {
    const data = await parser.mainPage("/movie/page/", page);
    res.status(200).json(data);
  } catch (error) {
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
export const getOnGoing = async (req, res) => {
  const { page } = req.query;
  try {
    const data = await parser.mainPage("/tag/ongoing/page/", page);
    res.status(200).json(data);
  } catch (error) {
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
export const getComplete = async (req, res) => {
  const { page } = req.query;
  try {
    const data = await parser.mainPage("/tag/ended/page/", page);
    res.status(200).json(data);
  } catch (error) {
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
export const getGenre = async (req, res) => {
  try {
    const data = await parser.genreList();
    res.status(200).json(data);
  } catch (error) {
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
export const getGenreBySlug = async (req, res) => {
  const { page } = req.query;
  const { slug } = req.params;
  try {
    const data = await parser.mainPage(`/genre/${slug}/page/`, page);
    res.status(200).json(data);
  } catch (error) {
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
export const getSearch = async (req, res) => {
  const { query } = req.query;
  const { page } = req.query;
  try {
    const data = await parser.search(query, page);
    if (data.list.length < 1) throw new Error("Anime not found");
    res.status(200).json(data);
  } catch (error) {
    if (error.message.includes("Anime")) {
      return res.status(404).json({
        statusCode: 404,
        message: error.message,
      });
    }
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
export const getAnimeDetails = async (req, res) => {
  const { slug } = req.params;
  try {
    const data = await parser.animeDetails(slug);
    res.status(200).json(data);
  } catch (error) {
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
export const getStreamingAnime = async (req, res) => {
  const { slug, episode } = req.params;
  try {
    const data = await parser.streamingAnime(slug, episode);
    res.status(200).json(data);
  } catch (error) {
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
export const getStreamingMovie = async (req, res) => {
  const { slug } = req.params;
  try {
    const data = await parser.streamingMovie(slug);
    res.status(200).json(data);
  } catch (error) {
    const err = errorHandler(error);
    res.status(500).json(err);
  }
};
