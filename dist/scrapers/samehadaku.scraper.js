import samehadakuConfig from "../configs/samehadaku.config.js";
import getHTML from "../helpers/getHTML.js";
import { parse } from "node-html-parser";
const { baseUrl } = samehadakuConfig;
const samehadakuScraper = {
    async scrapeDOM(pathname, ref, sanitize = false) {
        const html = await getHTML(baseUrl, pathname, ref, sanitize);
        const document = parse(html, {
            parseNoneClosedTags: true,
        });
        return document;
    },
};
export default samehadakuScraper;
