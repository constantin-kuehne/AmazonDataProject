import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Search, { Source } from "./components/searchbar";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Dashboard } from "./pages/dashboard";
import "./config";
import ADPAppbar from "./components/appbar";
import About from "./pages/about";
import Select from "./components/searchoptions";
import SearchSelect from "./components/searchoptions";
import { polyfill } from "seamless-scroll-polyfill";
import Searchresult from "./pages/about";
import Appfooter from "./components/appfooter";

export type SearchOptions = "Product" | "ASIN";
//App Styling for App.tsx mui components
const useStyles = makeStyles({
  searchbutton: { //Inactive
    backgroundColor: "transparent",
  },
  errorbutton: { //Inactive
    backgroundColor: "transparent",
    fontSize: 10,
  },
});
//App Function
const App = () => {
  polyfill();
  const classes = useStyles();

  const [searchedProduct, setSearchedProduct] = useState<Source | null>(null);
  const [search, setSearch] = useState<SearchOptions>("Product");
  const jumpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (jumpRef && searchedProduct) {
      jumpRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchedProduct, jumpRef]);

  return (
    <div className="App">
      <div className="app-bar">
        <ADPAppbar />
      </div>
      <header className="App-header">
        <div>
          <Avatar alt="A" src="Bigproject_Logo.png"/>
        </div>
        <br />
        <h1>ADP SEARCH</h1>
        <SearchSelect search={search} setSearch={setSearch} />
        <br />
        <Search setSearchedProduct={setSearchedProduct} search={search} />

        {/*<Button //Searchbutton
          onClick={() =>
            console.log("Search Button Clicked - Process started.")
          }
          className={classes.searchbutton}
          color={"secondary"}
          endIcon={<KeyboardArrowRight />}
          type={"submit"}
          variant={"outlined"}
        >
          {" "}
          Search
        </Button>*/}
      </header>

      <div className="App-about" ref={jumpRef}>
        <About searchedProduct={searchedProduct}/>
      </div>

      {searchedProduct !== null ? (
        <div className="App-Body">
          <Dashboard searchedProduct={searchedProduct} />
        </div>
      ) : (
        <></>
      )}
        <div>
            <Appfooter/>
        </div>


    </div>
  );
};

export default App;
