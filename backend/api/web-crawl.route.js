import express from "express";
import CrawlCtrl from "./controller/crawl.ctrl.js"
const router = express.Router();

router.route("/crawl").get(
    CrawlCtrl.apiGetCrawlResult
)

router.route("/history")
    .get(CrawlCtrl.apiGetUserHistory)
    .post(CrawlCtrl.apiPostUserHistory)
    .delete(CrawlCtrl.apiDeleteUserHistory)

// post request here is to hide user email information
router.route("/myHistory").post(CrawlCtrl.apiGetUserHistory)
export default router;