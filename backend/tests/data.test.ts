import queryAsin, { _queryAsinRaw } from "../src/elastic/queries/query-asin";
import queryCompletionAsin, {
  _queryCompletionAsinRaw,
} from "../src/elastic/queries/query-completion-asin";
import queryCompletionTitle from "../src/elastic/queries/query-completion-product-title";
import queryStarRatingAsin from "../src/elastic/queries/query-star-rating";
import queryNumberReviews from "../src/elastic/queries/query-number-reviews";
import queryTotalVotes from "../src/elastic/queries/query-total-votes";
import queryHelpfulVotes from "../src/elastic/queries/query-helpful-votes";
import queryReviewsVotes from "../src/elastic/queries/query-reviews-votes";

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

  test("check if completion ASIN of an ASIN wildcard that should exist actually  returns something", async () => {
    return queryCompletionAsin("B000002L7").then((data) => {
      expect(data.length).toBeGreaterThan(0);
      expect(Array.isArray(data)).toBe(true);
    });
  });

  test("check if completion product title works for a product title that should exist actually  returns something", async () => {
    return queryCompletionTitle("test").then((data) => {
      expect(data.length).toBeGreaterThan(0);
      expect(typeof data[0].product_title).toBe("string");
      expect(typeof data[0].asin).toBe("string");
    });
  });

  test("check if star rating ASIN of an ASIN that should exist actually returns something", async () => {
    return queryStarRatingAsin("B000002L7Y").then((data) => {
      expect(typeof data.starRating).toBe("number");
      expect(data.starRating).toBeGreaterThan(0);
    });
  });

  test("check if star rating ASIN of an ASIN that should exist actually returns something", async () => {
    return queryNumberReviews("B000002L7Y").then((data) => {
      expect(typeof data).toBe("number");
      expect(data).toBeGreaterThan(0);
    });
  });

  test("check if total votes ASIN of an ASIN that should exist actually returns something", async () => {
    return queryTotalVotes("B000002L7Y").then((data) => {
      expect(typeof data.totalVotes).toBe("number");
      expect(data.totalVotes).toBeGreaterThan(0);
    });
  });

  test("check if helpful votes ASIN of an ASIN that should exist actually returns something", async () => {
    return queryHelpfulVotes("B000002L7Y").then((data) => {
      expect(typeof data.helfulVotes).toBe("number");
      expect(data.helfulVotes).toBeGreaterThan(0);
    });
  });

  test("check if helpful votes and total votes on each unique review basis, searched based on ASIN", async () => {
    return queryReviewsVotes("B000002L7Y").then((data) => {
      expect(typeof data[0].total_votes).toBe("number");
      expect(new Set(Object.keys(data[0]))).toEqual(
        new Set(["total_votes", "helpful_votes"])
      );
    });
  });
});
