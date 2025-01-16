import { useInfiniteScroll } from "@/hooks/UseInfiniteScroll";
import { CardGrid } from "./CardGrid";
import { RecipeFound } from "./found";
import { SkeletonCardGrid } from "./SkeltonCardGrid";
import { useEffect, useState, useCallback } from "react";
import { useFetchRecipes } from "../../hooks/useFetchRecipes";
import { delay } from "@/utils/delay";
import ErrorPage from "@/pages/error";
import { FetchRecipesParams } from "@/types";
import { Separator } from "@/components/ui/separator";
import SortBadge from "@/components/icons/SortBadge";

type InfiniteCardGridProps = {
  className?: string;
  filters: FetchRecipesParams;
  setFilters: React.Dispatch<React.SetStateAction<FetchRecipesParams>>;
  filterKey?: keyof FetchRecipesParams;
  sortOptions?: string[];
};

export default function InfiniteCardGrid({
  className,
  filters,
  setFilters,
  filterKey,
  sortOptions,
}: InfiniteCardGridProps) {
  const { data, isLoading, isError, error } = useFetchRecipes(filters);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (!data || data.currentPage >= data.totalPages || isLoadingMore) return;

    // Capture the current scroll position
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    setIsLoadingMore(true);

    await delay(750); // Simulate loading delay

    // Update filters to fetch the next batch
    setFilters((prevFilters) => ({
      ...prevFilters,
      limit: prevFilters.limit ? prevFilters.limit + 9 : 9,
    }));

    // Restore the scroll position after data is loaded
    setTimeout(() => {
      setIsLoadingMore(false);
      window.scrollTo(0, scrollPosition); // Restore the scroll position
    }, 500);
  }, [data, isLoadingMore, setFilters]);

  useInfiniteScroll({
    isLoading: isLoading || isLoadingMore,
    hasMore: data ? data.currentPage < data.totalPages : false,
    onLoadMore: handleLoadMore,
    offset: 5,
    offsetType: "%",
  });

  useEffect(() => {
    if (!isLoading) setIsLoadingMore(false);
  }, [isLoading]);

  if (isError && error) {
    return <ErrorPage error={error?.message} />;
  }

  return (
    <div className={className}>
      {isLoading ? (
        <>
          <SkeletonCardGrid length={filters.limit || 9} />
          <p className="text-center text-gray-500 mt-4">Loading recipes...</p>
        </>
      ) : (
        <>
          {sortOptions && filterKey && (
            <SortBadge
              filterKey={filterKey}
              options={sortOptions}
              filters={filters}
              setFilters={setFilters}
              className="mb-6 flex justify-center"
            />
          )}

          <Separator className="mb-4" />
          <RecipeFound
            recipesLength={data?.totalRecipes || 0}
            className="mb-4"
          />

          <CardGrid
            recipes={data?.recipes || []}
            itemsPerPage={filters.limit || 9}
          />
          {isLoadingMore && (
            <>
              <SkeletonCardGrid length={filters.limit || 9} className="mt-8" />
              <p className="text-center text-gray-500 mt-2">
                Loading more recipes...
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
