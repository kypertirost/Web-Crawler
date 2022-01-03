import express from "express";
import CrawlCtrl from "./controller/crawl.ctrl.js"
const router = express.Router();

//TODO: Implement login
// router.route("/login").post(
    
// );

//TODO: Implement Web-crawl
router.route("/crawl").get(
    CrawlCtrl.apiGetCrawlResult
)

export default router;