import kuramanimeConfig from "../configs/kuramanime.config.js";
import getHTML from "../helpers/getHTML.js";
import { parse } from "node-html-parser";
const { baseUrl } = kuramanimeConfig;
const kuramanimeScraper = {
    async scrapeDOM(pathname, ref, sanitize = false) {
        const html = await getHTML(baseUrl, pathname, ref, sanitize);
        const document = parse(html, {
            parseNoneClosedTags: true,
        });
        return document;
    },
    async scrapeSecret(ref) {
        const text = await getHTML(baseUrl, "/assets/Ks6sqSgloPTlHMl.txt", ref);
        return text;
    },
};
export default kuramanimeScraper;
