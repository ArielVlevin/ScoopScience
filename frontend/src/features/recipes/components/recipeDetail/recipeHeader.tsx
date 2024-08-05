import { useState } from "react";

import { Recipe } from "@/types";
import { Rating } from "@smastrom/react-rating";
import { LeafIcon, MilkIcon } from "@/components/icons/icon";

type RecipeHeaderProps = {
  recipe: Recipe;
};
export default function RecipeHeader({ recipe }: RecipeHeaderProps) {
  // TODO: ADD the change to the rating system
  const [rating, setRating] = useState(recipe.recipeRating.ratingValue);

  return (
    <div className="bg-muted  rounded-lg p-6 mb-6 hover:scale-105 duration-500 h-full items-center justify-center">
      <div className="flex justify-center text-xs font-bold uppercase mb-1  ">
        {recipe?.recipeData.recipeKind}
      </div>
      <div className="flex justify-center text-3xl font-bold ">
        {recipe?.recipeData.recipeName}
      </div>
      <div className="flex justify-center ">
        <Rating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
      </div>
      <div className="flex justify-center text-muted-foreground mb-4">
        {recipe?.recipeData.description}
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <LeafIcon className="w-5 h-5 text-green-500" />
          <span className="text-muted-foreground">Vegan</span>
        </div>
        <div className="flex items-center gap-2">
          <MilkIcon className="w-5 h-5 text-orange-500" />
          <span className="text-muted-foreground">Dairy</span>
        </div>{" "}
        <div className="flex items-center gap-2">
          <MilkIcon className="w-5 h-5 text-orange-500" />
          <span className="text-muted-foreground">Dairy</span>
        </div>{" "}
        <div className="flex items-center gap-2">
          <MilkIcon className="w-5 h-5 text-orange-500" />
          <span className="text-muted-foreground">Dairy</span>
        </div>{" "}
        <div className="flex items-center gap-2">
          <MilkIcon className="w-5 h-5 text-orange-500" />
          <span className="text-muted-foreground">Dairy</span>
        </div>
      </div>
    </div>
  );
}
