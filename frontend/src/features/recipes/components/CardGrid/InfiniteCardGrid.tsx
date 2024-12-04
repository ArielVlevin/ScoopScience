import { useInfiniteScroll } from "@/hooks/UseInfiniteScroll";
import { CardGrid } from "./CardGrid";
import { RecipeFound } from "./found";
import { SkeletonCardGrid } from "./SkeltonCardGrid";
import { useEffect, useState } from "react";
import { useFetchRecipes } from "../../hooks/useFetchRecipes";
import { delay } from "@/utils/delay";
import ErrorPage from "@/pages/error";

type InfiniteRecipeGridProps = {
  className?: string;
  initialFilters: {
    limit: number;
    page: number;
    order: "asc" | "desc";
    sortBy: string;
  };
};

export default function InfiniteRecipeGrid({
  className,
  initialFilters,
}: InfiniteRecipeGridProps) {
  const [filters, setFilters] = useState(initialFilters);

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
        <SkeletonCardGrid length={filters.limit} />
      ) : (
        <>
          <RecipeFound
            recipesLength={data?.totalRecipes || 0}
            isShowRecipeFound={true}
          />
          <CardGrid
            recipes={data?.recipes || []}
            itemsPerPage={filters.limit}
          />
          {isLoadingMore && (
            <SkeletonCardGrid length={filters.limit} className="mt-4" />
          )}
        </>
      )}
    </div>
  );
}
