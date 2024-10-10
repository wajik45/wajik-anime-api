export interface AnimeCard1 {
  title: string;
  poster: string;
  episodes: number | null;
  score: string;
  lastReleaseDate: string;
  animeId: string;
  href?: string;
  otakudesuUrl?: string;
}

export interface AnimeCard2 {
  title: string;
  poster: string;
  episodes: number | null;
  releaseDay: string;
  latestReleaseDate: string;
  animeId: string;
  href?: string;
  otakudesuUrl?: string;
}

export interface AnimeCard3 {
  title: string;
  status: string;
  score: string;
  poster: string;
  animeId: string;
  href?: string;
  otakudesuUrl?: string;
  genreList: GenreLinkCard[];
}

export interface AnimeCard4 {
  title: string;
  poster: string;
  studios: string;
  score: string;
  episodes: number | null;
  season: string;
  animeId: string;
  href?: string;
  otakudesuUrl?: string;
  synopsis: Synopsis;
  genreList: GenreLinkCard[];
}

export interface AnimeCard5 {
  title: string;
  poster: string;
  animeId: string;
  href?: string;
  otakudesuUrl?: string;
}

export interface LinkCard {
  title: string;
  slug: string;
  href?: string;
  otakudesuUrl?: string;
}

export interface GenreLinkCard {
  title: string;
  genreId: string;
  href?: string;
  otakudesuUrl?: string;
}

export interface AnimeLinkCard {
  title: string;
  animeId: string;
  href?: string;
  otakudesuUrl?: string;
}

export interface BatchLinkCard {
  title: string;
  batchId: string;
  href?: string;
  otakudesuUrl?: string;
}

export interface EpisodeLinkCard {
  title: number | null;
  episodeId: string;
  href?: string;
  otakudesuUrl?: string;
}

export interface NavEpisodeLinkCard {
  title: string;
  episodeId: string;
  href?: string;
  otakudesuUrl?: string;
}

export interface Details {
  info: any;
  genreList: GenreLinkCard[];
}

export interface Synopsis {
  paragraphs: string[];
  connections?: AnimeLinkCard[];
}
