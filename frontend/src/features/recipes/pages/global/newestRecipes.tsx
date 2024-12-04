import Page from "@/components/class/page";
import InfiniteRecipeGrid from "../../components/CardGrid/InfiniteCardGrid";
import PageCard from "@/components/class/pageCard";

export default function ExploreNewsetRecipesPage() {
  return (
    <Page>
      <PageCard title="Newest Recipes">
        <InfiniteRecipeGrid
          initialFilters={{
            limit: 9,
            page: 1,
            order: "desc",
            sortBy: "createdAt",
          }}
        />
      </PageCard>
    </Page>
  );
}

/*






import Page from "@/components/class/page";

import ErrorPage from "@/pages/error";
import PageCard from "@/components/class/pageCard";
import { useFetchRecipes } from "../../hooks/useFetchRecipes";
import { FetchRecipesParams } from "../../utils/fetchRecipes";
import { useEffect, useState } from "react";
import { CardGrid } from "../../components/CardGrid/CardGrid";
import { RecipeFound } from "../../components/CardGrid/found";
import { delay } from "@/utils/delay";
import { useInfiniteScroll } from "@/hooks/UseInfiniteScroll";
import { SkeletonCardGrid } from "../../components/CardGrid/SkeltonCardGrid";





export default function ExploreNewsetRecipesPage() {
  const [filters, setFilters] = useState<FetchRecipesParams>({
    limit: 9,
    page: 1,
    order: "desc",
    sortBy: "createdAt",
  });

  const { data, isLoading, isError, error } = useFetchRecipes(filters);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (!data || data.currentPage >= data.totalPages) return;

    setIsLoadingMore(true);
    await delay(750);

    setFilters((prevFilters) => ({
      ...prevFilters,
      limit: filters.limit ? filters.limit + 9 : 9,
    }));

    setTimeout(() => setIsLoadingMore(false), 500); // Reset loading state
  };

  useInfiniteScroll({
    isLoading,
    hasMore: data ? data.currentPage < data.totalPages : false,
    onLoadMore: handleLoadMore,
    offset: 50,
  });

  useEffect(() => {
    if (!isLoading) setIsLoadingMore(false); // Reset loading state after data is fetched
  }, [isLoading]);

  if (isError && error) {
    return <ErrorPage error={error?.message} />;
  }
  return (
    <div>
      <Page>
        <PageCard title="Newest Recipes">
          {isLoading && filters.limit! <= 9 ? (
            <SkeletonCardGrid length={9} />
          ) : data ? (
            <>
              <RecipeFound
                recipesLength={data?.totalRecipes || 0}
                isShowRecipeFound={true}
                className="mb-4"
              />
              <CardGrid
                recipes={data?.recipes || []}
                itemsPerPage={filters.limit || 9}
                className="mb-6"
              />
              {isLoadingMore && <SkeletonCardGrid length={9} />}
            </>
          ) : (
            <p>No recipes found</p>
          )}
        </PageCard>
      </Page>
    </div>
  );
}
*/
