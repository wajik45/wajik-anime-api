import type { Request, Response } from "express";
import { load } from "cheerio";
import getHtmlData from "../../../helpers/getHtmlData";
import setPayload from "../../../helpers/setPayload";
import parsePagination from "../parser/main/parsePagination";
import parseAnimeList from "../parser/main/parseAnimeList";
import parseJadwalRilis from "../parser/main/parseJadwalRilis";
import parseGenreList from "../parser/main/parseGenreList";
import parseAnimeDetail from "../parser/main/parseAnimeDetail";
import parseAnimeBatch from "../parser/main/parseAnimeBatch";
import parseHome from "../parser/main/parseHome";
import parseCompleted from "../parser/main/parseCompleted";
import parseOnGoing from "../parser/main/parseOnGoing";
import parseSearch from "../parser/main/parseSearch";
import parseAnimeListByGenre from "../parser/main/parseAnimeListByGenre.ts";
import parseAnimeByEpisode from "../parser/main/parseAnimeByEpisode";
import getOtakudesuUrl from "../utils/getOtakudesuUrl";

const otakudesuUrl = getOtakudesuUrl();

const OtakudesuController = {
  getMessage(req: Request, res: Response) {
    res.status(200).json({
      message: "OTAKUDESU IS READY 🍌💦, MOHON IJIN BANG OTAKUDESU🙏🙏🙏",
      otakudesuUrl: otakudesuUrl,
      method: "GET semua ya broo",
      routes: {
        home: {
          route: "/otakudesu/home",
        },
        jadwalRilis: {
          route: "/otakudesu/jadwal",
        },
        animeList: {
          route: "/otakudesu/anime",
        },
        genreList: {
          route: "/otakudesu/genres",
        },
        ongoing: {
          route: "/otakudesu/ongoing",
          parameters: {
            queryParam: {
              parameter: "?page",
              value: "number | string",
              defaultValue: 1,
            },
          },
        },
        completed: {
          route: "/otakudesu/completed",
          parameters: {
            queryParam: {
              parameter: "?page",
              value: "number | string",
              defaultValue: 1,
            },
          },
        },
        search: {
          route: "/otakudesu/search",
          parameters: {
            queryParam: {
              parameter: "?q",
              value: "string & required",
              defaultValue: undefined,
            },
          },
        },
        animeByGenre: {
          route: "/otakudesu/genres/:slug",
          parameters: {
            routeParam: {
              parameter: ":slug",
              value: "string & required",
              message: "dapatkan slug di route /genres",
            },
            queryParam: {
              parameter: "?page",
              value: "number | string",
              defaultValue: 1,
            },
          },
        },
        animeDetail: {
          route: "/otakudesu/anime/:slug",
          parameters: {
            routeParam: {
              parameter: ":slug",
              value: "string & required",
              message:
                "dapatkan slug dari route /home /jadwal /anime /ongoing /completed /search /genres/:slug",
            },
          },
        },
        animeEpisode: {
          route: "/otakudesu/episode/:slug",
          parameters: {
            routeParam: {
              parameter: ":slug",
              value: "string & required",
              message: "dapatkan slug dari route /anime/:slug",
            },
          },
        },
        animeBatch: {
          route: "/otakudesu/batch/:slug",
          parameters: {
            routeParam: {
              parameter: ":slug",
              value: "string & required",
              message: "dapatkan slug dari route /anime/:slug",
            },
          },
        },
      },
    });
  },

  async getHome(req: Request, res: Response) {
    try {
      const htmlData = await getHtmlData(otakudesuUrl);
      const $ = load(htmlData);
      const data = parseHome($);

      if (Object.values(data).length === 0) {
        return res.status(404).json(setPayload(res));
      }

      res.status(200).json(
        setPayload(res, {
          data: data,
        })
      );
    } catch (error) {
      res.status(500).json(setPayload(res));
    }
  },

  async getCompleted(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const route = `/complete-anime/page/${page}`;

    try {
      const htmlData = await getHtmlData(otakudesuUrl + route);
      const $ = load(htmlData);
      const data = parseCompleted($);
      const pagination = parsePagination($);

      if (data.length === 0) {
        return res.status(404).json(setPayload(res));
      }

      res.status(200).json(
        setPayload(res, {
          data: data,
          pagination,
        })
      );
    } catch (error: any) {
      res.status(500).json(setPayload(res));
    }
  },

  async getOnGoing(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const route = `/ongoing-anime/page/${page}`;

    try {
      const htmlData = await getHtmlData(otakudesuUrl + route);
      const $ = load(htmlData);
      const data = parseOnGoing($);
      const pagination = parsePagination($);

      if (data.length === 0) {
        return res.status(404).json(setPayload(res));
      }

      res.status(200).json(
        setPayload(res, {
          data: data,
          pagination,
        })
      );
    } catch (error: any) {
      res.status(500).json(setPayload(res));
    }
  },

  async getSearch(req: Request, res: Response) {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json(
        setPayload(res, {
          message: 'Tidak ada "q" di query parameter',
        })
      );
    }

    const route = `?s=${q}&post_type=anime`;

    try {
      const htmlData = await getHtmlData(otakudesuUrl + route);
      const $ = load(htmlData);
      const data = parseSearch($);

      if (data.length === 0) {
        return res.status(404).json(setPayload(res));
      }

      res.status(200).json(
        setPayload(res, {
          data: data,
        })
      );
    } catch (error: any) {
      res.status(500).json(setPayload(res));
    }
  },

  async getJadwalRilis(req: Request, res: Response) {
    const route = "/jadwal-rilis";

    try {
      const htmlData = await getHtmlData(otakudesuUrl + route, {
        useCache: true,
        TTL: 60 * 60,
      });
      const $ = load(htmlData);
      const data = parseJadwalRilis($);

      res.status(200).json(
        setPayload(res, {
          data: data,
        })
      );
    } catch (error) {
      res.status(500).json(setPayload(res));
    }
  },

  async getGenreList(req: Request, res: Response) {
    const route = "/genre-list";

    try {
      const htmlData = await getHtmlData(otakudesuUrl + route, {
        useCache: true,
      });
      const $ = load(htmlData);
      const data = parseGenreList($);

      res.status(200).json(
        setPayload(res, {
          data: data,
        })
      );
    } catch (error) {
      res.status(500).json(setPayload(res));
    }
  },

  async getAnimeList(req: Request, res: Response) {
    const route = "/anime-list";

    try {
      const htmlData = await getHtmlData(otakudesuUrl + route);
      const $ = load(htmlData);
      const data = parseAnimeList($);

      res.status(200).json(
        setPayload(res, {
          data: data,
        })
      );
    } catch (error) {
      res.status(500).json(setPayload(res));
    }
  },

  async getAnimeListByGenre(req: Request, res: Response) {
    const { slug } = req.params;
    const page = Number(req.query.page) || 1;
    const route = `/genres/${slug}/page/${page}`;

    try {
      const htmlData = await getHtmlData(otakudesuUrl + route);
      const $ = load(htmlData);
      const data = await parseAnimeListByGenre($);
      const pagination = parsePagination($);

      if (data.length === 0) {
        return res.status(404).json(setPayload(res));
      }

      res.status(200).json(
        setPayload(res, {
          data: data,
          pagination,
        })
      );
    } catch (error) {
      res.status(500).json(setPayload(res));
    }
  },

  async getAnimeDetail(req: Request, res: Response) {
    const { slug } = req.params;
    const route = `/anime/${slug}`;

    try {
      const htmlData = await getHtmlData(otakudesuUrl + route);
      const $ = load(htmlData);
      const data = await parseAnimeDetail($);

      if (data.episodeList.length === 0) {
        return res.status(404).json(setPayload(res));
      }

      res.status(200).json(
        setPayload(res, {
          data: data,
        })
      );
    } catch (error) {
      res.status(500).json(setPayload(res));
    }
  },

  async getAnimeByEpisode(req: Request, res: Response) {
    const { slug } = req.params;
    const route = `/episode/${slug}`;

    try {
      const htmlData = await getHtmlData(otakudesuUrl + route);
      const $ = load(htmlData);
      const data = await parseAnimeByEpisode($);

      if (
        !data.judul &&
        !data.episodeSebelumnya &&
        !data.episodeSelanjutnya &&
        Object.values(data.downloadUrl).length === 0 &&
        data.info.genres.length === 0
      ) {
        return res.status(404).json(setPayload(res));
      }

      res.status(200).json(
        setPayload(res, {
          data: data,
        })
      );
    } catch (error: any) {
      res.status(500).json(setPayload(res));
    }
  },

  async getAnimeBatch(req: Request, res: Response) {
    const { slug } = req.params;
    const route = `/batch/${slug}`;

    try {
      const htmlData = await getHtmlData(otakudesuUrl + route);
      const $ = load(htmlData);
      const data = await parseAnimeBatch($);

      if (data.batchList.length === 0 && data.genres.length === 0) {
        return res.status(404).json(setPayload(res));
      }

      res.status(200).json(
        setPayload(res, {
          data: data,
        })
      );
    } catch (error) {
      res.status(500).json(setPayload(res));
    }
  },
};

export default OtakudesuController;
