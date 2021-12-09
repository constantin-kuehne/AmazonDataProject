// TODO: make this a normal query not wildcard query (don't think it is needed here)
import client from "./client"
import config from "../config"

export default async (ASIN: string) => {
    return client.search({
        index: `${config.index}`,
        body: {
            "query": {
                "wildcard": {
                    "product_id.wildcard": {
                        "value": `${ASIN}*`
                    }
                }
            }
        }
    })
}
