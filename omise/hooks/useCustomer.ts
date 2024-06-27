import { useAxiosInstance } from "../utils/axiosInstance";

import {
  createCustomer,
  retrieveCustomer,
  updateCustomer,
  deleteCustomer,
  listCustomers,
} from "../services/customerService";

import {
  createCustomerResponseSchema,
  deleteCustomerResponseSchema,
  listCustomersResponseSchema,
  retrieveCustomerResponseSchema,
  updateCustomerResponseSchema,
} from "../utils/validators/customerValidators";

import type {
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "../utils/validators/customerValidators";

import { BaseError } from "../utils/errors/baseError";
import {
  OmiseMutationResult,
  OmiseResult,
  useMutationWrapper,
  useQueryWrapper,
} from "../utils/queryWrapper";

export function useCreateCustomer(
  data: CreateCustomerRequest
): OmiseMutationResult<
  ReturnType<typeof createCustomerResponseSchema.parse>,
  BaseError,
  { data: CreateCustomerRequest }
> {
  const axios = useAxiosInstance({ usePublicKey: false });

  return useMutationWrapper<
    ReturnType<typeof createCustomerResponseSchema.parse>,
    BaseError,
    { data: CreateCustomerRequest }
  >({
    mutationFn: async () => {
      const response = await createCustomer({ axios, data });
      return createCustomerResponseSchema.parse(response);
    },
  });
}

export function useRetrieveCustomer(
  customerId: string
): OmiseResult<
  ReturnType<typeof retrieveCustomerResponseSchema.parse>,
  BaseError
> {
  const axios = useAxiosInstance({ usePublicKey: false });

  return useQueryWrapper<
    ReturnType<typeof retrieveCustomerResponseSchema.parse>,
    BaseError
  >({
    queryKey: ["customer", customerId],
    queryFn: async ({ signal }) => {
      const response = await retrieveCustomer({
        axios,
        signal,
        data: { customerId },
      });
      return retrieveCustomerResponseSchema.parse(response);
    },
  });
}

export function useUpdateCustomer(
  customerId: string,
  data: UpdateCustomerRequest
): OmiseMutationResult<
  ReturnType<typeof updateCustomerResponseSchema.parse>,
  BaseError,
  { data: UpdateCustomerRequest }
> {
  const axios = useAxiosInstance({ usePublicKey: false });

  return useMutationWrapper<
    ReturnType<typeof updateCustomerResponseSchema.parse>,
    BaseError,
    { data: UpdateCustomerRequest }
  >({
    mutationFn: async () => {
      const response = await updateCustomer({
        axios,
        data: { ...data, customerId },
      });
      return updateCustomerResponseSchema.parse(response);
    },
  });
}

export function useDeleteCustomer(
  customerId: string
): OmiseMutationResult<
  ReturnType<typeof deleteCustomerResponseSchema.parse>,
  BaseError,
  { data: { customerId: string } }
> {
  const axios = useAxiosInstance({ usePublicKey: false });

  return useMutationWrapper<
    ReturnType<typeof deleteCustomerResponseSchema.parse>,
    BaseError,
    { data: { customerId: string } }
  >({
    mutationFn: async () => {
      const response = await deleteCustomer({
        axios,
        data: { customerId },
      });
      return deleteCustomerResponseSchema.parse(response);
    },
  });
}

export function useListCustomers(): OmiseResult<
  ReturnType<typeof listCustomersResponseSchema.parse>,
  BaseError
> {
  const axios = useAxiosInstance({ usePublicKey: false });

  return useQueryWrapper<
    ReturnType<typeof listCustomersResponseSchema.parse>,
    BaseError
  >({
    queryKey: ["customers"],
    queryFn: async ({ signal }) => {
      const response = await listCustomers({ axios, signal });
      return listCustomersResponseSchema.parse(response);
    },
  });
}
