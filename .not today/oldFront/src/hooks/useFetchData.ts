import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/services/apiFunctions";

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
