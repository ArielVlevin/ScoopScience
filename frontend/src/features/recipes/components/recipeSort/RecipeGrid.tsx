import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "./RecipeCard";
import Page from "@/components/class/page";
import Grid from "@/components/class/grid";
import { Recipe } from "@/types";

type RecipeGridProps = {
  recipes: Recipe[];
  isFavoriteCard?: boolean;
};

export default function RecipeGrid({
  recipes,
  isFavoriteCard = false,
}: RecipeGridProps) {
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 6);
  };

  const displayedRecipes = recipes.slice(0, itemsPerPage);
  return (
    <Page>
      <p className="text-sm text-muted-foreground mb-4 text-center">
        {recipes.length} recipes found
      </p>

      <Grid smcols={1} mdcols={2} lgcols={3} gap={8}>
        {displayedRecipes.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            _id={recipe._id as number}
            recipeName={recipe.recipeData.recipeName}
            recipeKind={recipe.recipeData.recipeKind}
            description={recipe.recipeData.description}
            rating={recipe.recipeRating.ratingValue}
            ratingVotes={recipe.recipeRating.ratingAmount}
            allergies={recipe.recipeIngredient.allergies}
            isFavoriteCard={isFavoriteCard}
          />
        ))}
      </Grid>

      {itemsPerPage < recipes.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </Page>
  );
}
