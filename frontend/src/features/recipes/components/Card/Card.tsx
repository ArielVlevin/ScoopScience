import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";
import { Recipe } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import AllergiesIcons from "./AllergiesIcons";
import { CardImg } from "./cardImg";
import { RecipeData } from "./RecipeData";
import { CardButtons } from "./cardButtons";
import { cardClass } from "./style";

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
          src={`http://api.scoopscience.com${recipe.recipeData.photo}`}
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

/*
        <div className="relative">
          <div className=" w-full h-auto aspect-video	">
            <img
              loading="lazy"
              src={`http://api.scoopscience.com${recipe.recipeData.photo}`}
              alt={recipe.recipeData.description}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <button
            onClick={handleHeartClick}
            className="absolute top-4 right-4 text-red-500"
            aria-label="Favorite"
          >
            <HeartIcon
              className="w-6 h-6"
              fill={isHeartFilled ? "red" : "none"}
            />
          </button>
        </div>
        */
