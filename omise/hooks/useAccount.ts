import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { useAxiosInstance } from "../utils/axiosInstance";
import { BaseError } from "../utils/errors/baseError";
import { fetchAccount, patchAccount } from "../services/acountService";
import {
  AccountParams,
  accountSchema,
} from "../utils/validators/accountValidators";
import {
  OmiseMutationResult,
  useMutationWrapper,
  useQueryWrapper,
} from "../utils/queryWrapper";

export function useAccount(): UseQueryResult<
  ReturnType<typeof accountSchema.parse>,
  BaseError
> {
  const axios = useAxiosInstance({ usePublicKey: false });

  return useQueryWrapper<ReturnType<typeof accountSchema.parse>, BaseError>({
    queryKey: ["account"],
    queryFn: async ({ signal }) => {
      const response = await fetchAccount({ axios, signal });
      return accountSchema.parse(response);
    },
  });
}

export function useUpdateAccount(): OmiseMutationResult<
  ReturnType<typeof accountSchema.parse>,
  BaseError,
  { data: AccountParams }
> {
  const axios = useAxiosInstance({ usePublicKey: false });

  return useMutationWrapper<
    ReturnType<typeof accountSchema.parse>,
    BaseError,
    { data: AccountParams }
  >({
    mutationFn: async ({ data }) => {
      const response = await patchAccount({ axios, data });
      return accountSchema.parse(response);
    },
  });
}
