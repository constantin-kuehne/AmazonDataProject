import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from "./components/searchbar";
import {Avatar} from "@material-ui/core";
import AvatarGroup from '@mui/material/AvatarGroup';

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

        <body className="App-Body">


        <p> Dashboard Stuff </p>



        </body>
    </div>
  );
}

export default App;
