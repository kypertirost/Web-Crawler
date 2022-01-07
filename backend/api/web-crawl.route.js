import express from "express";
import CrawlCtrl from "./controller/crawl.ctrl.js"
const router = express.Router();

router.route("/crawl").get(
    CrawlCtrl.apiGetCrawlResult
)

export default router;