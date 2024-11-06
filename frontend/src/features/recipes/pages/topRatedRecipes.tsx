import Page from "@/components/class/page";

import {
  LoadMoreButton,
  RecipeFound,
  RecipeGridList,
} from "../components/recipeGrid/recipeGrid";
import { usePaginatedRecipes } from "../hooks/usePaginatedRecipes";
import ErrorPage from "@/pages/error";
import { useEffect } from "react";
import PageCard from "@/components/class/pageCard";

export default function ExploreTopRatedRecipesPage() {
  const {
    recipes: allRecipes,
    page,
    totalPages,
    totalRecipes,
    isLoading,
    handleLoadMore,
    isError,
    error,
  } = usePaginatedRecipes({ type: "getRecipesByRate" });

  useEffect(() => {});
  if (isError && error) {
    return <ErrorPage error={error?.message} />;
  }
  return (
    <>
      <Page>
        <PageCard title="Top Rated">
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
            className="mb-6"
          />
        </PageCard>
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
    </>
  );
}
