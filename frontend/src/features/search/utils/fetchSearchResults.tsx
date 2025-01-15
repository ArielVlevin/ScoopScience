import { User } from "@/auth/types/userTypes";
import { fetchData } from "@/services/apiFunctions";
import { Ingredient, Recipe } from "@/types";

export interface AutocompleteResults {
  recipes: Recipe[];
  users: User[];
  ingredients: Ingredient[];
}

export async function fetchAutocompleteResults(
  query: string
): Promise<AutocompleteResults> {
  const endpoint = `/search/autocomplete?q=${encodeURIComponent(query)}`;
  return fetchData<AutocompleteResults>(endpoint);
}
