import { BaseError, createBaseError } from "./baseError";

export interface DataParsingError extends BaseError {
  type: "DataParsingError";
}

export const createDataParsingError = (
  message: string,
  code?: number,
  data?: any
): DataParsingError => ({
  ...createBaseError(message, code, data),
  type: "DataParsingError",
});

export const isDataParsingError = (error: any): error is DataParsingError => {
  return error.type === "DataParsingError";
};
