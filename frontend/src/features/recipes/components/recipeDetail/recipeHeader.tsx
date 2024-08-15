import { useState } from "react";

import { Recipe } from "@/types";
import { Rating } from "@smastrom/react-rating";
import {
  EggIcon,
  MilkIcon,
  WheatIcon,
  BeanIcon,
  NutIcon,
} from "@/components/icons/icon";
import { postData } from "@/services/apiFunctions";
import { useAuth } from "@/contexts/AuthContext";

type RecipeHeaderProps = {
  recipe: Recipe;
};
export default function RecipeHeader({ recipe }: RecipeHeaderProps) {
  //
  const { user, isAuthenticated } = useAuth();
  //
  const [rating, setRating] = useState(recipe.recipeRating.ratingValue);

  const handleRating = async (value: number) => {
    if (!isAuthenticated) return alert("You must be logged in to rate recipes");

    setRating(value);
    try {
      await postData(`/recipes/id/${recipe._id}/rate`, {
        user_id: user?._id,
        ratingValue: value,
      });
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  return (
    <div className="bg-muted  rounded-lg p-6 mb-6 hover:scale-105 duration-500 h-full items-center justify-center">
      <div className="flex justify-center text-xs font-bold uppercase mb-1  ">
        {recipe?.recipeData.recipeKind}
      </div>
      <div className="flex justify-center text-3xl font-bold  ">
        {recipe?.recipeData.recipeName}
      </div>
      <div className="flex justify-center text-muted-foreground mb-1">
        by {recipe?.user_id}[its user id, need to change to user name]
      </div>
      <div className="flex justify-center ">
        <Rating
          style={{ maxWidth: 100 }}
          value={rating}
          onChange={(star: number) => {
            handleRating(star);
          }}
        />
        <span className="text-muted-foreground text-sm">
          ({recipe?.recipeRating.ratingAmount})
        </span>
      </div>
      <div className="flex justify-center text-muted-foreground mb-4">
        {recipe?.recipeData.description}
      </div>

      <div className="flex justify-center gap-4">
        {recipe.recipeIngredient.allergies.nuts ? (
          <div className="flex items-center gap-2">
            <NutIcon className="w-5 h-5 text-orange-800" />
            <span className="text-muted-foreground">Nuts</span>
          </div>
        ) : null}
        {recipe.recipeIngredient.allergies.milk ? (
          <div className="flex items-center gap-2">
            <MilkIcon className="w-5 h-5 text-blue-200" />
            <span className="text-muted-foreground">Milk</span>
          </div>
        ) : null}
        {recipe.recipeIngredient.allergies.egg ? (
          <div className="flex items-center gap-2">
            <EggIcon className="w-5 h-5  " />
            <span className="text-muted-foreground">eggs</span>
          </div>
        ) : null}
        {recipe.recipeIngredient.allergies.soy ? (
          <div className="flex items-center gap-2">
            <BeanIcon className="w-5 h-5 text-green-500" />
            <span className="text-muted-foreground">Soy</span>
          </div>
        ) : null}
        {recipe.recipeIngredient.allergies.wheat ? (
          <div className="flex items-center gap-2">
            <WheatIcon className="w-5 h-5 text-yellow-300" />
            <span className="text-muted-foreground">Dairy</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
