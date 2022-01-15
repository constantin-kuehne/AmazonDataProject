import React from "react";
import { BarChart } from "../components/graphs/BarChart";
import { Source as SearchProductSource } from "../components/searchbar";

export const Dashboard = ({
  searchedProduct,
}: {
  searchedProduct: null | SearchProductSource;
}) => {
  return (
    <div>
      <BarChart searchedProduct={searchedProduct} width={1000} height={500} />
    </div>
  );
};
