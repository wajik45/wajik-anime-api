"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wajikFetch = wajikFetch;
exports.getFinalUrl = getFinalUrl;
exports.getFinalUrls = getFinalUrls;
const axios_1 = __importDefault(require("axios"));
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
async function wajikFetch(url, ref, axiosConfig, callback) {
    const response = await (0, axios_1.default)(url, {
        ...axiosConfig,
        headers: {
            "User-Agent": userAgent,
            Referer: ref,
            ...axiosConfig?.headers,
        },
    });
    if (callback)
        callback(response);
    const data = response.data;
    return data;
}
async function getFinalUrl(url, ref, axiosConfig) {
    const response = await axios_1.default.head(url, {
        ...axiosConfig,
        headers: {
            "User-Agent": userAgent,
            Referer: ref,
            ...axiosConfig?.headers,
        },
        maxRedirects: 0,
        validateStatus: function (status) {
            return status >= 200 && status < 400;
        },
    });
    const location = response.headers["location"];
    if (location)
        return location;
    return url;
}
async function getFinalUrls(urls, ref, config) {
    const { retries = 3, delay = 1000 } = config.retryConfig || {};
    const retryRequest = async (url) => {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                return await getFinalUrl(url, ref, config.axiosConfig);
            }
            catch (error) {
                if (attempt === retries)
                    throw error;
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    };
    const requests = urls.map((url) => retryRequest(url));
    const responses = await Promise.allSettled(requests);
    const results = responses.map((response) => {
        if (response.status === "fulfilled")
            return response.value;
        return "";
    });
    return results;
}
