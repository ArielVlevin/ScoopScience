import { RecipeKind } from "@/types";

export type ChartType = "Total Solids" | "Total Fat" | "Total Sugars";

export const commonDataMap: Record<
  ChartType,
  { title: string; ranges: number[] }
> = {
  "Total Solids": { title: "Total Solids", ranges: [100] },
  "Total Fat": { title: "Total Fat", ranges: [100] },
  "Total Sugars": { title: "Total Sugars", ranges: [100] },
};

export const BulletmarkersMap: Record<
  RecipeKind,
  Record<ChartType, number[]>
> = {
  gelato: {
    "Total Solids": [35, 40],
    "Total Fat": [2, 9],
    "Total Sugars": [18, 22],
  },
  iceCream: {
    "Total Solids": [40, 50],
    "Total Fat": [10, 20],
    "Total Sugars": [14, 24],
  },
  custard: {
    "Total Solids": [20, 70],
    "Total Fat": [10, 30],
    "Total Sugars": [15, 40],
  },
  sorbet: {
    "Total Solids": [25, 35],
    "Total Fat": [0, 5],
    "Total Sugars": [20, 30],
  },
  other: {
    "Total Solids": [15, 60],
    "Total Fat": [5, 20],
    "Total Sugars": [20, 50],
  },
};
