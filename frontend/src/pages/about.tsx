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
      <div className="About-about">
          <h4> What this app is about and how it's working!</h4>
          <p className="about-text"> Amazon Search is an independent, userdatabased comparison portal which supports customers making better decisions and vendors compare their products to others.
              Our dataset contains customer reviews and ratings of the last 20 years and is provided by amazon. Using elastic we're able to offer advanced searching options such as direct ASIN
              search as well as direct product title search. In the following the information will be displayed in different visualization on our dashboard. The sourcecode can be found on Bitbucket.
              Therefore, click the bottom in the footer. This app was designed by Constantin Kühne, Tim Muscholl & Valentin Kieslinger.  </p>

          <Box
          sx={{width: 400, height: 100, borderRadius: 1 , border: "2px solid #0288d1", m: 4}} alignItems="center" justifyContent="center" >
              <p className="Searchresult">Your search result:{searchedProduct?.product_title}</p>
              <p className="Searchresult">ASIN / Product ID: {searchedProduct?.product_id}</p>



          </Box>
      </div>
    </div>
  );
}


