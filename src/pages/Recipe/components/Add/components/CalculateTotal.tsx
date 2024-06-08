import { Row } from "../../../interfaces/recipe";




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
 