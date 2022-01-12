import { Router } from "express";
import queryCompletionProductTitle from "../elastic/queries/query-completion-product-title";
import queryCompletionAsin from "../elastic/queries/query-completion-asin";

const router = Router();

router.get("/asin", (req, res) => {
  queryCompletionAsin(req.query.s as string).then((data) => res.json(data));
});

router.get("/title", (req, res) => {
  let size: number = parseInt(req.query.size as string, 10);
  size = Number.isNaN(size) ? undefined : size;
  queryCompletionProductTitle(req.query.s as string, size).then((data) =>
    res.json(data)
  );
});

export default router;
