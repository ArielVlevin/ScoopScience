import Grid from "@/components/class/grid";
import Page from "@/components/pages/page";

import { useParams, useNavigate } from "react-router-dom";
import { useGetRecipe } from "../../hooks/useGetRecipe";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import NutritionTable from "../../components/Detail/nutritionTable";
import RecipeHeader from "../../components/Detail/recipeHeader";
import RecipeIngredients from "../../components/Detail/recipeIngredients";
import Recipecharts from "../../components/Detail/recipeCharts";
import RecipeInstructions from "../../components/Detail/recipeInstructions";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

import { CardButtons } from "../../components/Card/cardButtons";
import PageCard from "@/components/pages/pageCard";

export default function RecipeDetailPage() {
  const navigate = useNavigate();

  const { user, isGuest, handleFavorite } = useAuth();

  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe_id = parseInt(recipeId!, 10);

  const { recipe, isLoading, isError, error } = useGetRecipe(recipe_id);

  const [isButtonFilled, setIsButtonFilled] = useState(
    user?.favorites?.includes(recipe_id)
  );

  if (isNaN(recipe_id)) return <ErrorPage error="Invalid Recipe ID" />;

  const handleAddToFavorite = async () => {
    if (isGuest || !recipe._id)
      return alert("You must be logged in to save recipes");

    handleFavorite(recipe._id);

    setIsButtonFilled(!isButtonFilled);
  };

  return (
    <Page>
      {isLoading ? (
        <Loading />
      ) : isError && error ? (
        <ErrorPage error={error?.message} />
      ) : (
        <PageCard>
          <RecipeHeader recipe={recipe} />

          <Grid mdcols={2} gap={6} className="w-full mb-6">
            <img
              src={`http://api.scoopscience.com${recipe.recipeData.photo}`}
              alt={recipe.recipeData.recipeName}
              loading="lazy"
              className="size-full rounded-lg object-cover hover:scale-105 duration-500"
            />
            <div className="w-full flex flex-col gap-4 ">
              <RecipeIngredients
                recipe={recipe}
                className="min-h-[350px] max-h-[350px] "
              />

              <CardButtons
                recipeId={recipe._id!}
                type={
                  user && user._id === recipe.user_id?._id
                    ? "editable"
                    : "favorite"
                }
              />
            </div>
          </Grid>

          <Recipecharts recipe={recipe} />

          <Grid mdcols={2} gap={6} className="w-full  ">
            <NutritionTable recipe={recipe} />

            <RecipeInstructions recipe={recipe} />
          </Grid>
        </PageCard>
      )}
    </Page>
  );
}
