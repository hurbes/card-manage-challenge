import { AxiosInstance } from "axios";

interface APIInput<T = {}> {
  axios: AxiosInstance;
  signal?: AbortSignal;
  data?: T;
}

export type { APIInput };
