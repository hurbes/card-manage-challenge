import { z } from "zod";
// Common Card Schema
const customerCardSchema = z.object({
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
  name: z.string(),
  security_code_check: z.boolean().optional(),
  created_at: z.string(), // corrected to match the API response
  deleted: z.boolean(), // added
  street1: z.string().nullable(), // added
  street2: z.string().nullable(), // added
  state: z.string().nullable(), // added
  phone_number: z.string().nullable(), // added
  first_digits: z.string().nullable(), // added
  tokenization_method: z.string().nullable(), // added
});

// List All Cards Schema
const cardListSchema = z.object({
  object: z.literal("list"),
  from: z.string().nullable(),
  to: z.string().nullable(),
  offset: z.number(),
  limit: z.number(),
  total: z.number(),
  data: z.array(customerCardSchema),
  location: z.string(),
  order: z.string(),
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
type CardResponse = z.infer<typeof customerCardSchema>;
type UpdateCardRequest = z.infer<typeof updateCardRequestSchema>;
type CardListResponse = z.infer<typeof cardListSchema>;

export {
  customerCardSchema,
  cardListSchema,
  updateCardRequestSchema,
  deleteCardResponseSchema,
};

export type {
  CardResponse,
  UpdateCardRequest,
  CardListResponse,
  DeleteCardResponse,
};
