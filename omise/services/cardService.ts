import { APIInput } from "../types/api";
import { cardListSchema, cardSchema } from "../utils/validators/cardValidators";
import { handleResponse } from "../utils/responseHandler";
import {
  CreateCardRequest,
  deleteCardResponseSchema,
  UpdateCardRequest,
} from "../utils/validators/cardValidators";
import { BASE_URL, VAULT_URL } from "../constants/constants";

export const fetchCard = async (
  { axios, signal }: APIInput,
  params: { customerId: string; cardId: string }
): Promise<ReturnType<typeof cardSchema.parse>> => {
  const { customerId, cardId } = params;
  const response = await axios.get(`/customers/${customerId}/cards/${cardId}`, {
    signal,
    baseURL: BASE_URL,
  });

  return handleResponse(response, cardSchema);
};

export const fetchAllCards = async (
  { axios, signal }: APIInput<Record<string, string>>,
  customerId: string
): Promise<ReturnType<typeof cardListSchema.parse>> => {
  const response = await axios.get(`/customers/${customerId}/cards`, {
    signal,
    baseURL: BASE_URL,
  });

  return handleResponse(response, cardListSchema);
};

export const createCard = async (
  { axios, data, signal }: APIInput<CreateCardRequest>,
  customerId: string
): Promise<ReturnType<typeof cardSchema.parse>> => {
  const response = await axios.post(`/customers/${customerId}/cards`, data, {
    signal,
    url: VAULT_URL,
  });

  return handleResponse(response, cardSchema);
};

export const updateCard = async (
  { axios, data, signal }: APIInput<UpdateCardRequest>,
  params: { customerId: string; cardId: string }
): Promise<ReturnType<typeof cardSchema.parse>> => {
  const { customerId, cardId } = params;
  const response = await axios.patch(
    `/customers/${customerId}/cards/${cardId}`,
    data,
    { signal, baseURL: BASE_URL }
  );

  return handleResponse(response, cardSchema);
};

export const deleteCard = async (
  { axios, signal }: APIInput,
  params: { customerId: string; cardId: string }
): Promise<ReturnType<typeof deleteCardResponseSchema.parse>> => {
  const { customerId, cardId } = params;
  const response = await axios.delete(
    `/customers/${customerId}/cards/${cardId}`,
    { signal, baseURL: BASE_URL }
  );

  return handleResponse(response, deleteCardResponseSchema);
};
