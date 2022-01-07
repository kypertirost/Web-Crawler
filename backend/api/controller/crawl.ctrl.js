import { crawl } from "../../util.js";

export default class CrawlCtrl {
    
    static async apiGetCrawlResult(req, res, next) {
        const url = req.query.link;
        try {
            const result = await crawl(url);
            res.status(200).json(result);
        } catch(err) {
            console.error(`URL: ${url} cannot be reached`);
            console.error(err);
            res.status(400).json({
                error: `URL: ${url} cannot be reached`
            });
        } 
    }
}