import client from "../client";
import config from "../../config";
import { getStarRating } from "../hits";
import { SearchRequest } from "@elastic/elasticsearch/api/types";

interface SearchBodyAll {
  index: string;
  size: number;
  body: {
    aggs: {
      all: {
        avg: {
          field: string;
        };
      };
      asin: {
        filter: {
          term: { "product_id.keyword": string };
        };
        aggs: {
          test: {
            avg: {
              field: string;
            };
          };
        };
      };
    };
  };
}

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
            avg: {
              field: string;
            };
          };
        };
      };
    };
  };
}

const _queryStarRatingAsinRaw = (
  ASIN: string,
  field: string,
  filterName: string,
  aggName: string
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
            [aggName]: {
              avg: {
                field: field,
              },
            },
          },
        },
      },
    },
  };
  return client.search<false, SearchBody>(query);
};

// TODO: filter path so only hits get returned: https://stackoverflow.com/a/46194936
export default async (ASIN: string) => {
  const field = "star_rating";
  const filterName = "product_id";
  const aggName = "average";
  const data = await _queryStarRatingAsinRaw(ASIN, field, filterName, aggName);
  return getStarRating<false, SearchBody>(data, filterName, aggName);
};

export { SearchBody, _queryStarRatingAsinRaw };
