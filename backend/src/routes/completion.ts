import { Router } from "express";
import queryCompletionAsin from "../elastic/queries/query-completion-asin";

const router = Router();

router.get("/asin", (req, res, _) => {
  queryCompletionAsin(req.query.s as string).then((data) => res.json(data));
});

export default router;
