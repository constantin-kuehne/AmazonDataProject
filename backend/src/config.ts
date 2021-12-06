import * as fs from "fs"
import * as path from "path"

const rawData = fs.readFileSync(path.join(__dirname, '/config/config.json'), "utf8")
export default JSON.parse(rawData)
