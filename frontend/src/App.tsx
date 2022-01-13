import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Search, { Source } from "./components/searchbar";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import ResponsiveAppBar from "./components/appbar";
import { Dashboard } from "./pages/dashboard";
import "./config";

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

  useEffect(() => {
    console.log(searchedProduct);
  }, [searchedProduct]);

  return (
    <div className="App">
      <div className="app-bar">
        <ResponsiveAppBar />
      </div>

      <header className="App-header">
        <div>
          <Avatar alt="Example Alt" src="Bigproject_Logo.png" />
        </div>
        <h2> ADP SEARCH</h2>
        <Search setSearchedProduct={setSearchedProduct} />
        <br />

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
        <br />
        <br />

        <p> This is how it works!</p>
      </div>

      <div className="App-Body">
        <Dashboard searchedProduct={searchedProduct} />
      </div>

      <div className="App-footer">
        <Button
          className={classes.errorbutton}
          onClick={() => console.log("Error Button Clicked")} //TODO Wenn man Bock hat, kann man dafür ne Function machen.
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
