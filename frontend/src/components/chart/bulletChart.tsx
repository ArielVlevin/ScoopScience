import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type BulletChartProps = {
  data: {
    title: string;
    ranges: number[];
    measures: number[];
    markers: number[]; // markers[0] is min, markers[1] is max
  };
  width: number | string;
  height: number;
};

const BulletChart: React.FC<BulletChartProps> = ({
  data,
  width = "100%",
  height,
}) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear previous contents
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 30, right: 40, bottom: 35, left: 7 };
    const chartWidth =
      (typeof width === "number" ? width : ref.current.clientWidth) -
      margin.left -
      margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const cornerRadius = 5;

    // Scale
    const x = d3
      .scaleLinear()
      .domain([0, Math.max(...data.ranges)])
      .range([0, chartWidth]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add ranges background
    g.append("rect")
      .attr("x", 0)
      .attr("width", x(data.ranges[0]))
      .attr("height", chartHeight)
      .classed("fill-gray-200 dark:fill-primary", true);
    //.attr("fill", "#ddd");

    // Add measure bars
    const measureHeight = chartHeight * 0.6;
    data.measures.forEach((measure) => {
      const measureColor =
        measure >= data.markers[0] && measure <= data.markers[1]
          ? "fill-green-500 dark:fill-green-800"
          : "fill-red-500 dark:fill-red-800"; // Green if within range, else red

      g.append("rect")
        .attr("x", 0)
        .attr("y", (chartHeight - measureHeight) / 2)
        .attr("width", x(measure))
        .attr("height", measureHeight)
        .classed(measureColor, true)
        .attr("rx", cornerRadius)
        .attr("ry", cornerRadius);
    });

    // Add markers as range indicators
    data.markers.forEach((marker, index) => {
      const markerX = x(marker);

      // Marker line
      g.append("line")
        .attr("x1", markerX)
        .attr("x2", markerX)
        .attr("y1", chartHeight - 25) // Place slightly below the bar
        .attr("y2", chartHeight) // Extend slightly below the bar
        .classed("stroke-red-600 dark:stroke-white", true)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "2,1");

      // Add x-axis with tick marks
      const xAxis = d3
        .axisBottom(x)
        .ticks(10)
        .tickFormat((d) => `${d}%`);

      g.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "10px")
        .classed("fill-gray-500 dark:fill-white/70", true);

      // Add marker text above the bar
      g.append("text")
        .attr("x", markerX)
        .attr("y", chartHeight + 30) // Position above the bar
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .classed("fill-red-700 dark:fill-white/70", true)
        .text(index === 0 ? "Min" : "Max");
    });

    // Add title
    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", margin.top - 15)
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .classed("fill-primary dark:fill-white ", true)
      .text(data.title);
  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height}></svg>;
};

export default BulletChart;
