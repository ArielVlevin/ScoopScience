import { Ingredient } from "@/types";
import { postData } from "@/services/apiFunctions";

export function postIngredient(data: Ingredient) {
  return postData<Ingredient>("/ingredients/post", data);
}
