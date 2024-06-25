import React, { useEffect, useState } from "react";
import { Bullet } from '../../../../../../components/chart/bullet';

export function BulletChartsContainer() {
  const [chartsData, setChartsData] = useState([
    { title: "Chart 1", subTitle: "Subtitle 1", data: { currectValue: 75, objective: 75 } },
    { title: "Chart 2", subTitle: "Subtitle 2", data: { currectValue: 60, objective: 80 } },
    { title: "Chart 3", subTitle: "Subtitle 3", data: { currectValue: 45, objective: 50 } },
  ]);

  // Function to update a specific chart's data
  const updateChartData = (index, newData) => {
    setChartsData((prevChartsData) =>
      prevChartsData.map((chart, i) => (i === index ? { ...chart, data: newData } : chart))
    );
  };

  // Example of updating the data for the first chart after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateChartData(0, { currectValue: Math.random() * 100, objective: 75 });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {chartsData.map((chart, index) => (
        <Bullet
          key={index}
          title={chart.title}
          subTitle={chart.subTitle}
          data={chart.data}
          direction="horizontal"
        />
      ))}
    </div>
  );
}
