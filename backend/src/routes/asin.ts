import { Router } from "express";
import queryHelpfulVotes from "../elastic/queries/query-helpful-votes";
import queryAsin from "../elastic/queries/query-asin";
import queryNumberReviews from "../elastic/queries/query-number-reviews";
import queryStarRating from "../elastic/queries/query-star-rating";
import queryTotalVotes from "../elastic/queries/query-total-votes";
import queryReviewsVotes from "../elastic/queries/query-reviews-votes";
import queryReviews from "../elastic/queries/query-reviews";

const router = Router();

router.get("/:ASIN", (req, res) => {
  queryAsin(req.params.ASIN as string).then((data) => res.json(data));
});

router.get("/:ASIN/number-reviews", (req, res) => {
  queryNumberReviews(req.params.ASIN as string).then((data) => res.json(data));
});

// star bar
router.get("/:ASIN/star-rating", (req, res) => {
  queryStarRating(req.params.ASIN as string).then((data) => res.json(data));
});

router.get("/:ASIN/total-votes", (req, res) => {
  queryTotalVotes(req.params.ASIN as string).then((data) => res.json(data));
});

router.get("/:ASIN/helpful-votes", (req, res) => {
  queryHelpfulVotes(req.params.ASIN as string).then((data) => res.json(data));
});

// bar chart helpful votes total votes
router.get("/:ASIN/reviews-votes", (req, res) => {
  queryReviewsVotes(req.params.ASIN as string).then((data) => res.json(data));
});

// same as one up but more info
router.get("/:ASIN/reviews", (req, res) => {
  queryReviews(req.params.ASIN as string).then((data) => res.json(data));
});

export default router;
