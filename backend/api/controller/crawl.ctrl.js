import { crawl } from "../../util.js";
import CrawlDAO from "../../dao/CrawlDAO.js";

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

    static async apiGetUserHistory(req, res, next) {
        try{
            let email = req.body.email;
            const history = await CrawlDAO.getHistory(email);
            let {err} = history;
            if(err) {
                res.status(400).json({
                    error : err
                })
            } else {
                res.json(history)
            }
        } catch(err) {
            res.status(500).json({error: err.message})
        }
    }

    static async apiPostUserHistory(req, res, next) {
        try{
            let result = req.body.crawl;
            let email = req.body.email;
            const response = await CrawlDAO.addHistory(email, result);
            let {err} = response;
            if(err) {
                res.status(400).json({
                    error : err
                })
            } else {
                res.json(response);
            }
        } catch(err) {
            res.status(500).json({error: err.message})
        }
    }

    static async apiDeleteUserHistory(req, res, next) {
        try{
            let id = req.body.id;
            let email = req.body.email;
            const response = await CrawlDAO.deleteHistory(email, id);
            let {err} = response;
            let {deletedCount} = response;
            if (err) {
                res.status(400).json({
                    error : err
                })
            } else if (deletedCount === 0) {
                res.status(403).json({
                    error : `Unable to delete history because of wrong user email`
                })
            } else {
                res.json(response);
            }
        } catch(err) {
            res.status(500).json({error: err.message})
        }
    }
}