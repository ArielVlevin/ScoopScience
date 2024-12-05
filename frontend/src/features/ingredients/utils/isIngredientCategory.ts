import { IngredientCategory, ingredientCategoryArray } from "@/types";

// Create a Set for fast lookups
const ingredientCategorySet = new Set(ingredientCategoryArray);

/**
 * Type guard to check if a string is a valid IngredientCategory
 * @param category - The string to check
 * @returns true if the string is a valid IngredientCategory, false otherwise
 */
export function isIngredientCategory(
  category: string
): category is IngredientCategory {
  return ingredientCategorySet.has(category as IngredientCategory);
}
