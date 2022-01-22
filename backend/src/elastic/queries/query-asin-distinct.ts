import client from "../client";
import config from "../../config";
import {
  AggregationsAggregationContainer,
  SearchRequest,
} from "@elastic/elasticsearch/api/types";
import { getDistinctAsinVotes } from "../hits";

class SearchBody implements SearchRequest {
  index: string;
  size: number;
  body: {
    aggs: {
      [key: string]: {
        filter: {
          term: { "product_id.keyword": string };
        };
        aggs: Record<string, AggregationsAggregationContainer>;
      };
    };
  };
}

const _queryVotesDistinctAsinRaw = (
  ASIN: string,
  field1: string,
  field2: string,
  field3: string,
  filterName: string,
  aggName1: string,
  aggName2: string,
  aggName3: string
) => {
  const query: SearchBody = {
    index: `${config.index}`,
    size: 0,
    body: {
      aggs: {
        [filterName]: {
          filter: {
            term: {
              "product_id.keyword": ASIN,
            },
          },
          aggs: {
            [aggName1]: {
              sum: {
                field: field1,
              },
            },
            [aggName2]: {
              sum: {
                field: field2,
              },
            },
            [aggName3]: {
              avg: {
                field: field3,
              },
            },
          },
        },
      },
    },
  };
  return client.search<false, SearchBody>(query);
};

export default async (ASIN: string) => {
  const field1 = "helpful_votes";
  const field2 = "total_votes";
  const field3 = "star_rating";

  const filterName = "product_id";

  const aggName1 = "totalVotes";
  const aggName2 = "helpfulVotes";
  const aggName3 = "starRating";

  const data = await _queryVotesDistinctAsinRaw(
    ASIN,
    field1,
    field2,
    field3,
    filterName,
    aggName1,
    aggName2,
    aggName3
  );
  return getDistinctAsinVotes<false, SearchBody>(
    data,
    filterName,
    aggName1,
    aggName2,
    aggName3
  );
};

export { SearchBody, _queryVotesDistinctAsinRaw };
