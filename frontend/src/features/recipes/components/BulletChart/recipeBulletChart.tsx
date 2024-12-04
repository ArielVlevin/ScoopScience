import BulletChart from "@/components/chart/bulletChart";

import { RecipeKind, Totals } from "@/types";
import {
  BulletmarkersMap,
  ChartType,
  commonDataMap,
} from "../../types/bulletMarker";
import BulletChartWithTooltip from "@/components/chart/bulletChartWithToolTip";

const getDataByRecipeAndChartType = (
  recipeType: RecipeKind,
  chartType: ChartType
) => {
  return {
    ...commonDataMap[chartType],
    markers: BulletmarkersMap[recipeType][chartType],
  };
};

interface RecipeBulletChartProps {
  recipeType: RecipeKind;
  chartType: ChartType;
  measures: number[];
  width: number | string;
  height?: number;
}

export function RecipeBulletChart({
  recipeType,
  chartType,
  measures,
  width = "100%",
  height = 85,
}: RecipeBulletChartProps) {
  const data = {
    ...getDataByRecipeAndChartType(recipeType, chartType),
    measures,
  };

  return <BulletChart data={data} width={width} height={height} />;
}

interface RecipeBulletChartsProps {
  totals: Totals;
  recipeType: RecipeKind;
  width?: number | string;
  height?: number;
}

const RecipeBulletCharts: React.FC<RecipeBulletChartsProps> = ({
  totals,
  recipeType,
  width = "100%",
  height = 85,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <BulletChartWithTooltip
        recipeType={recipeType}
        chartType="Total Solids"
        measure={totals.totalSolidPercentage}
        width={width}
        height={height}
      />
      <BulletChartWithTooltip
        recipeType={recipeType}
        chartType="Total Fat"
        measure={totals.totalFatPercentage}
        width={width}
        height={height}
      />
      <BulletChartWithTooltip
        recipeType={recipeType}
        chartType="Total Sugars"
        measure={totals.totalSugarPercentage}
        width={width}
        height={height}
      />
    </div>
  );
};

export default RecipeBulletCharts;
