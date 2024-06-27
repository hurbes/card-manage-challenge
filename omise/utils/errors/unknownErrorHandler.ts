import { BaseError, createBaseError } from "./baseError";

export interface UnknownError extends BaseError {
  type: "UnknownError";
}

export const createUnknownError = (
  message: string,
  code?: number
): UnknownError => ({
  ...createBaseError(message, code),
  type: "UnknownError",
});

export const isUnknownError = (error: any): error is UnknownError => {
  return error.type === "UnknownError";
};
