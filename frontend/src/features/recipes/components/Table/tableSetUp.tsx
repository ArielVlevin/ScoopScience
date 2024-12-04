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
        <TableHead key={header} className="text-center text-white font-bold">
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
      <TableCell className="text-center text-foreground bg-primary/60">
        {row.name}
      </TableCell>
      <TableCell className="text-center text-foreground bg-primary/60">
        {row.weight}
      </TableCell>

      <TableCell className="text-center text-foreground bg-primary/60">
        {row.category}
      </TableCell>
      <TableCell className="text-center text-foreground bg-primary/60">
        {row.sugar}
      </TableCell>
      <TableCell className="text-center text-foreground bg-primary/60">
        {row.fat}
      </TableCell>
      <TableCell className="text-center text-foreground bg-primary/60">
        {row.totalSolids}
      </TableCell>
      <TableCell className="text-center text-foreground bg-primary/60">
        {row.msnf}
      </TableCell>

      {isEditable ? (
        <TableCell className=" text-muted-primary justify-center items-center  bg-primary/60">
          <div className="flex gap-3">
            {/* ----- EDIT BUTTON ----- */}
            <div
              onClick={() => {
                handleEditWeight(row);
              }}
              className="text-muted-foreground hover:text-yellow-800"
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
