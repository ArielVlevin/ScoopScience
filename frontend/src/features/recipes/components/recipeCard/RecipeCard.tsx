import { Card, CardContent } from "@/components/ui/card";

import { HeartIcon } from "@/components/icons/icon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Recipe } from "@/types";
import { useNavigate } from "react-router-dom";
import RecipeCardIcons from "./RecipeCardIcons";
import { useAuth } from "@/contexts/AuthContext";
import { Rating } from "@smastrom/react-rating";

export type cardInfo = {
  recipe: Recipe;
  isFavoriteCard?: boolean;
};

export type cardsInfo = cardInfo[];

export function RecipeCard({ recipe, isFavoriteCard = false }: cardInfo) {
  //
  const { user, isAuthenticated, handleFavorite } = useAuth();
  //
  const navigate = useNavigate();
  const [isHeartFilled, setIsHeartFilled] = useState(
    user?.favorites.includes(recipe._id!)
  );

  const handleHeartClick = () => {
    if (!isAuthenticated)
      return alert("You must be logged in to save recipes into your favorites");

    handleFavorite(recipe._id!);

    setIsHeartFilled(!isHeartFilled);
  };

  const goToMakePage = () => {
    navigate(`/make?id=${recipe._id!}`, { state: { recipe } });
  };

  return (
    <div key={recipe._id!} className="w-full ">
      <Card className="shadow-lg rounded-lg bg-muted overflow-hidden  hover:scale-105 duration-500">
        <div className="relative">
          <img
            loading="lazy"
            src={`http://localhost:3000${recipe.recipeData.photo}`}
            alt={recipe.recipeData.description}
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
            <h2 className="text-sm font-bold">
              {recipe.recipeData.recipeKind}
            </h2>

            <div className="flex ">
              <Rating
                style={{ maxWidth: 80 }}
                value={recipe.recipeRating.ratingValue}
                readOnly
              />
              <span className="text-gray-500 text-sm ">
                ({recipe.recipeRating.ratingAmount})
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold justify-center flex">
            {recipe.recipeData.recipeName}
          </h1>

          <p className="text-gray-700 mb-2 justify-center flex">
            {recipe.recipeData.description}
          </p>

          <RecipeCardIcons allergies={recipe.recipeIngredient.allergies} />
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
                navigate(`/recipes/${recipe._id!}`);
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
