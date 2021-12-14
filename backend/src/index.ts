import express from "express";

import "./loadenv";
import "./config";

import client from "./elastic/client";

import AsinRouter from "./routes/asin";

const app = express();
const port = 3000; // default port to listen

app.use("/asin", AsinRouter);

// start the Express server
client.ping().then((res) => {
  if (!res) {
    throw Error("Client couldn't establish connection");
  } else {
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
  }
});
