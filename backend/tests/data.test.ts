import queryAsin, {
  Source as QueryAsinSource,
  _queryAsinRaw,
} from "../src/elastic/queries/query-asin";
import queryCompletionAsin, {
  _queryCompletionAsinRaw,
} from "../src/elastic/queries/query-completion-asin";

describe("data tests", () => {
  test("check if query for ASIN works", async () => {
    return _queryAsinRaw("").then((data) => {
      expect(data).toHaveProperty(["statusCode"], 200);
    });
  });

  test("check if ASIN query of an ASIN that should exist actually returns something", async () => {
    return queryAsin("B000002L7Y").then((data) => {
      expect(data.length).toBeGreaterThan(0);
      expect(Array.isArray(data)).toBe(true);
    });
  });

  test("check if query for completion ASIN works", async () => {
    return _queryAsinRaw("").then((data) => {
      expect(data).toHaveProperty(["statusCode"], 200);
    });
  });

  test("check if completion ASIN of an ASIN wildcard that should exist actually returns something", async () => {
    return queryCompletionAsin("B000002L7").then((data) => {
      expect(data.length).toBeGreaterThan(0);
      expect(Array.isArray(data)).toBe(true);
    });
  });
});
