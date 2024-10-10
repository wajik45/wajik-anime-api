import type { Request } from "express";

function getErrorMessage(key: string, validValue: string[]): string {
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
      throw {
        status: 400,
        message: getErrorMessage("order", orders),
      };
    }
  }

  return "title";
}

export function getPageParam(req: Request): number {
  const page = Number(req.query.page) || 1;
  const error = {
    status: 400,
    message: getErrorMessage("page", ["number +"]),
  };

  if (page < 1) throw error;

  if (isNaN(Number(req.query.page)) && req.query.page !== undefined) {
    throw error;
  }

  return page;
}

export function getQParam(req: Request): string {
  const q = req.query.q;

  if (q === undefined) {
    throw {
      status: 400,
      message: getErrorMessage("q", ["string"]),
    };
  }

  if (typeof q === "string") return q;

  return "";
}
