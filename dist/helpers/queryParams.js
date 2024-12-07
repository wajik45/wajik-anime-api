"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderParam = getOrderParam;
exports.getPageParam = getPageParam;
exports.getQParam = getQParam;
exports.getUrlParam = getUrlParam;
const error_1 = require("./error");
function setErrorMessage(key, validValue) {
    return `masukkan query parameter: ?${key}=${validValue.join("|")}`;
}
function getOrderParam(req) {
    const order = req.query.order;
    const orders = ["title", "title-reverse", "update", "latest", "popular"];
    if (typeof order === "string") {
        if (orders.includes(order)) {
            if (order === "title-reverse")
                return "titlereverse";
            return order;
        }
        else {
            (0, error_1.setResponseError)(400, setErrorMessage("order", orders));
        }
    }
    return "title";
}
function getPageParam(req) {
    const page = Number(req.query.page) || 1;
    const error = {
        status: 400,
        message: setErrorMessage("page", ["number +"]),
    };
    if (page < 1)
        (0, error_1.setResponseError)(error.status, error.message);
    if (isNaN(Number(req.query.page)) && req.query.page !== undefined) {
        (0, error_1.setResponseError)(error.status, error.message);
    }
    return page;
}
function getQParam(req) {
    const q = req.query.q;
    if (q === undefined) {
        (0, error_1.setResponseError)(400, setErrorMessage("q", ["string"]));
    }
    if (typeof q === "string")
        return q;
    return "";
}
function getUrlParam(req) {
    const url = req.query.url;
    if (!url) {
        (0, error_1.setResponseError)(400, setErrorMessage("url", ["string"]));
    }
    if (typeof url === "string")
        return url;
    return "";
}
