import samehadakuConfig from "@configs/samehadaku.config.js";
import getHTML from "@helpers/getHTML.js";
import { parse, type HTMLElement } from "node-html-parser";

const { baseUrl } = samehadakuConfig;

const samehadakuScraper = {
  async scrapeDOM(pathname: string, ref?: string, sanitize: boolean = false): Promise<HTMLElement> {
    const html = await getHTML(baseUrl, pathname, ref, sanitize);
    const document = parse(html, {
      parseNoneClosedTags: true,
    });

    return document;
  },
};

export default samehadakuScraper;
