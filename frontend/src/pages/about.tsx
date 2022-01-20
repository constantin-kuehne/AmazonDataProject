import { Box } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import React from "react";
import Animations from "../animations/loading_animation";
import { Source } from "../components/searchbar";

export default function About({
  searchedProduct,
}: {
  searchedProduct: Source | null;
}) {
  return (
    <div>
      <p>{searchedProduct?.product_title}</p>
      <div>
        <h4> What this app is about and how it's working!</h4>

      </div>
    </div>
  );
}
