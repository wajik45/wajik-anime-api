import type { CheerioAPI } from "cheerio";

export default function parsePagination($: CheerioAPI) {
  let prevPage: string | number | boolean =
    $(".pagination .prev").attr("href") || "";
  prevPage =
    Number(prevPage.split("/")[prevPage.split("/").length - 2]) || false;
  const currentPage = Number($('.pagination [aria-current="page"]').text());
  let nextPage: string | number | boolean =
    $(".pagination .next").attr("href") || "";
  nextPage =
    Number(nextPage.split("/")[nextPage.split("/").length - 2]) || false;
  const totalPages = Number(
    $(".pagination .page-numbers:not(.prev,.next,.dots):last").text()
  );

  return {
    prevPage,
    currentPage,
    nextPage,
    totalPages,
  };
}
