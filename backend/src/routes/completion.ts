import { Router } from "express";
import queryCompletionProductTitle from "../elastic/queries/query-completion-product-title";
import queryCompletionAsin from "../elastic/queries/query-completion-asin";

const router = Router();

// returns product parent, title, category and id of size products which begin
// or have the asin specified via the s query parameter; it gives back the whole doc
// used in: search bar
router.get("/asin", (req, res) => {
  let size: number = parseInt(req.query.size as string, 10);
  size = Number.isNaN(size) ? undefined : size;
  queryCompletionAsin(req.query.s as string, size).then((data) =>
    res.json(data)
  );
});

// returns product parent, title, category and id of size products which have a
// similar product title (based on elasticsearch match query)
// used in: search bar
router.get("/title", (req, res) => {
  let size: number = parseInt(req.query.size as string, 10);
  size = Number.isNaN(size) ? undefined : size;
  queryCompletionProductTitle(req.query.s as string, size).then((data) =>
    res.json(data)
  );
});

export default router;
