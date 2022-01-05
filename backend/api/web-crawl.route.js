import express from "express";
import CrawlCtrl from "./controller/crawl.ctrl.js"
import LoginCtrl from "./controller/login.ctrl.js";
const router = express.Router();

router.route("/login").post(
    LoginCtrl.apiLogin
);

//TODO: Implement Web-crawl
router.route("/crawl").get(
    CrawlCtrl.apiGetCrawlResult
)

export default router;