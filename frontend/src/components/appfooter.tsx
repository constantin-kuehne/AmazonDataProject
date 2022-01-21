import React from "react"
import "./footer.css"
import Button from "@mui/material/Button";
import {Link} from "@mui/material";

export default function Appfooter(){
    return(
        <div className="App-footer">

            <Button sx={{m: 2}} variant="contained" href="https://bitbucket.org/constantin-kuehne/amazondataproject/src/main/">
                Code
            </Button>
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


    );



}

