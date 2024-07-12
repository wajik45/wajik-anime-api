"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
function setPayload(res, props) {
    const isError = (statusCode) => {
        const strStatusCode = statusCode.toString();
        if (strStatusCode.startsWith("4") || strStatusCode.startsWith("5")) {
            return true;
        }
        return false;
    };
    const statusCode = res.statusCode;
    const statusMessage = http_1.default.STATUS_CODES[res.statusCode] || "";
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
exports.default = setPayload;
