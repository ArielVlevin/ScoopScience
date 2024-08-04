


export function roundToTwoDecimalPlaces(num: number): number {
   if(num ===0) return 0;
   return Math.round((num + Number.EPSILON) * 100) / 100;
 }