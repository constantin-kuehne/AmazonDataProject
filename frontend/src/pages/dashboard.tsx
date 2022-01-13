import React from "react";
import { BarChart } from "./BarChart";
import { Source as SearchProductSource } from "../components/searchbar";

export const Dashboard = ({
  searchedProduct,
}: {
  searchedProduct: null | SearchProductSource;
}) => {
  return (
    <>
      <BarChart searchedProduct={searchedProduct} />
    </>
  );
};
