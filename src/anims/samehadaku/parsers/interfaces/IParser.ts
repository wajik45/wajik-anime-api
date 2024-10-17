import type { Pagination } from "../../../../helpers/responses";
import type { Format, Quality } from "../../../../interfaces/IGlobal";
import * as IPE from "./IParser.extra";

export interface Home {
  recent: {
    href?: string;
    samehadakuUrl?: string;
    episodeList: IPE.AnimeCard1[];
  };
  batch: {
    href?: string;
    samehadakuUrl?: string;
    batchList: IPE.AnimeCard1[];
  };
  movie: {
    href?: string;
    samehadakuUrl?: string;
    animeList: IPE.AnimeCard3[];
  };
}

export interface AllGenres {
  genreList: IPE.GenreLinkCard[];
}

export interface AllAnimes {
  list: {
    startWith: string;
    animeList: IPE.AnimeLinkCard[];
  }[];
}

export interface Schedule {
  days: {
    day: string;
    animeList: IPE.AnimeCard4[];
  }[];
}

export interface RecentEpisodes {
  data: { episodeList: IPE.AnimeCard1[] };
  pagination?: Pagination;
}

export interface Animes {
  data: IPE.AnimeCard2List;
  pagination?: Pagination;
}

export interface Batches {
  data: { batchList: IPE.AnimeCard2[] };
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
  batchList: IPE.BatchLinkCard[];
  synopsis: IPE.Synopsis;
  genreList: IPE.GenreLinkCard[];
  episodeList: IPE.EpisodeLinkCard[];
}

export interface AnimeEpisode {
  title: string;
  poster: string;
  releasedOn: string;
  defaultStreamingUrl: string;
  server: { qualities: Quality[] };
  hasPrevEpisode: boolean;
  prevEpisode: IPE.NavEpisodeLinkCard | null;
  hasNextEpisode: boolean;
  nextEpisode: IPE.NavEpisodeLinkCard | null;
  downloadUrl: { formats: Format[] };
  synopsis: IPE.Synopsis;
  genreList: IPE.GenreLinkCard[];
  recommendedEpisodeList: IPE.AnimeCard5[];
  movie: {
    href?: string;
    samehadakuUrl?: string;
    animeList: IPE.AnimeCard3[];
  };
}

export interface ServerUrl {
  url: string;
}

export interface AnimeBatch {
  title: string;
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
  synopsis: IPE.Synopsis;
  genreList: IPE.GenreLinkCard[];
  downloadUrl: { formats: Format[] };
  recommendedAnimeList: IPE.AnimeCard6[];
}
