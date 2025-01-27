import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";
import { Recipe } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import AllergiesIcons from "./AllergiesIcons";
import { CardImg } from "./cardImg";
import { RecipeData } from "./RecipeData";
import { CardButtons } from "./cardButtons";
import { cardClass } from "./style";

const apiUrl = import.meta.env.VITE_API_URL;

export type cardInfo = {
  recipe: Recipe;
  type?: "recipe" | "editable" | "favorite";
};

export type cardsInfo = cardInfo[];

export function RecipeCard({ recipe, type = "recipe" }: cardInfo) {
  //
  const { user, isGuest, handleFavorite } = useAuth();
  //
  const [isHeartFilled, setIsHeartFilled] = useState(
    user?.favorites?.includes(recipe._id!)
  );

  const handleHeartClick = () => {
    if (isGuest)
      return alert("You must be logged in to save recipes into your favorites");

    handleFavorite(recipe._id!);
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div key={recipe._id!} className="w-full ">
      <Card className={cardClass}>
        <CardImg
          src={`${apiUrl}${recipe.recipeData.photo}`}
          alt={recipe.recipeData.recipeName}
          onHeartClick={handleHeartClick}
          isHeartFilled={isHeartFilled}
        />

        <CardContent className="p-4 flex flex-col gap-4 ">
          <RecipeData recipe={recipe} />
          <AllergiesIcons
            className="h-[20px]"
            allergies={recipe.recipeIngredient.allergies}
          />
          <CardButtons recipeId={recipe._id!} type={type} />
        </CardContent>
      </Card>
    </div>
  );
}
