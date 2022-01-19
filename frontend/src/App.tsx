import React, { useState } from "react";
import "./App.css";
import Search, { Source } from "./components/searchbar";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Dashboard } from "./pages/dashboard";
import "./config";
import ADPAppbar from "./components/appbar";
import About from "./pages/about";
import Select from "./components/select_asin_producttitle";
import SearchSelect from "./components/select_asin_producttitle";

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
  const classes = useStyles();

  const [searchedProduct, setSearchedProduct] = useState<Source | null>(null);

  return (
    <div className="App">
      <div className="app-bar">
        <ADPAppbar />
      </div>
      <header className="App-header">
        <div>
          <Avatar alt="Example Alt" src="ADP_Logo.png" />
        </div>
        <br/>
        <h2> ADP SEARCH</h2>
        <SearchSelect/>
        <br/>
        <Search setSearchedProduct={setSearchedProduct} />
        <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>




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

      <div className="App-about">
        <About />
      </div>

      {searchedProduct !== null ? (
        <div className="App-Body">
          <Dashboard searchedProduct={searchedProduct} />
        </div>
      ) : (
        <></>
      )}

      <div className="App-footer">
        <Button
          className={classes.errorbutton}
          onClick={() => console.log("Error Button Clicked")} //Kann man auch noch eine Mailto Function machen oder eine Route zu einem extra Fenster.
          variant="outlined"
          color="secondary"
          type="submit"
        >
          Report problem
        </Button>
      </div>
    </div>
  );
};

export default App;
