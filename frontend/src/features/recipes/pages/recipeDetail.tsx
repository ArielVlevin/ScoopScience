import Grid from "@/components/class/grid";
import Page from "@/components/class/page";
import { Button } from "@/components/ui/button";

import ice_cream_image from "@/assets/ice-cream-back2.jpeg";
import { useParams } from "react-router-dom";
import { useGetRecipe } from "../hooks/useGetRecipe";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import NutritionTable from "../components/recipeDetail/nutritionTable";
import RecipeHeader from "../components/recipeDetail/recipeHeader";
import RecipeIngredients from "../components/recipeDetail/recipeIngredients";
import Recipecharts from "../components/recipeDetail/recipeCharts";
import RecipeInstructions from "../components/recipeDetail/recipeInstructions";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function RecipeDetailPage() {
  const { recipeId } = useParams<{ recipeId: string }>();

  const { user, isAuthenticated } = useAuth();

  const [isButtonFilled, setIsButtonFilled] = useState(false);

  const handleSaveClick = () => {
    if (!isAuthenticated) return alert("You must be logged in to save recipes");

    setIsButtonFilled(!isButtonFilled);
  };
  const { recipe, isLoading, isError, error } = useGetRecipe(
    (recipeId as string) || ""
  );

  if (isNaN(recipeId as unknown as number))
    return <ErrorPage error="Invalid Recipe ID" />;

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page>
      <RecipeHeader recipe={recipe} />

      <Grid mdcols={2} gap={6} className="w-full mb-6">
        <img
          src={ice_cream_image} //TODO:change to real img
          alt="Creamy Vanilla Ice Cream"
          loading="lazy"
          className="size-full rounded-lg object-cover hover:scale-105 duration-500"
        />
        <Grid mdcols={1} className="w-full ">
          <RecipeIngredients recipe={recipe} />
          <Button className="  w-full h-10  hover:scale-105 duration-500">
            View Ingredient Table
          </Button>
          <Button
            onClick={handleSaveClick}
            className={`w-full h-10 ${
              isButtonFilled ? "bg-red-800 text-white" : "bg-white text-red-800"
            } hover:bg-red-400 hover:scale-105 duration-500`}
          >
            Save in favorites
          </Button>
        </Grid>
      </Grid>

      <Recipecharts recipe={recipe} />

      <Grid mdcols={2} gap={6} className="w-full mb-6  ">
        <NutritionTable recipe={recipe} />

        <RecipeInstructions recipe={recipe} />
      </Grid>
    </Page>
  );
}
