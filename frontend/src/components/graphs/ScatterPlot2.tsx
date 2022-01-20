import React, { useEffect, useRef, useState } from "react";
import config from "../../config";
import { Source as SearchProductSource } from "../searchbar";
import * as d3 from "d3";

export interface Source {
  docCount: number;
  totalVotes: number;
  helpfulVotes: number;
  starRating: number;
  productTitle: string;
}

interface SearchedData {
  docCount: number;
  helpfulVotes: number;
  totalVotes: number;
  starRating: number;
}

export const ScatterPlotTwo = ({
  searchedProduct,
  width,
  height,
}: {
  searchedProduct: null | SearchProductSource;
  width: number;
  height: number;
}) => {
  const svgRef = useRef<null | SVGSVGElement>(null);

  const [data, setData] = useState<null | Source[]>(null);
  const [searchedData, setSearchedData] = useState<null | SearchedData>(null);
  const margin = { left: 40, right: 40, top: 40, bottom: 40 };

  useEffect(() => {
    if (searchedProduct?.hasOwnProperty("product_id")) {
      const uri = `${config.url}/asin/${searchedProduct?.product_id}/votes-similar-products?title=${searchedProduct.product_title}&category=${searchedProduct.product_category}`;
      fetch(uri)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error(err));
      const uriDC = `${config.url}/asin/${searchedProduct?.product_id}/info`;
      fetch(uriDC)
        .then((res) => res.json())
        .then((data) => setSearchedData(data))
        .catch((err) => console.error(err));
    }
  }, [searchedProduct]);

  useEffect(() => {
    if (svgRef.current && data && searchedData) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      //get max value of "Number of reviews" / "docCount"
      let maxData = d3.max(data, (d) => d["docCount"]);
      maxData =
        (maxData! > searchedData!.docCount
          ? maxData!
          : searchedData!.docCount) + 5;

      //xAxis Scale
      const xScale = d3
        .scaleLinear()
        .domain([0, 5])
        .range([margin.left, width - margin.right]);

      const xAxisFn = d3
        .axisBottom(xScale)
        .tickFormat((tick) => {
          const tickNumber = tick as number;
          if (Math.floor(tickNumber) !== tickNumber) {
            return "";
          }
          return tickNumber.toString();
        });;

      //yAxis Scale
      const yScale = d3
        .scaleLinear()
        .domain([0, maxData!])
        .range([height - margin.bottom, margin.top]);

      const yAxisFn = d3.axisLeft(yScale);

      // xAxis & grid
      svg
        .append<SVGGElement>("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxisFn)
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll(".tick line")
            .attr("stroke", "lightgrey")
            .attr("y1", -height + 2 * margin.top)
            .attr("y2", 0);
        })
        //lable
        .append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("y", 0.8 * margin.bottom)
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("fill", "black")
        .text("Star rating ⭢");

      // yAxis & grid
      svg
        .append<SVGGElement>("g")
        .classed("y-axis", true)
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxisFn)
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll(".tick line")
            .attr("stroke", "lightgrey")
            .attr("x1", 0)
            .attr("x2", width - 2 * margin.right);
        })
        //lable
        .append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("y", 0.3 * margin.top)
        .attr("fill", "black")
        .attr("text-anchor", "start")
        .text("↑ Number of reviews");

      //hide everything out of his area
      svg
        .append("clipPath")
        .attr("id", "border2")
        .append("rect")
        .attr("width", width - 2 * margin.right)
        .attr("height", height - 2 * margin.bottom)
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("fill", "white");

      const clip = svg
        .append<SVGGElement>("g")
        .attr("clip-path", "url(#border2)");
      svg.append("path");

      //implement circles for comparison products
      const dots = clip
        .selectAll("dot.similar")
        .data(data)
        .enter()
        .append<SVGCircleElement>("circle")
        .classed("similar", true)
        .attr("cx", (d) => xScale(d.starRating))
        .attr("cy", (d) => yScale(d.docCount))
        .attr("r", 3.5)
        .style("fill", "#0288d1")
        .on("mouseenter", function (event, d: Source) {
          d3.select(this)
            .attr("r", 5)
            .style("fill", "#0288d1")
            .attr("opacity", 0.5);
          const self = d3.select(this);
          const node: SVGCircleElement = self.node()!;

          tooltip.attr("transform",`translate(${node.cx.baseVal.value + 5}, ${node.cy.baseVal.value - 30})`);

          tooltipProduct.text(`Product: ${d.productTitle}`);
          tooltipStarRating.text(`Star rating: ${d.starRating.toFixed(2)}`);
          tooltipDocCount.text(`Number of reviews: ${d.docCount}`);

          const labelWidth = d3.max([
            tooltipProduct.node()!.getComputedTextLength(),
            tooltipProduct.node()!.getComputedTextLength(),
            tooltipDocCount.node()!.getComputedTextLength(),
          ]) as number;

          //Label width
          tooltipRect.attr("width", labelWidth + 20);
          tooltip.attr("visibility", "visible");
        })

        .on("mouseleave", function () {
          d3.select(this)
            .attr("r", 3.5)
            .style("fill", "#0288d1")
            .attr("opacity", null);
          tooltip.attr("visibility", "hidden");
        });

      //implement circle for searched product
      const dot = clip
        .selectAll("dot.searched")
        .data([searchedData])
        .enter()
        .append<SVGRectElement>("rect")
        .classed("searched", true)
        .attr("x", (d) => xScale(d.starRating))
        .attr("y", (d) => yScale(d.docCount))
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", "red")
        .on("mouseenter", function (event, d: SearchedData) {
          d3.select(this)
          .style("fill", "red")
          .attr("opacity", 0.5);

          const self = d3.select(this);
          const node: SVGRectElement = self.node()!;

          tooltip.attr(
            "transform",
            `translate(${node.x.baseVal.value + 12}, ${
              node.y.baseVal.value - 30
            })`
          );

          tooltipProduct.text(`Product: ${searchedProduct!.product_title}`);
          tooltipStarRating.text(`Star rating: ${d.starRating.toFixed(2)}`);
          tooltipDocCount.text(`Number of reviews: ${d.docCount}`);

          const labelWidth1 = d3.max([
            tooltipProduct.node()!.getComputedTextLength(),
            tooltipProduct.node()!.getComputedTextLength(),
            tooltipDocCount.node()!.getComputedTextLength(),
          ]) as number;

          //Label width
          tooltipRect.attr("width", labelWidth1 + 20);
          tooltip.attr("visibility", "visible");
        })

        .on("mouseleave", function () {
          d3.select(this)
            .style("fill", "red")
            .attr("opacity", null);
          tooltip.attr("visibility", "hidden");
        });

      //Zoom and update
      const zoom = d3
        .zoom<SVGSVGElement, Source>()
        .on("zoom", onZoom)
        .scaleExtent([1, 6])
        .extent([[margin.left, margin.top],[width + margin.left, height + margin.top],]) as (
          selection: d3.Selection<SVGSVGElement, unknown, null, undefined>,
          ...args: any[]
        ) => void;

      svg.call(zoom);

      //Update graph
      function onZoom(event: any) {
        const xNew = event.transform.rescaleX(xScale);
        const yNew = event.transform.rescaleY(yScale);

        const xAxisFn = d3.axisBottom(xNew).tickFormat((tick) => {
          const tickNumber = tick as number;
          if (Math.floor(tickNumber) !== tickNumber) {
            return "";
          }
          return tickNumber.toString();
        });
        const yAxisFn = d3.axisLeft(yNew);

        //xAxis
        svg
          .select<SVGGElement>("g.x-axis")
          .classed("x-axis", true)
          .attr("transform", `translate(0, ${height - margin.bottom})`)
          .call(xAxisFn)
          .call((g) => {
            g.select(".domain").remove();
            g.selectAll(".tick line")
              .attr("stroke", "lightgrey")
              .attr("y1", -height + 2 * margin.top)
              .attr("y2", 0);
          })


        //yAxis
        svg
          .select<SVGGElement>("g.y-axis")
          .classed("y-axis", true)
          .attr("transform", `translate(${margin.left}, 0)`)
          .call(yAxisFn)
          .call((g) => {
            g.select(".domain").remove();
            g.selectAll(".tick line")
              .attr("stroke", "lightgrey")
              .attr("x1", 0)
              .attr("x2", width - 2 * margin.right);
          })


        //cicles 
        dots
          .attr("cx", (d) => xNew(d.starRating))
          .attr("cy", (d) => yNew(d.docCount));

        dot
          .attr("x", (d) => xNew(d.starRating))
          .attr("y", (d) => yNew(d.docCount));
      }

      //Tooltips
      const tooltip = svg.append<SVGGElement>("g").attr("visibility", "hidden");
      const tooltipRect = tooltip
        .append("rect")
        .attr("fill", "black")
        .attr("rx", 0)
        .attr("padding", 5)
        .attr("height", 45)
        .attr("width", 30);

      const tooltipStarRating = tooltip
        .append("text")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("dominant-baseline", "hanging")
        .attr("y", 18)
        .attr("x", 3);

      const tooltipDocCount = tooltip
        .append("text")
        .attr("fill", "white")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("dominant-baseline", "hanging")
        .attr("y", 32)
        .attr("x", 3);

      const tooltipProduct = tooltip
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
