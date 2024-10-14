import type { Request, Response } from "express";
import { responseJSON, responseHTML } from "../helpers/responses";
import otakudesu from "../anims/otakudesu/otakudesu.info";
import samehadaku from "../anims/samehadaku/samehadaku.info";
import path from "path";
import fs from "fs";

const animeSources = { otakudesu, samehadaku };

const MainController = {
  getMainView(req: Request, res: Response): void {
    const getViewPath = (filePath: string) => {
      return path.join(__dirname, "..", "..", "public", "views", filePath);
    };

    try {
      responseHTML.ok(res, getViewPath("home.html"));
    } catch (error) {
      responseHTML.error(res, getViewPath("error.html"), error);
    }
  },

  getMainViewData(req: Request, res: Response): void {
    try {
      function getData() {
        const data = {
          message: "WAJIK ANIME API IS READY 🔥🔥🔥",
          sources: Object.values(animeSources),
        };

        const newData: { message: string; sources: any[] } = {
          message: data.message,
          sources: [],
        };

        data.sources.forEach((source) => {
          const exist = fs.existsSync(path.join(__dirname, "..", "anims", source.baseRoute));

          if (exist) {
            newData.sources.push({
              title: source.title,
              route: source.baseRoute,
            });
          }
        });

        return newData;
      }

      const data = getData();

      responseJSON.ok(req, res, { data });
    } catch (error) {
      responseJSON.error(res, error);
    }
  },

  _404(req: Request, res: Response): void {
    responseJSON.error(res, {
      status: 404,
      message: "halaman tidak ditemukan",
    });
  },
};

export default MainController;
