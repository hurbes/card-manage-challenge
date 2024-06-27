import { BASE_URL } from "../constants/constants";
import { APIInput } from "../types/api";

import { handleResponse } from "../utils/responseHandler";
import {
  captureChargeResponseSchema,
  createChargeResponseSchema,
  listAllChargesResponseSchema,
  retrieveChargeResponseSchema,
} from "../utils/validators/chargeValidators";
import {
  RetrieveChargeParams,
  CaptureChargeParams,
  CreateChargeRequest,
  ListAllChargesParams,
} from "../utils/validators/chargeValidators";

// Create Charge
export const createCharge = async ({
  axios,
  data,
  signal,
}: APIInput<CreateChargeRequest>): Promise<
  ReturnType<typeof createChargeResponseSchema.parse>
> => {
  const response = await axios.post("/charges", data, { signal });
  return handleResponse(response, createChargeResponseSchema);
};

// Retrieve a Charge
export const retrieveCharge = async ({
  axios,
  data,
  signal,
}: APIInput<RetrieveChargeParams>): Promise<
  ReturnType<typeof retrieveChargeResponseSchema.parse>
> => {
  const response = await axios.get(`/charges/${data!.chargeId}`, {
    signal,
    baseURL: BASE_URL,
  });
  return handleResponse(response, retrieveChargeResponseSchema);
};

// Capture a Charge
export const captureCharge = async ({
  axios,
  data,
  signal,
}: APIInput<CaptureChargeParams>): Promise<
  ReturnType<typeof captureChargeResponseSchema.parse>
> => {
  const response = await axios.post(
    `/charges/${data!.chargeId}/capture`,
    null,
    { signal, baseURL: BASE_URL }
  );
  return handleResponse(response, captureChargeResponseSchema);
};

// List All Charges
export const listAllCharges = async ({
  axios,
  data,
  signal,
}: APIInput<ListAllChargesParams>): Promise<
  ReturnType<typeof listAllChargesResponseSchema.parse>
> => {
  const response = await axios.get("/charges", {
    params: data,
    signal,
    baseURL: BASE_URL,
  });
  return handleResponse(response, listAllChargesResponseSchema);
};
