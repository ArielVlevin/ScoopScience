import { TableRow } from "@/components/ui";
import EditTotalWeight from "../edit/editTotalWeight";
import calculateTotals from "../../../calc/calculateTotals";
import { Row } from "@/types";

type TableFooterProps = {
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  totals: ReturnType<typeof calculateTotals>;
  setTotals: React.Dispatch<
    React.SetStateAction<ReturnType<typeof calculateTotals>>
  >;
  handleEditTotalWeight: () => void;
  handleCloseTotalWeight: () => void;
  isEditingTotalWeight: boolean;
};

export default function WeightTableFooter({
  rows,
  setRows = () => {},
  totals = calculateTotals(rows),
  setTotals = () => {},
  handleEditTotalWeight,
  handleCloseTotalWeight,
  isEditingTotalWeight,
}: TableFooterProps) {
  return (
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
  );
}
