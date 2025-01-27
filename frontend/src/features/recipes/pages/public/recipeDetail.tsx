import Grid from "@/components/class/grid";
import Page from "@/components/pages/page";

import { useParams } from "react-router-dom";
import { useGetRecipe } from "../../hooks/useGetRecipe";
import ErrorPage from "@/pages/error";
import NutritionTable from "../../components/Detail/nutritionTable";
import RecipeHeader from "../../components/Detail/recipeHeader";
import RecipeIngredients from "../../components/Detail/recipeIngredients";
import Recipecharts from "../../components/Detail/recipeCharts";
import RecipeInstructions from "../../components/Detail/recipeInstructions";
import { useAuth } from "@/contexts/AuthContext";

import { CardButtons } from "../../components/Card/cardButtons";
import PageCard from "@/components/pages/pageCard";
import RecipeImg from "../../components/Detail/recipeImg";
import SkeltonRecipeDetail from "../../components/Detail/SkeltonRecipeDetail";

export default function RecipeDetailPage() {
  const { user } = useAuth();

  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe_id = parseInt(recipeId!, 10);

  const { recipe, isLoading, isError, error } = useGetRecipe(recipe_id);

  if (isNaN(recipe_id)) return <ErrorPage error="Invalid Recipe ID" />;

  return (
    <Page>
      {isLoading ? (
        <SkeltonRecipeDetail />
      ) : isError && error ? (
        <ErrorPage error={error?.message} />
      ) : (
        <PageCard>
          <RecipeHeader recipe={recipe} />

          <Grid mdcols={2} gap={6} className="w-full mb-6">
            <RecipeImg recipe={recipe} />
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

          <Grid mdcols={2} gap={6} className="w-full">
            <NutritionTable recipe={recipe} />

            <RecipeInstructions recipe={recipe} />
          </Grid>
        </PageCard>
      )}
    </Page>
  );
}
