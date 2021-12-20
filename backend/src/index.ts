import express from "express";

import "./loadenv";
import "./config";

import client from "./elastic/client";
import logger from "morgan";
import createError from "http-errors";

import AsinRouter from "./routes/asin";
import StarRatingRouter from "./routes/star-rating";

const app = express();
const port = 3000; // default port to listen

app.use(logger("dev"));

app.use("/asin", AsinRouter);

app.use("/starrating", StarRatingRouter);

app.use((_, __, next) => next(createError(404)));
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
