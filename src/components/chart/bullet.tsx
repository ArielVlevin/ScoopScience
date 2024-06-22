import { useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import "ag-charts-enterprise";

export function BulletExample() {

  const [options, setOptions] = useState<AgChartOptions>({
    title: { text: "Income" },
    subtitle: { text: "USD" },
    data: [{ income: 12500, objective: 10000 }],
    series: [
      {
        type: "bullet",
        direction: "horizontal",
        valueKey: "income",
        valueName: "Actual income",
        targetKey: "objective",
        targetName: "Target income",
        scale: { max: 15000 },
        fill: "#000000",
        target: { stroke: "#3B3B3B" },
        colorRanges: [
          { color: "#FFB6C1" /* Light Pink */, stop: 8000 },
          { color: "#FFFACD" /* Light Yellow */, stop: 13000 },
          { color: "#B6FBB6" /* Light Green */ },
        ],
      },
    ],
    height: 150,
  });

  return (
    <AgChartsReact options={options} />
)

}