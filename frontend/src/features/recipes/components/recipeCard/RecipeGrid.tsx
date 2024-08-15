import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "./RecipeCard";
import Page from "@/components/class/page";
import Grid from "@/components/class/grid";
import { Recipe } from "@/types";

type RecipeGridProps = {
  recipes: Recipe[];
  isFavoriteCard?: boolean;
  isShowRecipeFound?: boolean;
  className?: string;
};

export default function RecipeGrid({
  recipes,
  isFavoriteCard = false,
  isShowRecipeFound = true,
  className,
}: RecipeGridProps) {
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 6);
  };

  const displayedRecipes = recipes.slice(0, itemsPerPage);
  return (
    <Page className={className}>
      {isShowRecipeFound && (
        <p className="text-sm text-muted-foreground mb-6 text-center">
          {recipes.length} recipes found
        </p>
      )}

      <Grid smcols={1} mdcols={2} lgcols={3} gap={8}>
        {displayedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            isFavoriteCard={isFavoriteCard}
          />
        ))}
      </Grid>

      {itemsPerPage < recipes.length && (
        <div className="flex justify-center mt-12">
          <Button className="w-52 h-16 text-xl" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </Page>
  );
}
