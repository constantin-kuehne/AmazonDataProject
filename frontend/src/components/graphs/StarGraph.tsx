import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import config from "../../config";

import { Source as SearchProductSource } from "../searchbar";

interface Source {
  docCount: number;
  starRating: number;
}

export const Stars = ({
  searchedProduct,
  width,
  height,
}: {
  searchedProduct: SearchProductSource | null;
  width: number;
  height: number;
}) => {
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [data, setData] = useState<Source | null>(null);

  useEffect(() => {
    if (searchedProduct?.hasOwnProperty("product_id")) {
      const uri = `${config.url}/asin/${searchedProduct?.product_id}/star-rating`;
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
      let currentStarLeft = data.starRating;
      createStar(svg, 360, 30, 50, currentStarLeft >= 1 ? 1 : currentStarLeft);
      currentStarLeft =
        currentStarLeft > 0 ? currentStarLeft - 1 : currentStarLeft;

      createStar(svg, 420, 30, 50, currentStarLeft >= 1 ? 1 : currentStarLeft);
      currentStarLeft =
        currentStarLeft > 0 ? currentStarLeft - 1 : currentStarLeft;

      createStar(svg, 480, 30, 50, currentStarLeft >= 1 ? 1 : currentStarLeft);
      currentStarLeft =
        currentStarLeft > 0 ? currentStarLeft - 1 : currentStarLeft;

      createStar(svg, 540, 30, 50, currentStarLeft >= 1 ? 1 : currentStarLeft);
      currentStarLeft =
        currentStarLeft > 0 ? currentStarLeft - 1 : currentStarLeft;

      createStar(svg, 600, 30, 50, currentStarLeft >= 1 ? 1 : currentStarLeft);
    }
  }, [svgRef.current, data]);

  return (
    <div>
      <svg width={width} height={height} ref={svgRef}></svg>
    </div>
  );
};

function createStar(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  x: number,
  y: number,
  size: number,
  value: number
) {
  const line = d3
      .line<{ x: number; y: number }>()
      .x(function (d) {
        return d.x;
      })
      .y(function (d) {
        return d.y;
      })
      .curve(d3.curveLinearClosed),
    rad = function (deg: number) {
      return (deg * Math.PI) / 180;
    },
    cos = function (deg: number) {
      return Math.cos(rad(deg));
    },
    sin = function (deg: number) {
      return Math.sin(rad(deg));
    },
    tan = function (deg: number) {
      return Math.tan(rad(deg));
    },
    n = size,
    m = n / 2,
    h = m * tan(36),
    k = h / sin(72),
    //(x, y) points at the leftmost point of the star, not the center
    coordinates = [
      { x: x, y: y },
      { x: x + k, y: y },
      { x: x + m, y: y - h },
      { x: x + n - k, y: y },
      { x: x + n, y: y },
      { x: x + n - k * cos(36), y: y + k * sin(36) },
      { x: x + n * cos(36), y: y + n * sin(36) },
      { x: x + m, y: y + h },
      { x: x + n - n * cos(36), y: y + n * sin(36) },
      { x: x + k * cos(36), y: y + k * sin(36) },
    ],
    starColor = "#edca00",
    backgroundColor = "white",
    borderColor = "#edca00",
    borderWidth = 10;

  //inside star
  svg
    .append("path")
    .attr("d", line(coordinates))
    .style("stroke-width", 0)
    .style("fill", starColor);

  //Rect for clipping
  //In order to avoid potential ID duplicates for clipping, clip-path is not used here
  svg
    .append("rect")
    .attr("x", x + size * value)
    .attr("y", y - h)
    .attr("width", size - size * value)
    .attr("height", size)
    .style("fill", backgroundColor);

  //border of the star
  svg
    .append("path")
    .attr("d", line(coordinates))
    .style("border-width", borderWidth)
    .style("fill", "none")
    .style("stroke", borderColor);
}
