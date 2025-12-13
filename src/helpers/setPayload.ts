import type { Response } from "express";
import http from "http";

interface IPayloadProps {
  message?: string;
  data?: Record<string, any>;
  pagination?: IPagination | undefined;
}

export default function setPayload(res: Response, props?: IPayloadProps): IPayload {
  return {
    statusCode: res.statusCode,
    statusMessage: http.STATUS_CODES[res.statusCode] || "",
    message: props?.message || "",
    data: props?.data || null,
    pagination: props?.pagination || null,
  };
}
