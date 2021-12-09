import express from "express";

import "./loadenv"
import "./config"

import getHits from "./elastic/get-hits"
import queryUniqueAsin from "./elastic/query-unique-asin";
import queryAsin from "./elastic/query-asin";

const app = express();
const port = 3000; // default port to listen

// define a route handler for the default home page
app.get( "/", ( _ , res ) => {
    res.send(queryAsin("test"));
});

app.get("/query-asin", (req, res) => {
    queryAsin(req.query.ASIN as string).then(data => res.send(getHits(data)))
})

app.get("/query-unqiue-asin", (req, res) => {
    queryUniqueAsin(req.query.ASIN as string).then(data => res.send(data.body.hits.hits.map(d => d.fields[0])))
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
