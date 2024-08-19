import Page from "@/components/class/page";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRecipe } from "../hooks/useGetRecipe";
import ErrorPage from "@/pages/error";
import Loading from "@/pages/loading";
import RecipeHeader from "../components/recipeDetail/recipeHeader";
import NewRecipeTable from "../components/recipeTable/table";
import RecipeInstructions from "../components/recipeDetail/recipeInstructions";
import { Row, Totals } from "@/types";
import { useEffect, useState } from "react";
import calculateTotals from "../calc/calculateTotals";
import { Button } from "@/components/ui";
import { Trash2Icon } from "lucide-react";

import { deleteRecipe } from "../services/api";
import { useAuth } from "@/contexts/AuthContext";
import { removeRecipeFromCache } from "../hooks/useRemoveRecipe";

export default function EditRecipe() {
  //
  const { user, updateUserRecipes } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("id");
  const recipe_id = parseInt(recipeId!, 10);

  const [tempoRows, setTempoRows] = useState<Row[]>([]);
  const [tempoTotals, setTempoTotals] = useState<Totals>(calculateTotals([]));

  const { recipe, isLoading, isError, error } = useGetRecipe(recipe_id);

  useEffect(() => {
    if (
      recipe &&
      recipe.recipeIngredient &&
      recipe.recipeIngredient.ingredients
    ) {
      setTempoRows(recipe.recipeIngredient.ingredients);
      setTempoTotals(calculateTotals(recipe.recipeIngredient.ingredients));
    }
  }, [recipe]);

  const handleDelete = async () => {
    if (!user || user._id !== recipe.user_id?._id) return;
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the recipe "${recipe.recipeData.recipeName}"?`
      );
      if (!confirmDelete) return;

      await deleteRecipe(recipe_id);
      updateUserRecipes(recipe_id, "remove");
      alert("Recipe deleted successfully.");
      removeRecipeFromCache(recipe_id);
      navigate("/user/recipes");
    } catch (error) {
      alert("Failed to delete the recipe. Please try again.");
    }
  };

  if (isNaN(recipe_id)) return <ErrorPage error="Invalid Recipe ID" />;
  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page>
      <div className="mb-6 flex justify-end">
        <Button onClick={handleDelete} variant="destructive">
          <Trash2Icon className="size-5 mr-2" />
          Delte Recipe
        </Button>
      </div>
      <RecipeHeader recipe={recipe} />

      <NewRecipeTable
        className="border rounded-lg border-gray-300 mt-8 mb-8 "
        rows={tempoRows}
        setRows={setTempoRows}
        totals={tempoTotals}
        setTotals={setTempoTotals}
        isEditable={false}
      />

      <RecipeInstructions recipe={recipe} />
    </Page>
  );
}
