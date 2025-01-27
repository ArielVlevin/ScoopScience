import Page from "@/components/pages/page";
import { useSearchParams } from "react-router-dom";
import { useGetRecipe } from "../../hooks/useGetRecipe";
import ErrorPage from "@/pages/error";
import Loading from "@/pages/loading";
import RecipeHeader from "../../components/Detail/recipeHeader";

import PageCard from "@/components/pages/pageCard";
import QuantitySelector from "../../components/Make/amountSelect";
import PreparationSteps from "../../components/Make/prep";
import CompletionForm from "../../components/Make/reply";
import RecipeIngredients from "../../components/Detail/recipeIngredients";
import { Separator } from "@/components/ui/separator";
import Grid from "@/components/class/grid";
import RecipeImg from "../../components/Detail/recipeImg";

export default function MakeRecipe() {
  //

  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("id");
  const recipe_id = parseInt(recipeId!, 10);

  const { recipe, isLoading, isError, error } = useGetRecipe(recipe_id);

  if (isNaN(recipe_id)) return <ErrorPage error="Invalid Recipe ID" />;
  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page>
      <PageCard>
        <RecipeHeader recipe={recipe} />
        <Separator />
        <Grid mdcols={2} gap={6} className="w-full mb-6">
          <RecipeImg recipe={recipe} />
          <RecipeIngredients recipe={recipe} className=" h-full " />
        </Grid>

        <Separator />

        <QuantitySelector />
        <Separator />

        <PreparationSteps />

        <Separator />
        <CompletionForm />
      </PageCard>
    </Page>
  );
}

/*
         <NewRecipeTable
          className="border rounded-lg border-gray-300 mt-8 mb-8 "
          rows={tempoRows}
          setRows={setTempoRows}
          totals={tempoTotals}
          setTotals={setTempoTotals}
          isEditable={false}
        />

        <RecipeInstructions recipe={recipe} />

        */
