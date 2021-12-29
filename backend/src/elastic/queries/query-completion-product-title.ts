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
  collapseField: string
) => {
  const query: SearchBody = {
    index: `${config.index}`,
    body: {
      query: {
        match: {},
      },
      collapse: {
        field: collapseField,
      },
      _source: sourceFields,
    },
  };
  query.body.query.match[field] = title;
  return client.search<Source, SearchBody>(query);
};

export default async (title: string) => {
  const field = "product_title";
  const sourceFields = ["product_id", "product_title"];
  const collapseField = "product_id.keyword";
  const data = await _queryCompletionTitleRaw(
    title,
    field,
    sourceFields,
    collapseField
  );
  return getCompletionTitle(data);
};

export { Source, SearchBody, _queryCompletionTitleRaw };
