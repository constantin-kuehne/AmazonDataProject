import { ApiResponse } from "@elastic/elasticsearch/api/new";
import {
  AggregationsSingleBucketAggregate,
  CountResponse,
  SearchResponse,
} from "@elastic/elasticsearch/api/types";
import {
  Source as CompletionTitleSource,
  SearchBody as CompletionTitleSearchBody,
} from "./queries/query-completion-product-title";
import { hitsCallback } from "./types";

const getQueryFields = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>,
  field: string
) => {
  const hits: string[] = data.body.hits.hits.flatMap((d) => d.fields[field]);
  return hits;
};

// TODO: make more generic maybe use has key method to check for asin field
const getCompletionTitle = (
  data: ApiResponse<
    SearchResponse<CompletionTitleSource>,
    CompletionTitleSearchBody
  >,
  field: string
) => {
  const hits = data.body.hits.hits.map((d) => {
    return { product_title: d.fields[field][0], asin: d._source.product_id };
  });
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

const getHelpfulVotes = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>,
  filterName: string,
  aggName: string
): { docCount: number; helfulVotes: number } => {
  const aggregation: AggregationsSingleBucketAggregate = data.body.aggregations[
    filterName
  ] as AggregationsSingleBucketAggregate;
  const docCount = aggregation.doc_count;
  const intermediate: Record<string, number> = aggregation[aggName] as Record<
    string,
    any
  >;
  const helfulVotes = intermediate.value;

  return { docCount, helfulVotes };
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
  getHelpfulVotes,
  getCompletionTitle,
};
