import client from "../client";
import config from "../../config";
import { getQueryFields } from "../hits";
import { SearchRequest } from "@elastic/elasticsearch/api/types";

class SearchBody implements SearchRequest {
  index: string;
  body: {
    query: {
      wildcard: {
        [key: string]: {
          value: string;
        };
      };
    };
    collapse: {
      field: string;
    };
    fields: [string];
    _source: boolean;
  };
}

const _queryCompletionAsinRaw = (ASIN: string, field: string) =>
  client.search<false, SearchBody>({
    index: `${config.index}`,
    body: {
      query: {
        wildcard: {
          "product_id.wildcard": {
            value: `${ASIN}*`,
          },
        },
      },
      collapse: {
        field,
      },
      fields: [field],
      _source: false,
    },
  });

// TODO: filter path so only hits get returned: https://stackoverflow.com/a/46194936
export default async (ASIN: string) => {
  const field = "product_id.keyword";
  const data = await _queryCompletionAsinRaw(ASIN, field);
  return getQueryFields<false, SearchBody>(data, field);
};

export { SearchBody, _queryCompletionAsinRaw };
