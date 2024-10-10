import type { Request, Response } from "express";
import { responseJSON, responseHTML } from "../../../helpers/responses";
import { getOrderParam, getPageParam, getQParam } from "../../../helpers/queryParams";
import getViewData from "../../../helpers/getViewData";
import SamehadakuParser from "../parsers/Parser";
import samehadakuInfo from "../samehadaku.info";
import path from "path";

const { baseUrl, baseRoute } = samehadakuInfo;
const parser = new SamehadakuParser(baseUrl, baseRoute);

const SamehadakuController = {
  getMainView(req: Request, res: Response): void {
    const getViewPath = (filePath: string) => {
      return path.join(__dirname, "..", "..", "..", "..", "public", "views", filePath);
    };

    try {
      responseHTML.ok(res, getViewPath("anime-source.html"));
    } catch (error) {
      responseHTML.error(res, getViewPath("error.html"), error);
    }
  },

  getMainViewData(req: Request, res: Response): void {
    try {
      const data = getViewData(samehadakuInfo, "samehadakuView");

      responseJSON.ok(res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getHome(req: Request, res: Response): Promise<void> {
    try {
      const data = await parser.parseHome();

      responseJSON.ok(res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAllGenres(req: Request, res: Response): Promise<void> {
    try {
      const data = await parser.parseAllGenres();

      responseJSON.ok(res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAllAnimes(req: Request, res: Response): Promise<void> {
    try {
      const data = await parser.parseAllAnimes();

      responseJSON.ok(res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getSchedule(req: Request, res: Response): Promise<void> {
    try {
      const data = await parser.parseSchedule();

      responseJSON.ok(res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getRecentEpisodes(req: Request, res: Response): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseRecentEpisodes(page);

      responseJSON.ok(res, { data, pagination });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getOngoingAnimes(req: Request, res: Response): Promise<void> {
    try {
      const page = getPageParam(req);
      const order = getOrderParam(req);
      const { data, pagination } = await parser.parseOngoingAnimes(page, order);

      responseJSON.ok(res, { data, pagination });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getCompletedAnimes(req: Request, res: Response): Promise<void> {
    try {
      const page = getPageParam(req);
      const order = getOrderParam(req);
      const { data, pagination } = await parser.parseCompletedAnimes(page, order);

      responseJSON.ok(res, { data, pagination });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getPopularAnimes(req: Request, res: Response): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parsePopularAnimes(page);

      responseJSON.ok(res, { data, pagination });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getMovies(req: Request, res: Response): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseMovies(page);

      responseJSON.ok(res, { data, pagination });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getBatches(req: Request, res: Response): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseBatches(page);

      responseJSON.ok(res, { data, pagination });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getSearch(req: Request, res: Response): Promise<void> {
    try {
      const q = getQParam(req);
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseSearch(q, page);

      responseJSON.ok(res, { data, pagination });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getGenreAnimes(req: Request, res: Response): Promise<void> {
    try {
      const { genreId } = req.params;
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseGenreAnimes(genreId, page);

      responseJSON.ok(res, { data, pagination });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAnimeDetails(req: Request, res: Response): Promise<void> {
    try {
      const { animeId } = req.params;
      const data = await parser.parseAnimeDetails(animeId);

      responseJSON.ok(res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAnimeEpisode(req: Request, res: Response): Promise<void> {
    try {
      const { episodeId } = req.params;
      const data = await parser.parseAnimeEpisode(episodeId);

      responseJSON.ok(res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAnimeServers(req: Request, res: Response): Promise<void> {
    try {
      const { episodeId } = req.params;
      const data = await parser.parseAnimeServers(episodeId);

      responseJSON.ok(res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getServerUrl(req: Request, res: Response): Promise<void> {
    try {
      const { serverId } = req.params;
      const data = await parser.parseServerUrl(serverId);

      responseJSON.ok(res, { data, message: "methods: (GET, POST), biasanya pake ajax bree" });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAnimeBatch(req: Request, res: Response): Promise<void> {
    try {
      const { batchId } = req.params;
      const data = await parser.parseAnimeBatch(batchId);

      responseJSON.ok(res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },
};

export default SamehadakuController;
