import { z } from "zod";

// Create Token Request Schema
const createTokenRequestSchema = z.object({
  card: z
    .object({
      name: z.string(),
      number: z.string(),
      expiration_month: z.number().min(1).max(12),
      expiration_year: z.number(),
      security_code: z.string(),
    })
    .optional(),
  bank_account: z
    .object({
      name: z.string(),
      bank_code: z.string(),
      account_number: z.string(),
      account_holder_name: z.string(),
    })
    .optional(),
});

// Token Response Schema
const tokenResponseSchema = z.object({
  id: z.string(),
  object: z.literal("token"),
  livemode: z.boolean(),
  location: z.string(),
  used: z.boolean(),
  card: z
    .object({
      id: z.string(),
      object: z.literal("card"),
      livemode: z.boolean(),
      country: z.string(),
      city: z.string().nullable(),
      postal_code: z.string().nullable(),
      financing: z.string(),
      last_digits: z.string(),
      brand: z.string(),
      expiration_month: z.number(),
      expiration_year: z.number(),
      fingerprint: z.string(),
      name: z.string().nullable(),
      security_code_check: z.boolean(),
      created: z.string(),
    })
    .optional(),
  bank_account: z
    .object({
      id: z.string(),
      object: z.literal("bank_account"),
      livemode: z.boolean(),
      bank_code: z.string(),
      branch_code: z.string(),
      account_number: z.string(),
      account_holder_name: z.string(),
      account_holder_type: z.string(),
      created: z.string(),
    })
    .optional(),
  created: z.string(),
});

type TokenResponse = z.infer<typeof tokenResponseSchema>;
type CreateTokenRequest = z.infer<typeof createTokenRequestSchema>;

export { createTokenRequestSchema, tokenResponseSchema };
export type { TokenResponse, CreateTokenRequest };
