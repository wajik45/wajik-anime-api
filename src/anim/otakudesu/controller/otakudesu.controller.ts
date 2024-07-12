import type { Request, Response } from "express";
import type {
  IOnGoing,
  ICompleted,
  ISearch,
  IAnimeList,
  IJadwalRilis,
  IGenreList,
  IGenre,
} from "../interfaces/IOtakudesu";
import { load } from "cheerio";
import getHtmlData from "../../../helpers/getHtmlData";
import animeUrl from "../../../helpers/animeUrl";
import setPayload from "../../../helpers/setPayload";
import parseCard from "../parser/parseCard";
import parseSearchCard from "../parser/parseSearchCard";
import parsePagination from "../parser/parsePagination";
import parseAnimeList from "../parser/parseAnimeList";
import parseJadwalRilis from "../parser/parseJadwalRilis";
import parseGenreList from "../parser/parseGenreList";
import parseGenreCard from "../parser/parseGenreCard";
import parseAnimeDetail from "../parser/parseAnimeDetail";
import parseAnimeEpisode from "../parser/parseAnimeEpisode";
import parseAnimeBatch from "../parser/parseAnimeBatch";

const OtakudesuController = {
  getMessage(req: Request, res: Response) {
    res.status(200).json({
      message: "OTAKUDESU IS READY 🍌💦, MOHON IJIN BANG OTAKUDESU🙏🙏🙏",
      otakudesuUrl: animeUrl.otakudesu,
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
    type Data = any;

    try {
      const htmlData = await getHtmlData({ url: animeUrl.otakudesu });
      const $ = load(htmlData);
      const data: Data = {};

      $(".venutama .venz").each((index, element) => {
        const key = index === 0 ? "onGoing" : "completed";

        const dataCard = $(element)
          .find("ul li")
          .map((index, element) => {
            const card = parseCard($, element);

            if (key === "onGoing") {
              const onGoing: IOnGoing = {
                judul: card.judul,
                slug: card.slug,
                href: "/otakudesu/anime/" + card.slug,
                poster: card.poster,
                episodeTerbaru: card.episode,
                hariRilis: card.ratingAtauHari,
                tanggalRilisTerbaru: card.tanggal,
                otakudesuUrl: card.otakudesuUrl,
              };

              return onGoing;
            }

            const completed: ICompleted = {
              judul: card.judul,
              slug: card.slug,
              href: "/otakudesu/anime/" + card.slug,
              poster: card.poster,
              jumlahEpisode: card.episode,
              rating: card.ratingAtauHari,
              tanggalRilisTerakhir: card.tanggal,
              otakudesuUrl: card.otakudesuUrl,
            };

            return completed;
          })
          .get();

        data[key] = dataCard;
      });

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
    type Data = ICompleted[];

    const page = Number(req.query.page) || 1;
    const route = `/complete-anime/page/${page}`;

    try {
      const htmlData = await getHtmlData({
        url: animeUrl.otakudesu + route,
      });
      const $ = load(htmlData);
      const data: Data = [];

      $(".venutama ul li").each((index, element) => {
        const card = parseCard($, element);

        data.push({
          judul: card.judul,
          slug: card.slug,
          href: "/otakudesu/anime/" + card.slug,
          poster: card.poster,
          jumlahEpisode: card.episode,
          rating: card.ratingAtauHari,
          tanggalRilisTerakhir: card.tanggal,
          otakudesuUrl: card.otakudesuUrl,
        });
      });

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
    type Data = IOnGoing[];

    const page = Number(req.query.page) || 1;
    const route = `/ongoing-anime/page/${page}`;

    try {
      const htmlData = await getHtmlData({
        url: animeUrl.otakudesu + route,
      });
      const $ = load(htmlData);
      const data: Data = [];

      $(".venutama ul li").each((index, element) => {
        const card = parseCard($, element);

        data.push({
          judul: card.judul,
          slug: card.slug,
          href: "/otakudesu/anime/" + card.slug,
          poster: card.poster,
          episodeTerbaru: card.episode,
          hariRilis: card.ratingAtauHari,
          tanggalRilisTerbaru: card.tanggal,
          otakudesuUrl: card.otakudesuUrl,
        });
      });

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
    type Data = ISearch[];

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
      const htmlData = await getHtmlData({
        url: animeUrl.otakudesu + route,
      });
      const $ = load(htmlData);
      const data: Data = parseSearchCard($);

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
    type Data = IJadwalRilis[];

    const route = "/jadwal-rilis";

    try {
      const htmlData = await getHtmlData({ url: animeUrl.otakudesu + route });
      const $ = load(htmlData);
      const data: Data = parseJadwalRilis($);

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
    type Data = IGenreList[];

    const route = "/genre-list";

    try {
      const htmlData = await getHtmlData({ url: animeUrl.otakudesu + route });
      const $ = load(htmlData);
      const data: Data = parseGenreList($);

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
    type Data = IAnimeList[];

    const route = "/anime-list";

    try {
      const htmlData = await getHtmlData({ url: animeUrl.otakudesu + route });
      const $ = load(htmlData);
      const data: Data = parseAnimeList($);

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
    type Data = IGenre[];

    const { slug } = req.params;
    const page = Number(req.query.page) || 1;
    const route = `/genres/${slug}/page/${page}`;

    try {
      const htmlData = await getHtmlData({ url: animeUrl.otakudesu + route });
      const $ = load(htmlData);
      const data: Data = parseGenreCard($);
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
      const htmlData = await getHtmlData({ url: animeUrl.otakudesu + route });
      const $ = load(htmlData);

      const data = parseAnimeDetail($);

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
      const htmlData = await getHtmlData({ url: animeUrl.otakudesu + route });
      const $ = load(htmlData);

      const data = parseAnimeEpisode($);

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
    } catch (error) {
      res.status(500).json(setPayload(res));
    }
  },

  async getBatch(req: Request, res: Response) {
    const { slug } = req.params;
    const route = `/batch/${slug}`;

    const htmlData = await getHtmlData({ url: animeUrl.otakudesu + route });
    const $ = load(htmlData);

    const data = parseAnimeBatch($);

    if (data.batchList.length === 0 && data.genres.length === 0) {
      return res.status(404).json(setPayload(res));
    }

    try {
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
