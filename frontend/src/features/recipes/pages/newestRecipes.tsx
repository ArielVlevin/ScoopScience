import Page from "@/components/class/page";

import {
  LoadMoreButton,
  RecipeFound,
  RecipeGridList,
} from "../components/recipeGrid/recipeGrid";
import { usePaginatedRecipes } from "../hooks/usePaginatedRecipes";
import ErrorPage from "@/pages/error";
import PageCard from "@/components/class/pageCard";

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

  if (isError && error) {
    return <ErrorPage error={error?.message} />;
  }

  return (
    <div>
      <Page>
        <PageCard title="Newest Recipes">
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

          {/* Load More button */}
        </PageCard>
      </Page>
      {page < (totalPages || 0) && (
        <LoadMoreButton
          itemsPerPage={allRecipes.length}
          totalRecipes={totalRecipes}
          onLoadMore={handleLoadMore}
          className=" mb-12"
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
