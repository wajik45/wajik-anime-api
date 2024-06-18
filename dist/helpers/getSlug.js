"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSlug(url) {
    return url.split("/")[url.split("/").length - 2];
}
exports.default = getSlug;
