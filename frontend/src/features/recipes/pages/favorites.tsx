import { useAuth } from "@/contexts/AuthContext";
import { useGetRecipes } from "../hooks/useGetRecipes";
import Page from "@/components/class/page";
import Loading from "@/pages/loading";
import RecipeGrid from "../components/recipeCard/RecipeGrid";
import ErrorPage from "@/pages/error";
import { FileHeartIcon } from "@/components/icons/icon";
import ZeroStatePage from "@/components/class/zeroStatePage";

export default function FavoritesRecipesPage() {
  const { user } = useAuth();

  const { recipes, isLoading, isError, errors } = useGetRecipes(
    user?.favorites || []
  );

  if (user?.favorites.length === 0)
    return (
      <ZeroStatePage
        title="You have no favorite recipes yet"
        description="Discover new recipes and save your favorites to access them easily."
        buttonText="Discover Recipes"
        buttonLink="/recipes"
        Icon={FileHeartIcon}
      />
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
    <Page>
      <a className="text-3xl font-bold text-primary ">My Favorites Recipes</a>

      {/* ----Cards----- */}

      <RecipeGrid recipes={recipes} isFavoriteCard />
    </Page>
  );
}
