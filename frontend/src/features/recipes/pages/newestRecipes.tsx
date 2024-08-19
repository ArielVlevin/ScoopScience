import Page from "@/components/class/page";

import {
  LoadMoreButton,
  RecipeFound,
  RecipeGridList,
} from "../components/recipeGrid/recipeGrid";
import { Separator } from "@/components/ui/separator";
import { usePaginatedRecipes } from "../hooks/usePaginatedRecipes";
import ErrorPage from "@/pages/error";
import { useEffect } from "react";
import Title from "@/components/class/title";

export default function ExploreNewsetRecipesPage() {
  const {
    recipes: allRecipes,
    page,
    totalPages,
    totalRecipes,
    isLoading,
    handleLoadMore,
    isError,
    error,
  } = usePaginatedRecipes({ type: "getRecipesByDate" });

  useEffect(() => {});
  if (isError && error) {
    return <ErrorPage error={error?.message} />;
  }
  return (
    <div>
      <Page>
        <Title>Explore The Newest Recipes</Title>
        <Separator className="mt-6 mb-6" />

        {/* Show the number of recipes found */}
        <RecipeFound
          recipesLength={totalRecipes}
          isShowRecipeFound={true}
          className="mb-4"
        />

        {/* Display the grid of recipes */}
        <RecipeGridList
          recipes={allRecipes}
          itemsPerPage={allRecipes.length}
          className="mb-8"
        />

        {/* Load More button */}
      </Page>
      {page < (totalPages || 0) && (
        <LoadMoreButton
          itemsPerPage={allRecipes.length}
          totalRecipes={totalRecipes}
          onLoadMore={handleLoadMore}
          className="mb-12"
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
