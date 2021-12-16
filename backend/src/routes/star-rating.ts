import { Router } from "express";
import querySarRatingAsin from "../elastic/queries/query-star-rating";

const router = Router();

router.get("/asin/:ASIN", (req, res) => {
  querySarRatingAsin(req.params.ASIN as string).then((data) => res.json(data));
});

export default router;
