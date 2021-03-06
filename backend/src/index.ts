import express from "express";

import "./loadenv";
import config from "./config";

import client from "./elastic/client";
import logger from "morgan";
import createError from "http-errors";
import cors from "cors";

import AsinRouter from "./routes/asin";
import CompletionRouter from "./routes/completion";

const app = express();
const PORT = config.port; // default port to listen
const HOST = config.host;

app.use(cors());

app.use(logger("dev"));

app.use("/asin", AsinRouter);

app.use("/completion", CompletionRouter);

app.use(express.static("public"));

app.use((_, __, next) => next(createError(404, "Not Found")));

// start the Express server
client.ping().then((res) => {
  if (!res) {
    throw Error("Client couldn't establish connection");
  } else {
    app.listen(PORT, HOST, () => {
      console.log(`server started at http://${HOST}:${PORT}`);
    });
  }
});
