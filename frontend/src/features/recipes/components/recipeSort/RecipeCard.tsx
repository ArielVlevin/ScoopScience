import { Card, CardContent } from "@/components/ui/card";

import cardImgExmpl from "@/assets/icecream-example.jpeg";
import { HeartIcon, StarIcon } from "@/components/icons/icon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Allergies, RecipeKind } from "@/types";
import { useNavigate } from "react-router-dom";
import RecipeCardIcons from "./RecipeCardIcons";
import { useAuth } from "@/contexts/AuthContext";

//TODO:: change to real RecipedData
export type cardInfo = {
  _id: number;
  recipeName: string;
  recipeKind: RecipeKind;
  description: string;
  rating: number;
  isLiked: boolean;
  allergies: Allergies;
};

export type cardsInfo = cardInfo[];

//TODO:: if liked should add to saved to user favorite

export function RecipeCard({
  _id,
  recipeName,
  recipeKind,
  description,
  rating,
  allergies,
}: cardInfo) {
  //
  const { user, isAuthenticated, handleFavorite } = useAuth();
  //
  const navigate = useNavigate();
  const [isHeartFilled, setIsHeartFilled] = useState(
    user?.favorites.includes(_id)
  );

  const handleHeartClick = () => {
    if (!isAuthenticated) return alert("You must be logged in to save recipes");

    handleFavorite(_id);

    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div key={_id} className="w-full ">
      <Card className="shadow-lg rounded-lg bg-muted overflow-hidden  hover:scale-105 duration-500">
        <div className="relative">
          <img
            loading="lazy"
            src={cardImgExmpl}
            alt={description}
            className="w-full h-full object-cover"
          />
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
        <CardContent className="p-6">
          <div className="flex justify-between items-center ">
            <h2 className="text-sm font-bold">{recipeKind}</h2>

            <div className="flex items-center">
              <StarIcon className="text-yellow-500 w-5 h-5 mr-1" />
              <span className="text-gray-700">{rating.toFixed(1)}</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold justify-center flex">
            {recipeName}
          </h1>

          <p className="text-gray-700 mb-2 justify-center flex">
            {description}
          </p>
          <RecipeCardIcons allergies={allergies} />
          <Button
            className="w-full"
            variant="default"
            onClick={() => {
              navigate(`/recipes/${_id}`);
            }}
          >
            View Recipe
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
