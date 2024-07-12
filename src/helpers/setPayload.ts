import type { Response } from "express";
import http from "http";

function setPayload(
  res: Response,
  props?: {
    message?: string;
    data?: any;
    pagination?: {
      currentPage?: number;
      totalPages?: number;
      totalItems?: number;
      nextPage?: number | boolean;
      prevPage?: number | boolean;
    };
    error?: boolean;
  }
) {
  const isError = (statusCode: number) => {
    const strStatusCode = statusCode.toString();
    if (strStatusCode.startsWith("4") || strStatusCode.startsWith("5")) {
      return true;
    }

    return false;
  };

  const statusCode = res.statusCode;
  const statusMessage = http.STATUS_CODES[res.statusCode] || "";
  const message = props?.message || "";
  const data = props?.data || null;
  const pagination = props?.pagination || null;
  const error = isError(statusCode);

  const payload = {
    statusCode,
    statusMessage,
    message,
    data,
    pagination,
    error,
  };

  return payload;
}

export default setPayload;
