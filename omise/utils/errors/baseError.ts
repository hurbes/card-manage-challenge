export type BaseError = {
  message: string;
  code?: number;
  data?: any;
};

export const createBaseError = (
  message: string,
  code?: number,
  data?: any
): BaseError => ({
  message,
  code,
  data,
});

export const isBaseError = (error: any): error is BaseError => {
  return error.type === "BaseError";
};
