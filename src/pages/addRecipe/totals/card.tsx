import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "@/components/icons/icon";




type TotalsCardProps = {
  className?: string;

  totalWeight: number;
  totalCalories: number;
  totalSugar: number;
  totalSugarPercentage: number;
  totalFat: number;
  totalFatPercentage: number;
  totalSolidPercentage: number;
  totalMsnf: number;
  editTotalWeight: boolean;
  setEditTotalWeight: (value: boolean) => void;
  setNewTotalWeight: (value: number) => void;
  handleSaveEditTotalWeight: () => void;
};

export default function TotalsCard({
  className,
  totalWeight,
  totalCalories,
  totalSugar,
  totalSugarPercentage,
  totalFat,
  totalFatPercentage,
  totalSolidPercentage,
  totalMsnf,
  editTotalWeight,
  setEditTotalWeight,
  setNewTotalWeight,
  handleSaveEditTotalWeight,
}: TotalsCardProps) {
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