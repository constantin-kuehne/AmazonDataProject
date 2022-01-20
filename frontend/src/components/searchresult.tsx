import * as React from "react";
import {Source} from "./searchbar";


export default function About({
                                  searchedProduct,
                              }: {
    searchedProduct: Source | null;
}) {
    return (
        <div>
            <p> Your search result: {searchedProduct?.product_title}</p>
        </div>
    );
}