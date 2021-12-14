import * as path from "path";
import dotenv from "dotenv";

const ENVpath = path.join(__dirname, "..", ".env");

dotenv.config({ path: ENVpath });
