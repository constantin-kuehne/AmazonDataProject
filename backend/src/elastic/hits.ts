import { ApiResponse } from "@elastic/elasticsearch/api/new";
import {
  AggregationsSingleBucketAggregate,
  SearchResponse,
} from "@elastic/elasticsearch/api/types";
import { hitsCallback } from "./types";

const getQueryFields = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>,
  field: string
) => {
  const hits: string[] = data.body.hits.hits.flatMap((d) => d.fields[field]);
  return hits;
};

const getQueryHits: hitsCallback = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>
) => {
  const hits: Source[] = data.body.hits.hits.map((d) => d._source);
  return hits;
};

const getStarRating = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>,
  filterName: string,
  aggName: string
): { docCount: number; starRating: number } => {
  const aggregation: AggregationsSingleBucketAggregate = data.body.aggregations[
    filterName
  ] as AggregationsSingleBucketAggregate;
  const docCount = aggregation.doc_count;
  const intermediate: Record<string, number> = aggregation[aggName] as Record<
    string,
    any
  >;
  const starRating = intermediate.value;

  return { docCount, starRating };
};

export { getQueryFields, getQueryHits, getStarRating };
