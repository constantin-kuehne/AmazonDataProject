import { ApiResponse } from "@elastic/elasticsearch/api/new"
import { SearchResponse } from "@elastic/elasticsearch/api/types"
import { SearchBody as QueryUniqueAsinSearchBody }  from "./query-unique-asin"
import { Source as QueryAsinSource, SearchBody as QueryAsinSearchBody } from "./query-asin"

const getQueryUniqueAsinHits = (data: ApiResponse<SearchResponse<false>, QueryUniqueAsinSearchBody>) => {
    const hits: Array<string> = data.body.hits.hits.map(d => d.fields["product_id.keyword"][0])
    return hits 
} 

const getQueryAsinHits = (data: ApiResponse<SearchResponse<QueryAsinSource>, QueryAsinSearchBody>) => {
    const hits: Array<QueryAsinSource> = data.body.hits.hits.map(d => d._source)
    return hits
}

export { getQueryUniqueAsinHits, getQueryAsinHits}
