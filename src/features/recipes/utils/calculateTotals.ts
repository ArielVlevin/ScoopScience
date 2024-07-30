import { Row } from "@/types";
import { Totals } from "../types/totalsTypes";

export default function calculateTotals(rows: Row[]): Totals {
  let totalWeight = 0;
  let totalFat = 0;
  let totalSol = 0;
  let totalCalories = 0;
  let totalSugar = 0;
  let totalMSNF = 0;

  rows.forEach((row) => {
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

  //maybe need changes
  return {
    totalWeight,
    totalFat,
    totalSolidPercentage: totalSol,
    totalCalories,
    totalSugar,
    totalMsnf: totalMSNF,

    totalFatPercentage: totalFat,
    totalSugarPercentage: totalSugar,
  };
}
