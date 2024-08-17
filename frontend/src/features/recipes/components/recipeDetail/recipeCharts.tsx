import Grid from "@/components/class/grid";
import { Recipe } from "@/types";
import { RecipePieChart } from "./pie";
import RecipeBulletCharts from "../recipeBulletChart";
import Box from "@/components/class/box";

type RecipechartsProps = {
  recipe: Recipe;
};
export default function Recipecharts({ recipe }: RecipechartsProps) {
  const recipeTotals = recipe.recipeIngredient.totalData;

  return (
    <Box>
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
    </Box>
  );
}
