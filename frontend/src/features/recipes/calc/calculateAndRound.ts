import { roundToTwoDecimalPlaces } from "@/utils/math";

export const calculateAndRound = (
  value: number,
  total: number,
  newTotal: number
) => roundToTwoDecimalPlaces((value / total) * newTotal);
