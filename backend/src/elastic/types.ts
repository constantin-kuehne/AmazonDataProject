import { ApiResponse } from "@elastic/elasticsearch";
import { SearchResponse } from "@elastic/elasticsearch/api/types";

type hitsCallback = <Source, SearchBody>(
  data: ApiResponse<SearchResponse<Source>, SearchBody>,
  ...args: unknown[]
) => Source[];

export { hitsCallback };
