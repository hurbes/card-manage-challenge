import { AxiosRequestConfig } from "axios"; // Import AxiosRequestConfig from axios

// Extend AxiosRequestConfig with additional properties
declare module "axios" {
  interface AxiosRequestConfig {
    usePublicKey?: boolean;
  }
}
