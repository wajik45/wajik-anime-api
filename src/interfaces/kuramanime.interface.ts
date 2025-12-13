export interface IMainCard {
  title: string;
  kuramanimeUrl?: string | undefined;
}

// -----------------------------------------

export interface ITextAnimeCard extends IMainCard {
  animeId: string;
  animeSlug: string;
}

export interface ITextPropertyCard extends IMainCard {
  propertyId: string;
}

export interface ITextPropertyTypeCard extends ITextPropertyCard {
  propertyType: string;
}

export interface ITextBatchCard extends IMainCard {
  batchId: string;
  animeId: string;
  animeSlug: string;
}

export interface ITextEpisodeCard extends IMainCard {
  episodeId: string;
  animeId: string;
  animeSlug: string;
}

// -------------------------------------------

export interface IHome {
  ongoing: {
    kuramanimeUrl?: string | undefined;
    episodeList: IEpisodeCard[];
  };
  completed: {
    kuramanimeUrl?: string | undefined;
    animeList: IAnimeCard[];
  };
  movie: {
    kuramanimeUrl?: string | undefined;
    animeList: IAnimeCard[];
  };
}

export interface IAnimeCard extends ITextAnimeCard {
  poster: string;
  type: string;
  quality: string;
  highlight: string;
}

export interface IScheduledAnimeCard extends ITextAnimeCard {
  poster: string;
  type: string;
  quality: string;
  day: string;
  releaseTime: string;
}

export interface IEpisodeCard extends ITextEpisodeCard {
  poster: string;
  type: string;
  quality: string;
  episodes: string;
  totalEpisodes: string;
}

export interface IAnimeDetails {
  title: string;
  animeId: string;
  animeSlug: string;
  alternativeTitle: string;
  poster: string;
  episodes: string;
  aired: string;
  duration: string;
  explicit: string;
  score: string;
  fans: string;
  rating: string;
  credit: string;
  synopsis: ISynopsis;
  episode: {
    first: number | null;
    last: number | null;
  };
  type: ITextPropertyTypeCard;
  status: ITextPropertyTypeCard;
  season: ITextPropertyTypeCard;
  quality: ITextPropertyTypeCard;
  country: ITextPropertyTypeCard;
  source: ITextPropertyTypeCard;
  genreList: ITextPropertyTypeCard[];
  themeList: ITextPropertyTypeCard[];
  demographicList: ITextPropertyTypeCard[];
  studioList: ITextPropertyTypeCard[];
  batchList: ITextBatchCard[];
  similarAnimeList: ITextAnimeCard[];
}

export interface IEpisodeDetails {
  title: string;
  episodeTitle: string;
  animeId: string;
  animeSlug: string;
  lastUpdated: string;
  hasPrevEpisode: boolean;
  prevEpisode: ITextEpisodeCard | null;
  hasNextEpisode: boolean;
  nextEpisode: ITextEpisodeCard | null;
  episode: {
    first: number;
    last: number;
  };
  server: { qualityList: IQuality[] };
  download: { qualityList: IQuality[] };
}

export interface IBatchDetails {
  title: string;
  batchTitle: string;
  animeId: string;
  animeSlug: string;
  download: { qualityList: IQuality[] };
}
