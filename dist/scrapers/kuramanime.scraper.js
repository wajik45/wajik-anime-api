import kuramanimeConfig from "../configs/kuramanime.config.js";
import getHTML from "../helpers/getHTML.js";
import { parse } from "node-html-parser";
const { baseUrl } = kuramanimeConfig;
const kuramanimeScraper = {
    async scrapeDOM(pathname, ref, sanitize = false) {
        const { url } = await fetch(baseUrl);
        const html = await getHTML(url, pathname, ref, sanitize);
        const document = parse(html, {
            parseNoneClosedTags: true,
        });
        return document;
    },
    async scrapeSecret(ref) {
        const { url } = await fetch(baseUrl);
        const text = await getHTML(url, "/assets/Ks6sqSgloPTlHMl.txt", ref);
        return text;
    },
};
export default kuramanimeScraper;
