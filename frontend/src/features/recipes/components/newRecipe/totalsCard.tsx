import calculateTotals from "../../calc/calculateTotals";
import { Row } from "@/types";

type TotalsCardProps = {
  rows: Row[];
};

export default function TotalsCard({ rows }: TotalsCardProps) {
  const {
    totalWeight,
    totalFat,
    totalCalories,
    totalSugar,
    totalMsnf,
    totalSolidPercentage,
    totalFatPercentage,
    totalSugarPercentage,
  } = calculateTotals(rows);

  const stats = [
    { label: "Total Weight", value: `${totalWeight} gr` },
    { label: "Total Calories", value: `${totalCalories} kcal` },
    {
      label: "Total Sugar",
      value:
        totalSugar > 0
          ? `${totalSugar} g (${totalSugarPercentage.toFixed(2)}%)`
          : "0 g",
    },
    {
      label: "Total Fat",
      value:
        totalFat > 0
          ? `${totalFat} g (${totalFatPercentage.toFixed(2)}%)`
          : "0 g",
    },
    { label: "Total Solid", value: `${totalSolidPercentage}%` },
    { label: "Total MSNF", value: `${totalMsnf}%` },
  ];

  return (
    <div className="grid grid-cols-6 items-center justify-between flex">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center">
          <span className="text-muted-foreground">{stat.label}</span>
          <span className="font-semibold">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
