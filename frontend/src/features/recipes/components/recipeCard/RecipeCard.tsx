import { Card, CardContent } from "@/components/ui/card";

import { HeartIcon } from "@/components/icons/icon";
import { useState } from "react";
import { Recipe } from "@/types";
import { useNavigate } from "react-router-dom";
import RecipeCardIcons from "./RecipeCardIcons";
import { useAuth } from "@/contexts/AuthContext";
import { Rating } from "@smastrom/react-rating";
import CardButton from "./cardButton";

export type cardInfo = {
  recipe: Recipe;
  isFavoriteCard?: boolean;
  isEditable?: boolean;
};

export type cardsInfo = cardInfo[];

export function RecipeCard({
  recipe,
  isFavoriteCard = false,
  isEditable = false,
}: cardInfo) {
  //
  const { user, isAuthenticated, handleFavorite } = useAuth();
  //
  const navigate = useNavigate();
  const [isHeartFilled, setIsHeartFilled] = useState(
    user?.favorites?.includes(recipe._id!)
  );

  const handleHeartClick = () => {
    if (!isAuthenticated)
      return alert("You must be logged in to save recipes into your favorites");

    handleFavorite(recipe._id!);

    setIsHeartFilled(!isHeartFilled);
  };

  const goToMakePage = () => {
    navigate(`/recipes/make?id=${recipe._id!}`, { state: { recipe } });
  };

  const goToEditPage = () => {
    navigate(`/recipes/edit?id=${recipe._id!}`, { state: { recipe } });
  };

  return (
    <div key={recipe._id!} className="w-full ">
      <Card className="shadow-lg rounded-lg bg-background/80 overflow-hidden  hover:scale-105 duration-500">
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

          <RecipeCardIcons
            className="mb-2"
            allergies={recipe.recipeIngredient.allergies}
          />

          <div className="flex flex-col gap-2">
            {isFavoriteCard ? (
              <CardButton color="orange" onClick={goToMakePage}>
                Make
              </CardButton>
            ) : null}
            {isEditable ? (
              <CardButton color="blue" onClick={goToEditPage}>
                Edit
              </CardButton>
            ) : null}
            <CardButton
              onClick={() => {
                navigate(`/recipes/${recipe._id!}`);
              }}
            >
              View Recipe
            </CardButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
