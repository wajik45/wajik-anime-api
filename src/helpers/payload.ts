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

export default function generatePayload(res: Response, props?: PayloadProps): Payload {
  const payload: Payload = {
    statusCode: 500,
    statusMessage: "",
    message: "",
    ok: false,
    data: null,
    pagination: null,
  };

  const isOk = (statusCode: number) => {
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
  payload.ok = isOk(res.statusCode);

  return payload;
}
