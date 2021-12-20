import client from "../client";
import config from "../../config";
import { getNumberReviews } from "../hits";
import { CountRequest } from "@elastic/elasticsearch/api/types";

class SearchBody implements CountRequest {
  index: string;
  q: string;
}

const _queryNumberReviewsAsinRaw = (ASIN: string, field: string) => {
  const query: SearchBody = {
    index: `${config.index}`,
    q: `${field}:${ASIN}`,
  };
  console.log(query);
  return client.count<SearchBody>(query);
};

export default async (ASIN: string) => {
  const field = "product_id.keyword";
  const data = await _queryNumberReviewsAsinRaw(ASIN, field);
  console.log(data);
  return getNumberReviews<SearchBody>(data);
};

export { SearchBody, _queryNumberReviewsAsinRaw };
