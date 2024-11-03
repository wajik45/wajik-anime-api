import type { NextFunction, Request, Response } from "express";
import { getPageParam, getQParam } from "@helpers/queryParams";
import OtakudesuParser from "@otakudesu/parsers/OtakudesuParser";
import otakudesuInfo from "@otakudesu/info/otakudesuInfo";
import generatePayload from "@helpers/payload";
import path from "path";

const { baseUrl, baseUrlPath } = otakudesuInfo;
const parser = new OtakudesuParser(baseUrl, baseUrlPath);

const otakudesuController = {
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
      const data = otakudesuInfo;

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

  async getSchedule(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await parser.parseSchedule();

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

  async getAllGenres(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await parser.parseAllGenres();

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getOngoingAnimes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseOngoingAnimes(page);

      res.json(generatePayload(res, { data, pagination }));
    } catch (error) {
      next(error);
    }
  },

  async getCompletedAnimes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseCompletedAnimes(page);

      res.json(generatePayload(res, { data, pagination }));
    } catch (error) {
      next(error);
    }
  },

  async getSearch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const q = getQParam(req);
      const data = await parser.parseSearch(q);

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getGenreAnimes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = getPageParam(req);
      const { genreId } = req.params;
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
      const data = await parser.parseAnimeEpisode(episodeId);

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  async getServerUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { serverId } = req.params;
      const data = await parser.parseServerUrl(serverId);

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
};

export default otakudesuController;
