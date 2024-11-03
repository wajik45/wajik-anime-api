import type { QueryParam, RouteParam } from "@interfaces/IGlobal";

export const qQueryParam: QueryParam = {
  key: "q",
  value: {
    default: false,
    required: true,
    type: "string",
  },
};

export const pageQueryParam: QueryParam = {
  key: "page",
  value: {
    default: 1,
    required: false,
    type: "number",
  },
};

export const animeIdRouteParam: RouteParam = {
  placeholder: "animeId",
  value: {
    default: false,
    required: true,
    type: "string",
  },
};

export const genreIdRouteParam: RouteParam = {
  placeholder: "genreId",
  value: {
    default: false,
    required: true,
    type: "string",
  },
};

export const episodeIdRouteParam: RouteParam = {
  placeholder: "episodeId",
  value: {
    default: false,
    required: true,
    type: "string",
  },
};

export const serverIdRouteParam: RouteParam = {
  placeholder: "serverId",
  value: {
    default: false,
    required: true,
    type: "string",
  },
};

export const batchIdRouteParam: RouteParam = {
  placeholder: "batchId",
  value: {
    default: false,
    required: true,
    type: "string",
  },
};
