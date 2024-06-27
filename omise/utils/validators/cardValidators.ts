import { z } from "zod";

// Common Card Schema
const cardSchema = z.object({
  id: z.string(),
  object: z.literal("card"),
  livemode: z.boolean(),
  location: z.string(),
  country: z.string(),
  city: z.string().nullable(),
  postal_code: z.string().nullable(),
  financing: z.string().nullable(),
  bank: z.string().nullable(),
  last_digits: z.string(),
  brand: z.string(),
  expiration_month: z.number(),
  expiration_year: z.number(),
  fingerprint: z.string(),
  name: z.string().nullable(),
  created: z.string(), // confirmed to be string as it's a timestamp
});

// List All Cards
const cardListSchema = z.object({
  object: z.literal("list"),
  from: z.string().nullable(),
  to: z.string().nullable(),
  offset: z.number(),
  limit: z.number(),
  total: z.number(),
  data: z.array(cardSchema),
});

// Create a Card
const createCardRequestSchema = z.object({
  card: z.string(),
});

// Update a Card
const updateCardRequestSchema = z.object({
  name: z.string().nullable(),
  expiration_month: z.number().nullable(),
  expiration_year: z.number().nullable(),
  postal_code: z.string().nullable(),
  city: z.string().nullable(),
});

// Delete a Card
const deleteCardResponseSchema = z.object({
  deleted: z.boolean(),
  id: z.string(),
});

type DeleteCardResponse = z.infer<typeof deleteCardResponseSchema>;
type CardResponse = z.infer<typeof cardSchema>;
type UpdateCardRequest = z.infer<typeof updateCardRequestSchema>;
type CreateCardRequest = z.infer<typeof createCardRequestSchema>;
type CardListResponse = z.infer<typeof cardListSchema>;

export {
  cardSchema,
  cardListSchema,
  createCardRequestSchema,
  updateCardRequestSchema,
  deleteCardResponseSchema,
};

export type {
  CardResponse,
  UpdateCardRequest,
  CreateCardRequest,
  CardListResponse,
  DeleteCardResponse,
};
