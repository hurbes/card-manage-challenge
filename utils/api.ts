export type APIMethod = "GET" | "POST";

export type CreateAPIMethods = <
  TInput extends Record<string, string>,
  TOutput
>(opts: {
  url: string;
  method: APIMethod;
  headers?: Record<string, string>;
  body?: TInput;
}) => (input: TInput) => Promise<TOutput>;

export const createAPIMethods: CreateAPIMethods = (opts) => async (input) => {
  const response = await fetch(opts.url, {
    method: opts.method,
    headers: opts.headers,
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
