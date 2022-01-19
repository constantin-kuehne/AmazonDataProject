import React, { useEffect, useRef, useState } from "react";
import config from "../../config";
import { Source as SearchProductSource } from "../searchbar";
import * as d3 from "d3";

export interface Source {
  intervalTimeUnix: number;
  docCount: number;
}
const CalendarIntervalOptions = {
  DAY: "d",
  WEEK: "w",
  MONTH: "M",
  QUARTER: "q",
  YEAR: "y",
} as const;

export const LineChart = ({
  searchedProduct,
  width,
  height,
  datetype = "MONTH",
}: {
  searchedProduct: null | SearchProductSource;
  width: number;
  height: number;
  datetype: keyof typeof CalendarIntervalOptions;
}) => {
  const svgRef = useRef<null | SVGSVGElement>(null);

  const [data, setData] = useState<null | Source[]>(null);
  const margin = { left: 50, right: 30, top: 30, bottom: 30 };

  useEffect(() => {
    if (searchedProduct?.hasOwnProperty("product_id")) {
      const uri = `${config.url}/asin/${searchedProduct?.product_id}/number-reviews/${datetype}`;
      fetch(uri)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error(err));
    }
  }, [searchedProduct]);

  useEffect(() => {
    console.log(data);
    if (svgRef.current && data) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      svg
        .append("clipPath")
        .attr("id", "border")
        .append("rect")
        .attr("width", width - margin.right)
        .attr("height", height - margin.bottom - margin.top)
        .attr("x", margin.top)
        .attr("y", margin.top)
        .attr("fill", "white");

      const extent = d3.extent<Source, number>(
        data,
        (d: Source) => d.intervalTimeUnix
      ) as [number, number];

      //xAxis Scale
      const xScale = d3.scaleTime(extent, [margin.left, width - margin.right]);

      const xAxisFn = d3.axisBottom(xScale);

      const max = d3.max(data, (d) => d.docCount) as number;

      //yAxis Scale
      const yScale = d3
        .scaleLinear()
        .domain([0, max + 1])
        .range([height - margin.bottom, margin.top]);

      const yAxisFn = d3.axisLeft(yScale);

      // yAxis & grid;
      const yAxis = svg
        .append<SVGGElement>("g")
        .classed("y-axis", true)
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxisFn)
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll(".tick-line").attr("stroke", "lightgrey");
        })
        //label
        .append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("y", 0.5 * margin.top)
        .attr("x", 0)
        .attr("fill", "black")
        .attr("text-anchor", "start")
        .text("↑ Number of reviews");

      // xAxis & grid
      const xAxis = svg
        .append<SVGGElement>("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxisFn)
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll(".tick-line").attr("stroke", "black");
        });

      //hide everything out of this area
      svg
        .append("clipPath")
        .attr("id", "border")
        .append("rect")
        .attr("width", width - margin.right)
        .attr("height", height - margin.bottom - margin.top)
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("fill", "white");

      const clip = svg
        .append<SVGGElement>("g")
        .attr("clip-path", "url(#border)");
      svg.append("path");
      const clip1 = svg
        .append<SVGPathElement>("path")
        .attr("clip-path", "url(#border)");

      //implement line
      const path = clip1
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3.line<Source>(
            (d) => xScale(d.intervalTimeUnix),
            (d) => yScale(d.docCount)
          )
        );

      //implement circles
      const dots = clip
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.intervalTimeUnix))
        .attr("cy", (d) => yScale(d.docCount))
        .attr("r", 2.5)
        .style("fill", "darkblue")
        //@ts-ignore
        .on("mouseenter", function (event, d: Source) {
          console.log(d);
          d3.select(this)
            .attr("r", 5)
            .style("fill", "blue")
            .attr("opacity", 0.5);
          const self = d3.select(this);
          const node = self.node() as SVGCircleElement;
          tooltip.attr(
            "transform",
            `translate(${node.cx.baseVal.value + 5}, ${
              node.cy.baseVal.value - 30
            })`
          );
          tooltipDocCount.text(`Reviews: ${d.docCount}`);
          tooltipMonth.text(
            `Month: ${new Date(d.intervalTimeUnix).toLocaleString("en-US", {
              month: "long",
            })} - ${new Date(d.intervalTimeUnix).toLocaleString("en-US", {
              year: "numeric",
            })}`
          );
          const tooltipMonthNode = tooltipMonth.node() as SVGTextElement;
          const labelWidth = tooltipMonthNode.getComputedTextLength();
          tooltipRect.attr("width", labelWidth + 10);
          tooltip.attr("visibility", "visible");
        })

        .on("mouseleave", function () {
          d3.select(this)
            .attr("r", 2.5)
            .style("fill", "darkblue")
            .attr("opacity", null);
          tooltip.attr("visibility", "hidden");
        });

      //Zoom and update
      const zoom = d3
        .zoom<SVGSVGElement, Source>()
        .on("zoom", onZoom)
        //.scaleExtent([1, Infinity])
        .scaleExtent([1, 10])
        .extent([
          [margin.left, margin.top],
          [width + margin.left, height + margin.top],
        ]) as (
        selection: d3.Selection<SVGSVGElement, unknown, null, undefined>,
        ...args: any[]
      ) => void;

      svg.call(zoom);

      function onZoom(event: any) {
        const xNew = event.transform.rescaleX(xScale);
        const xNew1 = event.transform.rescaleX(xScale);

        svg.selectAll("g.x-axis").remove(); //Ck hinzugefügt
        const xAxisFn = d3.axisBottom(xNew);

        svg
          .append<SVGGElement>("g")
          .classed("x-axis", true) // CK Namen geändert
          .attr("transform", `translate(0, ${height - margin.bottom})`)
          .call(xAxisFn);

        dots.attr("cx", (d) => xNew(d.intervalTimeUnix));
        path.attr(
          "d",
          d3.line<Source>(
            (d) => xNew1(d.intervalTimeUnix),
            (d) => yScale(d.docCount)
          )
        );
      }

      //Tooltips
      const tooltip = svg.append<SVGGElement>("g").attr("visibility", "hidden");
      const tooltipRect = tooltip
        .append("rect")
        .attr("fill", "black")
        .attr("rx", 0)
        .attr("padding", 5)
        .attr("height", 32)
        .attr("width", 50);

      const tooltipDocCount = tooltip
        .append("text")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("dominant-baseline", "hanging")
        .attr("y", 19)
        .attr("x", 3);

      const tooltipMonth = tooltip
        .append("text")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("dominant-baseline", "hanging")
        .attr("y", 5)
        .attr("x", 3);
    }
  }, [data, svgRef.current]);

  return (
    <div>
      <svg width={width} height={height} ref={svgRef}></svg>
    </div>
  );
};
