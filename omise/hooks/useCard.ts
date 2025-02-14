import { useAxiosInstance } from "../utils/axiosInstance";
import {
  cardListSchema,
  cardSchema,
  deleteCardResponseSchema,
  UpdateCardRequest,
} from "../utils/validators/cardValidators";
import { BaseError } from "../utils/errors/baseError";
import { useMutationWrapper, useQueryWrapper } from "../utils/queryWrapper";
import {
  deleteCard,
  fetchAllCards,
  fetchCard,
  updateCard,
} from "../services/cardService";

import type { OmiseResult, OmiseMutationResult } from "../utils/queryWrapper";

// Fetch a single card
export function useFetchCard(
  customerId: string,
  cardId: string
): OmiseResult<ReturnType<typeof cardSchema.parse>, BaseError> {
  const axios = useAxiosInstance();
  const data = { customerId, cardId };

  return useQueryWrapper<ReturnType<typeof cardSchema.parse>, BaseError>({
    queryKey: ["card", customerId, cardId],
    queryFn: async ({ signal }) => {
      const response = await fetchCard({ axios, signal }, data);
      return cardSchema.parse(response);
    },
  });
}

// Fetch all cards for a customer
export function useFetchAllCards(
  customerId: string
): OmiseResult<ReturnType<typeof cardListSchema.parse>, BaseError> {
  const axios = useAxiosInstance();
  return useQueryWrapper<ReturnType<typeof cardListSchema.parse>, BaseError>({
    queryKey: ["cards", customerId],
    queryFn: async ({ signal }) => {
      const response = await fetchAllCards({ axios, signal }, customerId);
      return cardListSchema.parse(response);
    },
  });
}

// Update an existing card
export function useUpdateCard(
  customerId: string,
  cardId: string
): OmiseMutationResult<
  ReturnType<typeof cardSchema.parse>,
  BaseError,
  { data: UpdateCardRequest }
> {
  const axios = useAxiosInstance();

  return useMutationWrapper<
    ReturnType<typeof cardSchema.parse>,
    BaseError,
    { data: UpdateCardRequest }
  >({
    mutationFn: async ({ data }) => {
      const params = { customerId, cardId };
      const response = await updateCard({ axios, data }, params);
      return cardSchema.parse(response);
    },
  });
}

// Delete a card
export function useDeleteCard(
  customerId: string,
  cardId: string
): OmiseMutationResult<
  ReturnType<typeof deleteCardResponseSchema.parse>,
  BaseError,
  void
> {
  const axios = useAxiosInstance();

  return useMutationWrapper<
    ReturnType<typeof deleteCardResponseSchema.parse>,
    BaseError,
    void
  >({
    mutationFn: async () => {
      const params = { customerId, cardId };
      const response = await deleteCard({ axios }, params);
      return deleteCardResponseSchema.parse(response);
    },
  });
}
