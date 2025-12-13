export interface IMainCard {
  title: string;
  otakudesuUrl?: string | undefined;
}

// -----------------------------------------

export interface ITextAnimeCard extends IMainCard {
  animeId: string;
}

export interface ITextBatchCard extends IMainCard {
  batchId: string;
}

export interface ITextEpisodeCard extends IMainCard {
  episodeId: string;
}

export interface ITextGenreCard extends IMainCard {
  genreId: string;
}

// -------------------------------------------

export interface IHome {
  ongoing: {
    otakudesuUrl?: string | undefined;
    animeList: IOngoingAnimeCard[];
  };
  completed: {
    otakudesuUrl?: string | undefined;
    animeList: ICompletedAnimeCard[];
  };
}

export interface IOngoingAnimeCard extends ITextAnimeCard {
  poster: string;
  episodes: string;
  releaseDay: string;
  latestReleaseDate: string;
}

export interface ICompletedAnimeCard extends ITextAnimeCard {
  poster: string;
  episodes: string;
  score: string;
  lastReleaseDate: string;
}

export interface IRecommendedAnimeCard extends ITextAnimeCard {
  poster: string;
}

export interface ISearchedAnimeCard extends ITextAnimeCard {
  poster: string;
  status: string;
  score: string;
  genreList: ITextGenreCard[];
}

export interface IGenreFilteredAnimeCard extends ITextAnimeCard {
  poster: string;
  studios: string;
  score: string;
  episodes: string;
  season: string;
  synopsis: {
    paragraphList: string[];
  };
  genreList: ITextGenreCard[];
}

export interface IAnimeCollection {
  startWith: string;
  animeList: ITextAnimeCard[];
}

export interface IScheduleCollection {
  title: string;
  animeList: ITextAnimeCard[];
}

export interface IAnimeDetails {
  title: string;
  japanese: string;
  score: string;
  producers: string;
  type: string;
  status: string;
  episodes: string;
  duration: string;
  aired: string;
  studios: string;
  poster: string;
  synopsis: ISynopsis;
  batch: ITextBatchCard | null;
  genreList: ITextGenreCard[];
  episodeList: ITextEpisodeCard[];
  recommendedAnimeList: IRecommendedAnimeCard[];
}

export interface IEpisodeDetails {
  title: string;
  animeId: string;
  releaseTime: string;
  defaultStreamingUrl: string;
  hasPrevEpisode: boolean;
  prevEpisode: ITextEpisodeCard | null;
  hasNextEpisode: boolean;
  nextEpisode: ITextEpisodeCard | null;
  server: { qualityList: IQuality[] };
  download: { qualityList: IQuality[] };
  info: {
    credit: string;
    encoder: string;
    duration: string;
    type: string;
    genreList: ITextGenreCard[];
    episodeList: ITextEpisodeCard[];
  };
}

export interface IBatchDetails {
  title: string;
  animeId: string;
  poster: string;
  japanese: string;
  type: string;
  score: string;
  episodes: string;
  duration: string;
  studios: string;
  producers: string;
  aired: string;
  credit: string;
  download: { formatList: IFormat[] };
  genreList: ITextGenreCard[];
}

export interface IServerDetails {
  url: string;
}
