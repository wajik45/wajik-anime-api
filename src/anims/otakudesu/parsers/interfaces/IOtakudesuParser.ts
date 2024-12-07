import * as IOPE from "./IOtakudesuParserExtra";
import type { Pagination } from "@helpers/payload";
import type { Format, Quality } from "@interfaces/IGlobal";

export interface Home {
  ongoing: {
    href?: string;
    otakudesuUrl?: string;
    animeList: IOPE.AnimeCard2[];
  };

  completed: {
    href?: string;
    otakudesuUrl?: string;
    animeList: IOPE.AnimeCard1[];
  };
}

export interface Schedule {
  days: {
    day: string;
    animeList: IOPE.AnimeLinkCard[];
  }[];
}

export interface AllAnimes {
  list: {
    startWith: string;
    animeList: IOPE.AnimeLinkCard[];
  }[];
}

export interface AllGenres {
  genreList: IOPE.GenreLinkCard[];
}

export interface OngoingAnimes {
  data: { animeList: IOPE.AnimeCard2[] };
  pagination?: Pagination;
}

export interface CompletedAnimes {
  data: { animeList: IOPE.AnimeCard1[] };
  pagination?: Pagination;
}

export interface Search {
  animeList: IOPE.AnimeCard3[];
}

export interface GenreAnimes {
  data: { animeList: IOPE.AnimeCard4[] };
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
  synopsis: IOPE.Synopsis;
  batch: IOPE.BatchLinkCard | null;
  genreList: IOPE.GenreLinkCard[];
  episodeList: IOPE.EpisodeLinkCard[];
  recommendedAnimeList: IOPE.AnimeCard5[];
}

export interface AnimeEpisode {
  title: string;
  animeId: string;
  releaseTime: string;
  defaultStreamingUrl: string;
  hasPrevEpisode: boolean;
  prevEpisode: IOPE.NavEpisodeLinkCard | null;
  hasNextEpisode: boolean;
  nextEpisode: IOPE.NavEpisodeLinkCard | null;
  server: { qualities: Quality[] };
  downloadUrl: { qualities: Quality[] };
  info: {
    credit: string;
    encoder: string;
    duration: string;
    type: string;
    genreList: IOPE.GenreLinkCard[];
    episodeList: IOPE.EpisodeLinkCard[];
  };
}

export interface ServerUrl {
  url: string;
}

export interface AnimeBatch {
  title: string;
  animeId: string;
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
  genreList: IOPE.GenreLinkCard[];
  downloadUrl: { formats: Format[] };
}
