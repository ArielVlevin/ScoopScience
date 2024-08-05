import BulletChart from "@/components/chart/bulletChart";
import Grid from "@/components/class/grid";
import { Recipe, RecipeKind } from "@/types";
import { RecipePieChart } from "./pie";

type ChartType = "Total Solids" | "Total Fat" | "Total Sugars";

const commonDataMap: Record<ChartType, { title: string; ranges: number[] }> = {
  "Total Solids": { title: "Total Solids", ranges: [100] },
  "Total Fat": { title: "Total Fat", ranges: [100] },
  "Total Sugars": { title: "Total Sugars", ranges: [100] },
};

const markersMap: Record<RecipeKind, Record<ChartType, number[]>> = {
  gelato: {
    "Total Solids": [30, 80],
    "Total Fat": [10, 30],
    "Total Sugars": [20, 50],
  },
  iceCream: {
    "Total Solids": [25, 75],
    "Total Fat": [15, 40],
    "Total Sugars": [25, 60],
  },
  custard: {
    "Total Solids": [20, 70],
    "Total Fat": [10, 30],
    "Total Sugars": [15, 40],
  },
  sorbet: {
    "Total Solids": [20, 70],
    "Total Fat": [5, 15],
    "Total Sugars": [25, 55],
  },
  other: {
    "Total Solids": [15, 60],
    "Total Fat": [5, 20],
    "Total Sugars": [20, 50],
  },
};
const getDataByRecipeAndChartType = (
  recipeType: RecipeKind,
  chartType: ChartType
) => {
  return {
    ...commonDataMap[chartType],
    markers: markersMap[recipeType][chartType],
  };
};

interface RecipeBulletChartProps {
  recipeType: RecipeKind;
  chartType: ChartType;
  measures: number[];
}

function RecipeBulletChart({
  recipeType,
  chartType,
  measures,
}: RecipeBulletChartProps) {
  const data = {
    ...getDataByRecipeAndChartType(recipeType, chartType),
    measures,
  };

  return <BulletChart data={data} width={700} height={85} />;
}

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
          <RecipeBulletChart
            recipeType={recipe.recipeData.recipeKind}
            chartType="Total Solids"
            measures={[recipeTotals.totalSolidPercentage]}
          />
          <RecipeBulletChart
            recipeType={recipe.recipeData.recipeKind}
            chartType="Total Fat"
            measures={[recipeTotals.totalFatPercentage]}
          />
          <RecipeBulletChart
            recipeType={recipe.recipeData.recipeKind}
            chartType="Total Sugars"
            measures={[recipeTotals.totalSugarPercentage]}
          />
        </div>
        <RecipePieChart />
      </Grid>
    </div>
  );
}
