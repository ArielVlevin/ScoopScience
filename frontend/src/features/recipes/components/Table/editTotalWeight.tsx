import { useState } from "react";
import { calculateAndRound } from "../../calc/calculateAndRound";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "@/components/icons/icon";
import calculateTotals from "../../calc/calculateTotals";
import { Row } from "@/types";

type EditTotalWeightProps = {
  isOpen: boolean;
  onClose: () => void;
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  totals: ReturnType<typeof calculateTotals>;
  setTotals: React.Dispatch<
    React.SetStateAction<ReturnType<typeof calculateTotals>>
  >;
};

export default function EditTotalWeight({
  isOpen,
  onClose,
  rows,
  setRows,
  totals,
  setTotals,
}: EditTotalWeightProps) {
  //
  const [newTotalWeight, setNewTotalWeight] = useState<number>(
    totals.totalWeight
  );

  const handleSave = () => {
    const prevTotalWeight = totals.totalWeight;
    if (newTotalWeight >= 1) {
      setRows(
        rows.map((row) => ({
          ...row,
          weight: calculateAndRound(
            row.weight,
            prevTotalWeight,
            newTotalWeight
          ),
          calories: calculateAndRound(
            row.calories,
            prevTotalWeight,
            newTotalWeight
          ),
          sugar: calculateAndRound(row.sugar, prevTotalWeight, newTotalWeight),
          fat: calculateAndRound(row.fat, prevTotalWeight, newTotalWeight),
          protein: calculateAndRound(
            row.protein,
            prevTotalWeight,
            newTotalWeight
          ),
        }))
      );

      setTotals(calculateTotals(rows));
      onClose();
    } else alert("Please enter a valid value greater than 0 grams");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Total Weight</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            id="weight"
            type="number"
            value={newTotalWeight}
            onChange={(e) => setNewTotalWeight(Number(e.target.value))}
          />
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className="text-muted-foreground hover:text-primary"
          >
            <CheckIcon className="w-4 h-4" />
            <span className="sr-only">Save</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-muted-foreground hover:text-destructive"
          >
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
