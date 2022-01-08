import client from "../client";
import config from "../../config";
import {
  AggregationsAggregationContainer,
  QueryDslBoolQuery,
  SearchFieldCollapse,
  SearchRequest,
} from "@elastic/elasticsearch/api/types";
import { DocumentOptional } from "../types";
import {
  getQueryHits,
  getQueryHitsSimilarProducts,
  getVotesSimilarProducts,
} from "../hits";

class SearchBodySimilarProducts implements SearchRequest {
  index: string;
  size: number;
  body: {
    query: {
      bool: QueryDslBoolQuery;
    };
    collapse: SearchFieldCollapse;
  };
  _source: string[];
}

class SearchBodySumVotesArrayASINS implements SearchRequest {
  index: string;
  size: number;
  body: {
    aggs: Record<string, AggregationsAggregationContainer>;
  };
  _source: boolean;
}

class SourceSimilarProducts implements DocumentOptional {
  helpful_votes: number;
  total_votes: number;
  product_title: string;
  product_id: string;
}

type SourceSumVotesArrayASINS = Pick<DocumentOptional, "product_id">;

const _querySimilarProductsRaw = (
  ASIN: string,
  doc: DocumentOptional,
  field: string,
  size: number,
  source: string[]
) => {
  let query: SearchBodySimilarProducts = {
    index: config.index,
    size: size,
    body: {
      query: {
        bool: {
          must_not: {
            term: {
              [field]: ASIN,
            },
          },
          must: {
            more_like_this: {
              fields: Object.keys(doc),
              like: [
                {
                  _index: config.index,
                  doc: doc,
                },
              ],
              min_term_freq: 1,
              min_doc_freq: 1,
              max_query_terms: 12,
            },
          },
        },
      },
      collapse: {
        field: field,
      },
    },
    _source: source,
  };
  return client.search<SourceSimilarProducts, SearchBodySimilarProducts>(query);
};

const _querySumVotesArrayASINSRaw = (
  ASINS: string[],
  field: string,
  sum1Field: keyof DocumentOptional,
  sum2Field: keyof DocumentOptional,
  avg1Field: keyof DocumentOptional,
  term1Field: string,
  size: number = 50
) => {
  let query: SearchBodySumVotesArrayASINS = {
    index: config.index,
    size: 0,
    _source: false,
    body: {
      aggs: {
        AsinFilter: {
          filter: {
            terms: {
              [field]: ASINS,
            },
          },
          aggs: {
            GroupByAsin: {
              terms: {
                field: field,
                size: size,
              },
              aggs: {
                sum1: {
                  sum: {
                    field: sum1Field,
                  },
                },
                sum2: {
                  sum: {
                    field: sum2Field,
                  },
                },
                avg1: {
                  avg: {
                    field: avg1Field,
                  },
                },
                term1: {
                  terms: {
                    field: term1Field,
                    size: 1,
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  return client.search<false, SearchBodySumVotesArrayASINS>(query);
};

export const querySimilarProductsFull = async (
  ASIN: string,
  productTitle: string,
  productCategory: string,
  size: number = 50
) => {
  const doc: DocumentOptional = {
    product_title: productTitle,
    product_category: productCategory,
  };
  const field = "product_id.keyword";
  const source = [
    "helpful_votes",
    "total_votes",
    "product_title",
    "product_id",
  ];

  const data = await _querySimilarProductsRaw(ASIN, doc, field, size, source);
  return getQueryHits<SourceSimilarProducts, SearchBodySimilarProducts>(data);
};

export const querySimilarProducts = async (
  ASIN: string,
  productTitle: string,
  productCategory: string,
  size: number = 50
) => {
  const doc: DocumentOptional = {
    product_title: productTitle,
    product_category: productCategory,
  };
  const field = "product_id.keyword";
  const source = ["product_id"];

  const data = await _querySimilarProductsRaw(ASIN, doc, field, size, source);
  return getQueryHitsSimilarProducts<SearchBodySimilarProducts>(data);
};

export const queryVotesSimilarProducts = async (
  ASIN: string,
  productTitle: string,
  productCategory: string,
  size: number = 50
) => {
  const field = "product_id.keyword";

  const asins = await querySimilarProducts(
    ASIN,
    productTitle,
    productCategory,
    size
  );

  const data = await _querySumVotesArrayASINSRaw(
    asins,
    field,
    "total_votes",
    "helpful_votes",
    "star_rating",
    "product_title.keyword",
    size
  );

  const hits = getVotesSimilarProducts(data, asins);
  return hits;
};

export { SourceSimilarProducts, SourceSumVotesArrayASINS };
