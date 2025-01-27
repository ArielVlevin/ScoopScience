import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableFooter,
} from "@/components/ui/table";
import { Row } from "@/types";
import NewRecipeTableCells, { NewRecipeTableHeads } from "./setup/tableSetUp";
import { roundToTwoDecimalPlaces } from "@/utils/math";
import calculateTotals from "@/features/recipes/calc/calculateTotals";
import EditWeightDialog from "./edit/editWeight";
import { calculateAndRound } from "../../calc/calculateAndRound";
import WeightTableFooter from "./setup/tableFooter";
import { useTheme } from "@/contexts/ThemeProvider";

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
  const { settings } = useTheme();

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
  const handleClose = () => {
    setIsEditingWeight(false);
    setSelectedRow(null);
  };

  const handleEditTotalWeight = () => {
    setIsEditingTotalWeight(true);
  };
  const handleCloseTotalWeight = () => {
    setIsEditingTotalWeight(false);
  };

  const handleDelete = (row: Row) => {
    setRows(rows.filter((r) => r._id !== row._id));
  };

  return (
    <div className={className}>
      <EditWeightDialog
        isOpen={isEditingWeight}
        onClose={handleClose}
        row={selectedRow}
        onSave={handleSaveEdit}
      />
      {/* ----- TABLE ----- */}
      <Table className="mx-auto w-full">
        <TableHeader className={settings.tableHeader}>
          <NewRecipeTableHeads isEditable={isEditable} />
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              onClick={() => setSelectedRow(row)}
              className={`${
                selectedRow && selectedRow._id === row._id
                  ? settings.tableBodySelected
                  : settings.tableBody
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
          <TableFooter>
            <WeightTableFooter
              totals={totals}
              setRows={setRows}
              setTotals={setTotals}
              handleEditTotalWeight={handleEditTotalWeight}
              handleCloseTotalWeight={handleCloseTotalWeight}
              isEditingTotalWeight={isEditingTotalWeight}
              rows={rows}
            />
          </TableFooter>
        ) : null}
      </Table>

      {/* -----/--- TABLE ----- */}
    </div>
  );
}
