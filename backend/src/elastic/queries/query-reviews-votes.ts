import client from "../client";
import config from "../../config";
import {
  QueryDslQueryContainer,
  SearchRequest,
} from "@elastic/elasticsearch/api/types";
import { getQueryHits } from "../hits";

class SearchBody implements SearchRequest {
  index: string;
  size: number;
  body: {
    query: QueryDslQueryContainer;
    sort: any;
  };
  _source: string[];
}

interface Source {
  helpful_votes: number;
  total_votes: number;
}

const _queryReviewVotesAsinRaw = (ASIN: string) => {
  const query: SearchBody = {
    index: config.index,
    size: 10000,
    body: {
      query: {
        script_score: {
          query: {
            match: {
              "product_id.keyword": ASIN,
            },
          },
          script: {
            source:
              "if (doc['total_votes'].value > 0 ){ \
              return doc['helpful_votes'].value / doc['total_votes'].value \
              } \
              return 0 ",
          },
        },
      },
      sort: [
        "_score",
        {
          total_votes: {
            order: "desc",
          },
        },
      ],
    },
    _source: ["total_votes", "helpful_votes"],
  };
  return client.search<Source, SearchBody>(query);
};

export default async (ASIN: string) => {
  const data = await _queryReviewVotesAsinRaw(ASIN);
  return getQueryHits<Source, SearchBody>(data);
};

export { Source, SearchBody, _queryReviewVotesAsinRaw };
