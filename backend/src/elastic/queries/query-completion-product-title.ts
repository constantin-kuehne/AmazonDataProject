import client from "../client";
import config from "../../config";
import { getCompletionTitle } from "../hits";
import {
  QueryDslMatchQuery,
  SearchRequest,
} from "@elastic/elasticsearch/api/types";

class SearchBody implements SearchRequest {
  index: string;
  size: number;
  body: {
    query: {
      match: {
        [field: string]: QueryDslMatchQuery;
      };
    };
    collapse: { field: string };
    _source: boolean | string[];
  };
}

interface Source {
  product_id: string;
  product_title: string;
}

// NOTE: pobably should collapse based on asin and then make array of all asins
// with this product title. (only to make sure we don't just forget about
// product titles to be able to have more than 1 asin)
const _queryCompletionTitleRaw = (
  title: string,
  field: string,
  sourceFields: boolean | string[],
  collapseField: string,
  size: number = 10
) => {
  const query: SearchBody = {
    index: `${config.index}`,
    size: size,
    body: {
      query: {
        match: {
          [field]: {
            query: title.trim(),
            operator: "or",
          },
        },
      },
      collapse: {
        field: collapseField,
      },
      _source: sourceFields,
    },
  };
  return client.search<Source, SearchBody>(query);
};

export default async (title: string, size: number = 10) => {
  const field = "product_title";
  const sourceFields = [
    "marketplace",
    "customer_id",
    "review_id",
    "product_id",
    "product_parent",
    "product_title",
    "product_category",
    "star_rating",
    "helpful_votes",
    "total_votes",
    "vine",
    "verified_purchase",
    "review_headline",
    "review_body",
    "review_date",
  ];
  const collapseField = "product_id.keyword";
  const data = await _queryCompletionTitleRaw(
    title,
    field,
    sourceFields,
    collapseField,
    size
  );
  return getCompletionTitle(data);
};

export { Source, SearchBody, _queryCompletionTitleRaw };
