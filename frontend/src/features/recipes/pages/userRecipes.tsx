import Page from "@/components/class/page";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import RecipeGrid from "../components/recipeCard/RecipeGrid";
import { useAuth } from "@/contexts/AuthContext";
import { useGetRecipes } from "../hooks/useGetRecipes";
import ZeroStatePage from "@/components/class/zeroStatePage";
import { FileAddIcon } from "@/components/icons/icon";
import NewRecipe from "../components/newRecipe/new";
import { Recipe } from "../types/recipeTypes";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

export default function UserRecipesPage() {
  const { user } = useAuth();

  const { recipes, isLoading, isError, errors } = useGetRecipes(
    user?.recipes || []
  );

  if (user?.recipes.length === 0)
    return (
      <ZeroStatePage
        title="You have no created recipes yet"
        description="Create new recipes and share them with the world."
        buttonText="Create new Recipe"
        buttonLink="/newRecipe"
        Icon={FileAddIcon}
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
      <div className="text-3xl font-bold text-primary mb-4 ">My Recipes</div>
      {/* ----add new recipe----- */}

      <Link to="/newRecipe">
        <Button variant="outline">new Recipe</Button>
      </Link>

      {/* ----Cards----- */}
      <RecipeGrid recipes={recipes} isFavoriteCard />
    </Page>
  );
}
