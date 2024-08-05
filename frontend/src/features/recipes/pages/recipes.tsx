import Page from "@/components/class/page";
import { useGetRecipes } from "../hooks/useGetRecipes";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import SortRecipesBar from "../components/recipeSort/sortRecipesBar";
import RecipeGrid from "../components/recipeSort/RecipeGrid";

export default function RecipesPage() {
  const { recipes, isLoading, isError, error } = useGetRecipes();

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page wide>
      {/* ----Toolbar----- */}
      <div className="w-11/12 mx-auto">
        <SortRecipesBar />
      </div>
      {/* ----Cards----- */}
      <RecipeGrid recipes={recipes} />
    </Page>
  );
}
