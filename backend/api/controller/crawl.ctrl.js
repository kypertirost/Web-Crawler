import { crawl } from "../../util.js";

export default class CrawlCtrl {
    
    static async apiGetCrawlResult(req, res, next) {
        const url = req.query.link;
        try {
            let parsed_link = new URL(url);
            const result = await crawl(url);
            res.status(200).json(result)
        } catch(err) {
            console.error("Not a valid link")
            console.error(err);
            res.status(400).json({
                error: "Not a valid link"
            });
        } 
    }
}