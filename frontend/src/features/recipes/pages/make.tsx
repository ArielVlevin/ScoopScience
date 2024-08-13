import Page from "@/components/class/page";
import { useSearchParams } from "react-router-dom";
import { useGetRecipe } from "../hooks/useGetRecipe";
import ErrorPage from "@/pages/error";
import Loading from "@/pages/loading";
import RecipeHeader from "../components/recipeDetail/recipeHeader";
import NewRecipeTable from "../components/recipeTable/table";
import RecipeInstructions from "../components/recipeDetail/recipeInstructions";

export default function MakeRecipePage() {
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
      <RecipeHeader recipe={recipe} />
      <NewRecipeTable
        className="border rounded-lg border-gray-300 mt-8 mb-8 "
        rows={recipe.recipeIngredient.ingredients}
        isEditable={false}
      />
      <RecipeInstructions recipe={recipe} />
    </Page>
  );
}
