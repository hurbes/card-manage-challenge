import { APIInput } from "../types/api";

import { handleResponse } from "../utils/responseHandler";

import { BASE_URL } from "../constants/constants";

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

export const createCustomer = async ({
  axios,
  data,
  signal,
}: APIInput<CreateCustomerRequest>): Promise<
  ReturnType<typeof createCustomerResponseSchema.parse>
> => {
  const response = await axios.post("/customers", data, {
    baseURL: BASE_URL,
    signal,
  });
  return handleResponse(response, createCustomerResponseSchema);
};

export const retrieveCustomer = async ({
  axios,
  signal,
  data,
}: APIInput<{ customerId: string }>): Promise<
  ReturnType<typeof retrieveCustomerResponseSchema.parse>
> => {
  const response = await axios.get(`/customers/${data?.customerId}`, {
    baseURL: BASE_URL,
    signal,
  });
  return handleResponse(response, retrieveCustomerResponseSchema);
};

export const updateCustomer = async ({
  axios,
  data,
  signal,
}: APIInput<UpdateCustomerRequest & { customerId: string }>): Promise<
  ReturnType<typeof updateCustomerResponseSchema.parse>
> => {
  const response = await axios.patch(`/customers/${data?.customerId}`, data, {
    baseURL: BASE_URL,
    signal,
  });
  return handleResponse(response, updateCustomerResponseSchema);
};

export const deleteCustomer = async ({
  axios,
  signal,
  data,
}: APIInput<{ customerId: string }>): Promise<
  ReturnType<typeof deleteCustomerResponseSchema.parse>
> => {
  const response = await axios.delete(`/customers/${data?.customerId}`, {
    baseURL: BASE_URL,
    signal,
  });
  return handleResponse(response, deleteCustomerResponseSchema);
};

export const listCustomers = async ({
  axios,
  signal,
}: APIInput<null>): Promise<
  ReturnType<typeof listCustomersResponseSchema.parse>
> => {
  const response = await axios.get("/customers", {
    baseURL: BASE_URL,
    signal,
  });
  return handleResponse(response, listCustomersResponseSchema);
};
