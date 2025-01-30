export interface AnimeCard1 {
  title: string;
  poster: string;
  episodes: string;
  releasedOn: string;
  batchId?: string;
  animeId?: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface AnimeCard2 {
  title: string;
  poster: string;
  status: string;
  type: string;
  score: string;
  animeId?: string;
  batchId?: string;
  href?: string;
  samehadakuUrl?: string;
  genreList: GenreLinkCard[];
}

export interface AnimeCard3 {
  title: string;
  poster: string;
  releaseDate: string;
  animeId: string;
  href?: string;
  samehadakuUrl?: string;
  genreList: GenreLinkCard[];
}

export interface AnimeCard4 {
  title: string;
  poster: string;
  type: string;
  score: string;
  estimation: string;
  animeId: string;
  href?: string;
  samehadakuUrl?: string;
  genres: string;
}

export interface AnimeCard5 {
  title: string;
  poster: string;
  releaseDate: string;
  episodeId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface AnimeCard6 {
  title: string;
  poster: string;
  animeId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface LinkCard {
  title: string;
  slug: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface GenreLinkCard {
  title: string;
  genreId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface AnimeLinkCard {
  title: string;
  animeId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface EpisodeLinkCard {
  title: number | null;
  episodeId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface NavEpisodeLinkCard {
  title: string;
  episodeId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface BatchLinkCard {
  title: string;
  batchId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface Synopsis {
  paragraphs: string[];
  connections?: AnimeLinkCard[];
}
