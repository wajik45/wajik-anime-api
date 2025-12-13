import type { HTMLElement } from "node-html-parser";
import appConfig from "@configs/app.config.js";

const { sourceUrl } = appConfig;

const mainParser = {
  Text(el: HTMLElement | null | undefined | undefined, regexp?: RegExp): string {
    const text = el?.text;

    if (regexp && text) {
      const match = text.match(regexp);

      if (match) {
        return match[1]?.trim() || "";
      }
    }

    return text?.trim() || "";
  },

  Id(el: HTMLElement | null | undefined): string {
    const url = el?.getAttribute("href");

    if (url) {
      const arr = url.split("/").filter((str) => str);

      return arr[arr.length - 1] || "";
    }

    return "";
  },

  Src(el: HTMLElement | null | undefined): string {
    return el?.getAttribute("data-src") || el?.getAttribute("src") || "";
  },

  Num(el: HTMLElement | null | undefined, regexp?: RegExp): number | null {
    let text = el?.text;

    if (regexp && text) {
      const match = text.match(regexp);

      if (match) {
        return Number(match[1]?.trim()) || null;
      }
    }

    return Number(text?.replace(/\,/g, "").trim()) || null;
  },

  Attr(el: HTMLElement | null | undefined, attribute: string): string {
    return el?.getAttribute(attribute) || "";
  },

  AnimeSrc(el: HTMLElement | null | undefined, baseUrl?: string | undefined): string | undefined {
    const text = el?.getAttribute("href");

    return sourceUrl ? (baseUrl ? new URL(text || "", baseUrl).toString() : text || "") : undefined;
  },
};

export default mainParser;
