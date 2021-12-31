import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from "./components/searchbar";
import {Avatar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {KeyboardArrowRight} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core"


const useStyles = makeStyles({
    searchbutton:{
        backgroundColor: "transparent"
    },
    errorbutton:{
        backgroundColor: "darkred",
        color: "white",
        fontSize: 10,


    }
    }
)

function App() {
    const classes = useStyles()
  return (

    <div className="App">

      <header className="App-header">
          <Avatar
              alt="Example Alt"
              src="logo512.png" />
          <h2> Amazon Data Project</h2>
          <Search/>
          <br/>
          <Button
              onClick={() => console.log("Search Button Clicked - Process started.")}
              className={classes.searchbutton}
              color={"secondary"}
              endIcon={<KeyboardArrowRight/>}
              type={"submit"} variant={"outlined"}> Suche starten

          </Button>
      </header>

        <div className="app-about">
            <p> This is how it works!</p>
        </div>

        <div className="App-Body">



        <p> Dashboard Stuff </p>



        </div>
        <div className="app-footer">
            <Button
                className={classes.errorbutton}
                onClick={() => console.log("Error Button Clicked")} //TODO Wenn man Bock hat, kann man dafür ne Function machen.
                variant="outlined"
                color="primary">
                Fehler melden
            </Button>

        </div>
    </div>

  );
}

export default App;
