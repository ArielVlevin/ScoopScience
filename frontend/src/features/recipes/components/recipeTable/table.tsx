import { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableBody } from "@/components/ui/table";
import { Row } from "@/types";
import NewRecipeTableCells, { NewRecipeTableHeads } from "./tableSetUp";
import { roundToTwoDecimalPlaces } from "@/utils/math";
import calculateTotals from "@/features/recipes/utils/calculateTotals";
import EditWeightDialog from "./editWeight";

type NewRecipeTableProops = {
  className?: string;
  rows: Row[];
  setRows?: React.Dispatch<React.SetStateAction<Row[]>>;
  setTotals?: React.Dispatch<
    React.SetStateAction<ReturnType<typeof calculateTotals>>
  >;
  isEditable?: boolean;
};

export default function NewRecipeTable({
  className,
  rows,
  setRows = () => {},
  setTotals = () => {},
  isEditable = true,
}: NewRecipeTableProops) {
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false);

  useEffect(() => {
    setTotals(calculateTotals(rows));
  }, [rows, setTotals]);

  const handleEditWeight = (row: Row) => {
    setSelectedRow(row);
    setIsEditingWeight(true);
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
            <TableHeader>
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
          </Table>
        </div>
      </div>
      {/* -----/--- TABLE ----- */}
    </div>
  );
}
