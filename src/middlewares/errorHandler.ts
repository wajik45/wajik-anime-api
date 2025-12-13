import type { Request, Response, NextFunction } from "express";
import { ValiError } from "valibot";
import setPayload from "@helpers/setPayload.js";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";
// import fs from "fs";

// function logErrorToFile(err: any, req: Request, requestId: string): void {
//   const dir = path.join(__dirname, "..", "..", "logs");

//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//   }

//   function convertTimestamp(timestamp: Date) {
//     const date = new Date(timestamp);
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear().toString().slice(2);

//     return `${hours}:${minutes} ${day}-${month}-${year}`;
//   }

//   const logFilePath = path.join(dir, "error.log");
//   const logMessage = `\n[${convertTimestamp(new Date())}] Request ID: ${requestId}\n${req.method} ${
//     req.url
//   } ('Internal Server Error')\nError: ${err.message || ""}\nStack: ${err.stack || ""}\n`;

//   fs.appendFileSync(logFilePath, logMessage);
// }

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof ValiError) {
    res.status(400).json(setPayload(res, { message: err.issues[0]?.message }));

    return;
  }

  if (typeof err.status === "number" && err.status < 500) {
    res.status(err.status).json(setPayload(res, { message: err.message }));

    return;
  }

  // const uuid = uuidv4();

  // logErrorToFile(err, req, uuid);

  res.status(500).json(
    setPayload(res, {
      // message: `Terjadi kesalahan tak terduga. Request ID: ${uuid}`,
      message: `Terjadi kesalahan tak terduga`,
    })
  );
}
