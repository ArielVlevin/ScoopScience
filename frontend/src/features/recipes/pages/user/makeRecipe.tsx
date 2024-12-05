import Page from "@/components/pages/page";
import { useSearchParams } from "react-router-dom";
import { useGetRecipe } from "../../hooks/useGetRecipe";
import ErrorPage from "@/pages/error";
import Loading from "@/pages/loading";
import RecipeHeader from "../../components/Detail/recipeHeader";
import NewRecipeTable from "../../components/Table/0table";
import RecipeInstructions from "../../components/Detail/recipeInstructions";
import { Row, Totals } from "@/types";
import { useEffect, useState } from "react";
import calculateTotals from "../../calc/calculateTotals";

export default function MakeRecipe() {
  //

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

  if (isNaN(recipe_id)) return <ErrorPage error="Invalid Recipe ID" />;
  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page>
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
