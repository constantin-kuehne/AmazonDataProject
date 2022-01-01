import * as fs from "fs";
import * as path from "path";

interface ConfigInterface {
  index: string;
  url: string;
  max_request_size: number;
}

const rawData = fs.readFileSync(
  path.join(__dirname, "..", "/config/config.json"),
  "utf8"
);
const config: ConfigInterface = JSON.parse(rawData);
export default config;
