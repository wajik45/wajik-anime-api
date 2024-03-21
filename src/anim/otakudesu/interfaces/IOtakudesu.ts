export interface IList {
  judul: string;
  slug: string;
  href: string;
  otakudesuUrl: string;
}

export interface IOnGoing {
  judul: string;
  episodeTerbaru: string;
  hariRilis: string;
  poster: string;
  otakudesuUrl: string;
  slug: string;
  href: string;
  tanggalRilisTerbaru: string;
}

export interface ICompleted {
  judul: string;
  jumlahEpisode: string;
  rating: string;
  poster: string;
  otakudesuUrl: string;
  slug: string;
  href: string;
  tanggalRilisTerakhir: string;
}

export interface ISearch {
  judul: string;
  slug: string;
  genres: IList[];
  status: string;
  rating: string;
  poster: string;
  otakudesuUrl: string;
}

export interface IJadwalRilis {
  hari: string;
  anime: IList[];
}

export interface IAnimeList {
  berdasarkan: string;
  anime: IList[];
}

export interface IGenreList {
  judul: string;
  slug: string;
  href: string;
  otakudesuUrl: string;
}

export interface IGenre {
  judul: string;
  slug: string;
  href: string;
  poster: string;
  studio: string;
  otakudesuUrl: string;
  jumlahEpisode: string;
  rating: string;
  musim: string;
  sinopsis: string[];
  genres: IList[];
}
