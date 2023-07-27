import express from "express";
import cors from "cors";
import {
   animeDetails,
   genreList,
   mainPage,
   search,
   streamingAnime,
   streamingMovie,
} from "./controllers/index.js";
import { BASEURL, errorHandler, PORT } from "./helpers/index.js";

const app = express();
app.use(cors());
app.get("/", (req, res) => {
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
         animeDetail: "/anime/:slug",
         streamingAnime: "/anime/:slug/:episode",
         streamingMovie: "/movie/:slug",
         more: "https://github.com/wajik45/wajik-anime-api",
      },
   });
});
app.get("/home", async (req, res) => {
   const { page } = req.query;
   try {
      const data = await mainPage("/home/page/", page);
      res.status(200).json(data);
   } catch (error) {
      const err = errorHandler(error);
      res.status(500).json(err);
   }
});
app.get("/anime", async (req, res) => {
   const { page } = req.query;
   try {
      const data = await mainPage("/anime/page/", page);
      res.status(200).json(data);
   } catch (error) {
      const err = errorHandler(error);
      res.status(500).json(err);
   }
});
app.get("/movie", async (req, res) => {
   const { page } = req.query;
   try {
      const data = await mainPage("/movie/page/", page);
      res.status(200).json(data);
   } catch (error) {
      const err = errorHandler(error);
      res.status(500).json(err);
   }
});
app.get("/ongoing", async (req, res) => {
   const { page } = req.query;
   try {
      const data = await mainPage("/tag/ongoing/page/", page);
      res.status(200).json(data);
   } catch (error) {
      const err = errorHandler(error);
      res.status(500).json(err);
   }
});
app.get("/complete", async (req, res) => {
   const { page } = req.query;
   try {
      const data = await mainPage("/tag/ended/page/", page);
      res.status(200).json(data);
   } catch (error) {
      const err = errorHandler(error);
      res.status(500).json(err);
   }
});
app.get("/genre", async (req, res) => {
   try {
      const data = await genreList();
      res.status(200).json(data);
   } catch (error) {
      const err = errorHandler(error);
      res.status(500).json(err);
   }
});
app.get("/genre/:slug", async (req, res) => {
   const { page } = req.query;
   const { slug } = req.params;
   try {
      const data = await mainPage(`/genre/${slug}/page/`, page);
      res.status(200).json(data);
   } catch (error) {
      const err = errorHandler(error);
      res.status(500).json(err);
   }
});
app.get("/search", async (req, res) => {
   const { query } = req.query;
   const { page } = req.query;
   try {
      const data = await search(query, page);
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
});
app.get("/anime/:slug", async (req, res) => {
   const { slug } = req.params;
   try {
      const data = await animeDetails(slug);
      res.status(200).json(data);
   } catch (error) {
      const err = errorHandler(error);
      res.status(500).json(err);
   }
});
app.get("/anime/:slug/:episode", async (req, res) => {
   const { slug, episode } = req.params;
   try {
      const data = await streamingAnime(slug, episode);
      res.status(200).json(data);
   } catch (error) {
      const err = errorHandler(error);
      res.status(500).json(err);
   }
});
app.get("/movie/:slug", async (req, res) => {
   const { slug } = req.params;
   try {
      const data = await streamingMovie(slug);
      res.status(200).json(data);
   } catch (error) {
      const err = errorHandler(error);
      res.status(500).json(err);
   }
});
app.listen(PORT, () => {
   console.log(`Server berjalan di http://localhost:${PORT}`);
});
