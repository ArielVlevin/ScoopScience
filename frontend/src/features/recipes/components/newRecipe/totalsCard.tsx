import { Card, CardContent } from "@/components/ui/card";

import calculateTotals from "../../calc/calculateTotals";
import { Row } from "@/types";

type TotalsCardProps = {
  className?: string;
  rows: Row[];
};

export default function TotalsCard({ className, rows }: TotalsCardProps) {
  const {
    totalWeight,
    totalFat,
    totalCalories,
    totalSugar,
    totalMsnf,
    totalSolidPercentage,
    totalFatPercentage,
    totalSugarPercentage,
  } = calculateTotals(rows);

  return (
    <div className={className}>
      <Card className="p-3 border rounded-lg w-full border-gray-300 shadow-sm  ">
        <CardContent className="grid  items-center justify-between flex">
          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Total Weight</span>
            <span className="font-semibold">{totalWeight} gr</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Total Calories</span>
            <span className="font-semibold">{totalCalories} kcal</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Total Sugar</span>
            {totalSugar > 0 ? (
              <span className="font-semibold">
                {totalSugar} g ({totalSugarPercentage.toFixed(2)}%)
              </span>
            ) : (
              <span className="font-semibold">0 g</span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Total Fat</span>
            {totalFat > 0 ? (
              <span className="font-semibold">
                {totalFat} g ({totalFatPercentage.toFixed(2)}%)
              </span>
            ) : (
              <span className="font-semibold">0 g</span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Total Solid</span>
            <span className="font-semibold">{totalSolidPercentage}%</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Total MSNF</span>
            <span className="font-semibold">{totalMsnf}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
