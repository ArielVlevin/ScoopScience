import { TableRow, TableHead, TableCell } from "@/components/ui/table";
import { FilePenIcon, TrashIcon } from "@/components/icons/icon";
import { Row } from "@/types";

type NewRecipeTableHeadsProps = {
  isEditable: boolean;
};
export function NewRecipeTableHeads({ isEditable }: NewRecipeTableHeadsProps) {
  const tableHeader = [
    "Ingredients",
    "Weight",
    "Category",
    "Sugar",
    "Fat",
    "Solid Percentage",
    "MSNF",
    isEditable ? "Actions" : null,
  ];
  return (
    <TableRow>
      {tableHeader.map((header) => (
        <TableHead
          key={header}
          className="text-center text-foreground font-bold"
        >
          {header}
        </TableHead>
      ))}
    </TableRow>
  );
}

type TableCellsProps = {
  row: Row;
  selectedRow: Row | null;
  handleEditWeight: (row: Row) => void;
  handleDelete: (row: Row) => void;
  isEditable: boolean;
};

export default function TableCells({
  row,
  handleEditWeight,
  handleDelete,
  isEditable,
}: TableCellsProps) {
  return (
    <>
      <TableCell className="text-center text-foreground">{row.name}</TableCell>
      <TableCell className="text-center text-foreground">
        {row.weight}
      </TableCell>

      <TableCell className="text-center text-foreground">
        {row.category}
      </TableCell>
      <TableCell className="text-center text-foreground">{row.sugar}</TableCell>
      <TableCell className="text-center text-foreground">{row.fat}</TableCell>
      <TableCell className="text-center text-foreground">
        {row.totalSolids}
      </TableCell>
      <TableCell className="text-center text-foreground">{row.msnf}</TableCell>

      {isEditable ? (
        <TableCell className="flex justify-center items-center text-muted-foreground">
          <div className="flex items-center justify-end gap-3">
            {/* ----- EDIT BUTTON ----- */}
            <div
              onClick={() => {
                handleEditWeight(row);
              }}
              className="text-muted-foreground hover:text-primary"
            >
              <FilePenIcon className="w-4 h-4" />
              <span className="sr-only">Edit</span>
            </div>

            {/* ----- DELETE BUTTON ----- */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row);
              }}
              className="text-muted-foreground hover:text-destructive"
            >
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Delete</span>
            </div>
          </div>
        </TableCell>
      ) : null}
    </>
  );
}
