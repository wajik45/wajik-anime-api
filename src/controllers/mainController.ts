import type { NextFunction, Request, Response } from "express";
import { setResponseError } from "@helpers/error";
import { otakudesuInfo } from "@otakudesu/index";
import { samehadakuInfo } from "@samehadaku/index";
import generatePayload from "@helpers/payload";
import path from "path";
import fs from "fs";

const mainController = {
  getMainView(req: Request, res: Response, next: NextFunction): void {
    try {
      const getViewFile = (filePath: string) => {
        return path.join(__dirname, "..", "public", "views", filePath);
      };

      res.sendFile(getViewFile("home.html"));
    } catch (error) {
      next(error);
    }
  },

  getMainViewData(req: Request, res: Response, next: NextFunction): void {
    try {
      function getData() {
        const animeSources = {
          otakudesu: otakudesuInfo,
          samehadaku: samehadakuInfo,
        };

        const data = {
          message: "WAJIK ANIME API IS READY 🔥🔥🔥",
          sources: Object.values(animeSources),
        };

        const newData: { message: string; sources: any[] } = {
          message: data.message,
          sources: [],
        };

        data.sources.forEach((source) => {
          const exist = fs.existsSync(path.join(__dirname, "..", "anims", source.baseUrlPath));

          if (exist) {
            newData.sources.push({
              title: source.title,
              route: source.baseUrlPath,
            });
          }
        });

        return newData;
      }

      const data = getData();

      res.json(generatePayload(res, { data }));
    } catch (error) {
      next(error);
    }
  },

  _404(req: Request, res: Response, next: NextFunction): void {
    next(setResponseError(404, "halaman tidak ditemukan"));
  },
};

export default mainController;
