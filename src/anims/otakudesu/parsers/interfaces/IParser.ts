import * as IPE from "./IParser.extra";
import type { Pagination } from "../../../../helpers/responses";
import type { Format, Quality } from "../../../../interfaces/IGlobal";

export interface Home {
  ongoing: {
    href?: string;
    otakudesuUrl?: string;
    animeList: IPE.AnimeCard2[];
  };

  completed: {
    href?: string;
    otakudesuUrl?: string;
    animeList: IPE.AnimeCard1[];
  };
}

export interface Schedule {
  days: {
    day: string;
    animeList: IPE.AnimeLinkCard[];
  }[];
}

export interface AllAnimes {
  list: {
    startWith: string;
    animeList: IPE.AnimeLinkCard[];
  }[];
}

export interface AllGenres {
  genreList: IPE.GenreLinkCard[];
}

export interface OngoingAnimes {
  data: { animeList: IPE.AnimeCard2[] };
  pagination?: Pagination;
}

export interface CompletedAnimes {
  data: { animeList: IPE.AnimeCard1[] };
  pagination?: Pagination;
}

export interface Search {
  animeList: IPE.AnimeCard3[];
}

export interface GenreAnimes {
  data: { animeList: IPE.AnimeCard4[] };
  pagination?: Pagination;
}

export interface AnimeDetails {
  title: string;
  japanese: string;
  score: string;
  producers: string;
  type: string;
  status: string;
  episodes: number | null;
  duration: string;
  aired: string;
  studios: string;
  poster: string;
  synopsis: IPE.Synopsis;
  batch: IPE.BatchLinkCard | null;
  genreList: IPE.GenreLinkCard[];
  episodeList: IPE.EpisodeLinkCard[];
  recommendedAnimeList: IPE.AnimeCard5[];
}

export interface AnimeEpisode {
  title: string;
  releaseTime: string;
  defaultStreamingUrl: string;
  serversHref: string;
  hasPrevEpisode: boolean;
  prevEpisode: IPE.NavEpisodeLinkCard | null;
  hasNextEpisode: boolean;
  nextEpisode: IPE.NavEpisodeLinkCard | null;
  downloadUrl: { qualities: Quality[] };
  info: {
    credit: string;
    encoder: string;
    duration: string;
    type: string;
    genreList: IPE.GenreLinkCard[];
    episodeList: IPE.EpisodeLinkCard[];
  };
}

export interface AnimeServers {
  qualities: Quality[];
}

export interface ServerUrl {
  url: string;
}

export interface AnimeBatch {
  title: string;
  poster: string;
  japanese: string;
  type: string;
  score: string;
  episodes: number | null;
  duration: string;
  studios: string;
  producers: string;
  aired: string;
  credit: string;
  genreList: IPE.GenreLinkCard[];
  downloadUrl: { formats: Format[] };
}
