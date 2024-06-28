import axios, { AxiosInstance } from "axios";
import { useOmiseConfig } from "../config";
import base64 from "base-64";

const instance = axios.create();
export const useAxiosInstance = (): AxiosInstance => {
  const { publicKey, secretKey, apiVersion } = useOmiseConfig();

  instance.interceptors.request.use(
    function (config) {
      const key = config.usePublicKey ? publicKey : secretKey;

      config.headers["Authorization"] = "Basic " + base64.encode(key + ":");
      config.headers["Omise-Version"] = apiVersion;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
