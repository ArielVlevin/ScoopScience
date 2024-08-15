import { Button } from "@/components/ui/button";
import Grid from "@/components/class/grid";
import { Recipe } from "@/types";
import { RecipeCard } from "../recipeCard/RecipeCard";
import { cn } from "@/utils/cn";

type RecipeFoundProps = {
  className?: string;
  recipesLength: number;
  isShowRecipeFound?: boolean;
};

export function RecipeFound({
  className,
  recipesLength,
  isShowRecipeFound = true,
}: RecipeFoundProps) {
  if (!isShowRecipeFound) return null;

  return (
    <p className={cn(className, "text-sm text-muted-foreground text-center")}>
      {recipesLength} recipes found
    </p>
  );
}

type RecipeGridListProps = {
  className?: string;

  recipes: Recipe[];
  itemsPerPage: number;
  isFavoriteCard?: boolean;
};

export function RecipeGridList({
  className,
  recipes,
  itemsPerPage,
  isFavoriteCard = false,
}: RecipeGridListProps) {
  const displayedRecipes = recipes.slice(0, itemsPerPage);

  return (
    <Grid smcols={1} mdcols={2} lgcols={3} gap={8} className={className}>
      {displayedRecipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          isFavoriteCard={isFavoriteCard}
        />
      ))}
    </Grid>
  );
}

type LoadMoreButtonProps = {
  className?: string;
  itemsPerPage: number;
  totalRecipes: number;
  onLoadMore: () => void;
};

export function LoadMoreButton({
  className,
  itemsPerPage,
  totalRecipes,
  onLoadMore,
}: LoadMoreButtonProps) {
  if (itemsPerPage >= totalRecipes) return null;

  return (
    <div className={cn(className, "flex justify-center ")}>
      <Button className="w-52 h-16 text-xl" onClick={onLoadMore}>
        Load More
      </Button>
    </div>
  );
}
