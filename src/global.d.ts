interface IAppConfig {
  PORT: number;
  sourceUrl: boolean;
}

interface IAnimeConfig {
  baseUrl: string;
}

interface IPagination {
  currentPage: number | null;
  prevPage: number | null;
  hasPrevPage: boolean;
  nextPage: number | null;
  hasNextPage: boolean;
  totalPages: number | null;
}

interface IPayload {
  statusCode: number;
  statusMessage: string;
  message: string;
  data: Record<string, any> | null;
  pagination: TPagination | null;
}

interface ISynopsis {
  paragraphList: string[];
}

interface IUrl {
  title: string;
  url: string;
}

interface IServer {
  title: string;
  serverId: string;
}

interface IQuality {
  title: string;
  size?: string;
  urlList?: IUrl[];
  serverList?: IServer[];
}

interface IFormat {
  title: string;
  qualityList: IQuality[];
}

interface IRouteData {
  path: string;
  method: string;
  description: string;
  pathParams: {
    key: string;
    value: string;
    defaultValue: string | null;
    required: boolean;
  }[];
  queryParams: {
    key: string;
    value: string;
    defaultValue: string | null;
    required: boolean;
  }[];
}
