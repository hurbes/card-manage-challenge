import { z } from "zod";
import { APIInput } from "../types/api";
import {
  createTokenRequestSchema,
  tokenResponseSchema,
} from "../utils/validators/tokenValidators";
import { BASE_URL } from "../constants/constants";
import { handleResponse } from "../utils/responseHandler";

export const createToken = async ({
  axios,
  data,
  signal,
}: APIInput<z.infer<typeof createTokenRequestSchema>>): Promise<
  ReturnType<typeof tokenResponseSchema.parse>
> => {
  const response = await axios.post("/tokens", data, {
    baseURL: BASE_URL,
    signal,
  });

  return handleResponse(response, tokenResponseSchema);
};

export const retrieveToken = async (
  { axios, signal }: APIInput,
  params: { tokenId: string }
): Promise<ReturnType<typeof tokenResponseSchema.parse>> => {
  const { tokenId } = params;
  const response = await axios.get(`/tokens/${tokenId}`, {
    baseURL: BASE_URL,
    signal,
  });

  return handleResponse(response, tokenResponseSchema);
};
