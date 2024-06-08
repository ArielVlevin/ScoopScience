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

export  function formatTotalValue (total: number, totalWeight: number, unit: string) {
  return unit === 'grams' 
    ? total.toFixed(2)
    : ((total / (totalWeight / 100)).toFixed(2));
};


export default function calculateTotals  (rows: Row[]) {
   let totalWeight = 0;
   let totalFat = 0;
   let totalSolid = 0;
 
   rows.forEach(row => {
     const weight = Number(row.weight);
     const fatPercentage = Number(row.fat_percentage);
     const solidsPercentage = Number(row.solids_percentage);
 
     totalWeight += weight;
     totalFat += (fatPercentage * weight) / 100;
     totalSolid += (solidsPercentage * weight) / 100;
   });
 
   return { totalWeight, totalFat, totalSolid };
 };
 