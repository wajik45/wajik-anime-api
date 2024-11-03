export interface Url {
  title: string;
  url: string;
}

export interface Server {
  title: string;
  serverId: string;
  href?: string;
}

export interface Quality {
  title: string;
  size?: string;
  urls?: Url[];
  serverList?: Server[];
}

export interface Format {
  title: string;
  qualities: Quality[];
}

export interface QueryParam {
  key: string;
  value: {
    type: string;
    default: any;
    required: boolean;
  };
}

export interface RouteParam {
  placeholder: string;
  value: {
    type: string;
    default: any;
    required: boolean;
  };
}

export interface AnimeSource {
  title: string;
  baseUrl: string;
  baseUrlPath: string;
  message: string;
  ok: boolean;
  routesView: {
    title: string;
    route: string;
    routeParams?: RouteParam[];
    queryParams?: QueryParam[];
  }[];
}
