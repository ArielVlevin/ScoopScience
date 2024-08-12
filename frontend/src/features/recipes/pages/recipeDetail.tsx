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
import NewRecipeTable from "../components/recipeTable/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";

export default function RecipeDetailPage() {
  const { user, isAuthenticated, handleFavorite } = useAuth();

  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe_id = parseInt(recipeId!, 10);

  const { recipe, isLoading, isError, error } = useGetRecipe(recipe_id);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isButtonFilled, setIsButtonFilled] = useState(
    user?.favorites.includes(recipe_id)
  );

  if (isNaN(recipe_id)) return <ErrorPage error="Invalid Recipe ID" />;

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  const handleAddToFavorite = async () => {
    if (!isAuthenticated || !recipe._id)
      return alert("You must be logged in to save recipes");

    handleFavorite(recipe._id);

    setIsButtonFilled(!isButtonFilled);
  };

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
                  />
                </DialogDescription>
              </DialogHeader>
              <Button onClick={() => setIsDialogOpen(false)} className="mt-4">
                Close
              </Button>
            </DialogContent>
          </Dialog>
          <Button
            onClick={handleAddToFavorite}
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
