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
}

interface Source {
  helpful_votes: number;
  total_votes: number;
  review_headline: string;
}

const _queryReviewVotesAsinRaw = (ASIN: string, size: number) => {
  const query: SearchBody = {
    index: config.index,
    size: size,
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
        {
          total_votes: {
            order: "desc",
          },
        },
        "_score",
      ],
    },
  };
  return client.search<Source, SearchBody>(query);
};

export default async (ASIN: string, size: number = 10) => {
  const data = await _queryReviewVotesAsinRaw(ASIN, size);
  return getQueryHits<Source, SearchBody>(data);
};

export { Source, SearchBody, _queryReviewVotesAsinRaw };
