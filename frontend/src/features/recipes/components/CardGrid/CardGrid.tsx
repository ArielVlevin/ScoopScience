import Grid from "@/components/class/grid";
import { Recipe } from "@/types";
import { RecipeCard } from "../Card/Card";

type CardGridProps = {
  className?: string;
  recipes: Recipe[];
  itemsPerPage: number;
  type?: "recipe" | "editable" | "favorite";
};

export function CardGrid({
  className,
  recipes,
  itemsPerPage,
  type = "recipe",
}: CardGridProps) {
  const displayedRecipes = recipes.slice(0, itemsPerPage);

  return (
    <>
      <Grid smcols={1} mdcols={2} lgcols={3} gap={8} className={className}>
        {displayedRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} type={type} />
        ))}
      </Grid>
    </>
  );
}
