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
    <Page>
      <Title>Explore Recipes</Title>
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
    </Page>
  );
}

/*
      <div>
        <a className="text-3xl font-bold text-primary ">Explore Recipes</a>
        <Separator className="mt-6 mb-6" />
      </div>
      <Page>
        <a className="text-3xl font-bold text-primary ">Explore Recipes</a>
        <Separator className="mt-6 mb-6" />
        {/* ----Toolbar----- 
            <div className="w-11/12 mx-auto">
       <SortRecipesBar />
      </div>
      }

        <RecipeFound className="mb-4" recipesLength={recipes.length} />
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
*/
