import { Row } from "@/types";
import { Totals } from "../types/totalsTypes";
import { roundToTwoDecimalPlaces } from "@/utils/math";

export default function calculateTotals(rows: Row[]): Totals {
  let totalWeight = 0;
  let totalFat = 0;
  let totalSolidsWeight = 0;
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
    totalSolidsWeight += (solidsPercentage * weight) / 100;
    totalCalories += calories * (weight / 100);
    totalSugar += sugars * (weight / 100);
    totalMSNF += (msnf * weight) / 100;
  });

  const totalFatPercentage = (totalFat / totalWeight) * 100;
  const totalSugarPercentage = (totalSugar / totalWeight) * 100;
  const totalSolidPercentage = (totalSolidsWeight / totalWeight) * 100;

  return {
    totalWeight: roundToTwoDecimalPlaces(totalWeight),
    totalFat: roundToTwoDecimalPlaces(totalFat),
    totalCalories: roundToTwoDecimalPlaces(totalCalories),
    totalSugar: roundToTwoDecimalPlaces(totalSugar),
    totalMsnf: roundToTwoDecimalPlaces(totalMSNF),
    totalSolidPercentage: roundToTwoDecimalPlaces(totalSolidPercentage),
    totalFatPercentage: roundToTwoDecimalPlaces(totalFatPercentage),
    totalSugarPercentage: roundToTwoDecimalPlaces(totalSugarPercentage),
  };
}
