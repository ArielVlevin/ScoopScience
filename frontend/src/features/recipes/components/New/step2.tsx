import PageCard from "@/components/pages/pageCard";
import { Row } from "@/types";
import NewRecipeTable from "../Table/0table";
import AddIngredientToTable from "../Table/AddIngredientToTable";
import TotalsCard from "./totalsCard";
import calculateTotals from "../../calc/calculateTotals";
import RecipeBulletCharts from "../BulletChart/recipeBulletChart";

type Step2Props = {
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  totals: ReturnType<typeof calculateTotals>;
  setTotals: React.Dispatch<
    React.SetStateAction<ReturnType<typeof calculateTotals>>
  >;
  isAddingIngredient: boolean;
  setIsAddingIngredient: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Step2({
  rows,
  setRows,
  totals,
  setTotals,
  isAddingIngredient,
  setIsAddingIngredient,
}: Step2Props) {
  return (
    <>
      <PageCard title="Ingredients Table" className="mb-6">
        <NewRecipeTable
          className="border rounded-lg border-gray-300"
          rows={rows}
          setRows={setRows}
          setTotals={setTotals}
        />
        <div className="flex justify-center w-full mt-2">
          <AddIngredientToTable
            rows={rows}
            setRows={setRows}
            setIsAddingIngredient={setIsAddingIngredient}
            isAddingIngredient={isAddingIngredient}
          />
        </div>
      </PageCard>

      {totals.totalWeight > 0 && (
        <>
          <PageCard title="Totals" className="mb-6">
            <TotalsCard rows={rows} />
          </PageCard>
          <PageCard title="Stats">
            <RecipeBulletCharts
              recipeType="iceCream" // example type, change as needed
              totals={totals}
              height={90}
            />
          </PageCard>
        </>
      )}
    </>
  );
}
