import axios, { AxiosInstance } from "axios";
import { useOmiseConfig } from "../config";
import base64 from "base-64";

const instance = axios.create();
export const useAxiosInstance = ({
  usePublicKey = false,
}: {
  usePublicKey?: boolean;
}): AxiosInstance => {
  const { apiKey, secretKey, apiVersion, vaultApiVersion } = useOmiseConfig();

  const key = usePublicKey ? apiKey : secretKey;

  instance.interceptors.request.use(
    (config) => {
      if (config.headers) {
        (config.headers["Authorization"] = "Basic " + base64.encode(key + ":")),
          (config.headers["Omise-Version"] = apiVersion);
        if (vaultApiVersion) {
          config.headers["Vault-Version"] = vaultApiVersion;
        }
      }
      console.log(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
