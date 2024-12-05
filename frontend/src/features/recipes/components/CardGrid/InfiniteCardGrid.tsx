import { useInfiniteScroll } from "@/hooks/UseInfiniteScroll";
import { CardGrid } from "./CardGrid";
import { RecipeFound } from "./found";
import { SkeletonCardGrid } from "./SkeltonCardGrid";
import { useEffect, useState } from "react";
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
  const { data, isLoading, isError, error } = useFetchRecipes(filters); // fetch Recipes

  const [isLoadingMore, setIsLoadingMore] = useState(false); // loading(more than the first page)

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
        <SkeletonCardGrid length={filters.limit || 9} />
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
            <SkeletonCardGrid length={filters.limit || 9} className="mt-4" />
          )}
        </>
      )}
    </div>
  );
}
