import { useEffect, useState } from "react";

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
import PageBox from "@/components/class/pageBox";

type RecipeHeaderProps = {
  recipe: Recipe;
};
export default function RecipeHeader({ recipe }: RecipeHeaderProps) {
  //
  const { user, isAuthenticated } = useAuth();
  //
  const [rating, setRating] = useState(recipe.recipeRating.ratingValue);
  const [ratingAmount, setRatingAmount] = useState<number>(
    recipe.recipeRating.ratingAmount
  );

  const handleRating = async (value: number) => {
    if (!isAuthenticated || !user)
      return alert("You must be logged in to rate recipes");

    setRating(value);
    try {
      if (
        recipe.recipeRating.ratingUsers?.find(
          (likeuser) => likeuser.user_id !== user._id
        )
      )
        setRatingAmount((prevAmount) => prevAmount + 1);

      await postData(`/recipes/id/${recipe._id}/rate`, {
        user_id: user?._id,
        ratingValue: value,
      });
    } catch (error) {
      console.error("Failed to submit rating:", error);
      setRatingAmount((prevAmount) => prevAmount - 1);
    }
  };

  useEffect(() => {
    if (user) {
      const userRating = recipe.recipeRating.ratingUsers?.find(
        (likeuser) => likeuser.user_id === user._id
      );
      if (userRating) {
        setRating(userRating.ratingValue);
      }
    }
  }, [user, recipe.recipeRating.ratingUsers]);

  return (
    <PageBox>
      <div className="flex justify-center text-xs font-bold uppercase mb-1  ">
        {recipe?.recipeData.recipeKind}
      </div>
      <div className="flex justify-center text-3xl font-bold  ">
        {recipe?.recipeData.recipeName}
      </div>
      <div className="flex justify-center text-muted-foreground mb-1">
        by {recipe?.user_id?.username}
      </div>
      <div className="flex justify-center ">
        <Rating
          style={{ maxWidth: 100 }}
          value={rating}
          onChange={(star: number) => {
            handleRating(star);
          }}
        />
        <span className="text-muted-foreground text-sm">({ratingAmount})</span>
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
    </PageBox>
  );
}
