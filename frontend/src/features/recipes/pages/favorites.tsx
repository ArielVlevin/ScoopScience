import { useAuth } from "@/contexts/AuthContext";
import { useGetRecipes } from "../hooks/useGetRecipes";
import Page from "@/components/class/page";
import Loading from "@/pages/loading";
import RecipeGrid from "../components/recipeSort/RecipeGrid";
import ErrorPage from "@/pages/error";

export default function FavoritesRecipesPage() {
  const { user } = useAuth();

  const { recipes, isLoading, isError, errors } = useGetRecipes(
    user?.favorites || []
  );

  if (isLoading) return <Loading />;
  if (isError && errors) {
    const msg = errors.map((error) => {
      error?.message;
    });
    const combinedErrors: string = msg.join("\n;; ");

    return <ErrorPage error={combinedErrors} />;
  }

  return (
    <Page wide>
      {/* ----Cards----- */}
      <RecipeGrid recipes={recipes} />
    </Page>
  );
}
