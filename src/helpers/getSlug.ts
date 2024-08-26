export default function getSlug(url: string) {
  const urlArr = url.split("/");

  if (url.endsWith("/") && url[url.length - 2] !== "/") {
    return urlArr[urlArr.length - 2];
  }

  return urlArr[urlArr.length - 1];
}
