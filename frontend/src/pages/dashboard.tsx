import React from "react";
import { BarChart } from "../components/graphs/BarChart";
import { LineChart } from "../components/graphs/LineChart";
import { ScatterPlot } from "../components/graphs/ScatterPlot1";
import { ScatterPlotTwo } from "../components/graphs/ScatterPlot2";
import { Source as SearchProductSource } from "../components/searchbar";

export const Dashboard = ({
  searchedProduct,
}: {
  searchedProduct: null | SearchProductSource;
}) => {
  return (
    <div>
      <h3> Top 20 most voted reviews </h3>
        <p> </p>
      <BarChart searchedProduct={searchedProduct} width={1000} height={500} />

      <h3> Number of reviews per month.</h3>
        <p> </p>
      <LineChart
        searchedProduct={searchedProduct}
        datetype={"MONTH"}
        width={1000}
        height={500}
      />
      <h3> Amount of helpful votes.</h3>
        <p> </p>
      <ScatterPlot
        searchedProduct={searchedProduct}
        width={1000}
        height={500}
      />
      <h3> Star-rating & amount of reviews  </h3>
        <p> </p>
      <ScatterPlotTwo
        searchedProduct={searchedProduct}
        width={1000}
        height={500}
      />
    </div>
  );
};
