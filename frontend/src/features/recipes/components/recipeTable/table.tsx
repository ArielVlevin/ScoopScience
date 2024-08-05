import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Row } from "@/types";
import NewRecipeTableCells, { NewRecipeTableHeads } from "./tableSetUp";
import { FilePenIcon, TrashIcon } from "@/components/icons/icon";
import { roundToTwoDecimalPlaces } from "@/utils/math";

import AddIngredientToTable from "./AddIngredientToTable";
import calculateTotals from "@/features/recipes/utils/calculateTotals";

type NewRecipeTableProops = {
  className?: string;
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  setTotals: React.Dispatch<
    React.SetStateAction<ReturnType<typeof calculateTotals>>
  >;
};

export default function NewRecipeTable({
  className,
  rows,
  setRows,
  setTotals,
}: NewRecipeTableProops) {
  const [newWeight, setNewWeight] = useState<number>(0);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [isAddingIngredient, setIsAddingIngredient] = useState<boolean>(false);
  const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false);

  const handleRowSelect = (row: Row) => {
    setSelectedRow(row);
  };

  useEffect(() => {
    setTotals(calculateTotals(rows));
  }, [rows, setTotals]);

  const handleEditWeight = () => {
    setIsEditingWeight(true);
  };

  const handleClose = () => {
    setIsEditingWeight(false);
    setSelectedRow(null);
  };

  const handleSaveEdit = () => {
    if (newWeight > 0) {
      setRows(
        rows.map((row) =>
          row._id === selectedRow?._id
            ? {
                ...row,
                weight: roundToTwoDecimalPlaces(newWeight),
              }
            : row
        )
      );
      handleClose();
    } else alert("Please enter a valid value greater than 0 grams");
  };

  const handleDelete = () => {
    setRows(rows.filter((row) => row._id !== selectedRow?._id));
    setSelectedRow(null);
  };

  return (
    <div>
      {/* ----- TABLE ----- */}
      <div className={className}>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <NewRecipeTableHeads />
            </TableHeader>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  onClick={() => handleRowSelect(row)}
                  className={`${
                    selectedRow && selectedRow._id === row._id
                      ? "bg-muted/50 h-16"
                      : "hover:bg-muted/20 cursor-pointer h-12"
                  }`}
                >
                  {/*---------Ingredients--------- */}
                  <NewRecipeTableCells
                    row={row}
                    setNewWeight={setNewWeight}
                    selectedRow={selectedRow}
                    handleSaveEdit={handleSaveEdit}
                    handleClose={handleClose}
                    isEditingWeight={isEditingWeight}
                  />

                  {/*---------Actions--------- */}
                  <TableCell className="flex justify-center items-center text-muted-foreground">
                    {selectedRow && selectedRow._id === row._id && (
                      <div className="flex items-center justify-end gap-2">
                        {/* ----- EDIT BUTTON ----- */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleEditWeight}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <FilePenIcon className="w-4 h-4" />
                          <span className="sr-only">Edit</span>
                        </Button>

                        {/* ----- DELETE BUTTON ----- */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleDelete}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  {/*---------/--- Actions--------- */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* -----/--- TABLE ----- */}
      {/* ----- ADD NEW INGREDIENT ----- */}
      <div className="flex justify-center w-full mt-2">
        <AddIngredientToTable
          rows={rows}
          setRows={setRows}
          setIsAddingIngredient={setIsAddingIngredient}
          isAddingIngredient={isAddingIngredient}
        />
      </div>
    </div>
  );
}
