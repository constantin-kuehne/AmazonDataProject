import { ApiResponse } from "@elastic/elasticsearch/api/new";
import {
  AggregationsSingleBucketAggregate,
  CountResponse,
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

const getTotalVotes = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>,
  filterName: string,
  aggName: string
): { docCount: number; totalVotes: number } => {
  const aggregation: AggregationsSingleBucketAggregate = data.body.aggregations[
    filterName
  ] as AggregationsSingleBucketAggregate;
  const docCount = aggregation.doc_count;
  const intermediate: Record<string, number> = aggregation[aggName] as Record<
    string,
    any
  >;
  const totalVotes = intermediate.value;

  return { docCount, totalVotes };
};
const getNumberReviews = <SearchBody>(
  data: ApiResponse<CountResponse, SearchBody>
) => {
  const hits = data.body.count;
  return hits;
};

export {
  getQueryFields,
  getQueryHits,
  getStarRating,
  getNumberReviews,
  getTotalVotes,
};
