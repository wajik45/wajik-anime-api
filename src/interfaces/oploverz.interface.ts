export interface IHome {
  popularToday: {
    animeList: IPopularCard[];
  };
  latestRelease: {
    animeList: ILatestCard[];
  };
}

export interface IPopularCard {
  title: string;
  poster: string;
  type: string;
  episode: string;
  seriesName: string;
  href: string;
}

export interface ILatestCard {
  title: string;
  poster: string;
  type: string;
  episode: string;
  status: string;
  score: string;
  genres: string[];
  releaseTime: string;
  seriesName: string;
  href: string;
}

export interface IEpisodeItem {
  episode: string;
  title: string;
  date: string;
  href: string;
}

export interface IScheduleCard {
  title: string;
  poster: string;
  slug: string;
  href: string;
  day: string;
  status: string;
  episode: string;
}

export interface IScheduleDay {
  day: string;
  animeList: IScheduleCard[];
}

export interface ISchedule {
  scheduleList: IScheduleDay[];
}

export interface IListModeItem {
  title: string;
  slug: string;
  href: string;
}

export interface IListModeSection {
  letter: string;
  animeList: IListModeItem[];
}

export interface IAnimeDirectory {
  sectionList: IListModeSection[];
}

export interface ISearchCard {
  title: string;
  poster: string;
  type: string;
  status: string;
  slug: string;
  href: string;
}

export interface INavLink {
  title: string;
  href: string;
}

export interface IEpisodeDetails {
  title: string;
  episodeNumber: string;
  seriesName: string;
  seriesSlug: string;
  seriesHref: string;
  streamingUrl: string;
  releasedOn: string;
  hasPrevEpisode: boolean;
  prevEpisode: INavLink | null;
  hasNextEpisode: boolean;
  nextEpisode: INavLink | null;
  download: IFormat[];
}

export interface IAnimeDetails {
  title: string;
  poster: string;
  status: string;
  studio: string;
  duration: string;
  season: string;
  type: string;
  rating: string;
  releasedOn: string;
  updatedOn: string;
  synopsis: ISynopsis;
  genres: string[];
  episodeList: IEpisodeItem[];
}
