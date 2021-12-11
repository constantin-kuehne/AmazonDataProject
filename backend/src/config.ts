import * as fs from "fs"
import * as path from "path"

interface configInterface {
    index: string,
    url: string
}

const rawData = fs.readFileSync(path.join(__dirname, '..', '/config/config.json'), "utf8")
const config: configInterface = JSON.parse(rawData)
export default config
