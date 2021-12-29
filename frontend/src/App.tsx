import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from "./components/searchbar";
import {Avatar} from "@material-ui/core";
import {Toolbar, Typography} from "@mui/material";
import { AppBar } from '@mui/material';
import Box from "@mui/material/Box";

function App() {
  return (

    <div className="App">

      <header className="App-header">
          <Avatar
              alt="Example Alt"
              src="logo512.png" />
          <h2> Amazon Data Project</h2>
          <Search/>
      </header>

        <div className="dashboard-divider">
            <p> Das ist ein Divider</p>
        </div>

        <div className="App-Body">


        <p> Dashboard Stuff </p>



        </div>
    </div>
  );
}

export default App;
