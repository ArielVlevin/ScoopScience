import Grid from "@/components/class/grid";
import Page from "@/components/pages/page";
import { Button } from "@/components/ui/button";

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
import NewRecipeTable from "../../components/Table/0table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { CardButtons } from "../../components/Card/cardButtons";

export default function RecipeDetailPage() {
  const navigate = useNavigate();

  const { user, isGuest, handleFavorite } = useAuth();

  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe_id = parseInt(recipeId!, 10);

  const { recipe, isLoading, isError, error } = useGetRecipe(recipe_id);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isButtonFilled, setIsButtonFilled] = useState(
    user?.favorites?.includes(recipe_id)
  );

  if (isNaN(recipe_id)) return <ErrorPage error="Invalid Recipe ID" />;

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  const handleAddToFavorite = async () => {
    if (isGuest || !recipe._id)
      return alert("You must be logged in to save recipes");

    handleFavorite(recipe._id);

    setIsButtonFilled(!isButtonFilled);
  };

  const goToMakePage = () => {
    navigate(`/recipes/make?id=${recipe._id}`, { state: { recipe } });
  };

  const goToEditPage = () => {
    navigate(`/recipes/edit?id=${recipe._id}`, { state: { recipe } });
  };

  return (
    <Page>
      <RecipeHeader recipe={recipe} />

      <Grid mdcols={2} gap={6} className="w-full mb-6">
        <img
          src={`http://api.scoopscience.com${recipe.recipeData.photo}`}
          alt="Creamy Vanilla Ice Cream"
          loading="lazy"
          className="size-full rounded-lg object-cover hover:scale-105 duration-500"
        />
        <div className="w-full flex flex-col gap-4 ">
          <RecipeIngredients
            recipe={recipe}
            className="min-h-[300px] max-h-[300px]"
          />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full h-10 hover:scale-105 duration-500">
                View Ingredient Table
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-6xl">
              <DialogHeader>
                <DialogTitle className=" pb-4">Ingredient Table</DialogTitle>
                <DialogDescription className=" ">
                  <NewRecipeTable
                    className="border rounded-lg border-gray-300 p-2 "
                    rows={recipe.recipeIngredient.ingredients}
                    isEditable={false}
                    isTotalsVisible={false}
                  />
                </DialogDescription>
              </DialogHeader>
              <Button onClick={() => setIsDialogOpen(false)} className="mt-4">
                Close
              </Button>
            </DialogContent>
          </Dialog>

          <CardButtons
            recipeId={recipe._id!}
            type={
              user && user._id === recipe.user_id?._id ? "editable" : "favorite"
            }
          />

          <Button
            onClick={handleAddToFavorite}
            className={`w-full h-10 ${
              isButtonFilled ? "bg-red-800 text-white" : "bg-white text-red-800"
            } hover:bg-red-400 hover:scale-105 duration-500`}
          >
            Save in favorites
          </Button>

          <Button
            onClick={goToMakePage}
            className="w-full h-10 bg-orange-700 text-white hover:bg-orange-400 hover:scale-105 duration-500"
          >
            Make
          </Button>
          {user && user._id === recipe.user_id?._id && (
            <Button
              onClick={goToEditPage}
              className="w-full h-10 bg-red-700 text-white hover:bg-red-900 hover:scale-105 duration-500"
            >
              Edit The Recipe
            </Button>
          )}
        </div>
      </Grid>

      <Recipecharts recipe={recipe} />

      <Grid mdcols={2} gap={6} className="w-full mb-6  ">
        <NutritionTable recipe={recipe} />

        <RecipeInstructions recipe={recipe} />
      </Grid>
    </Page>
  );
}
