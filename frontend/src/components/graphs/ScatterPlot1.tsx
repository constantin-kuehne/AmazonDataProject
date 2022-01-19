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

    export const ScatterPlot = ({
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
        const [docCount, setdocCount] = useState<null | number >(null);
        const margin = { left: 40, right: 40, top: 40, bottom: 40 };

            useEffect(() => {
                if (searchedProduct?.hasOwnProperty("product_id")) {
                const uri = `${config.url}/asin/${searchedProduct?.product_id}/votes-similar-products`;
                fetch(uri)
                    .then((res) => res.json())
                    .then((data) => setData(data))
                    .catch((err) => console.error(err));
                const uriDC = `${config.url}/asin/${searchedProduct?.product_id}/number-reviews`;
                fetch(uriDC)
                    .then((res) => res.json())
                    .then((data) => setdocCount(data))
                    .catch((err) => console.error(err));
                }
            }, [searchedProduct]);

            useEffect(() => {
                if (svgRef.current && data && docCount) {
                const svg = d3.select(svgRef.current);
                svg.selectAll("*").remove();

                let maxData = d3.max(data, (d) => d["docCount"])
                maxData = ((maxData! > docCount!)? maxData! : docCount!)+5
                svg
                .append("clipPath")
                .attr("id", "border")
                .append("rect")
                .attr("width", width - margin.right)
                .attr("height", height - margin.bottom - margin.top)
                .attr("x", margin.top)
                .attr("y", margin.top)
                .attr("fill", "white");

                
                /*const extent = d3.extent<Source, number>(
                    data,
                    (d: Source) => d.intervalTimeUnix
                ) as [number, number];*/

                //xAxis Scale
                const xScale = d3
                .scaleLinear()
                .domain([0, 100])
                .range([margin.left, width - margin.right]);

                const xAxisFn = d3.axisBottom(xScale);

                //yAxis Scale
                const yScale = d3
                .scaleLinear()
                .domain ([0, maxData!])
                .range([height - margin.bottom, margin.top]);

                const yAxisFn = d3.axisLeft(yScale);

                // xAxis & grid 
                const  XAxis = svg
                .append<SVGGElement>("g")
                .classed("x-axis", true)
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(xAxisFn)
                .call((g) => {
                g.select(".domain").remove();
                g.selectAll(".tick line")
                .attr("stroke", "lightgrey")
                .attr("x1", 0)
                .attr("x2", width);
                })
                //lable 
                .append("text")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("y", 0.8*margin.bottom)
                .attr("text-anchor", "end")
                .attr("x", width-margin.right)
                .attr("fill", "black")
                .text("total votes ∷ helpful votes in % ⭢");

                // yAxis & grid 
                const  YAxis = svg
                .append<SVGGElement>("g")
                .classed("y-axis", true)
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(yAxisFn)
                .call((g) => {
                g.select(".domain").remove();
                g.selectAll(".tick line")
                .attr("stroke", "lightgrey")
                .attr("x1", 0)
                .attr("x2", width);
                })
                //lable 
                .append("text")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("y", 0.3*margin.top)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .text("↑ Number of reviews");

                //hide everxthin out of this area 
                svg
                .append("clipPath")
                .attr("id", "border")
                .append("rect")
                .attr("width", width-margin.right)
                .attr("height", height-margin.bottom-margin.top)
                .attr("x", margin.left)
                .attr("y", margin.top)
                .attr("fill", "white");

                const clip = svg
                .append<SVGGElement>("g")
                .attr("clip-path", "url(#border)");

                //implement circles for comparison products
                const dots = clip
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", (d) => xScale(d.helpfulVotes/d.totalVotes * 100))
                .attr("cy", (d) => yScale(d.docCount))
                .attr("r", 3.5)
                .style("fill", "lightblue")
                .on("mouseenter", function (event, d: Source) {
                d3.select(this)
                .attr("r", 5)
                .style("fill", "darkblue")
                .attr("opacity", 0.5)
                const self = d3.select(this)
                const node = self.node() as SVGCircleElement;

                    tooltip.attr(
                    "transform", 
                    `translate(${node.cx.baseVal.value + 5}, ${
                        node.cy.baseVal.value - 30})`)

                    tooltipVotes.text(
                    `Votes: ${(
                        d.helpfulVotes/d.totalVotes * 100).toFixed(2)}%`)

                    tooltipDocCount.text(
                    `Number of reviews: ${d.docCount}`)

                    tooltipProduct.text(
                    `Product: ${d.productTitle}`)

                    const tooltipProduct = tooltipProduct.node() as SVGTextElement;
                    const labelWidth = tooltipProduct.getComputedTextLength();
                    tooltipRect.attr("width", labelWidth + 20)
                    tooltip.attr("visibility", "visible")
                })
                
                .on("mouseleave", function() {
                    d3.select(this)
                    .attr("r", 3.5)
                    .style("fill", "lightblue")
                    .attr("opacity", null);
                    tooltip.attr("visibility", "hidden")
                })

                //implement circle for searched product 
                const dot =  clip
                .selectAll("dot")
                .data([searchedProduct!])
                .enter()
                .append("rect")
                .attr("x", (d) => xScale(d.helpfulVotes/d.totalVotes * 100))
                .attr("y", (d) => yScale(d.docCount))
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", "orange")
                .on("mouseenter", function (event, d: Source) {
                d3.select(this)
                .attr("r", 5)
                .style("fill", "darkblue")
                .attr("opacity", 0.5)
                const self = d3.select(this)
                const node = self.node() as SVGCircleElement;

                tooltip.attr(
                    "transform", 
                    `translate(${node.cx.baseVal.value + 5}, ${
                    node.cy.baseVal.value - 30})`)


                tooltipVotes.text(
                    `Votes: ${(
                        d.helpfulVotes/d.totalVotes * 100).toFixed(2)}%`)

                tooltipDocCount.text(
                    `Number of reviews: ${d.docCount}`)

                tooltipProduct.text(
                    `Product: ${d.productTitle}`)

                const tooltipProduct = tooltipProduct.node() as SVGTextElement;
                const labelWidth = tooltipProduct.getComputedTextLength();
                tooltipRect.attr("width", labelWidth + 20)
                tooltip.attr("visibility", "visible")
                })
                
                .on("mouseleave", function() {
                    d3.select(this)
                    .attr("r", 3.5)
                    .style("fill", "lightblue")
                    .attr("opacity", null);
                    tooltip.attr("visibility", "hidden")
                })




                //Zoom and update
                const zoom = d3
                .zoom<SVGSVGElement, Source>()
                .on("zoom", onZoom)
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
                const yNew = event.transform.rescaleY(yScale);

                svg.selectAll("g.x-axis").remove() 
                svg.selectAll("g.y-axis").remove() 
                const xAxisFn = d3.axisBottom(xNew)
                const yAxisFn = d3.axisLeft(yNew);

                // xAxis & grid 
                        const  XAxis = svg
                        .append<SVGGElement>("g")
                        .classed("x-axis", true)
                        .attr("transform", `translate(0, ${height - margin.bottom})`)
                        .call(xAxisFn)
                        .call((g) => {
                            g.select(".domain").remove();
                            g.selectAll(".tick line")
                            .attr("stroke", "lightgrey")
                            .attr("x1", 0)
                            .attr("x2", width);
                        })
                        //lable 
                        .append("text")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", 10)
                        .attr("y", 0.8*margin.bottom)
                        .attr("text-anchor", "end")
                        .attr("x", width-margin.right)
                        .attr("fill", "black")
                        .text("total votes ∷ helpful votes in % ⭢");

                        // yAxis & grid 
                        const  YAxis = svg
                        .append<SVGGElement>("g")
                        .classed("y-axis", true)
                        .attr("transform", `translate(${margin.left}, 0)`)
                        .call(yAxisFn)
                        .call((g) => {
                            g.select(".domain").remove();
                            g.selectAll(".tick line")
                            .attr("stroke", "lightgrey")
                            .attr("x1", 0)
                            .attr("x2", width);
                        })
                        //lable 
                        .append("text")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", 10)
                        .attr("y", 0.3*margin.top)
                        .attr("fill", "black")
                        .attr("text-anchor", "start")
                        .text("↑ Number of reviews");
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
                const tooltipVotes = tooltip
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
