import type { Request, Response, NextFunction } from "express";
import { defaultTTL, getFromCache } from "../helpers/cache";
import { responseJSON, type PayloadProps } from "../helpers/responses";
import getMinFromMs from "../helpers/getMinFromMs";
import path from "path";
// import fs from "fs";

// function writeLog(message: string, cache: "hit" | "miss") {
//   function wajibDua(data: any) {
//     return `${data}`.length === 1 ? `0${data}` : `${data}`;
//   }

//   const fileName = "logs.txt";
//   const filePath = path.join(__dirname, "..", "..", "public", fileName);
//   const d = new Date();
//   const date = wajibDua(d.getDate());
//   const month = wajibDua(d.getMonth());
//   const year = d.getFullYear();
//   const hours = wajibDua(d.getHours());
//   const minutes = wajibDua(d.getMinutes());
//   const seconds = wajibDua(d.getSeconds());
//   const logMessage = `[${date}-${month}-${year}] [${hours}:${minutes}:${seconds}] [${cache}] [${message}]\n`;

//   if (!fs.existsSync(filePath)) {
//     fs.writeFile(filePath, logMessage, (err) => {
//       if (err) throw err;
//     });
//   } else {
//     fs.appendFile(filePath, logMessage, (err) => {
//       if (err) throw err;
//     });
//   }
// }

/**
 * @param ttl minutes
 */
export function cacheMiddleware(ttl?: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.cache = {
      key: path.join(req.originalUrl, "/").replace(/\\/g, "/"),
      ttl: ttl ? getMinFromMs(ttl) : defaultTTL,
    };

    const key = req.cache.key;
    const cachedData: PayloadProps = getFromCache(key);

    if (cachedData) {
      // console.log("hit");
      // writeLog(key, "hit");

      const { data, pagination, message } = cachedData;

      return responseJSON.ok(req, res, { data, pagination, message });
    }

    // console.log("miss");
    // writeLog(key, "miss");

    next();
  };
}
