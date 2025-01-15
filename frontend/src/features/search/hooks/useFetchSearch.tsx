import { useQuery } from "@tanstack/react-query";
import {
  AutocompleteResults,
  fetchAutocompleteResults,
} from "../utils/fetchSearchResults";

export const useAutocomplete = (query: string) => {
  return useQuery<AutocompleteResults>({
    queryKey: ["autocomplete", query],
    queryFn: () => fetchAutocompleteResults(query),
    staleTime: 5000, // Cache the data for 5 seconds
    enabled: query.length > 1, // Only fetch when query length > 1
    initialData: { recipes: [], users: [], ingredients: [] },
  });
};
