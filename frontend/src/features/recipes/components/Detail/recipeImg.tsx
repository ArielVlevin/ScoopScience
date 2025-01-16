import { Recipe } from "@/types";
import { cn } from "@/utils/cn";

type RecipeImgProps = {
  className?: string;
  recipe: Recipe;
};

export default function RecipeImg({ className, recipe }: RecipeImgProps) {
  return (
    <img
      src={`http://api.scoopscience.com${recipe.recipeData.photo}`}
      alt={recipe.recipeData.recipeName}
      loading="lazy"
      className={cn(className, "size-full rounded-lg object-cover")}
    />
  );
}
