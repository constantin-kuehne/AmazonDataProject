import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export interface Source {
  helpful_votes: number;
  total_votes: number;
  review_headline: string;
}

export const BarChart = (props: {}) => {
  const svgRef = useRef<null | SVGSVGElement>(null);

  const [data, setData] = useState<null | Source[]>(null);
  const width = 1000;
  const height = 500;
  const margin = { left: 400, right: 30, top: 30, bottom: 30 };

  useEffect(() => {
    fetch("http://localhost:3001/asin/B000002L7Y/reviews")
      .then((res) => res.json())
      .then((wow) => setData(wow.slice(0, 20)));
  }, []);

  useEffect(() => {
    if (svgRef.current && data) {
      const svg = d3.select(svgRef.current);
      const max = d3.max(data, (d) => d.total_votes);

      const xScale = d3.scaleLinear(
        [0, max as number],
        [margin.left, width - margin.right]
      );

      const xAxisFn = d3.axisBottom(xScale);

      const xAxis = svg.append<SVGGElement>("g");
      xAxis
        .call(xAxisFn)
        .attr("transform", `translate(0, ${height - margin.bottom})`);

      const yScale = d3.scaleBand(
        data
          .sort((a, b) => a.total_votes - b.total_votes)
          .map((d) => d.review_headline),
        [margin.top, height - margin.bottom]
      );
      const yAxisFn = d3.axisLeft(yScale);

      const yAxis = svg.append<SVGGElement>("g");
      yAxis.call(yAxisFn).attr("transform", `translate(${margin.left}, 0)`);

      let bars = svg
        .selectAll("rect")
        .data<Source>(data)
        .enter()
        .append("rect");

      bars = bars.attr("x", margin.left + 1);
      bars = bars
        .attr("y", (d) => {
          const wow = yScale(d.review_headline);
          const now = wow! + 15;
          return now || 0;
        })
        .attr("height", 12)
        .attr("width", (d) => xScale(d.total_votes) - margin.left - 1)
        .attr("fill", "lightgray");
    }
  }, [data, svgRef.current]);

  return (
    <div>
      <svg width={width} height={height} ref={svgRef}></svg>
    </div>
  );
};
//TODO D3 Container rein
