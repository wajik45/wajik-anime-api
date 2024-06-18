"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parsePagination($) {
    let prevPage = $(".pagination .prev").attr("href") || "";
    prevPage =
        Number(prevPage.split("/")[prevPage.split("/").length - 2]) || false;
    const currentPage = Number($('.pagination [aria-current="page"]').text());
    let nextPage = $(".pagination .next").attr("href") || "";
    nextPage =
        Number(nextPage.split("/")[nextPage.split("/").length - 2]) || false;
    const totalPages = Number($(".pagination .page-numbers:not(.prev,.next,.dots):last").text());
    return {
        prevPage,
        currentPage,
        nextPage,
        totalPages,
    };
}
exports.default = parsePagination;
