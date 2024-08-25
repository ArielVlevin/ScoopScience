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
    totalSugar += sugars;
    totalSolidsWeight += (solidsPercentage / 100) * weight;
    totalCalories += calories;
    totalMSNF += msnf * (weight / 100);
  });

  if (totalWeight === 0) {
    return {
      totalWeight: 0,
      totalFat: 0,
      totalCalories: 0,
      totalSugar: 0,
      totalMsnf: 0,
      totalSolidPercentage: 0,
      totalFatPercentage: 0,
      totalSugarPercentage: 0,
    };
  }

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
