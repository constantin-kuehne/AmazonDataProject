import { ApiResponse } from "@elastic/elasticsearch/api/new";
import {
  AggregationsAggregate,
  AggregationsFiltersAggregate,
  AggregationsFiltersBucketItem,
  AggregationsKeyedBucket,
  AggregationsKeyedBucketKeys,
  AggregationsKeyedValueAggregate,
  AggregationsMultiBucketAggregate,
  AggregationsSingleBucketAggregate,
  AggregationsTermsAggregate,
  AggregationsValueAggregate,
  CountResponse,
  SearchResponse,
} from "@elastic/elasticsearch/api/types";
import {
  Source as CompletionTitleSource,
  SearchBody as CompletionTitleSearchBody,
} from "./queries/query-completion-product-title";
import { SourceSumVotesArrayASINS as SimilarProductsSource } from "./queries/query-similar-products";
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
  >
) => {
  const hits = data.body.hits.hits.map((d) => {
    return {
      product_title: d._source.product_title,
      asin: d._source.product_id,
    };
  });
  return hits;
};

const getQueryHits: hitsCallback = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>
) => {
  const hits: Source[] = data.body.hits.hits.map((d) => d._source);
  return hits;
};

const getQueryHitsSimilarProducts = <SearchBody>(
  data: ApiResponse<SearchResponse<SimilarProductsSource>, SearchBody>
) => {
  const hits: string[] = data.body.hits.hits.map((d) => d._source.product_id);
  return hits;
};

const getVotesSimilarProducts = <SearchBody>(
  data: ApiResponse<SearchResponse<false>, SearchBody>,
  asins: string[]
) => {
  const filteredHits = data.body.aggregations
    .AsinFilter as AggregationsSingleBucketAggregate;
  const bucketsHits = filteredHits.GroupByAsin as AggregationsTermsAggregate;
  const bucketsArray = bucketsHits.buckets as AggregationsKeyedBucket[];
  const hits = bucketsArray.map((d) => {
    const sum1 = d.sum1 as AggregationsValueAggregate;
    const sum2 = d.sum2 as AggregationsValueAggregate;
    const avg1 = d.avg1 as AggregationsValueAggregate;
    const term1 = d.term1 as AggregationsMultiBucketAggregate<{
      key: string;
      doc_count: number;
    }>;
    return {
      ASIN: d.key as string,
      docCount: d.doc_count as number,
      totalVotes: sum1.value as number,
      helpfulVotes: sum2.value as number,
      starRating: avg1.value as number,
      productTitle: term1.buckets[0].key,
    };
  });
  return hits.sort((a, b) => asins.indexOf(a.ASIN) - asins.indexOf(b.ASIN));
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

const getTimeNumberReviews = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>,
  aggName: string
): {
  intervalTime: string;
  intervalTimeUnix: number;
  docCount: number;
}[] => {
  const aggregation: AggregationsMultiBucketAggregate<AggregationsKeyedBucketKeys> =
    data.body.aggregations[
      aggName
    ] as AggregationsMultiBucketAggregate<AggregationsKeyedBucketKeys>;
  const buckets = aggregation.buckets.map((d) => {
    return {
      intervalTime: d.key_as_string,
      intervalTimeUnix: d.key as number,
      docCount: d.doc_count,
    };
  });
  return buckets;
};

export {
  getQueryFields,
  getQueryHits,
  getStarRating,
  getNumberReviews,
  getTimeNumberReviews,
  getTotalVotes,
  getHelpfulVotes,
  getCompletionTitle,
  getQueryHitsSimilarProducts,
  getVotesSimilarProducts,
};
