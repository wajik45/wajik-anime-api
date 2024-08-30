import animeUrl from "../../../helpers/animeUrl";

export default function getOtakudesuUrl(urlWithSlug?: string) {
  let mainUrl = animeUrl.otakudesu;
  let hapusDariBelakang = true;

  while (hapusDariBelakang) {
    if (mainUrl[mainUrl.length - 1] === "/") {
      mainUrl = mainUrl.slice(0, mainUrl.length - 1);
    } else {
      hapusDariBelakang = false;
    }
  }

  if (urlWithSlug) {
    return mainUrl + urlWithSlug.replace(mainUrl, "");
  }

  return mainUrl;
}
