"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generatePayload;
const http_1 = __importDefault(require("http"));
function generatePayload(res, props) {
    const payload = {
        statusCode: 500,
        statusMessage: "",
        message: "",
        ok: false,
        data: null,
        pagination: null,
    };
    const isOk = (statusCode) => {
        const strStatusCode = statusCode.toString();
        if (strStatusCode.startsWith("4") || strStatusCode.startsWith("5")) {
            return false;
        }
        return true;
    };
    payload.statusCode = res.statusCode;
    payload.statusMessage = http_1.default.STATUS_CODES[res.statusCode] || "";
    payload.message = props?.message || "";
    payload.data = props?.data || null;
    payload.pagination = props?.pagination || null;
    payload.ok = isOk(res.statusCode);
    return payload;
}
