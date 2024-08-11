import BulletChart from "@/components/chart/bulletChart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { RecipeKind, Totals } from "@/types";

type ChartType = "Total Solids" | "Total Fat" | "Total Sugars";

const commonDataMap: Record<ChartType, { title: string; ranges: number[] }> = {
  "Total Solids": { title: "Total Solids", ranges: [100] },
  "Total Fat": { title: "Total Fat", ranges: [100] },
  "Total Sugars": { title: "Total Sugars", ranges: [100] },
};

const markersMap: Record<RecipeKind, Record<ChartType, number[]>> = {
  gelato: {
    "Total Solids": [35, 40],
    "Total Fat": [2, 9],
    "Total Sugars": [18, 22],
  },
  iceCream: {
    "Total Solids": [40, 50],
    "Total Fat": [10, 20],
    "Total Sugars": [14, 24],
  },
  custard: {
    "Total Solids": [20, 70],
    "Total Fat": [10, 30],
    "Total Sugars": [15, 40],
  },
  sorbet: {
    "Total Solids": [25, 35],
    "Total Fat": [0, 5],
    "Total Sugars": [20, 30],
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
  width?: number;
  height?: number;
}

export function RecipeBulletChart({
  recipeType,
  chartType,
  measures,
  width = 700,
  height = 85,
}: RecipeBulletChartProps) {
  const data = {
    ...getDataByRecipeAndChartType(recipeType, chartType),
    measures,
  };

  return <BulletChart data={data} width={width} height={height} />;
}

type RecipeBulletChartsProps = {
  totals: Totals;
  recipeType: RecipeKind;
  width?: number;
  height?: number;
};
export default function RecipeBulletCharts({
  totals,
  recipeType,
  width = 700,
  height = 85,
}: RecipeBulletChartsProps) {
  return (
    <div className="w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0}>
              <RecipeBulletChart
                recipeType={recipeType}
                chartType="Total Solids"
                measures={[totals.totalSolidPercentage]}
                width={width}
                height={height}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>The recommendations of Solids in {recipeType} is:</p>
            <p>
              minimum percentage: {markersMap[recipeType]["Total Solids"][0]}%
            </p>
            <p>
              maximum percentage: {markersMap[recipeType]["Total Solids"][1]}%
            </p>
            <p>Your percentage: {totals.totalSolidPercentage}%</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0}>
              <RecipeBulletChart
                recipeType={recipeType}
                chartType="Total Fat"
                measures={[totals.totalFatPercentage]}
                width={width}
                height={height}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>The recommendations of Fat in {recipeType} is:</p>
            <p>minimum percentage: {markersMap[recipeType]["Total Fat"][0]}%</p>
            <p>maximum percentage: {markersMap[recipeType]["Total Fat"][1]}%</p>
            <p>Your percentage: {totals.totalFatPercentage}%</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0}>
              <RecipeBulletChart
                recipeType={recipeType}
                chartType="Total Sugars"
                measures={[totals.totalSugarPercentage]}
                width={width}
                height={height}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {" "}
            <p>The recommendations of Sugars in {recipeType} is:</p>
            <p>
              minimum percentage: {markersMap[recipeType]["Total Sugars"][0]}%
            </p>
            <p>
              maximum percentage: {markersMap[recipeType]["Total Sugars"][1]}%
            </p>
            <p>Your percentage: {totals.totalSugarPercentage}%</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
