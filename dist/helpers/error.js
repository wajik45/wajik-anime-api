"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setResponseError = setResponseError;
function setResponseError(status, message) {
    throw { status, message };
}
