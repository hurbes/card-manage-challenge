import { z, ZodError } from "zod";
import { createAPIError } from "./errors/apiErrorHandler";
import { createDataParsingError } from "./errors/dataParsingErrorHandler";
import { createNetworkError } from "./errors/networkErrorHandler";
import { createUnknownError } from "./errors/unknownErrorHandler";
import { AxiosError, AxiosResponse } from "axios";

export const handleResponse = async <T>(
  response: AxiosResponse,
  schema: z.ZodSchema<T>
): Promise<T> => {
  if (!response.status) {
    throw createNetworkError("Network error occurred");
  }

  try {
    const data: T = response.data;
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw createDataParsingError(
        "Data parsing error occurred",
        response.status,
        response.data
      );
    }
    if (error instanceof AxiosError) {
      throw createAPIError("API error occurred", response.status, error);
    }
    console.error("parse try", error);
    throw createUnknownError("An unknown error occurred");
  }
};
