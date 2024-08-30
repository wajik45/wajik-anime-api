export default function getSlug(url: string) {
  const urlArr = url.split("/").filter((url) => url !== "");

  return urlArr[urlArr.length - 1];
}
