import client from "../client";
import config from "../../config";
import { SearchRequest } from "@elastic/elasticsearch/api/types";
import { getTotalVotes } from "../hits";

class SearchBody implements SearchRequest {
  index: string;
  size: number;
  body: {
    aggs: {
      [key: string]: {
        filter: {
          term: { "product_id.keyword": string };
        };
        aggs: {
          [key: string]: {
            sum: {
              field: string;
            };
          };
        };
      };
    };
  };
}

const _queryTotalVotesAsinRaw = (
  ASIN: string,
  field: string,
  filterName: string,
  aggName: string
) => {
  const query: SearchBody = {
    index: `${config.index}`,
    size: 0,
    body: {
      aggs: {},
    },
  };
  query.body.aggs[filterName] = {
    filter: {
      term: {
        "product_id.keyword": ASIN,
      },
    },
    aggs: {},
  };
  query.body.aggs[filterName].aggs[aggName] = {
    sum: {
      field,
    },
  };
  return client.search<false, SearchBody>(query);
};

export default async (ASIN: string) => {
  const field = "total_votes";
  const filterName = "product_id";
  const aggName = "sum";
  const data = await _queryTotalVotesAsinRaw(ASIN, field, filterName, aggName);
  return getTotalVotes<false, SearchBody>(data, filterName, aggName);
};

export { SearchBody, _queryTotalVotesAsinRaw };
