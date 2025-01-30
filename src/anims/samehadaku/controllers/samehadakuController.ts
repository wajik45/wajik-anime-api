import type { NextFunction, Request, Response } from "express";
import { getOrderParam, getPageParam, getQParam, getUrlParam } from "@helpers/queryParams";
import SamehadakuParser from "@samehadaku/parsers/SamehadakuParser";
import samehadakuInfo from "@samehadaku/info/samehadakuInfo";
import generatePayload from "@helpers/payload";
import path from "path";

const { baseUrl, baseUrlPath } = samehadakuInfo;
const parser = new SamehadakuParser(baseUrl, baseUrlPath);

const samehadakuController = {
  getMainView(req: Request, res: Response, next: NextFunction): void {
    try {
      const getViewFile = (filePath: string) => {
        return path.join(__dirname, "..", "..", "..", "public", "views", filePath);
      };

      res.sendFile(getViewFile("anime-source.html"));
    } catch (error) {
      next(error);
    }
  },

  getMainViewData(req: Request, res: Response, next: NextFunction): void {
    try {
      const data = samehadakuInfo;

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getHome(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await parser.parseHome();

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getAllGenres(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await parser.parseAllGenres();

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getAllAnimes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await parser.parseAllAnimes();

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getSchedule(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await parser.parseSchedule();

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getRecentEpisodes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseRecentAnime(page);

      res.json(generatePayload(res, { data, pagination }));
    } catch (error) {
      next(error);
    }
  },

  async getOngoingAnimes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = getPageParam(req);
      const order = getOrderParam(req);
      const { data, pagination } = await parser.parseOngoingAnimes(page, order);

      res.json(generatePayload(res, { data, pagination }));
    } catch (error) {
      next(error);
    }
  },

  async getCompletedAnimes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = getPageParam(req);
      const order = getOrderParam(req);
      const { data, pagination } = await parser.parseCompletedAnimes(page, order);

      res.json(generatePayload(res, { data, pagination }));
    } catch (error) {
      next(error);
    }
  },

  async getPopularAnimes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parsePopularAnimes(page);

      res.json(generatePayload(res, { data, pagination }));
    } catch (error) {
      next(error);
    }
  },

  async getMovies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseMovies(page);

      res.json(generatePayload(res, { data, pagination }));
    } catch (error) {
      next(error);
    }
  },

  async getBatches(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseBatches(page);

      res.json(generatePayload(res, { data, pagination }));
    } catch (error) {
      next(error);
    }
  },

  async getSearch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const q = getQParam(req);
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseSearch(q, page);

      res.json(generatePayload(res, { data, pagination }));
    } catch (error) {
      next(error);
    }
  },

  async getGenreAnimes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { genreId } = req.params;
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseGenreAnimes(genreId, page);

      res.json(generatePayload(res, { data, pagination }));
    } catch (error) {
      next(error);
    }
  },

  async getAnimeDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { animeId } = req.params;
      const data = await parser.parseAnimeDetails(animeId);

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getAnimeEpisode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { episodeId } = req.params;
      const originUrl = `${req.headers["x-forwarded-proto"] || req.protocol}://${req.get("host")}`;
      const data = await parser.parseAnimeEpisode(episodeId, originUrl);

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getServerUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { serverId } = req.params;
      const originUrl = `${req.headers["x-forwarded-proto"] || req.protocol}://${req.get("host")}`;
      const data = await parser.parseServerUrl(serverId, originUrl);

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getAnimeBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { batchId } = req.params;
      const data = await parser.parseAnimeBatch(batchId);

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getWibuFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const url = getUrlParam(req);
      const wibuFile = await parser.parseWibuFile(url);

      res.send(wibuFile);
    } catch (error) {
      next(error);
    }
  },
};

export default samehadakuController;
