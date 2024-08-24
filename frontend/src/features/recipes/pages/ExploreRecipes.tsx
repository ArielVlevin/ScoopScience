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
import Sidebar from "../../../components/class/sideBar";
import SearchBar from "@/layouts/searchBar";

export default function ExploreRecipesPage() {
  const {
    recipes: allRecipes,
    page,
    totalPages,
    totalRecipes,
    isLoading,
    handleLoadMore,
    isError,
    error,
  } = usePaginatedRecipes({});

  useEffect(() => {});
  if (isError && error) {
    return <ErrorPage error={error?.message} />;
  }
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1">
        <main className="p-6">
          <Title>Explore Recipes</Title>
          <SearchBar />
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

          {page < (totalPages || 0) && (
            <LoadMoreButton
              itemsPerPage={allRecipes.length}
              totalRecipes={totalRecipes}
              onLoadMore={handleLoadMore}
              className="mt-6"
              isLoading={isLoading}
            />
          )}
        </main>
      </div>
    </div>
  );
}
