import { usePostData } from "@/hooks/useFetchData";
import { SearchResponse } from "../types/searchInredientType";

interface SearchQuery {
  query: string;
}

export function useSearchIngredient() {
  return usePostData<SearchQuery, SearchResponse>(
    "ingredients/search",
    (data) => {
      console.log("Search successful:", data);
    },
    (error) => {
      console.error("Error during search:", error);
    }
  );
}
