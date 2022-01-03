import client from "../client";
import config from "../../config";
import { getTimeNumberReviews } from "../hits";
import {
  AggregationsAggregationContainer,
  QueryDslQueryContainer,
  SearchRequest,
} from "@elastic/elasticsearch/api/types";

const CalendarIntervalOptions = {
  DAY: "d",
  WEEK: "w",
  MONTH: "M",
  QUARTER: "q",
  YEAR: "y",
} as const;

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
  interval: typeof CalendarIntervalOptions[keyof typeof CalendarIntervalOptions],
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

export default async (
  ASIN: string,
  interval: keyof typeof CalendarIntervalOptions = "MONTH",
  intervalNumber: number = 1
) => {
  const field = "product_id.keyword";
  const aggName = "date_interval";
  const data = await _queryTimeNumberReviewsAsinRaw(
    ASIN,
    field,
    aggName,
    CalendarIntervalOptions[interval],
    intervalNumber
  );
  return getTimeNumberReviews<false, SearchBody>(data, aggName);
};

export { SearchBody, CalendarIntervalOptions, _queryTimeNumberReviewsAsinRaw };
