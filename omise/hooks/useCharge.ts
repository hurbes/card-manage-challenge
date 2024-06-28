import { useAxiosInstance } from "../utils/axiosInstance";

import { BaseError } from "../utils/errors/baseError";

import {
  CreateChargeRequest,
  ListAllChargesParams,
} from "../utils/validators/chargeValidators";

import {
  captureChargeResponseSchema,
  createChargeResponseSchema,
  listAllChargesResponseSchema,
  retrieveChargeResponseSchema,
} from "../utils/validators/chargeValidators";

import {
  createCharge,
  retrieveCharge,
  captureCharge,
  listAllCharges,
} from "../services/chargeService";

import { useMutationWrapper, useQueryWrapper } from "../utils/queryWrapper";
import type { OmiseMutationResult, OmiseResult } from "../utils/queryWrapper";

export function useCreateCharge(): OmiseMutationResult<
  ReturnType<typeof createChargeResponseSchema.parse>,
  BaseError,
  { data: CreateChargeRequest }
> {
  const axios = useAxiosInstance();

  return useMutationWrapper<
    ReturnType<typeof createChargeResponseSchema.parse>,
    BaseError,
    { data: CreateChargeRequest }
  >({
    mutationFn: async ({ data }) => {
      const response = await createCharge({ axios, data });
      return createChargeResponseSchema.parse(response);
    },
  });
}

export function useRetrieveCharge(
  chargeId: string
): OmiseResult<
  ReturnType<typeof retrieveChargeResponseSchema.parse>,
  BaseError
> {
  const axios = useAxiosInstance();

  return useQueryWrapper<
    ReturnType<typeof retrieveChargeResponseSchema.parse>,
    BaseError
  >({
    queryKey: ["charge", chargeId],
    queryFn: async ({ signal }) => {
      const response = await retrieveCharge({
        axios,
        data: { chargeId },
        signal,
      });
      return retrieveChargeResponseSchema.parse(response);
    },
  });
}

export function useCaptureCharge(): OmiseMutationResult<
  ReturnType<typeof captureChargeResponseSchema.parse>,
  BaseError,
  { data: { chargeId: string } }
> {
  const axios = useAxiosInstance();

  return useMutationWrapper<
    ReturnType<typeof captureChargeResponseSchema.parse>,
    BaseError,
    { data: { chargeId: string } }
  >({
    mutationFn: async ({ data }) => {
      const response = await captureCharge({
        axios,
        data: data,
      });
      return captureChargeResponseSchema.parse(response);
    },
  });
}

export function useListAllCharges(
  params: ListAllChargesParams
): OmiseResult<
  ReturnType<typeof listAllChargesResponseSchema.parse>,
  BaseError
> {
  const axios = useAxiosInstance();

  return useQueryWrapper<
    ReturnType<typeof listAllChargesResponseSchema.parse>,
    BaseError
  >({
    queryKey: ["charges", params],
    queryFn: async ({ signal }) => {
      const response = await listAllCharges({ axios, data: params, signal });
      return listAllChargesResponseSchema.parse(response);
    },
  });
}
