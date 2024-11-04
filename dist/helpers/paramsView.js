"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchIdRouteParam = exports.serverIdRouteParam = exports.episodeIdRouteParam = exports.genreIdRouteParam = exports.animeIdRouteParam = exports.pageQueryParam = exports.qQueryParam = void 0;
exports.qQueryParam = {
    key: "q",
    value: {
        default: false,
        required: true,
        type: "string",
    },
};
exports.pageQueryParam = {
    key: "page",
    value: {
        default: 1,
        required: false,
        type: "number",
    },
};
exports.animeIdRouteParam = {
    placeholder: "animeId",
    value: {
        default: false,
        required: true,
        type: "string",
    },
};
exports.genreIdRouteParam = {
    placeholder: "genreId",
    value: {
        default: false,
        required: true,
        type: "string",
    },
};
exports.episodeIdRouteParam = {
    placeholder: "episodeId",
    value: {
        default: false,
        required: true,
        type: "string",
    },
};
exports.serverIdRouteParam = {
    placeholder: "serverId",
    value: {
        default: false,
        required: true,
        type: "string",
    },
};
exports.batchIdRouteParam = {
    placeholder: "batchId",
    value: {
        default: false,
        required: true,
        type: "string",
    },
};
