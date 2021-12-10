import client from "./client"
import config from "../config"

interface SearchBody {
    index: string,
    body: {
        query: {
            wildcard: {
                "product_id.wildcard": {
                    value: string
                }
            }
        },
        collapse: {
            field: "product_id.keyword"
        },
        fields: ["product_id.keyword"]
    }
}

// TODO: filter path so only hits get returned: https://stackoverflow.com/a/46194936
export default async (ASIN: string) => {
    return client.search<false, SearchBody>({
        index: `${config.index}`,
        body: {
            query: {
                wildcard: {
                    "product_id.wildcard": {
                        value: `${ASIN}*`
                    }
                }
            },
            collapse: {
                field: "product_id.keyword"
            },
          fields: [
              "product_id.keyword"
          ],
          _source: false
        }
    })
}

export { SearchBody }
