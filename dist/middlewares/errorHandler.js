"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const payload_1 = __importDefault(require("../helpers/payload"));
function errorHandler(err, req, res, next) {
    if (typeof err.status === "number") {
        return res.status(err.status).json((0, payload_1.default)(res, { message: err.message }));
    }
    res.status(500).json((0, payload_1.default)(res, { message: err.message }));
}
