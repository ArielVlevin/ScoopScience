import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { RecipeKind } from "@/types";
import { BulletmarkersMap } from "@/features/recipes/types/bulletMarker";
import { RecipeBulletChart } from "@/features/recipes/components/BulletChart/recipeBulletChart";

interface BulletChartWithTooltipProps {
  recipeType: RecipeKind;
  chartType: "Total Solids" | "Total Fat" | "Total Sugars";
  measure: number;
  width?: number | string;
  height?: number;
}

const BulletChartWithTooltip: React.FC<BulletChartWithTooltipProps> = ({
  recipeType,
  chartType,
  measure,
  width = "100%",
  height = 85,
}) => {
  const markers = BulletmarkersMap[recipeType][chartType];
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0}>
            <RecipeBulletChart
              recipeType={recipeType}
              chartType={chartType}
              measures={[measure]}
              width={width}
              height={height}
            />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            The recommendations of {chartType} in {recipeType} is:
          </p>
          <p>Minimum percentage: {markers[0]}%</p>
          <p>Maximum percentage: {markers[1]}%</p>
          <p>Your percentage: {measure}%</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BulletChartWithTooltip;
