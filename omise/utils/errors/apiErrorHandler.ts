import { BaseError, createBaseError } from "./baseError";

export interface APIError extends BaseError {
  type: "APIError";
  response?: any;
}

export const createAPIError = (
  message: string,
  code?: number,
  response?: any
): APIError => ({
  ...createBaseError(message, code),
  type: "APIError",
  response,
});

export const isAPIError = (error: any): error is APIError => {
  return error.type === "APIError";
};
