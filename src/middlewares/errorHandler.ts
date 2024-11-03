import type { NextFunction, Request, Response } from "express";
import generatePayload from "@helpers/payload";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (typeof err.status === "number") {
    return res.status(err.status).json(generatePayload(res, { message: err.message }));
  }

  res.status(500).json(generatePayload(res, { message: err.message }));
}
