import { Recipe } from "@/types";
import { postData } from "@/services/apiFunctions";

export function postRecipe(data: Recipe) {
  return postData<Recipe>("recipes", data);
}
