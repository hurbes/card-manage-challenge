import { z } from "zod";

// Common charge schema
const chargeSchema = z.object({
  object: z.string(),
  id: z.string(),
  livemode: z.boolean(),
  location: z.string(),
  amount: z.number(),
  currency: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  capture: z.boolean(),
  authorized: z.boolean(),
  card: z
    .object({
      object: z.string(),
      id: z.string(),
      brand: z.string(),
      country: z.string(),
      city: z.string().nullable(),
      postal_code: z.string().nullable(),
      last_digits: z.string(),
      created_at: z.string(),
    })
    .nullable(),
  customer: z.string().nullable(),
  created_at: z.string(),
  metadata: z.record(z.string()).optional(),
});

const chargeListSchema = z.object({
  object: z.string(),
  from: z.string(),
  to: z.string(),
  offset: z.number(),
  limit: z.number(),
  total: z.number(),
  data: z.array(chargeSchema),
});

// Create Charge
const createChargeRequestSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  customer: z.string().optional(),
  card: z.string().optional(),
  source: z.string().optional(),
  description: z.string().optional(),
  capture: z.boolean().optional(),
  metadata: z.record(z.string()).optional(),
});

const createChargeResponseSchema = chargeSchema;

// Capture a Charge
const captureChargeParamsSchema = z.object({
  chargeId: z.string(),
});

// Retrieve a Charge
const retrieveChargeParamsSchema = z.object({
  chargeId: z.string(),
});

const reverseChargeRequestSchema = z.object({
  amount: z.number().optional(),
  metadata: z.record(z.string()).optional(),
});

// Reverse (Refund) a Charge
const reverseChargeParamsSchema = z.object({
  chargeId: z.string(),
});

// List All Charges
const listAllChargesParamsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  order: z.enum(["chronological", "reverse_chronological"]).optional(),
  customer: z.string().optional(),
  captured: z.boolean().optional(),
  authorized: z.boolean().optional(),
  source: z.string().optional(),
});

const listAllChargesResponseSchema = chargeListSchema;
const reverseChargeResponseSchema = chargeSchema;
const retrieveChargeResponseSchema = chargeSchema;
const captureChargeResponseSchema = chargeSchema;

type CreateChargeRequest = z.infer<typeof createChargeRequestSchema>;
type CreateChargeResponse = z.infer<typeof createChargeResponseSchema>;
type RetrieveChargeParams = z.infer<typeof retrieveChargeParamsSchema>;
type RetrieveChargeResponse = z.infer<typeof retrieveChargeResponseSchema>;
type CaptureChargeParams = z.infer<typeof captureChargeParamsSchema>;
type CaptureChargeResponse = z.infer<typeof captureChargeResponseSchema>;
type ReverseChargeParams = z.infer<typeof reverseChargeParamsSchema>;
type ReverseChargeRequest = z.infer<typeof reverseChargeRequestSchema>;
type ReverseChargeResponse = z.infer<typeof reverseChargeResponseSchema>;
type ListAllChargesParams = z.infer<typeof listAllChargesParamsSchema>;
type ListAllChargesResponse = z.infer<typeof listAllChargesResponseSchema>;

export {
  createChargeRequestSchema,
  createChargeResponseSchema,
  retrieveChargeParamsSchema,
  retrieveChargeResponseSchema,
  captureChargeParamsSchema,
  captureChargeResponseSchema,
  reverseChargeParamsSchema,
  reverseChargeRequestSchema,
  reverseChargeResponseSchema,
  listAllChargesParamsSchema,
  listAllChargesResponseSchema,
};

export type {
  CreateChargeRequest,
  CreateChargeResponse,
  RetrieveChargeParams,
  RetrieveChargeResponse,
  CaptureChargeParams,
  CaptureChargeResponse,
  ReverseChargeParams,
  ReverseChargeRequest,
  ReverseChargeResponse,
  ListAllChargesParams,
  ListAllChargesResponse,
};
