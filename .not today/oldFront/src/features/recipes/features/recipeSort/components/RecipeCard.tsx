import { Card, CardContent } from "@/components/ui/card";

import cardImgExmpl from "@/assets/icecream-example.jpeg";
import { HeartIcon, StarIcon } from "@/components/icons/icon";
import RecipeCardIcons from "./RecipeCardIcons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RecipeKind } from "@/types";
import { SpecialMarks } from "@/features/recipes/types/specialMarks";

//TODO:: change to real RecipedData
export type cardInfo = {
  _id: number;
  recipeKind: RecipeKind;
  description: string;
  rating: number;
  isLiked: boolean;

  marks: SpecialMarks;
};

export type cardsInfo = cardInfo[];

//TODO:: if liked should add to saved to user favorite

export function RecipeCard({
  _id,
  recipeKind,
  description,
  rating,
  isLiked,
  marks,
}: cardInfo) {
  const [isHeartFilled, setIsHeartFilled] = useState(isLiked);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div key={_id} className="w-full">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <img
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{recipeKind}</h2>
            <div className="flex items-center">
              <StarIcon className="text-yellow-500 w-5 h-5 mr-1" />
              <span className="text-gray-700">{rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{description}</p>
          <RecipeCardIcons
            className="flex space-x-2 mb-6 justify-center "
            marks={marks}
          />
          <Button className="w-full" variant="default">
            View Recipe
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
