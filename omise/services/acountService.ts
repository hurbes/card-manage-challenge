import {
  AccountParams,
  accountSchema,
} from "../utils/validators/accountValidators";
import { handleResponse } from "../utils/responseHandler";
import { BASE_URL } from "../constants/constants";
import { APIInput } from "../types/api";

export const fetchAccount = async ({
  axios,
  signal,
}: APIInput): Promise<ReturnType<typeof accountSchema.parse>> => {
  const response = await axios.get("/account", {
    baseURL: BASE_URL,
    signal,
  });

  return handleResponse(response, accountSchema);
};

export const patchAccount = async ({
  axios,
  data,
}: APIInput<AccountParams>): Promise<
  ReturnType<typeof accountSchema.parse>
> => {
  const response = await axios.patch("/account", data, {
    baseURL: BASE_URL,
  });

  return handleResponse(response, accountSchema);
};
