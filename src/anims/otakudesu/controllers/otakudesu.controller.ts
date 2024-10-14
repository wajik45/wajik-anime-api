import type { Request, Response } from "express";
import { responseJSON, responseHTML } from "../../../helpers/responses";
import { getPageParam, getQParam } from "../../../helpers/queryParams";
import path from "path";
import otakudesuInfo from "../otakudesu.info";
import OtakudesuParser from "../parsers/Parser";

const { baseUrl, baseRoute } = otakudesuInfo;
const parser = new OtakudesuParser(baseUrl, baseRoute);

const OtakudesuController = {
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
      const data = otakudesuInfo;

      responseJSON.ok(req, res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getHome(req: Request, res: Response): Promise<void> {
    try {
      const data = await parser.parseHome();

      responseJSON.ok(req, res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getSchedule(req: Request, res: Response): Promise<void> {
    try {
      const data = await parser.parseSchedule();

      responseJSON.ok(req, res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAllAnimes(req: Request, res: Response): Promise<void> {
    try {
      const data = await parser.parseAllAnimes();

      responseJSON.ok(req, res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAllGenres(req: Request, res: Response): Promise<void> {
    try {
      const data = await parser.parseAllGenres();

      responseJSON.ok(req, res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getOngoingAnimes(req: Request, res: Response): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseOngoingAnimes(page);

      responseJSON.ok(req, res, { data, pagination });
    } catch (error: any) {
      responseJSON.error(res, error);
    }
  },

  async getCompletedAnimes(req: Request, res: Response): Promise<void> {
    try {
      const page = getPageParam(req);
      const { data, pagination } = await parser.parseCompletedAnimes(page);

      responseJSON.ok(req, res, { data, pagination });
    } catch (error: any) {
      responseJSON.error(res, error);
    }
  },

  async getSearch(req: Request, res: Response): Promise<void> {
    try {
      const q = getQParam(req);
      const data = await parser.parseSearch(q);

      responseJSON.ok(req, res, { data });
    } catch (error: any) {
      responseJSON.error(res, error);
    }
  },

  async getGenreAnimes(req: Request, res: Response): Promise<void> {
    try {
      const page = getPageParam(req);
      const { genreId } = req.params;
      const { data, pagination } = await parser.parseGenreAnimes(genreId, page);

      responseJSON.ok(req, res, { data, pagination });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAnimeDetails(req: Request, res: Response): Promise<void> {
    try {
      const { animeId } = req.params;
      const data = await parser.parseAnimeDetails(animeId);

      responseJSON.ok(req, res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAnimeEpisode(req: Request, res: Response): Promise<void> {
    try {
      const { episodeId } = req.params;
      const data = await parser.parseAnimeEpisode(episodeId);

      responseJSON.ok(req, res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAnimeServers(req: Request, res: Response): Promise<void> {
    try {
      const { episodeId } = req.params;
      const data = await parser.parseAnimeServers(episodeId);

      responseJSON.ok(req, res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getServerUrl(req: Request, res: Response): Promise<void> {
    try {
      const { serverId } = req.params;
      const data = await parser.parseServerUrl(serverId);

      responseJSON.ok(req, res, { data, message: "methods: (GET, POST), biasanya pake ajax bree" });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  async getAnimeBatch(req: Request, res: Response): Promise<void> {
    try {
      const { batchId } = req.params;
      const data = await parser.parseAnimeBatch(batchId);

      responseJSON.ok(req, res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },
};

export default OtakudesuController;
