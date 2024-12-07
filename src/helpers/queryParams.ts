import type { Request } from "express";
import { setResponseError } from "./error";

function setErrorMessage(key: string, validValue: string[]): string {
  return `masukkan query parameter: ?${key}=${validValue.join("|")}`;
}

export function getOrderParam(req: Request): string {
  const order = req.query.order;
  const orders = ["title", "title-reverse", "update", "latest", "popular"];

  if (typeof order === "string") {
    if (orders.includes(order)) {
      if (order === "title-reverse") return "titlereverse";

      return order;
    } else {
      setResponseError(400, setErrorMessage("order", orders));
    }
  }

  return "title";
}

export function getPageParam(req: Request): number {
  const page = Number(req.query.page) || 1;
  const error = {
    status: 400,
    message: setErrorMessage("page", ["number +"]),
  };

  if (page < 1) setResponseError(error.status, error.message);

  if (isNaN(Number(req.query.page)) && req.query.page !== undefined) {
    setResponseError(error.status, error.message);
  }

  return page;
}

export function getQParam(req: Request): string {
  const q = req.query.q;

  if (q === undefined) {
    setResponseError(400, setErrorMessage("q", ["string"]));
  }

  if (typeof q === "string") return q;

  return "";
}

export function getUrlParam(req: Request): string {
  const url = req.query.url;

  if (!url) {
    setResponseError(400, setErrorMessage("url", ["string"]));
  }

  if (typeof url === "string") return url;

  return "";
}
