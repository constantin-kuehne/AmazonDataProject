import { Client, ClientOptions } from "@elastic/elasticsearch";
import type { Client as NewClientType } from "@elastic/elasticsearch/api/new";
import configVars from "../config";

const config: ClientOptions = {
  node: configVars.url,
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
};

// @ts-expect-error @elastic/elasticsearch
const client: NewClientType = new Client(config);

export default client;
