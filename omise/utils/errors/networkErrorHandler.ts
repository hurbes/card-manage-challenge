import { BaseError, createBaseError } from "./baseError";

export interface NetworkError extends BaseError {
  type: "NetworkError";
}

export const createNetworkError = (
  message: string,
  data?: any,
  code?: number
): NetworkError => ({
  ...createBaseError(message, code, data),
  type: "NetworkError",
});

export const isNetworkError = (error: any): error is NetworkError => {
  return error.type === "NetworkError";
};
