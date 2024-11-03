import * as par from "@helpers/paramsView";
import type { AnimeSource } from "@interfaces/IGlobal";
import animeConfig from "@configs/animeConfig";

const { baseUrl } = animeConfig;

const otakudesuInfo: AnimeSource = {
  title: "Otakudesu",
  baseUrl: baseUrl.otakudesu,
  baseUrlPath: "/otakudesu",
  message:
    "di vercel ada beberapa rute yang 403 forbidden, di local aman, mungkin non serverless juga aman",
  ok: true,
  routesView: [
    {
      title: "Halaman home",
      route: "/home",
    },
    {
      title: "Jadwal rilis",
      route: "/schedule",
    },
    {
      title: "Semua anime",
      route: "/anime",
    },
    {
      title: "Semua genre",
      route: "/genres",
    },
    {
      title: "Anime sedang tayang",
      route: "/ongoing",
      queryParams: [par.pageQueryParam],
    },
    {
      title: "Anime sudah tamat",
      route: "/completed",
      queryParams: [par.pageQueryParam],
    },
    {
      title: "Pencarian anime",
      route: "/search",
      queryParams: [par.qQueryParam],
    },
    {
      title: "Anime berdasarkan genre",
      route: "/genres/{genreId}",
      queryParams: [par.pageQueryParam],
      routeParams: [par.genreIdRouteParam],
    },
    {
      title: "Detail lengkap anime",
      route: "/anime/{animeId}",
      routeParams: [par.animeIdRouteParam],
    },
    {
      title: "Nonton anime berdasarkan episode",
      route: "/episode/{episodeId}",
      routeParams: [par.episodeIdRouteParam],
    },
    {
      title: "Link server buat nonton",
      route: "/server/{serverId}",
      routeParams: [par.serverIdRouteParam],
    },
    {
      title: "Download batch anime lengkap",
      route: "/batch/{batchId}",
      routeParams: [par.batchIdRouteParam],
    },
  ],
};

export default otakudesuInfo;
