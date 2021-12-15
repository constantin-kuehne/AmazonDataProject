import { ApiResponse } from "@elastic/elasticsearch/api/new";
import { SearchResponse } from "@elastic/elasticsearch/api/types";
import { hitsCallback } from "./types";

const getQueryFields = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>,
  field: string
) => {
  const hits: string[] = data.body.hits.hits.flatMap(
    (d) => d.fields[field]
  );
  return hits;
};

const getQueryHits: hitsCallback = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>
) => {
  const hits: Source[] = data.body.hits.hits.map((d) => d._source);
  return hits;
};

export { getQueryFields, getQueryHits };
