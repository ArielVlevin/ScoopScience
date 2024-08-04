import { useEffect, useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import "ag-charts-enterprise";



type BulletProps = {
  title?: string;
  subTitle?: string;
  direction?: "vertical" | "horizontal";
  data: { currectValue: number; objective: number };
}

export function Bullet({ title, subTitle, direction = "horizontal", data }: BulletProps) {
  
  const [options, setOptions] = useState<AgChartOptions>({
    title: { text: title},
    subtitle: { text: subTitle},
    data: [data],
    height: 140,
    series: [
      {
        type: "bullet",
        direction: direction,
        stroke: "gray",
        strokeWidth: 0.2,
        strokeOpacity: 0.6,
        tooltip: {
          enabled: false, 
        },
        valueKey: "currectValue",
        valueName: "Actual income",
        targetKey: "currectValue",
        targetName: "Target income",

        scale: { max: 100, },
        fill: "white",
        fillOpacity: 0.6,
        target: { stroke: "#3B3B3B", strokeWidth: 3 },
        colorRanges: [
          { color: "#FFB6C1" /* Light Pink */, stop: 40 },
          { color: "#B6FBB6" /* Light Yellow */, stop: 80 },
          { color: "#FFB6C1" /* Light Green */ },
        ],
      },
    ],
  });
  
  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      data: [data],
    }));
  }, [data]);

  return (
    <AgChartsReact options={options} />
)
}