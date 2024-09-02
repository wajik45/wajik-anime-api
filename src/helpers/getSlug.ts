export default function getSlug(url: string) {
  if (typeof url !== "string") {
    return url;
  }

  const urlArr = url.split("/").filter((url) => url !== "");

  return urlArr[urlArr.length - 1];
}
