"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOtakudesuUrl;
const animeUrl_1 = __importDefault(require("../../../helpers/animeUrl"));
function getOtakudesuUrl(urlWithSlug) {
    let mainUrl = animeUrl_1.default.otakudesu;
    let hapusDariBelakang = true;
    while (hapusDariBelakang) {
        if (mainUrl[mainUrl.length - 1] === "/") {
            mainUrl = mainUrl.slice(0, mainUrl.length - 1);
        }
        else {
            hapusDariBelakang = false;
        }
    }
    if (urlWithSlug) {
        return mainUrl + urlWithSlug.replace(mainUrl, "");
    }
    return mainUrl;
}
