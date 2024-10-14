import { Request } from "express";

declare module "express" {
  export interface Request {
    cache?: {
      key?: any;
      ttl?: number;
    };
  }
}
