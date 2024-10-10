import type { Response } from "express";
import http from "http";

export interface Pagination {
  currentPage?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage?: number | null;
  hasNextPage?: boolean;
  nextPage?: number | null;
}

export interface PayloadProps {
  message?: string;
  data?: any;
  pagination?: Pagination;
}

export interface Payload {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: any;
  pagination: Pagination | null;
}

function generatePayload(res: Response, props?: PayloadProps): Payload {
  const payload: Payload = {
    statusCode: 500,
    statusMessage: "",
    message: "",
    ok: false,
    data: null,
    pagination: null,
  };

  const ok = (statusCode: number) => {
    const strStatusCode = statusCode.toString();

    if (strStatusCode.startsWith("4") || strStatusCode.startsWith("5")) {
      return false;
    }

    return true;
  };

  payload.statusCode = res.statusCode;
  payload.statusMessage = http.STATUS_CODES[res.statusCode] || "";
  payload.message = props?.message || "";
  payload.data = props?.data || null;
  payload.pagination = props?.pagination || null;
  payload.ok = ok(res.statusCode);

  return payload;
}

export const responseJSON = {
  ok(res: Response, props?: PayloadProps): void {
    res.status(200).json(generatePayload(res, props));
  },
  error(res: Response, error: any): void {
    if (typeof error?.status === "number") {
      res.status(error.status).json(generatePayload(res, { message: error?.message }));
    } else {
      res.status(500).json(generatePayload(res, { message: error?.message }));
    }
  },
};

export const responseHTML = {
  ok(res: Response, path: string): void {
    res.status(200).sendFile(path);
  },
  error(res: Response, path: string, error: any): void {
    if (error?.status && typeof error.status === "number") {
      res.status(error.status).sendFile(path);
    } else {
      res.status(500).sendFile(path);
    }
  },
};
