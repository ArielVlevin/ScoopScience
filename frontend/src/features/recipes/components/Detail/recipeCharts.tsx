import Grid from "@/components/class/grid";
import { Recipe } from "@/types";
import { RecipePieChart } from "./pie";
import PageBox from "@/components/class/pageBox";
import RecipeBulletCharts from "../BulletChart/recipeBulletChart";

type RecipechartsProps = {
  recipe: Recipe;
};
export default function Recipecharts({ recipe }: RecipechartsProps) {
  const recipeTotals = recipe.recipeIngredient.totalData;

  return (
    <PageBox>
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
    </PageBox>
  );
}
