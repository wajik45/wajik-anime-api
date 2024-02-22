import { Response } from "express";

type Pagination = {
  currentPage?: number;
  totalPages?: number;
  nextPage?: number | boolean;
  prevPage?: number | boolean;
};

type Options = {
  message?: string;
  data?: any;
  pagination?: Pagination;
  error?: boolean;
};

const setPayload = (res: Response, options: Options) => {
  return {
    statusCode: res.statusCode,
    message: options.message || "",
    data: options.data || null,
    pagination: options.pagination || null,
    error: options.error || false,
  };
};

export default setPayload;
