import type { AxiosRequestConfig } from "axios";
import { load, type CheerioAPI } from "cheerio";
import { wajikFetch, type CacheConfig } from "../services/dataFetcher";
import { animeConfig } from "../configs/animeConfig";
import path from "path";

export default class Scraper {
  protected baseUrl: string;
  protected baseRoute: string;

  constructor(baseUrl: string, baseRoute: string) {
    this.baseUrl = this.getUrl(baseUrl);
    this.baseRoute = this.generateRoute(baseRoute);
  }

  private deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
      return obj.map((item) => this.deepCopy(item)) as unknown as T;
    }

    const result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = this.deepCopy((obj as any)[key]);
      }
    }

    return result as T;
  }

  private getUrl(baseUrl: string, urlOrPath?: string): string {
    let hapusDariBelakang = true;

    while (hapusDariBelakang) {
      if (baseUrl[baseUrl.length - 1] === "/") {
        baseUrl = baseUrl.slice(0, baseUrl.length - 1);
      } else {
        hapusDariBelakang = false;
      }
    }

    if (urlOrPath) {
      if (urlOrPath.includes(baseUrl)) {
        baseUrl = baseUrl + urlOrPath.replace(baseUrl, "");
      }

      if (!urlOrPath.includes(baseUrl)) {
        if (urlOrPath.startsWith("/")) {
          baseUrl = baseUrl + urlOrPath;
        }
      }
    }

    return baseUrl;
  }

  private generateRoute(...args: string[]): string {
    const route = path.join("/", ...args, "/").replace(/\\/g, "/");

    return route.endsWith("/") ? route.slice(0, -1) : route;
  }

  protected getSourceUrl(urlOrPath?: string): string | undefined {
    if (animeConfig.response.sourceUrl) {
      return this.getUrl(this.baseUrl, urlOrPath);
    }

    return undefined;
  }

  protected getSlugFromUrl(url?: string): string {
    if (typeof url !== "string") return "";

    const urlArr = url.split("/").filter((url) => url !== "");

    return urlArr[urlArr.length - 1] || "";
  }

  protected generateHref(...args: string[]): string | undefined {
    if (animeConfig.response.href) {
      return this.generateRoute(this.baseRoute, ...args);
    }

    return undefined;
  }

  protected generateSrcFromIframeTag(html?: string): string {
    const iframeMatch = html?.match(/<iframe[^>]+src="([^"]+)"/);
    const src = iframeMatch ? iframeMatch[1] : "No iframe found";

    return src;
  }

  protected toCamelCase(str: string): string {
    return str
      .split(" ")
      .map((item, index) => {
        if (index === 0) {
          item = item.toLowerCase();
        } else {
          item = item[0].toUpperCase() + item.slice(1);
        }

        return item;
      })
      .join(" ")
      .replace(/[!@#$%^&*]| /g, "");
  }

  protected checkEmptyData(errorCondition: boolean): void {
    if (errorCondition) throw { status: 404, message: "data tidak ditemukan" };
  }

  protected enrawr(input: string): string {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shift = 5;
    let encoded = "";

    for (let i = 0; i < input.length; i++) {
      let char = input[i];
      let index = chars.indexOf(char);

      if (index !== -1) {
        let newIndex = (index + shift) % chars.length;

        encoded += chars[newIndex];
      } else {
        encoded += char;
      }
    }

    return encoded;
  }

  protected derawr(enrawr: string): string {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shift = 5;
    let decoded = "";

    for (let i = 0; i < enrawr.length; i++) {
      let char = enrawr[i];
      let index = chars.indexOf(char);

      if (index !== -1) {
        let newIndex = (index - shift + chars.length) % chars.length;
        decoded += chars[newIndex];
      } else {
        decoded += char;
      }
    }

    return decoded;
  }

  protected async scrape<T>(
    props: {
      path: string;
      initialData: T;
      axiosConfig?: AxiosRequestConfig<any>;
      cacheConfig?: CacheConfig;
    },
    parser: ($: CheerioAPI, data: T) => Promise<T>
  ): Promise<T> {
    const path = this.generateRoute(props.path);
    const htmlData = await wajikFetch(
      this.baseUrl + path,
      {
        axiosConfig: {
          method: "GET",
          responseType: "text",
          ...props.axiosConfig,
        },
        cacheConfig: props.cacheConfig,
      },
      (response) => {
        // ALL SOURCES
        const $ = load(response.data);
        const resUrl = response.request.res.responseUrl;
        const originHostname = new URL(this.baseUrl + path).hostname;
        const redirectHostname = new URL(resUrl).hostname;

        this.checkEmptyData(originHostname !== redirectHostname);

        if (resUrl.includes("samehadaku")) {
          // SAMEHADAKU
          if (resUrl.includes("/page")) {
            if (resUrl.includes("anime-terbaru")) {
              const animeElement = $("main#main .post-show ul li");

              this.checkEmptyData(animeElement.length === 0);
            } else if (resUrl.includes("?s=")) {
              const notFoundElement = $("#main > h3.notfound");

              this.checkEmptyData(notFoundElement.length === 1);
            } else {
              const animeElement = $("main#main .relat .animpost");

              this.checkEmptyData(animeElement.length === 0);
            }
          }
        } else if (resUrl.includes("otakudesu")) {
          // OTAKUDESU
          if (resUrl.includes("/page")) {
            const animeElement = $(".venz > ul > strong");

            this.checkEmptyData(animeElement.text() === "Not Found");
          } else if (resUrl.includes("?s=")) {
            const animeElement = $(".chivsrc li");

            this.checkEmptyData(animeElement.length === 0);
          }
        }
      }
    );

    const $ = load(htmlData);
    const data = parser($, this.deepCopy(props.initialData));

    return data;
  }
}
