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

export type SearchOptions = "Product" | "ASIN";
//App Styling for App.tsx mui components
const useStyles = makeStyles({
  searchbutton: {
    backgroundColor: "transparent",
  },
  errorbutton: {
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
          <Avatar alt="Example Alt" src="ADP_Logo.png"/>
        </div>
        <br />
        <h1> ADP SEARCH</h1>
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

      <div className="App-footer">
          <p> made by Constantin Kühne, Tim Muscholl, Valentin Kieslinger 2022</p>
          {/* <Button
          className={classes.errorbutton}
          onClick={() => console.log("Error Button Clicked")} //Kann man auch noch eine Mailto Function machen oder eine Route zu einem extra Fenster.
          variant="outlined"
          color="secondary"
          type="submit"
        >
          Report problem
        </Button>*/}
      </div>
    </div>
  );
};

export default App;
