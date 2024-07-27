import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "@/components/icons/icon";
import { Totals } from "../../types/totalsTypes";
import { roundToTwoDecimalPlaces } from "@/utils/math";

type TotalsCardProps = {
  className?: string;
  totals: Totals;
  editTotalWeight: boolean;
  setEditTotalWeight: (value: boolean) => void;
  setNewTotalWeight: (value: number) => void;
  handleSaveEditTotalWeight: () => void;
};

export default function TotalsCard({
  className,
  totals,
  editTotalWeight,
  setEditTotalWeight,
  setNewTotalWeight,
  handleSaveEditTotalWeight,
}: TotalsCardProps) {
  const totalWeight = roundToTwoDecimalPlaces(totals.totalWeight);
  const totalCalories = roundToTwoDecimalPlaces(totals.totalCalories);
  const totalSugar = roundToTwoDecimalPlaces(totals.totalSugar);
  const totalSugarPercentage = roundToTwoDecimalPlaces(
    (totals.totalSugar / totals.totalWeight) * 100
  );
  const totalFat = roundToTwoDecimalPlaces(totals.totalFat);
  const totalFatPercentage = roundToTwoDecimalPlaces(
    (totals.totalFat / totals.totalWeight) * 100
  );
  const totalMsnf = roundToTwoDecimalPlaces(totals.totalMsnf);
  const totalSolidPercentage = roundToTwoDecimalPlaces(
    (totals.totalSolidPercentage / totals.totalWeight) * 100
  );

  return (
    <div className={className}>
      <Card className="mb-6 mt-4 border rounded-lg w-full border-gray-300 shadow-sm">
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 items-center justify-between flex">
          <div className="flex flex-col items-center">
            <span className="text-muted-foreground mt-3">Total Weight</span>
            <div className="flex items-center gap-2 mt-1 ">
              <Input
                id="totalWeight"
                type="number"
                placeholder={String(totalWeight)}
                onClick={() => setEditTotalWeight(true)}
                onChange={(e) => {
                  setEditTotalWeight(true);
                  setNewTotalWeight(parseInt(e.target.value));
                }}
                className="text-center font-semibold"
              />
              {editTotalWeight && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSaveEditTotalWeight}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <CheckIcon className="h-4 w-4" />
                    <span className="sr-only">Save</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditTotalWeight(false)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">Cancel</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Total Calories</span>
            <span className="font-semibold">{totalCalories} kcal</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Total Sugar</span>
            <span className="font-semibold">
              {totalSugar} g ({totalSugarPercentage.toFixed(2)}%)
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">Total Fat</span>
            <span className="font-semibold">
              {totalFat} g ({totalFatPercentage.toFixed(2)}%)
            </span>
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
