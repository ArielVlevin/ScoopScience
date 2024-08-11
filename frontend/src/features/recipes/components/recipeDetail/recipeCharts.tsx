import Grid from "@/components/class/grid";
import { Recipe } from "@/types";
import { RecipePieChart } from "./pie";
import RecipeBulletCharts from "../recipeBulletChart";

type RecipechartsProps = {
  recipe: Recipe;
};
export default function Recipecharts({ recipe }: RecipechartsProps) {
  const recipeTotals = recipe.recipeIngredient.totalData;

  return (
    <div className="bg-muted rounded-lg p-4 mb-6  hover:scale-105 duration-500">
      <Grid mdcols={2} gap={6} className="w-full mb-8">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4">Data chart</h2>
          <RecipeBulletCharts
            recipeType={recipe.recipeData.recipeKind}
            totals={recipeTotals}
          />
        </div>
        <RecipePieChart />
      </Grid>
    </div>
  );
}
