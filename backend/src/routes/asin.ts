import { Router } from "express";
import queryAsin from "../elastic/queries/query-asin";
import queryNumberReviews from "../elastic/queries/query-number-reviews";
import queryStarRating from "../elastic/queries/query-star-rating";
import queryTotalVotes from "../elastic/queries/query-total-votes";

const router = Router();

router.get("/:ASIN", (req, res) => {
  queryAsin(req.params.ASIN as string).then((data) => res.json(data));
});

router.get("/:ASIN/number-reviews", (req, res) => {
  queryNumberReviews(req.params.ASIN as string).then((data) => res.json(data));
});

router.get("/:ASIN/star-rating", (req, res) => {
  queryStarRating(req.params.ASIN as string).then((data) => res.json(data));
});

router.get("/:ASIN/total-votes", (req, res) => {
  queryTotalVotes(req.params.ASIN as string).then((data) => res.json(data));
});

export default router;
