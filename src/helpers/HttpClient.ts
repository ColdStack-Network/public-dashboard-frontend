import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AppConfig } from "config";
import { parseISO } from "date-fns";
import { getToken } from "./common";
import { filterNullable } from "./utils";

const handleDatesInterceptor = () => {
  const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

  const isIsoDateString = (value: any): boolean => {
    return value && typeof value === "string" && isoDateFormat.test(value);
  };

  const handleDates = (body: any) => {
    if (body === null || body === undefined || typeof body !== "object") return body;

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (isIsoDateString(value)) body[key] = parseISO(value);
      else if (typeof value === "object") handleDates(value);
    }
  };

  return (rep: AxiosResponse) => {
    handleDates(rep);
    return rep;
  };
};

const createAxiosClient = (baseUrl = AppConfig.apiUrl) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf8",
    },
  });
};

const client = createAxiosClient();
export const stakingClient = createAxiosClient(AppConfig.stakingUrl);
export const authNodeClient = createAxiosClient(AppConfig.urlAuthNode);

const registerInterceptors = (clients: AxiosInstance[]) => {
  for (const instance of clients) {
    instance.interceptors.response.use(handleDatesInterceptor());
  }
};
registerInterceptors([client, stakingClient, authNodeClient]);

const updateClientToken = (axiosClient = client, bearerAuth = false) => {
  const token = getToken();
  const TOKEN = bearerAuth ? `Bearer ${token}` : token;
  axiosClient.defaults.headers.common["Authorization"] = TOKEN;
};

type ClientConfig = {
  bearerAuth?: boolean;
  externalClient?: AxiosInstance;
};

const apiCall = async <T>(params: AxiosRequestConfig, clientConfig?: ClientConfig): Promise<T> => {
  const bearerAuth = clientConfig?.bearerAuth;
  const externalClient = clientConfig?.externalClient;
  updateClientToken(externalClient, bearerAuth);
  const rep = await (externalClient || client)(params);
  return rep.data;
};
type BaseRequestParams = {
  url: string;
  params?: AxiosRequestConfig;
  data?: unknown;
};
export const apiGet = async <T>({ url, params }: BaseRequestParams, clientConfig?: ClientConfig): Promise<T> => {
  return apiCall({ ...params, url, method: "GET" }, clientConfig);
};

export const apiPost = async <T>({ url, params, data }: BaseRequestParams, clientConfig?: ClientConfig): Promise<T> => {
  return apiCall({ ...params, url, method: "POST", data }, clientConfig);
};

export const apiPut = async <T>({ url, params, data }: BaseRequestParams, clientConfig?: ClientConfig): Promise<T> => {
  return apiCall({ ...params, url, method: "PUT", data }, clientConfig);
};

export const apiDelete = async <T>({ url, params }: BaseRequestParams, clientConfig?: ClientConfig): Promise<T> => {
  const bearerAuth = clientConfig?.bearerAuth;
  const externalClient = clientConfig?.externalClient;
  return apiCall({ ...params, url, method: "DELETE" }, clientConfig);
};

type Primitive = string | number | boolean | undefined | null;

export type BaseParams = {
  [key: string]: Primitive | Primitive[];
};

export const withParams = (patch: string, params: BaseParams) => {
  const args = new URLSearchParams();
  for (let [key, val] of Object.entries(params)) {
    if (val === undefined || val === null) continue;

    if (Array.isArray(val)) {
      val = filterNullable(val)
        .map((x) => x.toString())
        .filter((x) => x.length > 0)
        .join(",");
    }

    val = val.toString();
    if (val.length === 0) continue;

    args.set(key, val);
  }

  const search = args.toString();
  return search.length > 0 ? `${patch}?${search}` : patch;
};

export const httpFormatDate = (date?: Date) => date?.toISOString() || "";
