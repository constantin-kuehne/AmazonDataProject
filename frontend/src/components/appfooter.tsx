import React from "react"
import "./footer.css"
import Button from "@mui/material/Button";
import {Link} from "@mui/material";

export default function Appfooter(){
    return(
        <div className="App-footer">

            <Button size="small" sx={{m: 1.5}} variant="contained" href="https://bitbucket.org/constantin-kuehne/amazondataproject/src/main/">
                Code
            </Button>

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

