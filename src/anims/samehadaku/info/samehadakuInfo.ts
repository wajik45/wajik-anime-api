import * as par from "@helpers/paramsView";
import type { AnimeSource, QueryParam } from "@interfaces/IGlobal";
import animeConfig from "@configs/animeConfig";

const { baseUrl } = animeConfig;

const orderQueryParam: QueryParam = {
  key: "order",
  value: {
    default: '"title"',
    required: false,
    type: '"title" | "title-reverse" | "update" | "latest" | "popular"',
  },
};

const samehadakuInfo: AnimeSource = {
  title: "Samehadaku",
  baseUrl: baseUrl.samehadaku,
  baseUrlPath: "/samehadaku",
  message: "🔥🔥",
  ok: true,
  routesView: [
    {
      title: "Halaman home",
      route: "/home",
    },
    {
      title: "Semua genre",
      route: "/genres",
    },
    {
      title: "Semua anime",
      route: "/anime",
    },
    {
      title: "Jadwal rilis",
      route: "/schedule",
    },
    {
      title: "Anime terbaru",
      route: "/recent",
      queryParams: [par.pageQueryParam],
    },
    {
      title: "Anime sedang tayang",
      route: "/ongoing",
      queryParams: [par.pageQueryParam, orderQueryParam],
    },
    {
      title: "Anime sudah tamat",
      route: "/completed",
      queryParams: [par.pageQueryParam, orderQueryParam],
    },
    {
      title: "Anime terpopuler",
      route: "/popular",
      queryParams: [par.pageQueryParam],
    },
    {
      title: "Anime movie",
      route: "/movies",
      queryParams: [par.pageQueryParam],
    },
    {
      title: "Batch-batch anime",
      route: "/batch",
      queryParams: [par.pageQueryParam],
    },
    {
      title: "Pencarian anime",
      route: "/search",
      queryParams: [par.qQueryParam, par.pageQueryParam],
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

export default samehadakuInfo;
