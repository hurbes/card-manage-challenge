import { z } from "zod";

// Create a Customer
const createCustomerRequestSchema = z.object({
  email: z.string().email().optional(),
  description: z.string().optional(),
  card: z.string().optional(),
  metadata: z.record(z.string()).optional(),
  default_card: z.string().optional(),
});

const createCustomerResponseSchema = z.object({
  object: z.literal("customer"),
  id: z.string(),
  livemode: z.boolean(),
  location: z.string(),
  deleted: z.boolean(),
  metadata: z.record(z.string()).nullable(),
  cards: z.object({
    object: z.literal("list"),
    data: z.array(
      z.object({
        id: z.string(),
        object: z.literal("card"),
        livemode: z.boolean(),
        location: z.string(),
        country: z.string(),
        city: z.string().nullable(),
        postal_code: z.string().nullable(),
        financing: z.string(),
        bank: z.string(),
        last_digits: z.string(),
        brand: z.string(),
        expiration_month: z.number(),
        expiration_year: z.number(),
        fingerprint: z.string(),
        name: z.string().nullable(),
        created: z.string(),
      })
    ),
    limit: z.number(),
    offset: z.number(),
    total: z.number(),
    location: z.string(),
    order: z.string(),
    from: z.string(),
    to: z.string(),
  }),
  default_card: z.string().nullable(),
  linked_accounts: z.object({
    object: z.literal("list"),
    data: z.array(z.unknown()),
    limit: z.number(),
    offset: z.number(),
    total: z.number(),
    location: z.string(),
    order: z.string(),
    from: z.string(),
    to: z.string(),
  }),
  description: z.string().nullable(),
  email: z.string().email().nullable(),
  created_at: z.string(),
});

const retrieveCustomerResponseSchema = createCustomerResponseSchema;

const updateCustomerRequestSchema = z.object({
  email: z.string().email().optional(),
  description: z.string().optional(),
  card: z.string().optional(),
  metadata: z.record(z.string()).optional(),
  default_card: z.string().optional(),
});

const updateCustomerResponseSchema = createCustomerResponseSchema;

const deleteCustomerResponseSchema = z.object({
  deleted: z.boolean(),
  id: z.string(),
});

const listCustomersResponseSchema = z.object({
  object: z.literal("list"),
  data: z.array(createCustomerResponseSchema),
});

type CreateCustomerRequest = z.infer<typeof createCustomerRequestSchema>;
type CreateCustomerResponse = z.infer<typeof createCustomerResponseSchema>;
type RetrieveCustomerResponse = z.infer<typeof retrieveCustomerResponseSchema>;
type UpdateCustomerRequest = z.infer<typeof updateCustomerRequestSchema>;
type UpdateCustomerResponse = z.infer<typeof updateCustomerResponseSchema>;
type DeleteCustomerResponse = z.infer<typeof deleteCustomerResponseSchema>;
type ListCustomersResponse = z.infer<typeof listCustomersResponseSchema>;

export {
  createCustomerRequestSchema,
  createCustomerResponseSchema,
  retrieveCustomerResponseSchema,
  updateCustomerRequestSchema,
  updateCustomerResponseSchema,
  deleteCustomerResponseSchema,
  listCustomersResponseSchema,
};

export type {
  CreateCustomerRequest,
  CreateCustomerResponse,
  RetrieveCustomerResponse,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
  DeleteCustomerResponse,
  ListCustomersResponse,
};
