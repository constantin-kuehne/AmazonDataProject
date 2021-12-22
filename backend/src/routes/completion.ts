// TODO: add product title api endpoint
import { Router } from "express";
import queryCompletionProductTitle from "../elastic/queries/query-completion-product-title";
import queryCompletionAsin from "../elastic/queries/query-completion-asin";

const router = Router();

router.get("/asin", (req, res) => {
  queryCompletionAsin(req.query.s as string).then((data) => res.json(data));
});

router.get("/title", (req, res) => {
  queryCompletionProductTitle(req.query.s as string).then((data) =>
    res.json(data)
  );
});

export default router;
