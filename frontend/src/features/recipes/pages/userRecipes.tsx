import Page from "@/components/class/page";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import { useAuth } from "@/contexts/AuthContext";
import { useGetRecipes } from "../hooks/useGetRecipes";
import ZeroStatePage from "@/components/class/zeroStatePage";
import { FileAddIcon, PlusIcon } from "@/components/icons/icon";

import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  LoadMoreButton,
  RecipeGridList,
} from "../components/recipeGrid/recipeGrid";
import PageCard from "@/components/class/pageCard";
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

  if (recipes.length === 0)
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
        <PageCard title="My Recipes">
          {/* ----add new recipe----- */}

          <Link to="/newRecipe">
            <Button className="w-40 h-12 text-md ">
              <PlusIcon className="size-4 mr-2" />
              New Recipe
            </Button>
          </Link>
          <Separator />

          {/* ----Cards----- */}
          <RecipeGridList
            recipes={recipes}
            itemsPerPage={itemsPerPage}
            isFavoriteCard
          />
        </PageCard>
        <LoadMoreButton
          className="mb-12"
          itemsPerPage={itemsPerPage}
          totalRecipes={recipes.length}
          onLoadMore={handleLoadMore}
        />
      </Page>
    </>
  );
}
