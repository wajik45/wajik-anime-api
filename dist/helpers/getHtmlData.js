"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getHtmlData({ url }) {
    const response = await fetch(url);
    const htmlData = await response.text();
    return htmlData;
}
exports.default = getHtmlData;
//# sourceMappingURL=getHtmlData.js.map