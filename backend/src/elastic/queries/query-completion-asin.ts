import client from "../client";
import config from "../../config";
import { getQueryFields } from "../hits";

interface SearchBody {
  index: string;
  body: {
    query: {
      wildcard: {
        "product_id.wildcard": {
          value: string;
        };
      };
    };
    collapse: {
      field: "product_id.keyword";
    };
    fields: ["product_id.keyword"];
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
        field: field,
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
