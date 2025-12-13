import otakudesuConfig from "../configs/otakudesu.config.js";
import getHTML from "../helpers/getHTML.js";
import { parse } from "node-html-parser";
const { baseUrl } = otakudesuConfig;
const otakudesuScraper = {
    async scrapeDOM(pathname, ref, sanitize = false) {
        const html = await getHTML(baseUrl, pathname, ref, sanitize);
        const document = parse(html, {
            parseNoneClosedTags: true,
        });
        return document;
    },
    async scrapeNonce(body, referer) {
        const nonceResponse = await fetch(new URL("/wp-admin/admin-ajax.php", baseUrl), {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Referer: referer,
                Origin: baseUrl,
            },
        });
        const nonce = (await nonceResponse.json());
        return nonce;
    },
    async scrapeServer(body, referer) {
        const serverResponse = await fetch(new URL("/wp-admin/admin-ajax.php", baseUrl), {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Origin: baseUrl,
                Referer: referer,
            },
        });
        const server = (await serverResponse.json());
        return server;
    },
};
export default otakudesuScraper;
