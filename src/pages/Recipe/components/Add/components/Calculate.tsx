import { Row } from "../../../interfaces/recipe";


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


export  function calculateTotals2  (rows: Row[]) {
   let totalWeight = 0;
   let totalFat = 0;
   let totalSolid = 0;
 
   rows.forEach(row => {
     const weight = Number(row.weight);
     const fat = Number(row.fat);
     const solidsPercentage = Number(row.solids_percentage);
 
     totalWeight += weight;
     totalFat += fat;
     totalSolid += (solidsPercentage * weight) / 100;
   });
 
   return { totalWeight, totalFat, totalSolid };
 };
 


 
 export default function calculateTotals(rows: Row[]) {
  let totalWeight = 0;
  let totalFat = 0;
  let totalSolid = 0;
  let totalCalories = 0;
  let totalSugar = 0;
  let totalMSNF = 0;

  rows.forEach(row => {
    const weight = Number(row.weight);
    const fat = Number(row.fat);
    const solidsPercentage = Number(row.solids_percentage);
    const calories = Number(row.calories);
    const msnf = Number(row.msnf);
    const sugars = Number(row.sugar);

    totalWeight += weight;
    totalFat += fat;
    totalSolid += (solidsPercentage * weight) / 100;
    totalCalories += calories * (weight / 100);
    totalSugar += sugars;
    totalMSNF += (msnf * weight) / 100;
  });

  return { totalWeight, totalFat, totalSolid, totalCalories, totalSugar, totalMSNF };
}