import express from "express";

import "./loadenv";
import "./config";

import client from "./elastic/client";
import logger from "morgan";
import createError from "http-errors";

import AsinRouter from "./routes/asin";
import CompletionRouter from "./routes/completion";

const app = express();
const port = 3000; // default port to listen

app.use(logger("dev"));

app.use("/asin", AsinRouter);

app.use("/completion", CompletionRouter);

app.use((_, __, next) => next(createError(404, "Not Found")));

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
