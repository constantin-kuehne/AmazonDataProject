import client from "../client";
import config from "../../config";
import { getQueryHits } from "../hits";
import { ApiResponse } from "@elastic/elasticsearch";
import { SearchResponse } from "@elastic/elasticsearch/api/types";

interface Source {
  marketplace: string;
  customer_id: number;
  review_id: string;
  product_id: string;
  product_parent: number;
  product_title: string;
  product_category: string;
  star_rating: number;
  helpful_votes: number;
  total_votes: number;
  vine: boolean;
  verified_purchase: boolean;
  review_headline: string;
  review_body: string;
  review_date: Date;
}

interface SearchBody {
  index: string;
  body: {
    query: {
      match: {
        "product_id.keyword": {
          query: string;
        };
      };
    };
  };
}

type test = <Source, SearchBody>(
  arg: any,
  query: SearchBody,
  cb: (data: ApiResponse<SearchResponse<Source>, SearchBody>) => Source[]
) => Promise<Source>;

const _queryAsinRaw = (ASIN: string) =>
  client.search<Source, SearchBody>({
    index: `${config.index}`,
    body: {
      query: {
        match: {
          "product_id.keyword": {
            query: `${ASIN}`,
          },
        },
      },
    },
  });

// TODO: filter path so only hits get returned: https://stackoverflow.com/a/46194936
export default async (ASIN: string) => {
  const data = await _queryAsinRaw(ASIN);
  return getQueryHits<Source, SearchBody>(data);
};

export { Source, SearchBody, _queryAsinRaw };
