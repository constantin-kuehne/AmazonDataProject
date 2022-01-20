import React, { useEffect, useRef, useState } from "react";
import config from "../../config";
import { Source as SearchProductSource } from "../searchbar";
import * as d3 from "d3";

export interface Source {
  helpful_votes: number;
  total_votes: number;
  review_headline: string;
}

export const BarChart = ({
  searchedProduct,
  width,
  height,
  size = 20,
}: {
  searchedProduct: null | SearchProductSource;
  width: number;
  height: number;
  size?: number;
}) => {
  const svgRef = useRef<null | SVGSVGElement>(null);

  const [data, setData] = useState<null | Source[]>(null);
  const margin = { left: 300, right: 30, top: 30, bottom: 30 };

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

      //xAxis Scale
      const xScale = d3.scaleLinear(
        [0, (max as number) + 1],
        [margin.left, width - margin.right]
      );

      const xAxisFn = d3.axisBottom(xScale).tickFormat((tick) => {
        const tickNumber = tick as number;
        if (Math.floor(tickNumber) !== tickNumber) {
          return "";
        }
        return tickNumber.toString();
      });

      // xAxis
      const xAxis = svg
        .append<SVGGElement>("g")
        .call(xAxisFn)
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll(".tick line")
            .attr("stroke", "lightgrey")
            .attr("y1", -height + 1.5 * margin.top)
            .attr("y2", 0);
        });

      //yAxis Scale
      const yScale = d3
        .scaleBand(
          data.map((d) => d.review_headline),
          [margin.top, height - margin.bottom]
        )
        .padding(0.3);

      const yAxisFn = d3.axisLeft(yScale);
      // yAxis
      const yAxis = svg
        .append<SVGGElement>("g")
        .call(yAxisFn)
        .attr("transform", `translate(${margin.left}, 0)`)
        .call((g) => {
          g.select(".domain").remove();
        });

      //Bars total Votes
      let bars = svg
        .selectAll("rect.totalVotes")
        .data<Source>(data)
        .enter()
        .append("rect")
        .classed("totalVotes", true);

      bars = bars
        .attr("x", margin.left + 0.5)
        .attr("y", (d) => {
          return yScale(d.review_headline)!;
        })
        .attr("height", yScale.bandwidth())
        .attr("width", (d) => xScale(d.total_votes) - margin.left)
        .attr("fill", "lightgray");

      //Bars helpful votes
      let bars1 = svg
        .selectAll("rect.helpfulVotes")
        .data<Source>(data)
        .enter()
        .append("rect")
        .classed("helpfulVotes", true);

      bars1 = bars1
        .attr("x", margin.left + 0.5)
        .attr("y", (d) => {
          const yPos =
            yScale(d.review_headline)! +
            yScale.bandwidth() / 2 -
            (yScale.bandwidth() * 0.3) / 2;
          return yPos;
        })
        .attr("height", yScale.bandwidth() * 0.3)
        .attr("width", (d) => xScale(d.helpful_votes) - margin.left)
        .attr("fill", "#0288d1");
    }
  }, [data, svgRef.current]);

  return (
    <div>
      <svg width={width} height={height} ref={svgRef}></svg>
    </div>
  );
};
