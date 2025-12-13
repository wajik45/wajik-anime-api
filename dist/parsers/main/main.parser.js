import appConfig from "../../configs/app.config.js";
const { sourceUrl } = appConfig;
const mainParser = {
    Text(el, regexp) {
        const text = el?.text;
        if (regexp && text) {
            const match = text.match(regexp);
            if (match) {
                return match[1]?.trim() || "";
            }
        }
        return text?.trim() || "";
    },
    Id(el) {
        const url = el?.getAttribute("href");
        if (url) {
            const arr = url.split("/").filter((str) => str);
            return arr[arr.length - 1] || "";
        }
        return "";
    },
    Src(el) {
        return el?.getAttribute("data-src") || el?.getAttribute("src") || "";
    },
    Num(el, regexp) {
        let text = el?.text;
        if (regexp && text) {
            const match = text.match(regexp);
            if (match) {
                return Number(match[1]?.trim()) || null;
            }
        }
        return Number(text?.replace(/\,/g, "").trim()) || null;
    },
    Attr(el, attribute) {
        return el?.getAttribute(attribute) || "";
    },
    AnimeSrc(el, baseUrl) {
        const text = el?.getAttribute("href");
        return sourceUrl ? (baseUrl ? new URL(text || "", baseUrl).toString() : text || "") : undefined;
    },
};
export default mainParser;
