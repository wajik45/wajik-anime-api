import * as ISPE from "./ISamehadakuParserExtra";
import type { Pagination } from "@helpers/payload";
import type { Format, Quality } from "@interfaces/IGlobal";

export interface Home {
  recent: {
    href?: string;
    samehadakuUrl?: string;
    animeList: ISPE.AnimeCard1[];
  };
  batch: {
    href?: string;
    samehadakuUrl?: string;
    batchList: ISPE.AnimeCard1[];
  };
  movie: {
    href?: string;
    samehadakuUrl?: string;
    animeList: ISPE.AnimeCard3[];
  };
}

export interface AllGenres {
  genreList: ISPE.GenreLinkCard[];
}

export interface AllAnimes {
  list: {
    startWith: string;
    animeList: ISPE.AnimeLinkCard[];
  }[];
}

export interface Schedule {
  days: {
    day: string;
    animeList: ISPE.AnimeCard4[];
  }[];
}

export interface RecentEpisodes {
  data: { animeList: ISPE.AnimeCard1[] };
  pagination?: Pagination;
}

export interface Animes {
  data: {
    animeList: ISPE.AnimeCard2[];
  };
  pagination?: Pagination;
}

export interface Batches {
  data: { batchList: ISPE.AnimeCard2[] };
  pagination?: Pagination;
}

export interface AnimeDetails {
  title: string;
  poster: string;
  score: { value: string; users: string };
  japanese: string;
  synonyms: string;
  english: string;
  status: string;
  type: string;
  source: string;
  duration: string;
  episodes: number | null;
  season: string;
  studios: string;
  producers: string;
  aired: string;
  trailer: string;
  batchList: ISPE.BatchLinkCard[];
  synopsis: ISPE.Synopsis;
  genreList: ISPE.GenreLinkCard[];
  episodeList: ISPE.EpisodeLinkCard[];
}

export interface AnimeEpisode {
  title: string;
  animeId: string;
  poster: string;
  releasedOn: string;
  defaultStreamingUrl: string;
  server: { qualities: Quality[] };
  hasPrevEpisode: boolean;
  prevEpisode: ISPE.NavEpisodeLinkCard | null;
  hasNextEpisode: boolean;
  nextEpisode: ISPE.NavEpisodeLinkCard | null;
  downloadUrl: { formats: Format[] };
  synopsis: ISPE.Synopsis;
  genreList: ISPE.GenreLinkCard[];
  recommendedEpisodeList: ISPE.AnimeCard5[];
  movie: {
    href?: string;
    samehadakuUrl?: string;
    animeList: ISPE.AnimeCard3[];
  };
}

export interface ServerUrl {
  url: string;
}

export interface AnimeBatch {
  title: string;
  animeId: string;
  japanese: string;
  synonyms: string;
  english: string;
  status: string;
  type: string;
  source: string;
  score: string;
  duration: string;
  episodes: number | null;
  season: string;
  studios: string;
  producers: string;
  aired: string;
  releasedOn: string;
  poster: string;
  synopsis: ISPE.Synopsis;
  genreList: ISPE.GenreLinkCard[];
  downloadUrl: { formats: Format[] };
  recommendedAnimeList: ISPE.AnimeCard6[];
}
