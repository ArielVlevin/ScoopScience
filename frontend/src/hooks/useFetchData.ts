import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import { fetchData, postData } from "@/services/apiFunctions";

// Generic hook for fetching data
export function useFetchData<T>(
  queryKey: string[],
  endpoint: string | undefined,
  refetchInterval: number = 2 * 60 * 1000
) {
  const shouldFetch = !!endpoint;
  const queryResult = useQuery<T>({
    queryKey,
    queryFn: () => fetchData<T>(endpoint!),
    enabled: shouldFetch,
    refetchInterval,
  });

  return {
    data: queryResult.data ?? ({} as T),
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
  };
}

export function usePostData<T, R>(
  endpoint: string,
  onSuccess?: (data: R) => void,
  onError?: (error: Error) => void
): UseMutationResult<R, Error, T> {
  return useMutation<R, Error, T>({
    mutationFn: (data: T) => postData<R>(endpoint, data as unknown as R),
    onSuccess,
    onError,
  });
}
