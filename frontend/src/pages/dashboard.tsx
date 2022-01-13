import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import config from "../config";
import { Source as SearchProductSource } from "../components/searchbar";

export interface Source {
  helpful_votes: number;
  total_votes: number;
  review_headline: string;
}

export const BarChart = ({
  searchedProduct,
  size = 20,
}: {
  searchedProduct: null | SearchProductSource;
  size?: number;
}) => {
  const svgRef = useRef<null | SVGSVGElement>(null);

  const [data, setData] = useState<null | Source[]>(null);
  const width = 1000;
  const height = 500;
  const margin = { left: 400, right: 30, top: 30, bottom: 30 };

  useEffect(() => {
    if (searchedProduct?.hasOwnProperty("product_id")) {
      const uri = `${config.url}/asin/${searchedProduct?.product_id}/reviews?size=${size}`;
      fetch(uri)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error(err));
    }
  }, [searchedProduct]);

  useEffect(() => {
    if (svgRef.current && data) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
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

      const yScale = d3
        .scaleBand(
          data.map((d) => d.review_headline),
          [margin.top, height - margin.bottom]
        )
        .padding(0.3);
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
          const yPos = yScale(d.review_headline);
          const yPosAdjusted = yPos!;
          return yPosAdjusted;
        })
        .attr("height", yScale.bandwidth())
        .attr("width", (d) => xScale(d.total_votes) - margin.left)
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
