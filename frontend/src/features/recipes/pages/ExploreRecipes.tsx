import Page from "@/components/class/page";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import RecipeGrid from "../components/recipeCard/RecipeGrid";
import { useGetAllRecipes } from "../hooks/useGetAllRecipes";
import {
  LoadMoreButton,
  RecipeFound,
  RecipeGridList,
} from "../components/recipeGrid/recipeGrid";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function ExploreRecipesPage() {
  const { recipes, isLoading, isError, error } = useGetAllRecipes();

  const [itemsPerPage, setItemsPerPage] = useState(9);

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 6);
  };

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <>
      <Page>
        <a className="text-3xl font-bold text-primary ">Explore Recipes</a>
        <Separator className="mt-6 mb-6" />
        {/* ----Toolbar----- 
            <div className="w-11/12 mx-auto">
       <SortRecipesBar />
      </div>
      */}

        {/* ----Cards----- */}
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
