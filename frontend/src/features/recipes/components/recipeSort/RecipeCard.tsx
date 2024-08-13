import { Card, CardContent } from "@/components/ui/card";

import { HeartIcon } from "@/components/icons/icon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Allergies, Recipe, RecipeKind } from "@/types";
import { useNavigate } from "react-router-dom";
import RecipeCardIcons from "./RecipeCardIcons";
import { useAuth } from "@/contexts/AuthContext";

import cardImgExmpl from "@/assets/icecream-example.jpeg";
import { Rating } from "@smastrom/react-rating";

export type cardInfo = {
  recipe: Recipe;
  _id: number;
  recipeName: string;
  recipeKind: RecipeKind;
  description: string;
  rating: number;
  ratingVotes: number;
  allergies: Allergies;
  isFavoriteCard?: boolean;
};

export type cardsInfo = cardInfo[];

//TODO:: if liked should add to saved to user favorite

export function RecipeCard({
  recipe,
  _id,
  recipeName,
  recipeKind,
  description,
  rating,
  ratingVotes,
  allergies,
  isFavoriteCard = false,
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

  const goToMakePage = () => {
    navigate(`/make?id=${_id}`, { state: { recipe } });
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

            <div className="flex ">
              <Rating style={{ maxWidth: 80 }} value={rating} readOnly />
              <span className="text-gray-500 text-sm ">({ratingVotes})</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold justify-center flex">
            {recipeName}
          </h1>

          <p className="text-gray-700 mb-2 justify-center flex">
            {description}
          </p>

          <RecipeCardIcons allergies={allergies} />
          <div className="flex flex-col gap-2">
            {isFavoriteCard ? (
              <Button
                className="w-full bg-orange-700 hover:bg-orange-500"
                onClick={goToMakePage}
              >
                Make
              </Button>
            ) : null}
            <Button
              className="w-full"
              variant="default"
              onClick={() => {
                navigate(`/recipes/${_id}`);
              }}
            >
              View Recipe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
