import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type BulletChartProps = {
  data: {
    title: string;
    ranges: number[];
    measures: number[];
    markers: number[];
  };
  width: number;
  height: number;
};

const BulletChart: React.FC<BulletChartProps> = ({ data, width, height }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear previous contents
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 25, right: 40, bottom: 35, left: 7 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const cornerRadius = 5;

    const x = d3
      .scaleLinear()
      .domain([0, Math.max(...data.ranges)])
      .range([0, chartWidth]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add ranges
    g.append("rect")
      .attr("x", 0)
      .attr("width", x(data.markers[0]))
      .attr("height", chartHeight)
      .attr("fill", "hsl(var(--chart-1))");

    g.append("rect")
      .attr("x", x(data.markers[0]))
      .attr("width", x(data.markers[1]) - x(data.markers[0]))
      .attr("height", chartHeight)
      .attr("fill", "hsl(var(--chart-2))")
      .attr("ry", 0)
      .attr("rx", 0);

    g.append("rect")
      .attr("x", x(data.markers[1]))
      .attr("width", x(data.ranges[0]) - x(data.markers[1]))
      .attr("height", chartHeight)
      .attr("fill", "hsl(var(--chart-1))");

    // Add measures
    const measureFillHeight = chartHeight * 0.3;
    g.selectAll("rect.measure")
      .data(data.measures)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("width", x)
      .attr("height", measureFillHeight)
      .attr("y", (chartHeight - measureFillHeight) / 2)
      .classed("fill-primary", true)
      .attr("ry", cornerRadius)
      .attr("rx", cornerRadius);

    // Add title
    svg
      .append("text")
      .classed("fill-primary text-md font-bold", true)
      .attr("x", margin.left)
      .attr("y", margin.top - 10)
      .text(data.title);

    // Add marker
    /*
    data.markers.forEach((marker) => {
      const markerX = x(marker);
      g.append("line")
        .attr("x1", markerX)
        .attr("x2", markerX)
        .attr("y1", 0)
        .attr("y2", chartHeight)
        .classed("stroke-black stroke-1", true);

      // Add marker text
      g.append("text")
        .attr("class", "text-xs text-gray-500")
        .attr("x", markerX)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .text(marker === data.markers[0] ? "Min" : "Max");
    });
*/
    // Add x-axis
    /*
    const xAxis = d3
      .axisBottom(x)
      .ticks(20)
      .tickFormat((d) => (d % 10 === 0 ? `${d}%` : ""));
    g.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis)
      .selectAll("text")
      .classed(" text-gray-600", true);
      */
  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height}></svg>;
};

export default BulletChart;

/*
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface BulletChartData {
  range: number;
  measure: number;
  minMarker: number;
  maxMarker: number;
}

interface BulletChartProps {
  data: BulletChartData;
  width: number;
  height: number;
}

const BulletChart: React.FC<BulletChartProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 20, left: 7 },
      chartWidth = width - margin.left - margin.right,
      chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    // Clear existing elements
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear().domain([0, 100]).range([0, chartWidth]);

    // Draw the range bar
    g.append("rect")
      .attr("class", "range")
      .attr("width", x(data.range))
      .attr("height", chartHeight)
      .style("fill", "#ddd");

    // Draw the measure bar
    const measureFillHeight = chartHeight * 0.6;
    const measureColor =
      data.measure > data.minMarker && data.measure < data.maxMarker
        ? "green"
        : "red";
    g.append("rect")
      .attr("class", "measure")
      .attr("width", x(data.measure))
      .attr("height", measureFillHeight)
      .attr("y", (chartHeight - measureFillHeight) / 2)
      .style("fill", measureColor);

    // Draw the minimum marker
    g.append("line")
      .attr("class", "min-marker")
      .attr("x1", x(data.minMarker))
      .attr("x2", x(data.minMarker))
      .attr("y1", 0)
      .attr("y2", chartHeight)
      .style("stroke", "red")
      .style("stroke-width", "2px");

    // Draw the maximum marker
    g.append("line")
      .attr("class", "max-marker")
      .attr("x1", x(data.maxMarker))
      .attr("x2", x(data.maxMarker))
      .attr("y1", 0)
      .attr("y2", chartHeight)
      .style("stroke", "red")
      .style("stroke-width", "2px");

    const xAxis = d3
      .axisBottom(x)
      .ticks(20)
      .tickFormat((d) => (d % 5 === 0 ? `${d}%` : ""));

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + chartHeight + ")")
      .call(xAxis);

    // Add min and max text labels
    g.append("text")
      .attr("x", x(data.minMarker))
      .attr("y", -5) // Above the marker
      .attr("text-anchor", "middle")
      .style("fill", "red")
      .style("font-weight", "bold")
      .style("font-size", "10px") //font size
      .text("min range");

    g.append("text")
      .attr("x", x(data.maxMarker))
      .attr("y", -5) // Above the marker
      .attr("text-anchor", "middle")
      .style("fill", "red")
      .style("font-weight", "bold")
      .style("font-size", "10px") //font size
      .text("max range");
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default BulletChart;
*/
