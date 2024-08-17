import Page from "@/components/class/page";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import { useAuth } from "@/contexts/AuthContext";
import { useGetRecipes } from "../hooks/useGetRecipes";
import ZeroStatePage from "@/components/class/zeroStatePage";
import { FileAddIcon } from "@/components/icons/icon";

import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  LoadMoreButton,
  RecipeGridList,
} from "../components/recipeGrid/recipeGrid";
import { Separator } from "@/components/ui/separator";

export default function UserRecipesPage() {
  const { user } = useAuth();

  const { recipes, isLoading, isError, errors } = useGetRecipes(
    user?.recipes || []
  );

  const [itemsPerPage, setItemsPerPage] = useState(9);

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 6);
  };

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
    <>
      <Page>
        <div className="text-3xl font-bold text-primary mb-4 ">My Recipes</div>
        <Separator className="mt-6 mb-6" />

        {/* ----add new recipe----- */}

        <Link to="/newRecipe">
          <Button variant="outline" className="w-40 h-12 text-xl mb-6">
            New Recipe
          </Button>
        </Link>

        {/* ----Cards----- */}
        <RecipeGridList recipes={recipes} itemsPerPage={itemsPerPage} />
      </Page>
      <LoadMoreButton
        className="mb-12"
        itemsPerPage={itemsPerPage}
        totalRecipes={recipes.length}
        onLoadMore={handleLoadMore}
      />
    </>
  );
}
