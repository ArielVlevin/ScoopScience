export const RECIPE_NAME_ERROR =
  "Recipe name must be 4-50 characters long and contain only letters, numbers, and underscores.";
export const RECIPE_DESCRIPTION_ERROR =
  "Recipe description must be 4-50 characters long and contain only letters, numbers, and underscores.";
export const RECIPE_INSTRUCTIONS_ERROR =
  "Recipe instructions must be 4-100 characters long and contain only letters, numbers, and underscores.";

export const MISSING_INGREDIENTS_ERROR =
  "Recipe cannot be created without ingredients.";

export const TIME_ERROR = "Please enter a valid time.";
export const MISSING_DATA_ERROR = "Please fill all required fields.";
const RECIPE_NAME_REGEX = /^[a-zA-Z0-9_ !()?]{4,20}$/;
const RECIPE_DESCRIPTION_REGEX = /^[a-zA-Z0-9_ !()?]{4,50}$/;
const RECIPE_INSTRUCTIONS_REGEX = /^[a-zA-Z0-9_ !()?]{4,100}$/;

export function validateRecipeName(name: string): boolean {
  return RECIPE_NAME_REGEX.test(name);
}

export function validateRecipeDescription(description: string): boolean {
  return RECIPE_DESCRIPTION_REGEX.test(description);
}

export function validateRecipeInstructions(instructions: string): boolean {
  return RECIPE_INSTRUCTIONS_REGEX.test(instructions);
}
