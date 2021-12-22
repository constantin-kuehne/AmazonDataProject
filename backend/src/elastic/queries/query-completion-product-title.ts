import client from "../client";
import config from "../../config";
import { getCompletionTitle } from "../hits";
import { SearchRequest } from "@elastic/elasticsearch/api/types";

class SearchBody implements SearchRequest {
  index: string;
  body: {
    query: {
      match: {
        [field: string]: string;
      };
    };
    collapse: { field: string };
    fields: [string];
    _source: boolean | string[];
  };
}

interface Source {
  product_id: string;
}

// TODO: pobably should collapse based on asin and then make array of all asins
// with this product title. (only to make sure we don't just forget about
// product titles to be able to have more than 1 asin)
const _queryCompletionTitleRaw = (
  title: string,
  field: string,
  sourceFields: boolean | string[]
) => {
  let query: SearchBody = {
    index: `${config.index}`,
    body: {
      query: {
        match: {},
      },
      collapse: {
        field: `${field}.keyword`,
      },
      fields: [`${field}.keyword`],
      _source: sourceFields,
    },
  };
  query.body.query.match[field] = title;
  return client.search<Source, SearchBody>(query);
};

export default async (title: string) => {
  const field = "product_title";
  const sourceFields = ["product_id"];
  const data = await _queryCompletionTitleRaw(title, field, sourceFields);
  return getCompletionTitle(data, `${field}.keyword`);
};

export { Source, SearchBody, _queryCompletionTitleRaw };
