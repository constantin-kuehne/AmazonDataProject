import React from "react";
import { BarChart } from "../components/graphs/BarChart";
import { LineChart } from "../components/graphs/LineChart";
import { ScatterPlot } from "../components/graphs/ScatterPlot1";
import { Source as SearchProductSource } from "../components/searchbar";

export const Dashboard = ({
  searchedProduct,
}: {
  searchedProduct: null | SearchProductSource;
}) => {
  return (
    <div>
      <h3> This is the first Chart.</h3>
      <BarChart searchedProduct={searchedProduct} width={1000} height={500} />
      <h3> This is the second Chart.</h3>
      <LineChart
        searchedProduct={searchedProduct}
        datetype={"MONTH"}
        width={1000}
        height={500}
      />
      <h3> This is the third Chart.</h3>
      <ScatterPlot
        searchedProduct={searchedProduct}
        width={1000}
        height={500}
      />
      <h3> This is the fourth Chart.</h3>
      <BarChart searchedProduct={searchedProduct} width={1000} height={500} />
    </div>
  );
};
