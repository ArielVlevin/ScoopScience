import { Row } from "../../../../../Types/ingredient";




export const calculateNutritionalValues = (row: Row, newWeight: number): Row => {
  const factor = newWeight / row.weight;
  return {
    ...row,
    weight: newWeight,
    calories: row.calories * factor,
    sugar: row.sugar * factor,
    fat: row.fat * factor,
    protein: row.protein * factor,
    totalSolids: row.totalSolids ,
    msnf: row.msnf ,
  };
};


export const currencies = [
  {
    value: 'grams',
    label: 'grams',
  },
  {
    value: 'percent',
    label: '%',
  },
];

export function formatTotalValue(total: number, totalWeight: number, unit: string) {
  if (totalWeight === 0 || isNaN(total) || isNaN(totalWeight)) {
    return '0.00';
  }

  if (unit === 'grams') {
    return total.toFixed(2);
  }

  return ((total / (totalWeight / 100)).toFixed(2));
};



 export default function calculateTotals(rows: Row[]) {
  let totalWeight = 0;
  let totalFat = 0;
  let totalSol = 0;
  let totalCalories = 0;
  let totalSugar = 0;
  let totalMSNF = 0;

  rows.forEach(row => {
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

  return { totalWeight, totalFat, totalSol, totalCalories, totalSugar, totalMSNF };
}