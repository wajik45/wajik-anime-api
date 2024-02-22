export default function getSlug(url: string) {
  return url.split("/")[url.split("/").length - 2];
}
