import Grid from "@/components/class/grid";
import Page from "@/components/pages/page";
import { Button } from "@/components/ui/button";

import NutritionTable from "../Detail/nutritionTable";
import RecipeHeader from "../Detail/recipeHeader";
import RecipeIngredients from "../Detail/recipeIngredients";
import Recipecharts from "../Detail/recipeCharts";
import RecipeInstructions from "../Detail/recipeInstructions";
import { useState } from "react";
import NewRecipeTable from "../Table/0table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { Recipe } from "@/types";

type RecipeRecipePreviewProps = {
  recipe: Recipe | null;
};
export default function RecipeRecipePreview({
  recipe,
}: RecipeRecipePreviewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isButtonFilled, setIsButtonFilled] = useState(false);

  const handleAddToFavorite = async () => {
    setIsButtonFilled(!isButtonFilled);
  };

  const goToMakePage = () => {
    alert("this function work only in uploaded recipes");

    if (!recipe) return <div>Problem with recipe Generation</div>;
  };
  return (
    <Page>
      <RecipeHeader recipe={recipe!} />

      <Grid mdcols={2} gap={6} className="w-full mb-6">
        <img
          src={`http://localhost:3000${recipe!.recipeData.photo}`}
          alt="Creamy Vanilla Ice Cream"
          loading="lazy"
          className="size-full rounded-lg object-cover hover:scale-105 duration-500"
        />
        <div className="w-full flex flex-col gap-4 ">
          <RecipeIngredients
            recipe={recipe!}
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
                    rows={recipe!.recipeIngredient.ingredients}
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
        </div>
      </Grid>

      <Recipecharts recipe={recipe!} />

      <Grid mdcols={2} gap={6} className="w-full mb-6  ">
        <NutritionTable recipe={recipe!} />

        <RecipeInstructions recipe={recipe!} />
      </Grid>
    </Page>
  );
}
