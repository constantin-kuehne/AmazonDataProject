import client from "./client"
import config from "../config"

export default async (ASIN: string) => {
    return client.search({
        index: `${config.index}`,
        body: {
            "query": {
                "match": {
                    "product_id.wildcard": {
                        "query": `${ASIN}`
                    }
                }
            }
        }
    })
}
