import client from "../client";
import config from "../../config";
import { getQueryFields } from "../hits";
import { SearchRequest } from "@elastic/elasticsearch/api/types";
import { DocumentRequired } from "../types";

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

const _queryCompletionAsinRaw = (
  ASIN: string,
  field: string,
  size: number = 10
) =>
  client.search<DocumentRequired, SearchBody>({
    index: `${config.index}`,
    size: size,
    body: {
      query: {
        wildcard: {
          "product_id.keyword": {
            value: `${ASIN}*`,
          },
        },
      },
      collapse: {
        field,
      },
      _source: true,
    },
  });

// TODO: filter path so only hits get returned: https://stackoverflow.com/a/46194936
export default async (ASIN: string, size: number = 10) => {
  const field = "product_id.keyword";
  const data = await _queryCompletionAsinRaw(ASIN, field, size);
  return getQueryFields<DocumentRequired, SearchBody>(data);
};

export { SearchBody, _queryCompletionAsinRaw };
