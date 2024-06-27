import { z } from "zod";

const accountSchema = z.object({
  api_version: z.string(),
  auto_activate_recipients: z.boolean(),
  chain_enabled: z.boolean(),
  chain_return_uri: z.nullable(z.string()),
  chaining_allowed: z.boolean(),
  country: z.string(),
  created_at: z.string(),
  currency: z.string(),
  email: z.string().email(),
  id: z.string(),
  last_updated_api_version: z.string(),
  livemode: z.boolean(),
  location: z.string(),
  metadata_export_keys: z.object({
    charge: z.array(z.unknown()),
    transfer: z.array(z.unknown()),
    refund: z.array(z.unknown()),
    dispute: z.array(z.unknown()),
  }),
  object: z.string(),
  supported_currencies: z.array(z.string()),
  team: z.string(),
  transfer_config: z.object({
    min_transfer_amount: z.string(),
    max_transfer_amount: z.string(),
    same_bank_max_transfer_amount: z.string(),
    is_payout_enabled: z.boolean(),
    fee: z.string(),
    provider: z.nullable(z.string()),
    merchant_id: z.nullable(z.string()),
  }),
  webhook_uri: z.string().url(),
  zero_interest_installments: z.boolean(),
});

const accountParams = z.object({
  email: z.string().email().optional(),
  chain_return_uri: z.string().nullable().optional(),
  metadata: z.object({}).optional(), // Metadata fields can be added as per specific requirements
  webhook_uri: z.string().url().optional(),
  zero_interest_installments: z.boolean().optional(),
});

// Export the type inferred from the schema
type AccountRequest = z.infer<typeof accountSchema>;
type AccountParams = z.infer<typeof accountParams>;

export { accountSchema, accountParams };

export type { AccountRequest, AccountParams };
