import { z } from "zod";

// Create a Customer
const createCustomerRequestSchema = z.object({
  email: z.string().email(),
  description: z.string().optional(),
  card: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

const createCustomerResponseSchema = z.object({
  object: z.literal("customer"),
  id: z.string(),
  email: z.string().email(),
  description: z.string().nullable(),
  card: z.string().nullable(),
  created: z.number(),
  metadata: z.record(z.string(), z.string()).nullable(),
  livemode: z.boolean(),
  location: z.string(),
});

// Retrieve a Customer
const retrieveCustomerResponseSchema = createCustomerResponseSchema;

// Update a Customer
const updateCustomerRequestSchema = z.object({
  email: z.string().email().optional(),
  description: z.string().optional(),
  card: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

const updateCustomerResponseSchema = createCustomerResponseSchema;

// Delete a Customer
const deleteCustomerResponseSchema = z.object({
  deleted: z.boolean(),
  id: z.string(),
});

// List all Customers
const listCustomersResponseSchema = z.object({
  object: z.literal("list"),
  data: z.array(createCustomerResponseSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  location: z.string(),
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
