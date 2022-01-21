import { Box } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import React from "react";
import Animations from "../animations/loading_animation";
import { Source } from "../components/searchbar";
import "./about.css"

export default function About({
  searchedProduct,
}: {
  searchedProduct: Source | null;
}) {
  return (
    <div>
      <div>
        <h4> What this app is about and how it's working!</h4>
      </div>
      <p className="Searchresult">Your search result: {searchedProduct?.product_title}</p>
      <p className="Searchresult">ASIN / Product ID: {searchedProduct?.product_id}</p>
    </div>
  );
}
