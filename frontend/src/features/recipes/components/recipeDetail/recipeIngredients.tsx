import Grid from "@/components/class/grid";
import { IngredientWithWeight, Recipe } from "@/types";
import { cn } from "@/utils/cn";

type RecipeIngredientsProps = {
  className?: string;
  recipe: Recipe;
};

type IngredientListProps = {
  title: string;
  ingredients: IngredientWithWeight[];
};

const IngredientList = ({ title, ingredients }: IngredientListProps) => (
  <div>
    <h3 className="font-medium mb-1">{title}</h3>
    <ul className="space-y-2">
      {ingredients.map((ingredient) => (
        <li key={ingredient._id}>{ingredient.name}</li>
      ))}
    </ul>
  </div>
);

const categories = [
  { title: "Dairy", filter: "dairy" },
  { title: "Sugars", filter: "sugars" },
  { title: "Stabilizers", filter: "stabilizer" },
  { title: "Other Ingredients", filter: "other" },
];

export default function RecipeIngredients({
  className,
  recipe,
}: RecipeIngredientsProps) {
  const ingredientsArray = recipe.recipeIngredient.ingredients;

  return (
    <div
      className={cn(
        "bg-muted rounded-lg p-6 hover:scale-105 duration-500",
        className
      )}
    >
      <h2 className="text-xl font-bold mb-4">Ingredients</h2>
      <Grid mdcols={2} gap={8} className="w-full">
        {categories.map(({ title, filter }) => {
          const filteredIngredients =
            filter === "other"
              ? ingredientsArray.filter(
                  (ingredient) =>
                    ingredient.category !== "dairy" &&
                    ingredient.category !== "sugars" &&
                    ingredient.category !== "stabilizer"
                )
              : ingredientsArray.filter(
                  (ingredient) => ingredient.category === filter
                );

          return (
            <IngredientList
              key={title}
              title={title}
              ingredients={filteredIngredients}
            />
          );
        })}
      </Grid>
    </div>
  );
}
