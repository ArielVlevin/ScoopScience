import { Separator } from "@/components/ui/separator";
import ErrorPage from "@/pages/error";
import { useEffect, useState } from "react";
import Title from "@/components/class/title";
import Sidebar from "../../../../components/class/sideBar";
import Page from "@/components/class/page";
import { useFetchRecipes } from "../../hooks/useFetchRecipes";
import { FetchRecipesParams } from "../../utils/fetchRecipes";
import { RecipeFound } from "../../components/CardGrid/found";
import { CardGrid } from "../../components/CardGrid/CardGrid";

export default function ExploreRecipesPage() {
  const [filters, setFilters] = useState<FetchRecipesParams>({
    limit: 9,
    page: 1,
    order: "desc",
    sortBy: "createdAt",
  });

  const { data, isLoading, isError, error } = useFetchRecipes(filters);

  useEffect(() => {});
  if (isError && error) {
    return <ErrorPage error={error?.message} />;
  }
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="flex-1">
        <main className="p-6">
          <Page>
            <Title>Explore Recipes</Title>
            <Separator className="mt-6 mb-6" />

            {/* Show the number of recipes found */}
            <RecipeFound
              recipesLength={data?.totalRecipes || 0}
              isShowRecipeFound={true}
              className="mb-4"
            />

            {/* Display the grid of recipes */}
            <CardGrid
              recipes={data?.recipes || []}
              itemsPerPage={filters.limit || 9}
              className="mb-8"
            />

            {/* Load More button */}
          </Page>
        </main>
      </div>
    </div>
  );
}
