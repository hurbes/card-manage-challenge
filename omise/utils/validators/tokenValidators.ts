import { z } from "zod";

// Card Schema
const cardSchema = z.object({
  name: z.string(),
  number: z.string(),
  expiration_month: z.number().min(1).max(12),
  expiration_year: z.number(),
  security_code: z.string(),
  city: z.string().optional(),
  country: z.string().optional(),
  phone_number: z.string().optional(),
  postal_code: z.string().optional(),
  state: z.string().optional(),
  street1: z.string().optional(),
  street2: z.string().optional(),
});

// Bank Account Schema
const bankAccountSchema = z.object({
  name: z.string(),
  bank_code: z.string(),
  account_number: z.string(),
  account_holder_name: z.string(),
});

// Create Token Request Schema
const createTokenRequestSchema = z.object({
  card: cardSchema.optional(),
  bank_account: bankAccountSchema.optional(),
});

const cardResponseSchema = z.object({
  id: z.string(),
  object: z.literal("card"),
  livemode: z.boolean(),
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
  security_code_check: z.boolean(),
  created_at: z.string(),
  location: z.string().nullable(),
  deleted: z.boolean().optional(),
  street1: z.string().nullable().optional(),
  street2: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  phone_number: z.string().nullable().optional(),
  first_digits: z.string().nullable().optional(),
  tokenization_method: z.string().nullable().optional(),
});

const bankResponseSchema = z.object({
  id: z.string(),
  object: z.literal("bank_account"),
  livemode: z.boolean(),
  bank_code: z.string(),
  branch_code: z.string(),
  account_number: z.string(),
  account_holder_name: z.string(),
  account_holder_type: z.string(),
  created: z.string(),
});
// Token Response Schema
const tokenResponseSchema = z.object({
  id: z.string(),
  object: z.literal("token"),
  livemode: z.boolean(),
  location: z.string(),
  used: z.boolean(),
  card: cardResponseSchema.optional(),
  bank_account: bankResponseSchema.optional(),
  created_at: z.string(),
  charge_status: z.string(),
});

type TokenResponse = z.infer<typeof tokenResponseSchema>;
type CreateTokenRequest = z.infer<typeof createTokenRequestSchema>;
type Card = z.infer<typeof cardSchema>;
type BankAccount = z.infer<typeof bankAccountSchema>;

export {
  createTokenRequestSchema,
  tokenResponseSchema,
  cardSchema,
  bankAccountSchema,
};
export type { TokenResponse, CreateTokenRequest, Card, BankAccount };
