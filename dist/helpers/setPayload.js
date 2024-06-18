"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setPayload = (res, options) => {
    return {
        statusCode: res.statusCode,
        message: options.message || "",
        data: options.data || null,
        pagination: options.pagination || null,
        error: options.error || false,
    };
};
exports.default = setPayload;
