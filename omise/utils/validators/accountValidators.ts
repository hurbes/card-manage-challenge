import { z } from "zod";

const accountSchema = z.object({
  id: z.string(),
  object: z.literal("account"),
  api_version: z.string(),
  auto_activate_recipients: z.boolean(),
  chain_enabled: z.boolean(),
  chain_return_uri: z.string().nullable(),
  chaining_allowed: z.boolean(),
  country: z.string(),
  created_at: z.string(),
  currency: z.string(),
  email: z.string(),
  last_updated_api_version: z.string(),
  livemode: z.boolean(),
  location: z.string(),
  metadata_export_keys: z.object({
    charge: z.array(z.string()),
    transfer: z.array(z.string()),
    refund: z.array(z.string()),
    dispute: z.array(z.string()),
  }),
  supported_currencies: z.array(z.string()),
  team: z.string(),
  transfer_config: z.object({
    min_transfer_amount: z.string(),
    max_transfer_amount: z.string(),
    same_bank_max_transfer_amount: z.string(),
    is_payout_enabled: z.boolean(),
    fee: z.string(),
    provider: z.string().nullable(),
    merchant_id: z.string().nullable(),
  }),
  webhook_uri: z.string(),
  zero_interest_installments: z.boolean(),
});

const accountParams = z.object({
  email: z.string().optional(),
  webhook_uri: z.string().optional(),
  transfer_config: z
    .object({
      min_transfer_amount: z.string().optional(),
      max_transfer_amount: z.string().optional(),
      same_bank_max_transfer_amount: z.string().optional(),
      is_payout_enabled: z.boolean().optional(),
      fee: z.string().optional(),
      provider: z.string().nullable().optional(),
      merchant_id: z.string().nullable().optional(),
    })
    .optional(),
  metadata_export_keys: z
    .object({
      charge: z.array(z.string()).optional(),
      transfer: z.array(z.string()).optional(),
      refund: z.array(z.string()).optional(),
      dispute: z.array(z.string()).optional(),
    })
    .optional(),
});

// Export the type inferred from the schema
type AccountRequest = z.infer<typeof accountSchema>;
type AccountParams = z.infer<typeof accountParams>;

export { accountSchema, accountParams };

export type { AccountRequest, AccountParams };
