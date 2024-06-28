import { useQueryWrapper, useMutationWrapper } from "../utils/queryWrapper";
import { useAxiosInstance } from "../utils/axiosInstance";
import { createToken, retrieveToken } from "../services/tokenService";
import { BaseError } from "../utils/errors/baseError";

import { tokenResponseSchema } from "../utils/validators/tokenValidators";

import type { CreateTokenRequest } from "../utils/validators/tokenValidators";
import type { OmiseMutationResult, OmiseResult } from "../utils/queryWrapper";

export function useCreateToken(): OmiseMutationResult<
  ReturnType<typeof tokenResponseSchema.parse>,
  BaseError,
  { data: CreateTokenRequest }
> {
  const axios = useAxiosInstance();

  return useMutationWrapper<
    ReturnType<typeof tokenResponseSchema.parse>,
    BaseError,
    { data: CreateTokenRequest }
  >({
    mutationFn: async ({ data }) => {
      const response = await createToken({ axios, data });
      return tokenResponseSchema.parse(response);
    },
  });
}

export function useRetrieveToken(
  tokenId: string
): OmiseResult<ReturnType<typeof tokenResponseSchema.parse>, BaseError> {
  const axios = useAxiosInstance();

  return useQueryWrapper<
    ReturnType<typeof tokenResponseSchema.parse>,
    BaseError
  >({
    queryKey: ["token", tokenId],
    queryFn: async ({ signal }) => {
      const response = await retrieveToken(
        {
          axios,
          signal,
        },
        { tokenId }
      );
      return tokenResponseSchema.parse(response);
    },
  });
}
