"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSlug;
function getSlug(url) {
    if (typeof url !== "string") {
        return url;
    }
    const urlArr = url.split("/").filter((url) => url !== "");
    return urlArr[urlArr.length - 1];
}
