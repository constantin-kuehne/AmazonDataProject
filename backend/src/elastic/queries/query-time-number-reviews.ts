import client from "../client";
import config from "../../config";
import { getTimeNumberReviews } from "../hits";
import {
  AggregationsAggregationContainer,
  QueryDslQueryContainer,
  SearchRequest,
} from "@elastic/elasticsearch/api/types";
import util from "util";

enum EnumCalendarInterval {
  DAY = "d",
  WEEK = "w",
  MONTH = "M",
  QUARTER = "q",
  YEAR = "y",
}

class SearchBody implements SearchRequest {
  index: string;
  body: {
    query: QueryDslQueryContainer;
    aggs: Record<string, AggregationsAggregationContainer>;
  };
}

const _queryTimeNumberReviewsAsinRaw = (
  ASIN: string,
  field: string,
  aggName: string,
  interval: EnumCalendarInterval,
  intervalNumber: number = 1
) => {
  let query: SearchBody = {
    index: `${config.index}`,
    body: {
      query: {
        constant_score: {
          filter: {
            term: {},
          },
        },
      },
      aggs: {},
    },
  };
  query.body.query.constant_score.filter.term[field] = ASIN;
  query.body.aggs[aggName] = {
    date_histogram: {
      field: "review_date",
      calendar_interval: `${intervalNumber}${interval}`,
    },
  };
  return client.search<false, SearchBody>(query);
};

export default async (ASIN: string) => {
  const field = "product_id.keyword";
  const aggName = "date_interval";
  const data = await _queryTimeNumberReviewsAsinRaw(
    ASIN,
    field,
    aggName,
    EnumCalendarInterval.MONTH
  );
  return getTimeNumberReviews<false, SearchBody>(data, aggName);
};

export { SearchBody, _queryTimeNumberReviewsAsinRaw };
