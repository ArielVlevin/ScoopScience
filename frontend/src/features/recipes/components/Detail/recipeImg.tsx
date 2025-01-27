import { Recipe } from "@/types";
import { cn } from "@/utils/cn";

type RecipeImgProps = {
  className?: string;
  recipe: Recipe;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function RecipeImg({ className, recipe }: RecipeImgProps) {
  return (
    <img
      src={`${apiUrl}${recipe.recipeData.photo}`}
      alt={recipe.recipeData.recipeName}
      loading="lazy"
      className={cn(className, "size-full rounded-lg object-cover")}
    />
  );
}
