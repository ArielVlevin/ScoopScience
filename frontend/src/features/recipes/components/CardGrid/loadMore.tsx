import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

type LoadMoreButtonProps = {
  className?: string;
  itemsPerPage: number;
  totalRecipes: number;
  onLoadMore: () => void;
  isLoading?: boolean;
};

export function LoadMoreButton({
  className,
  itemsPerPage,
  totalRecipes,
  onLoadMore,
  isLoading,
}: LoadMoreButtonProps) {
  if (itemsPerPage >= totalRecipes) return null;

  return (
    <div className={cn(className, "flex justify-center ")}>
      <Button
        className="w-52 h-16 text-xl bg-primary/85"
        disabled={isLoading}
        onClick={onLoadMore}
      >
        {isLoading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}

/*
<Button
disabled={
  data?.currentPage >= data?.totalPages || isLoadingMore
}
onClick={handleLoadMore}
>
{isLoading ? "Loading..." : "Load More"}
</Button>
*/
