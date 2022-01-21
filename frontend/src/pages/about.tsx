import { Box } from "@material-ui/core";
import React from "react";
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
          <Box
          sx={{width: 400, height: 100, border: "2px dashed grey" , borderRadius: 1 , m: 4}} className="About-box">
              <p className="Searchresult">Your search result: {searchedProduct?.product_title}</p>
              <p className="Searchresult">ASIN / Product ID: {searchedProduct?.product_id}</p>



          </Box>
      </div>
    </div>
  );
}


//TODO Commenting