import { User } from "@/auth/types/userTypes";
import { Ingredient, Recipe } from "@/types";

export const handleSelect = (
  type: "recipe" | "user" | "ingredient",
  item: Recipe | User | Ingredient,
  navigate: (path: string) => void
) => {
  if (type === "recipe") navigate(`/recipes/${item._id}`);
  if (type === "ingredient") navigate(`/ingredients/${item._id}`);
  if (type === "user") navigate(`/users/${item._id}`);
};
