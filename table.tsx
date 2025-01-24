import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableFooter,
} from "@/components/ui/table";
import { Row } from "@/types";
import NewRecipeTableCells, {
  NewRecipeTableHeads,
} from "./frontend/src/features/recipes/components/Table/setup/tableSetUp";
import { roundToTwoDecimalPlaces } from "@/utils/math";
import calculateTotals from "@/features/recipes/calc/calculateTotals";
import EditWeightDialog from "./frontend/src/features/recipes/components/Table/edit/editWeight";
import { calculateAndRound } from "./frontend/src/features/recipes/calc/calculateAndRound";
import EditTotalWeight from "./frontend/src/features/recipes/components/Table/edit/editTotalWeight";

type NewRecipeTableProops = {
  className?: string;
  rows: Row[];
  setRows?: React.Dispatch<React.SetStateAction<Row[]>>;
  totals?: ReturnType<typeof calculateTotals>;
  setTotals?: React.Dispatch<
    React.SetStateAction<ReturnType<typeof calculateTotals>>
  >;
  isEditable?: boolean;
  isTotalsVisible?: boolean;
};

export default function NewRecipeTable({
  className,
  rows,
  setRows = () => {},
  totals = calculateTotals(rows),
  setTotals = () => {},
  isEditable = true,
  isTotalsVisible = true,
}: NewRecipeTableProops) {
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false);
  const [isEditingTotalWeight, setIsEditingTotalWeight] =
    useState<boolean>(false);

  useEffect(() => {
    setTotals(calculateTotals(rows));
  }, [rows, setTotals]);

  const handleEditWeight = (row: Row) => {
    setSelectedRow(row);
    setIsEditingWeight(true);
  };

  const handleEditTotalWeight = () => {
    setIsEditingTotalWeight(true);
  };
  const handleCloseTotalWeight = () => {
    setIsEditingTotalWeight(false);
  };

  const handleClose = () => {
    setIsEditingWeight(false);
    setSelectedRow(null);
  };

  const handleSaveEdit = (newWeight: number) => {
    setRows(
      rows.map((row) =>
        row._id === selectedRow?._id
          ? {
              ...row,
              sugar: calculateAndRound(row.sugar, row.weight, newWeight),
              fat: calculateAndRound(row.fat, row.weight, newWeight),
              protein: calculateAndRound(row.protein, row.weight, newWeight),
              calories: calculateAndRound(row.calories, row.weight, newWeight),
              weight: roundToTwoDecimalPlaces(newWeight),
            }
          : row
      )
    );
    handleClose();
  };

  const handleDelete = (row: Row) => {
    setRows(rows.filter((r) => r._id !== row._id));
  };

  return (
    <div>
      <EditWeightDialog
        isOpen={isEditingWeight}
        onClose={handleClose}
        row={selectedRow}
        onSave={handleSaveEdit}
      />
      {/* ----- TABLE ----- */}
      <div className={className}>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader className="bg-muted">
              <NewRecipeTableHeads isEditable={isEditable} />
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  onClick={() => setSelectedRow(row)}
                  className={`${
                    selectedRow && selectedRow._id === row._id
                      ? "bg-muted/50 h-16"
                      : "hover:bg-muted/20 cursor-pointer h-12"
                  }`}
                >
                  {/*---------Ingredients--------- */}
                  <NewRecipeTableCells
                    row={row}
                    selectedRow={selectedRow}
                    handleEditWeight={handleEditWeight}
                    handleDelete={handleDelete}
                    isEditable={isEditable}
                  />
                </TableRow>
              ))}
            </TableBody>
            {/* ----- FOOTER FOR TOTAL WEIGHT ----- */}
            {isTotalsVisible && rows.length > 0 ? (
              <TableFooter className="">
                <TableRow>
                  <td className="font-bold text-left p-2 " colSpan={2}>
                    Total Weight:
                  </td>
                  <td className="text-center font-medium p-2 " colSpan={2}>
                    {totals.totalWeight}g
                  </td>
                  <td colSpan={4} className="text-right p-2 ">
                    <EditTotalWeight
                      isOpen={isEditingTotalWeight}
                      onClose={handleCloseTotalWeight}
                      rows={rows}
                      setRows={setRows}
                      totals={totals}
                      setTotals={setTotals}
                    />
                    <button
                      type="button"
                      onClick={handleEditTotalWeight}
                      className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-3 rounded "
                    >
                      Adjust Weight
                    </button>
                  </td>
                </TableRow>
              </TableFooter>
            ) : null}
          </Table>
        </div>
      </div>

      {/* -----/--- TABLE ----- */}
    </div>
  );
}
