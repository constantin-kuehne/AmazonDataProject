import { Router } from "express";
import queryAsin from "../elastic/queries/query-asin";
import queryCompletionAsin from "../elastic/queries/query-completion-asin";

const router = Router();

router.get("/exact/:ASIN", (req, res) => {
  queryAsin(req.params.ASIN as string).then((data) => res.json(data));
});

router.get("/completion", (req, res, _) => {
  queryCompletionAsin(req.query.s as string).then((data) => res.json(data));
});

export default router;
