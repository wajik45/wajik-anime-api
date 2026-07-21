import kuramanimeConfig from "@configs/kuramanime.config.js";
import getHTML from "@helpers/getHTML.js";
import { parse, type HTMLElement } from "node-html-parser";

const { baseUrl } = kuramanimeConfig;

const kuramanimeScraper = {
  async scrapeDOM(pathname: string, ref?: string, sanitize: boolean = false): Promise<HTMLElement> {
    const { url } = await fetch(baseUrl);
    const html = await getHTML(url, pathname, ref, sanitize);
    const document = parse(html, {
      parseNoneClosedTags: true,
    });

    return document;
  },

  async scrapeSecret(ref?: string): Promise<string> {
    const { url } = await fetch(baseUrl);
    const text = await getHTML(url, "/assets/Ks6sqSgloPTlHMl.txt", ref);

    return text;
  },
};

export default kuramanimeScraper;
