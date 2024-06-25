import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "@/components/icons/icon";
import { Row } from "@/Types/ingredient";


export function calculateTotals(rows: Row[]) {
   let totalWeight = 0;
   let totalFat = 0;
   let totalSol = 0;
   let totalCalories = 0;
   let totalSugar = 0;
   let totalMSNF = 0;
 
   rows.forEach(row => {
     const weight = Number(row.weight);
     const fat = Number(row.fat);
     const solidsPercentage = Number(row.totalSolids);
     const calories = Number(row.calories);
     const msnf = Number(row.msnf);
     const sugars = Number(row.sugar);
 
     totalWeight += weight;
     totalFat += fat;
     totalSol += (solidsPercentage * weight) / 100;
     totalCalories += calories * (weight / 100);
     totalSugar += sugars;
     totalMSNF += (msnf * weight) / 100;
   });
 
   return { totalWeight, totalFat, totalSol, totalCalories, totalSugar, totalMSNF };
 }
 






type TotalsCardProps = {
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
    <Card className="mb-6 mt-8 border rounded-lg w-full border-gray-300 ">
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 items-center justify-between flex">
        <div className="flex flex-col items-center">
          <span className="text-muted-foreground">Total Weight</span>
          <div className="flex items-center gap-2">
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
  );
}