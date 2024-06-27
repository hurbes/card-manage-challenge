import {
  MutationObserverResult,
  QueryKey,
  QueryObserverResult,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { isBaseError, BaseError } from "./errors/baseError";

type OmiseMutationResult<TData, TError, TVariables> = UseMutationResult<
  TData,
  TError,
  TVariables
> & {
  parsedError?: number;
  mutateAsyncWrapper: (
    variables: TVariables
  ) => Promise<MutationObserverResult<TData, TError>>;
};

type OmiseResult<TData, TError> = UseQueryResult<TData, TError> & {
  parsedError?: number;
  fetch: () => Promise<QueryObserverResult<TData, TError>>;
};

function useQueryWrapper<
  TQueryFnData = unknown,
  TError = Error | BaseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): OmiseResult<TData, TError> {
  const useQueryResult = useQuery<TQueryFnData, TError, TData, TQueryKey>(
    options
  );

  const parsedError = useMemo(() => {
    if (useQueryResult.error !== null && isBaseError(useQueryResult.error)) {
      return useQueryResult.error.code;
    }
    return undefined;
  }, [useQueryResult.error]);

  return {
    ...useQueryResult,
    parsedError,
    fetch: useQueryResult.refetch,
  };
}

function useMutationWrapper<
  TData = unknown,
  TError = Error | BaseError,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): OmiseMutationResult<TData, TError, TVariables> {
  const useMutationResult = useMutation<TData, TError, TVariables, TContext>(
    options
  );

  const parsedError = useMemo(() => {
    if (
      useMutationResult.error !== null &&
      isBaseError(useMutationResult.error)
    ) {
      return useMutationResult.error.code;
    }
    return undefined;
  }, [useMutationResult.error]);

  const mutateAsyncWrapper = async (variables: TVariables) => {
    const result = await useMutationResult.mutateAsync(variables);
    return {
      ...result,
      error: useMutationResult.error,
    } as MutationObserverResult<TData, TError>;
  };

  return {
    ...useMutationResult,
    parsedError,
    mutateAsyncWrapper,
  };
}

export { useQueryWrapper, useMutationWrapper };
export type { OmiseMutationResult, OmiseResult };
