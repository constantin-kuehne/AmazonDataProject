import express from "express";
import queryASIN from "./elastic/query-asin"
import dotenv from "dotenv"

dotenv.config()

const app = express();
const port = 3000; // default port to listen

// define a route handler for the default home page
app.get( "/", ( _ , res ) => {
    res.send(queryASIN("test"));
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
