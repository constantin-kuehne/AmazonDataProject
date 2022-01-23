import { Router } from "express";
import queryHelpfulVotes from "../elastic/queries/query-helpful-votes";
import queryAsin from "../elastic/queries/query-asin";
import queryNumberReviews from "../elastic/queries/query-number-reviews";
import queryStarRating from "../elastic/queries/query-star-rating";
import queryTotalVotes from "../elastic/queries/query-total-votes";
import queryReviewsVotes from "../elastic/queries/query-reviews-votes";
import queryReviews from "../elastic/queries/query-reviews";
import queryTimeNumberReviews, {
  CalendarIntervalOptions,
} from "../elastic/queries/query-time-number-reviews";
import { queryVotesSimilarProducts } from "../elastic/queries/query-similar-products";
import queryAsinDistinct from "../elastic/queries/query-asin-distinct";

const router = Router();

// returns all reviews for this asin as stored in elasticsearch
router.get("/:ASIN", (req, res) => {
  queryAsin(req.params.ASIN as string).then((data) => res.json(data));
});

// returns only the number of reviews for this asin
router.get("/:ASIN/number-reviews", (req, res) => {
  queryNumberReviews(req.params.ASIN as string).then((data) => res.json(data));
});

// returns the interval time in datetime format (yyyy-MM-dd'T'HH:mm:ss.SSSZ) in
// unix format; the amount of reviews in this interval (docCount)
// used in: line chart
router.get("/:ASIN/number-reviews/:DATETYPE", (req, res) => {
  let interval: number = parseInt(req.query.interval as string, 10);
  if (Number.isNaN(interval)) {
    interval = undefined;
  }
  let datetype = req.params.DATETYPE as keyof typeof CalendarIntervalOptions;
  if (!(datetype in Object.keys(CalendarIntervalOptions))) {
    datetype = undefined;
  }
  queryTimeNumberReviews(req.params.ASIN as string, datetype, interval).then(
    (data) => res.json(data)
  );
});

// returns the number of reviews of this asin and the average star rating over
// these reviews
router.get("/:ASIN/star-rating", (req, res) => {
  queryStarRating(req.params.ASIN as string).then((data) => res.json(data));
});

// returns the number of reviews of this asin and the sum of total votes over
// these reviews
router.get("/:ASIN/total-votes", (req, res) => {
  queryTotalVotes(req.params.ASIN as string).then((data) => res.json(data));
});

// returns the number of reviews of this asin and the sum of helpful votes over
// these reviews
router.get("/:ASIN/helpful-votes", (req, res) => {
  queryHelpfulVotes(req.params.ASIN as string).then((data) => res.json(data));
});

// returns the number of reviews of this asin, the sum of helpful votes over
// these reviews, the sum of total votes over these reviews and the average
// star rating over these votes
// used in: scatter plot
router.get("/:ASIN/info", (req, res) => {
  queryAsinDistinct(req.params.ASIN as string).then((data) => res.json(data));
});

// returns the total votes, helpful votes and review headline of the top size
// reviews of this asin based on helpful votes :: total votes ratio
router.get("/:ASIN/reviews-votes", (req, res) => {
  let size: number = parseInt(req.query.size as string, 10);
  size = Number.isNaN(size) ? undefined : size;
  queryReviewsVotes(req.params.ASIN as string, size).then((data) =>
    res.json(data)
  );
});

// the whole elasticsearch document of the top size reviews of this asin based
// on helpful votes :: total votes ratio
// used in: bar chart
router.get("/:ASIN/reviews", (req, res) => {
  let size: number = parseInt(req.query.size as string, 10);
  size = Number.isNaN(size) ? undefined : size;
  queryReviews(req.params.ASIN as string, size).then((data) => res.json(data));
});

// returns the most similar products to your product based on product title and
// category; computed by elasticsearch
// used in: scatter plots
router.get("/:ASIN/votes-similar-products", (req, res) => {
  let size: number = parseInt(req.query.size as string, 10);
  size = Number.isNaN(size) ? undefined : size;
  queryVotesSimilarProducts(
    req.params.ASIN as string,
    req.query.title as string,
    req.query.category as string,
    size
  ).then((data) => res.json(data));
});

export default router;
