"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFinalUrls;
const getFinalUrl_1 = __importDefault(require("./getFinalUrl"));
async function getFinalUrls(urls, cacheOptions, axiosOptions, retryOptions) {
    const { retries = 3, delay = 1000 } = retryOptions || {};
    const retryRequest = async (url) => {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                return await (0, getFinalUrl_1.default)(url, cacheOptions, axiosOptions);
            }
            catch (error) {
                if (attempt === retries) {
                    throw error;
                }
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    };
    const requests = urls.map((url) => retryRequest(url));
    const responses = await Promise.allSettled(requests);
    const results = responses.map((response) => {
        if (response.status === "fulfilled") {
            return response.value;
        }
        else {
            return "";
        }
    });
    return results;
}
